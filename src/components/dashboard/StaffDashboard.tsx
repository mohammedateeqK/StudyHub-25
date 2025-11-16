import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ClipboardList, Users, TrendingUp, Clock, ThumbsUp, MessageSquare, Eye, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
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

const StaffDashboard = () => {
  const [notes, setNotes] = useState<any[]>(JSON.parse(localStorage.getItem('studyhub_notes') || '[]'));
  
  const stats = [
    { label: 'Total Notes', value: notes.length, icon: FileText, color: 'text-primary' },
    { label: 'Active Tests', value: JSON.parse(localStorage.getItem('studyhub_tests') || '[]').length, icon: ClipboardList, color: 'text-secondary' },
    { label: 'Total Students', value: JSON.parse(localStorage.getItem('studyhub_users') || '[]').filter((u: any) => u.role === 'student').length, icon: Users, color: 'text-accent' },
  ];

  const recentNotes = notes.slice(-8).reverse();
  const notesRowRef = useRef<HTMLDivElement>(null);

  const handleDeleteNote = (noteId: string) => {
    const updated = notes.filter((n: any) => n.id !== noteId);
    setNotes(updated);
    localStorage.setItem('studyhub_notes', JSON.stringify(updated));
  };
  const scrollNotes = (dir: 'left' | 'right') => {
    if (!notesRowRef.current) return;
    const amount = 240 * 3;
    notesRowRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

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
            <Card key={stat.label} className="shadow-card hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/95">
              <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color === 'text-primary' ? 'from-primary/10 to-primary/5' : stat.color === 'text-secondary' ? 'from-secondary/10 to-secondary/5' : 'from-accent/10 to-accent/5'}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card hover:shadow-lg transition-all duration-300 border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/notes/upload">
              <Button className="w-full justify-start h-12 shadow-sm hover:shadow-md transition-all" variant="outline">
                <FileText className="w-5 h-5 mr-3" />
                <span className="font-medium">Upload New Notes</span>
              </Button>
            </Link>
            <Link to="/tests/create">
              <Button className="w-full justify-start h-12 shadow-sm hover:shadow-md transition-all" variant="outline">
                <ClipboardList className="w-5 h-5 mr-3" />
                <span className="font-medium">Create New Test</span>
              </Button>
            </Link>
            <Link to="/results">
              <Button className="w-full justify-start h-12 shadow-sm hover:shadow-md transition-all" variant="outline">
                <TrendingUp className="w-5 h-5 mr-3" />
                <span className="font-medium">View Student Results</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <section className="relative">
            <h2 className="text-xl font-semibold mb-4">Recently Uploaded Notes</h2>
            {recentNotes.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth" ref={notesRowRef}>
                {recentNotes.map((note: any) => (
                  <div key={note.id} className="min-w-[260px] max-w-[260px]">
                    <Card className="shadow-card hover:shadow-lg transition-all duration-300 border-border/50 h-full">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FileText className="w-4 h-4 text-primary" />
                            <span>{note.file?.type?.includes('pdf') ? 'PDF' : (note.file?.type || 'Note')}</span>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Trash2 className="w-3 h-3" />
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
                        <p className="font-medium truncate">{note.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{note.subject}</p>
                        <p className="text-[11px] text-muted-foreground">{new Date(note.uploadedAt).toLocaleDateString()}</p>
                        <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{note.likes ?? 0}</span>
                          <span className="inline-flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{note.comments ?? 0}</span>
                          <span className="inline-flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{note.views ?? 0}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <Card><CardContent className="p-6 text-sm text-muted-foreground">No notes uploaded yet</CardContent></Card>
            )}
            {recentNotes.length > 0 && (
              <>
                <button aria-label="Scroll left" onClick={() => scrollNotes('left')} className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center rounded-full bg-card border border-border shadow hover:bg-muted">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button aria-label="Scroll right" onClick={() => scrollNotes('right')} className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center rounded-full bg-card border border-border shadow hover:bg-muted">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;