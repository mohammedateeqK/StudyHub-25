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
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Everything You Need to
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Excel in Your Studies
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you study more effectively and achieve your academic goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center ${feature.color}`}>
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
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
