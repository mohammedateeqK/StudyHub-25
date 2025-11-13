import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';
import { getBackgroundImage } from '@/lib/backgroundHelper';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Results = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const { opacity, intensity, backgroundImage } = useSettings();
  const { toast } = useToast();
  const [userResults, setUserResults] = useState<any[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);
  
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (user) {
      fetchResults();
    }
  }, [user]);

  const fetchResults = async () => {
    try {
      setLoadingResults(true);
      
      let query = (supabase as any)
        .from('results')
        .select(`
          *,
          student:profiles!results_student_id_fkey(name, email)
        `)
        .order('completed_at', { ascending: false });

      // Students only see their own results
      if (user?.role === 'student') {
        query = query.eq('student_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setUserResults(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading results",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingResults(false);
    }
  };

  const handleResetAll = async () => {
    try {
      let query = (supabase as any).from('results').delete();

      if (user?.role === 'student') {
        query = query.eq('student_id', user.id);
      } else {
        query = query.neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
      }

      const { error } = await query;

      if (error) throw error;

      setUserResults([]);
      toast({
        title: "All results deleted",
        description: "All test results have been removed.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting results",
        description: error.message,
        variant: "destructive",
      });
    }
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

        {loadingResults ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">Loading results...</p>
            </CardContent>
          </Card>
        ) : userResults.length > 0 ? (
          user?.role === 'admin' ? (
            <Card>
              <CardHeader>
                <CardTitle>All Student Results</CardTitle>
                <CardDescription>Detailed view of all test submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Test</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Correct</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userResults.map((result: any) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">
                          {result.student?.name || 'Unknown'}
                          <div className="text-sm text-muted-foreground">
                            {result.student?.email}
                          </div>
                        </TableCell>
                        <TableCell>{result.test_title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPerformanceIcon(result.score)}
                            <span className={`font-bold ${getScoreColor(result.score)}`}>
                              {result.score.toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {result.correct_answers} / {result.total_questions}
                        </TableCell>
                        <TableCell>
                          {new Date(result.completed_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {userResults.map((result: any) => (
                <Card key={result.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{result.test_title}</CardTitle>
                        {user?.role === 'staff' && (
                          <CardDescription className="mt-1">
                            Student: {result.student?.name || 'Unknown'}
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
                        {result.correct_answers} / {result.total_questions} correct
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(result.completed_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
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