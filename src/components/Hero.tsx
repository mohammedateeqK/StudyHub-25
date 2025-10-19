import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-40">
      {/* background subtle grid + noise overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden>
        <svg className="absolute -top-10 left-1/2 -translate-x-1/2" width="960" height="600" viewBox="0 0 960 600">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your Learning Journey Starts Here</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9]">
              Transform Your
              <span className="relative block">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Study Experience</span>
                <span className="absolute inset-x-0 -bottom-2 h-3 bg-gradient-accent/40 blur-xl rounded-full" aria-hidden />
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Join thousands of students who are achieving their academic goals with StudyHub's 
              innovative learning platform. Study smarter, not harder.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="group text-lg px-8 py-4 shadow-glow hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-shadow">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 hover:shadow-md">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-12 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground font-medium">Active Students</div>
              </div>
              <div className="w-px h-16 bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary">4.9/5</div>
                <div className="text-sm text-muted-foreground font-medium">Average Rating</div>
              </div>
              <div className="w-px h-16 bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-accent">1M+</div>
                <div className="text-sm text-muted-foreground font-medium">Study Sessions</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <img
              src={heroImage}
              alt="Students studying together with StudyHub platform"
              className="relative rounded-2xl shadow-2xl w-full animate-float will-change-transform transition-transform duration-500 hover:rotate-1 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;
