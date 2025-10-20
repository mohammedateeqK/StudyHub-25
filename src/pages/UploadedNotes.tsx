import { useAuth } from '@/contexts/AuthContext';
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

const UploadedNotes = () => {
  const { user, isAuthenticated } = useAuth();
  const allNotes = JSON.parse(localStorage.getItem('studyhub_notes') || '[]');
  const [myNotes, setMyNotes] = useState<any[]>(
    allNotes.filter((note: any) => note.uploadedBy === user?.id)
  );

  const handleDeleteNote = (noteId: string) => {
    const updated = allNotes.filter((n: any) => n.id !== noteId);
    setMyNotes(updated.filter((n: any) => n.uploadedBy === user?.id));
    localStorage.setItem('studyhub_notes', JSON.stringify(updated));
  };

  if (!isAuthenticated || user?.role !== 'staff') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Uploaded Notes</h1>
          <p className="text-muted-foreground">View and manage all notes you've uploaded</p>
        </div>

        {myNotes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {myNotes.map((note: any) => (
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
                        onClick={() => window.open(note.file.url, '_blank')}
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        Open Attachment ({note.file.name})
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-4">
                    Uploaded on {new Date(note.uploadedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">You haven't uploaded any notes yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UploadedNotes;
