import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const CreateTest = () => {
  const { user, isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  if (!isAuthenticated || user?.role !== 'staff') {
    return <Navigate to="/dashboard" />;
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now().toString(), question: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (qId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tests = JSON.parse(localStorage.getItem('studyhub_tests') || '[]');
    const newTest = {
      id: Date.now().toString(),
      title,
      subject,
      questions,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
    };
    
    tests.push(newTest);
    localStorage.setItem('studyhub_tests', JSON.stringify(tests));
    
    toast({
      title: "Test created!",
      description: "Your test has been successfully created.",
    });
    
    setTitle('');
    setSubject('');
    setQuestions([{ id: '1', question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Create Test</h1>
            <p className="text-muted-foreground">Design a new test for students</p>
          </div>
          <Link to="/tests/created">
            <Button variant="outline">View My Tests</Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Details</CardTitle>
              <CardDescription>Basic information about the test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Test Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Mid-term Math Test"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Mathematics"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {questions.map((q, qIndex) => (
            <Card key={q.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Question {qIndex + 1}</CardTitle>
                  {questions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(q.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Question</label>
                  <Input
                    value={q.question}
                    onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                    placeholder="Enter your question"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium">Options</label>
                  {q.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={q.correctAnswer === optIndex}
                        onChange={() => updateQuestion(q.id, 'correctAnswer', optIndex)}
                        className="w-4 h-4"
                      />
                      <Input
                        value={option}
                        onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                        placeholder={`Option ${optIndex + 1}`}
                        required
                      />
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground">
                    Select the radio button for the correct answer
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={addQuestion}>
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
            <Button type="submit" variant="gradient">
              Create Test
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateTest;