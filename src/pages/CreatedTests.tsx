import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Trash2, Calendar } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import bgMesh from '@/assets/bg-mesh.png';

const CreatedTests = () => {
  const { user, isAuthenticated } = useAuth();
  const allTests = JSON.parse(localStorage.getItem('studyhub_tests') || '[]');
  const [myTests, setMyTests] = useState<any[]>(
    allTests.filter((test: any) => test.createdBy === user?.id)
  );

  const handleDeleteTest = (testId: string) => {
    const updated = allTests.filter((t: any) => t.id !== testId);
    setMyTests(updated.filter((t: any) => t.createdBy === user?.id));
    localStorage.setItem('studyhub_tests', JSON.stringify(updated));
  };

  if (!isAuthenticated || user?.role !== 'staff') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gradient-page relative">
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{ backgroundImage: `url(${bgMesh})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="relative z-10">
        <DashboardLayout>
          <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Created Tests</h1>
          <p className="text-muted-foreground">View and manage all tests you've created</p>
        </div>

        {myTests.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {myTests.map((test: any) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                      <ClipboardList className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle>{test.title}</CardTitle>
                        <Badge variant="secondary">{test.questions.length} questions</Badge>
                      </div>
                      <CardDescription>{test.subject}</CardDescription>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Test</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this test? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteTest(test.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Created on {new Date(test.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Questions:</h4>
                      <div className="space-y-3">
                        {test.questions.map((q: any, idx: number) => (
                          <div key={idx} className="p-3 rounded-lg bg-muted/50">
                            <p className="text-sm font-medium mb-2">
                              {idx + 1}. {q.question}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {q.options.map((option: string, optIdx: number) => (
                                <div
                                  key={optIdx}
                                  className={`text-xs p-2 rounded ${
                                    optIdx === q.correctAnswer
                                      ? 'bg-primary/10 text-primary font-medium'
                                      : 'bg-background'
                                  }`}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ClipboardList className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">You haven't created any tests yet</p>
            </CardContent>
          </Card>
        )}
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default CreatedTests;
