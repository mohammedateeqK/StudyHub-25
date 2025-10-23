import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import bgLogin from '@/assets/bg-login.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 relative">
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{ backgroundImage: `url(${bgLogin})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      {/* Left pane: logo and tagline */}
      <div className="hidden md:flex items-center justify-center relative z-10">
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

      {/* Right pane: gradient bg with form */}
      <div className="relative flex items-center justify-center z-10">
        {/* Back arrow */}
        <Link to="/" className="absolute top-6 left-6 p-2 rounded-full bg-white/70 hover:bg-white transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>

        <div className="w-full max-w-xl px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">WELCOME BACK!</h2>
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl tracking-wide">SIGN IN</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email ID :</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">Password :</label>
                  <Input
                    id="password"
                    type="password"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-12 rounded-full text-base" variant="secondary">
                  Sign In
                </Button>
                <div className="text-center">
                  <button type="button" className="text-primary font-semibold text-sm hover:underline">Forgot password?</button>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;