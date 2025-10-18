import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ClipboardList, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StaffDashboard = () => {
  const stats = [
    { label: 'Total Notes', value: JSON.parse(localStorage.getItem('studyhub_notes') || '[]').length, icon: FileText, color: 'text-primary' },
    { label: 'Active Tests', value: JSON.parse(localStorage.getItem('studyhub_tests') || '[]').length, icon: ClipboardList, color: 'text-secondary' },
    { label: 'Total Students', value: JSON.parse(localStorage.getItem('studyhub_users') || '[]').filter((u: any) => u.role === 'student').length, icon: Users, color: 'text-accent' },
  ];

  const recentNotes = JSON.parse(localStorage.getItem('studyhub_notes') || '[]').slice(-3).reverse();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Staff Dashboard</h1>
        <p className="text-muted-foreground">Manage notes, tests, and track student performance</p>
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
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/notes/upload">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Upload New Notes
              </Button>
            </Link>
            <Link to="/tests/create">
              <Button className="w-full justify-start" variant="outline">
                <ClipboardList className="w-4 h-4 mr-2" />
                Create New Test
              </Button>
            </Link>
            <Link to="/results">
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Student Results
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notes</CardTitle>
            <CardDescription>Your latest uploaded materials</CardDescription>
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
              <p className="text-muted-foreground text-sm">No notes uploaded yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;