import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';
import { getBackgroundImage } from '@/lib/backgroundHelper';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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

const Results = () => {
  const { user, isAuthenticated } = useAuth();
  const { opacity, intensity, backgroundImage } = useSettings();
  const { toast } = useToast();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const allResults = JSON.parse(localStorage.getItem('studyhub_results') || '[]');
  const [userResults, setUserResults] = useState<any[]>(
    user?.role === 'student' 
      ? allResults.filter((r: any) => r.studentId === user.id)
      : allResults
  );

  const handleResetAll = () => {
    if (user?.role === 'student') {
      const updated = allResults.filter((r: any) => r.studentId !== user.id);
      setUserResults([]);
      localStorage.setItem('studyhub_results', JSON.stringify(updated));
    } else {
      setUserResults([]);
      localStorage.setItem('studyhub_results', JSON.stringify([]));
    }
    toast({
      title: "All results deleted",
      description: "All test results have been removed.",
    });
  };

  const averageScore = userResults.length > 0
    ? (userResults.reduce((acc: number, r: any) => acc + r.score, 0) / userResults.length).toFixed(1)
    : 0;

  const getPerformanceIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (score >= 60) return <Trophy className="w-5 h-5 text-accent" />;
    return <TrendingDown className="w-5 h-5 text-destructive" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-accent';
    return 'text-destructive';
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {user?.role === 'staff' ? 'Student Results' : 'My Results'}
            </h1>
            <p className="text-muted-foreground">
              {user?.role === 'staff' 
                ? 'View and track student performance' 
                : 'Track your test performance and progress'}
            </p>
          </div>
          {userResults.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete All Results</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete all {user?.role === 'staff' ? 'student' : 'your'} test results? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetAll}>
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {userResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Overall Performance</CardTitle>
              <CardDescription>Average score across all tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className={`text-5xl font-bold ${getScoreColor(Number(averageScore))}`}>
                  {averageScore}%
                </div>
                {getPerformanceIcon(Number(averageScore))}
              </div>
            </CardContent>
          </Card>
        )}

        {userResults.length > 0 ? (
          <div className="space-y-4">
            {userResults.map((result: any) => {
              const users = JSON.parse(localStorage.getItem('studyhub_users') || '[]');
              const student = users.find((u: any) => u.id === result.studentId);
              
              return (
                <Card key={result.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{result.testTitle}</CardTitle>
                        {user?.role === 'staff' && (
                          <CardDescription className="mt-1">
                            Student: {student?.name || 'Unknown'}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getPerformanceIcon(result.score)}
                        <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                          {result.score.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {result.correctAnswers} / {result.totalQuestions} correct
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Trophy className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No results available yet</p>
            </CardContent>
          </Card>
        )}
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Results;