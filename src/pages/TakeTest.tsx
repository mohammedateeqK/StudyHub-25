import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ClipboardList } from 'lucide-react';

const TakeTest = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const tests = JSON.parse(localStorage.getItem('studyhub_tests') || '[]');

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
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Take Test</h1>
            <p className="text-muted-foreground">Choose a test to begin</p>
          </div>

          {tests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tests.map((test: any) => (
                <Card key={test.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedTest(test)}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                        <ClipboardList className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div>
                        <CardTitle>{test.title}</CardTitle>
                        <CardDescription className="mt-1">{test.subject}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {test.questions.length} questions
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ClipboardList className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No tests available yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    );
  }

  return (
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
  );
};

export default TakeTest;