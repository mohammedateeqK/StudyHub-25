import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import bgMesh from '@/assets/bg-mesh.png';
import { BookOpen, ArrowLeft } from 'lucide-react';

const UploadNotes = () => {
  const { user, isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  if (!isAuthenticated || user?.role !== 'staff') {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const notes = JSON.parse(localStorage.getItem('studyhub_notes') || '[]');
    let fileData: { name: string; type: string; size: number; url: string } | null = null;

    if (file) {
      // Persist a blob URL reference via localStorage by converting to base64
      const toBase64 = (f: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(f);
      });
      const dataUrl = await toBase64(file);
      fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        url: dataUrl,
      };
    }

    const newNote = {
      id: Date.now().toString(),
      title,
      subject,
      content,
      file: fileData,
      uploadedBy: user.id,
      uploadedAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      views: 0,
    };
    
    notes.push(newNote);
    localStorage.setItem('studyhub_notes', JSON.stringify(notes));
    
    toast({
      title: "Notes uploaded!",
      description: file ? "Your file and details have been uploaded." : "Your notes have been successfully uploaded.",
    });
    
    setTitle('');
    setSubject('');
    setContent('');
    setFile(null);
    navigate('/notes');
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 relative">
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{ backgroundImage: `url(${bgMesh})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Left pane: logo and tagline */}
      <div className="hidden md:flex items-center justify-center relative z-10">
        <div className="max-w-lg px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">STUDYHUB</h1>
          </div>
          <p className="text-2xl font-bold leading-snug text-primary">IMPROVING LEARNING FOR A<br/>BETTER FUTURE</p>
        </div>
      </div>

      {/* Right pane: form */}
      <div className="relative flex items-center justify-center z-10 py-12">
        {/* Back arrow */}
        <Link to="/dashboard" className="absolute top-6 left-6 p-2 rounded-full bg-white/70 hover:bg-white transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>

        <div className="w-full max-w-2xl px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">UPLOAD NOTES</h1>
              <p className="text-muted-foreground">Share study materials with students</p>
            </div>
            <Link to="/notes/uploaded">
              <Button variant="outline">View My Uploads</Button>
            </Link>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>New Study Material</CardTitle>
              <CardDescription>Fill in the details for your notes</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Introduction to Algebra"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Mathematics"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your notes content here..."
                    className="min-h-[300px]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Attach File (PDF, DOCX, PPTX, images)</label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  {file && (
                    <p className="text-xs text-muted-foreground">Selected: {file.name}</p>
                  )}
                </div>
                <Button type="submit" variant="gradient">
                  Upload Notes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadNotes;