import { BookOpen, Users, Trophy, Clock, Target, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Smart Study Plans",
    description: "Personalized study schedules that adapt to your learning pace and goals.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Connect with study groups and peers to enhance your learning experience.",
    color: "text-secondary",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Monitor your achievements and celebrate milestones along your journey.",
    color: "text-accent",
  },
  {
    icon: Clock,
    title: "Time Management",
    description: "Optimize your study time with built-in productivity tools and reminders.",
    color: "text-primary",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Set clear objectives and track your progress towards academic success.",
    color: "text-secondary",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get personalized recommendations and insights to improve your study habits.",
    color: "text-accent",
  },
];

const Features = () => {
  return (
    <section id="features" className="scroll-mt-24 py-24 md:py-28 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <h2 className="text-5xl lg:text-6xl font-bold">
            Everything You Need to
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Excel in Your Studies
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Powerful features designed to help you study more effectively and achieve your academic goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 space-y-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center ${feature.color}`}>
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
