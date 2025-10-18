import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ClipboardList, Trophy, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const userResults = JSON.parse(localStorage.getItem('studyhub_results') || '[]').filter((r: any) => r.studentId === user?.id);
  const averageScore = userResults.length > 0 
    ? (userResults.reduce((acc: number, r: any) => acc + r.score, 0) / userResults.length).toFixed(1)
    : 0;

  const stats = [
    { label: 'Available Notes', value: JSON.parse(localStorage.getItem('studyhub_notes') || '[]').length, icon: FileText, color: 'text-primary' },
    { label: 'Tests Completed', value: userResults.length, icon: ClipboardList, color: 'text-secondary' },
    { label: 'Average Score', value: `${averageScore}%`, icon: Trophy, color: 'text-accent' },
  ];

  const recentNotes = JSON.parse(localStorage.getItem('studyhub_notes') || '[]').slice(-3).reverse();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">Access your notes, take tests, and track your progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>What would you like to do?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/notes">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                View Study Notes
              </Button>
            </Link>
            <Link to="/tests">
              <Button className="w-full justify-start" variant="outline">
                <ClipboardList className="w-4 h-4 mr-2" />
                Take a Test
              </Button>
            </Link>
            <Link to="/results">
              <Button className="w-full justify-start" variant="outline">
                <Trophy className="w-4 h-4 mr-2" />
                View My Results
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notes</CardTitle>
            <CardDescription>Latest study materials available</CardDescription>
          </CardHeader>
          <CardContent>
            {recentNotes.length > 0 ? (
              <div className="space-y-3">
                {recentNotes.map((note: any) => (
                  <div key={note.id} className="p-3 bg-muted rounded-lg">
                    <p className="font-medium">{note.title}</p>
                    <p className="text-sm text-muted-foreground">{note.subject}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No notes available yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;