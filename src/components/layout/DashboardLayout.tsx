import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, Home, FileText, ClipboardList, BarChart, User, LogOut, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import bgWave from '@/assets/bg-wave.png';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const staffLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/notes/upload', label: 'Upload Notes', icon: FileText },
    { path: '/tests/create', label: 'Create Test', icon: ClipboardList },
    { path: '/results', label: 'View Results', icon: BarChart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const studentLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/notes', label: 'View Notes', icon: FileText },
    { path: '/tests', label: 'Take Test', icon: ClipboardList },
    { path: '/results', label: 'My Results', icon: BarChart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const links = user?.role === 'staff' ? staffLinks : studentLinks;

  return (
    <div className="min-h-screen bg-gradient-page relative">
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: `url(${bgWave})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">StudyHub</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {user?.name} ({user?.role})
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-card/95 backdrop-blur-sm border-r border-border p-4 overflow-y-auto">
          <nav className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;