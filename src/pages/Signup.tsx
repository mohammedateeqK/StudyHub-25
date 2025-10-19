import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Users, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'staff' | 'student'>('student');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await signup(email, password, name, role);
    
    if (success) {
      toast({
        title: "Account created!",
        description: "Welcome to StudyHub.",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Signup failed",
        description: "Email already exists.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left branding */}
      <div className="hidden md:flex items-center justify-center">
        <div className="max-w-lg px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">STUDYHUB</h1>
          </div>
          <p className="text-2xl font-bold leading-snug text-primary">IMPROVING LEARNING FOR A<br/>BETTER FUTURE</p>
        </div>
      </div>

      {/* Right: form */}
      <div className="relative flex items-center justify-center bg-gradient-primary/20">
        {/* Back arrow */}
        <Link to="/" className="absolute top-6 left-6 p-2 rounded-full bg-white/70 hover:bg-white transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <div className="w-full max-w-xl px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">JOIN STUDYHUB</h2>
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl tracking-wide">CREATE ACCOUNT</CardTitle>
              <CardDescription>Create your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">I am a</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setRole('student')} className={`p-4 rounded-lg border-2 transition-all ${role === 'student' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <GraduationCap className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Student</p>
                    </button>
                    <button type="button" onClick={() => setRole('staff')} className={`p-4 rounded-lg border-2 transition-all ${role === 'staff' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Staff</p>
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 rounded-full text-base" variant="secondary">Create Account</Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;