import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ThumbsUp, MessageSquare, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { getBackgroundImage } from '@/lib/backgroundHelper';

const ViewNotes = () => {
  const { user, isAuthenticated } = useAuth();
  const { opacity, intensity, backgroundImage } = useSettings();
  const [notes, setNotes] = useState<any[]>(JSON.parse(localStorage.getItem('studyhub_notes') || '[]'));

  const handleDeleteNote = (noteId: string) => {
    const updated = notes.filter((n: any) => n.id !== noteId);
    setNotes(updated);
    localStorage.setItem('studyhub_notes', JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-page relative">
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-300"
        style={{ 
          backgroundImage: `url(${getBackgroundImage(backgroundImage)})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          opacity: opacity,
          filter: `brightness(${intensity})`
        }}
      />
      <div className="relative z-10">
        <DashboardLayout>
          <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Study Notes</h1>
          <p className="text-muted-foreground">Browse and read available study materials</p>
        </div>

        {notes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {notes.map((note: any) => (
              <Card key={note.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>{note.title}</CardTitle>
                      <CardDescription className="mt-1">{note.subject}</CardDescription>
                    </div>
                    {user?.role === 'staff' && user?.id === note.uploadedBy && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Note</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this note? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteNote(note.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-foreground">{note.content}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{note.likes ?? 0}</span>
                    <span className="inline-flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{note.comments ?? 0}</span>
                    <span className="inline-flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{note.views ?? 0}</span>
                  </div>
                  {note.file && (
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          // increment views and persist
                          const updated = notes.map((n: any) => n.id === note.id ? { ...n, views: (n.views || 0) + 1 } : n);
                          setNotes(updated);
                          localStorage.setItem('studyhub_notes', JSON.stringify(updated));
                          window.open(note.file.url, '_blank');
                        }}
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        Open Attachment ({note.file.name})
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-4">
                    Uploaded on {new Date(note.uploadedAt).toLocaleDateString()}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => {
                        const updated = notes.map((n: any) => n.id === note.id ? { ...n, likes: (n.likes || 0) + 1 } : n);
                        setNotes(updated);
                        localStorage.setItem('studyhub_notes', JSON.stringify(updated));
                      }}
                      className="text-xs px-3 py-1 rounded border border-border hover:bg-muted"
                    >
                      Like
                    </button>
                    <button
                      onClick={() => {
                        const updated = notes.map((n: any) => n.id === note.id ? { ...n, comments: (n.comments || 0) + 1 } : n);
                        setNotes(updated);
                        localStorage.setItem('studyhub_notes', JSON.stringify(updated));
                      }}
                      className="text-xs px-3 py-1 rounded border border-border hover:bg-muted"
                    >
                      Comment
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No notes available yet</p>
            </CardContent>
          </Card>
        )}
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default ViewNotes;