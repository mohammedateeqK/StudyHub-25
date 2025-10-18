import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const ViewNotes = () => {
  const { isAuthenticated } = useAuth();
  const notes = JSON.parse(localStorage.getItem('studyhub_notes') || '[]');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
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
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-foreground">{note.content}</p>
                  </div>
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
              <p className="text-muted-foreground">No notes available yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewNotes;