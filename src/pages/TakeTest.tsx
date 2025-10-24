import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ClipboardList, Search, Filter, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import bgMesh from '@/assets/bg-mesh.png';

const TakeTest = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const tests = JSON.parse(localStorage.getItem('studyhub_tests') || '[]');
  const [searchQuery, setSearchQuery] = useState('');
  const availableTestsRef = useRef<HTMLDivElement>(null);

  const scrollTests = (ref: React.RefObject<HTMLDivElement>, dir: 'left' | 'right') => {
    if (!ref.current) return;
    const amount = 280 * 2; // scroll by ~2 cards
    ref.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const filteredTests = tests.filter((t: any) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = () => {
    let score = 0;
    selectedTest.questions.forEach((q: any) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const percentage = (score / selectedTest.questions.length) * 100;

    const results = JSON.parse(localStorage.getItem('studyhub_results') || '[]');
    results.push({
      id: Date.now().toString(),
      testId: selectedTest.id,
      testTitle: selectedTest.title,
      studentId: user.id,
      score: percentage,
      totalQuestions: selectedTest.questions.length,
      correctAnswers: score,
      completedAt: new Date().toISOString(),
    });
    localStorage.setItem('studyhub_results', JSON.stringify(results));

    toast({
      title: "Test submitted!",
      description: `You scored ${percentage.toFixed(1)}%`,
    });

    navigate('/results');
  };

  if (!selectedTest) {
    return (
      <div className="min-h-screen bg-gradient-page relative">
        <div 
          className="fixed inset-0 opacity-30 pointer-events-none z-0"
          style={{ backgroundImage: `url(${bgMesh})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="relative z-10">
          <DashboardLayout>
            <div className="space-y-8">
          {/* Header with search */}
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Attend Tests</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-64 border-primary/30" />
              </div>
              <Button variant="outline" size="sm" className="border-primary/30">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Repository button */}
          <div className="flex justify-end">
            <Button variant="secondary" className="rounded-lg">Check out our repository</Button>
          </div>

          {/* Available Tests */}
          <section className="relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Available Tests</h2>
              <div className="flex gap-2">
                <button onClick={() => scrollTests(availableTestsRef, 'left')} className="p-1 hover:bg-muted rounded">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => scrollTests(availableTestsRef, 'right')} className="p-1 hover:bg-muted rounded">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            {filteredTests.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth" ref={availableTestsRef}>
                {filteredTests.map((test: any) => (
                  <div key={test.id} className="min-w-[280px] max-w-[280px]">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-64">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex items-start gap-2 mb-4">
                          <h3 className="font-semibold text-sm">{test.title}</h3>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <ClipboardList className="w-16 h-16 text-muted-foreground" />
                        </div>
                        <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/5" onClick={() => setSelectedTest(test)}>
                          Take Test
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <Card><CardContent className="p-6 text-center text-muted-foreground">No tests available</CardContent></Card>
            )}
          </section>

          </div>
        </DashboardLayout>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-page relative">
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{ backgroundImage: `url(${bgMesh})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="relative z-10">
        <DashboardLayout>
          <div className="max-w-3xl space-y-8">
        <div>
          <Button variant="ghost" onClick={() => setSelectedTest(null)}>
            ← Back to Tests
          </Button>
          <h1 className="text-3xl font-bold mb-2 mt-4">{selectedTest.title}</h1>
          <p className="text-muted-foreground">{selectedTest.subject}</p>
        </div>

        <div className="space-y-6">
          {selectedTest.questions.map((question: any, index: number) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                <CardDescription>{question.question}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options.map((option: string, optIndex: number) => (
                  <label
                    key={optIndex}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      answers[question.id] === optIndex
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      checked={answers[question.id] === optIndex}
                      onChange={() => setAnswers({ ...answers, [question.id]: optIndex })}
                      className="w-4 h-4"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          variant="gradient"
          className="w-full"
          disabled={Object.keys(answers).length !== selectedTest.questions.length}
        >
          Submit Test
        </Button>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default TakeTest;