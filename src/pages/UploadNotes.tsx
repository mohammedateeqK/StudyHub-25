import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const UploadNotes = () => {
  const { user, isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  if (!isAuthenticated || user?.role !== 'staff') {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const notes = JSON.parse(localStorage.getItem('studyhub_notes') || '[]');
    const newNote = {
      id: Date.now().toString(),
      title,
      subject,
      content,
      uploadedBy: user.id,
      uploadedAt: new Date().toISOString(),
    };
    
    notes.push(newNote);
    localStorage.setItem('studyhub_notes', JSON.stringify(notes));
    
    toast({
      title: "Notes uploaded!",
      description: "Your notes have been successfully uploaded.",
    });
    
    setTitle('');
    setSubject('');
    setContent('');
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upload Notes</h1>
          <p className="text-muted-foreground">Share study materials with students</p>
        </div>

        <Card>
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
              <Button type="submit" variant="gradient">
                Upload Notes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UploadNotes;