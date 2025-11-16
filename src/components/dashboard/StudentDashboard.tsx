import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ClipboardList, Trophy, BookOpen, Clock, Sparkles, ThumbsUp, MessageSquare, Eye, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRef } from 'react';

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

  const allNotes = JSON.parse(localStorage.getItem('studyhub_notes') || '[]');
  const recentNotes = allNotes.slice(-8).reverse();
  const timeData = JSON.parse(localStorage.getItem('studyhub_time_this_week') || '{"minutes": 912}'); // default ~15h12m
  const timeHrs = Math.floor((timeData.minutes || 0) / 60);
  const timeMins = (timeData.minutes || 0) % 60;

  const notesRowRef = useRef<HTMLDivElement>(null);

  const scrollNotes = (dir: 'left' | 'right') => {
    if (!notesRowRef.current) return;
    const amount = 240 * 3; // scroll by ~3 cards
    notesRowRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const CircularProgress = ({ value, size = 96, stroke = 10, trackColor = 'hsl(var(--muted))', color = 'hsl(var(--primary))' }: { value: number; size?: number; stroke?: number; trackColor?: string; color?: string; }) => {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: offset, transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
      </svg>
    );
  };

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

      {/* Recently Uploaded Notes */}
      <section className="relative">
        <h2 className="text-xl font-semibold mb-4">Recently Uploaded Notes</h2>
        {recentNotes.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth" ref={notesRowRef}>
            {recentNotes.map((note: any) => (
              <div key={note.id} className="min-w-[260px] max-w-[260px]">
                <Card className="shadow-card hover:shadow-lg transition-all duration-300 border-border/50 h-full">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FileText className="w-4 h-4 text-primary" />
                      <span>{note.file?.type?.includes('pdf') ? 'PDF' : (note.file?.type || 'Note')}</span>
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
          <Card><CardContent className="p-6 text-sm text-muted-foreground">No notes available yet</CardContent></Card>
        )}
        {/* Carousel arrows */}
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

      {/* Weekly performance */}
      <section>
          <h2 className="text-xl font-semibold mb-4">Your Weekly Performance</h2>
          <div className="grid grid-cols-1 gap-6">
            <Card className="shadow-card hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/95">
              <CardContent className="p-6 flex items-center gap-6">
                <div className="shrink-0 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                  <CircularProgress value={100} size={88} stroke={8} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total time spent this week</p>
                  <p className="text-3xl font-bold tracking-tight mt-1">{timeHrs} hrs, {timeMins} mins</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/95">
              <CardContent className="p-6 flex items-center gap-6">
                <div className="shrink-0 relative p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5">
                  <CircularProgress value={Number(averageScore)} size={88} stroke={8} color={'hsl(var(--accent))'} trackColor={'hsl(var(--muted))'} />
                  <Lightbulb className="w-5 h-5 text-accent absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Average test percentage</p>
                  <p className="text-3xl font-bold tracking-tight mt-1">{averageScore}%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
    </div>
  );
};

export default StudentDashboard;