import { UserPlus, Calendar, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds and get instant access to all features.",
    step: "01",
  },
  {
    icon: Calendar,
    title: "Set Your Goals",
    description: "Define your study objectives and let us create a personalized plan.",
    step: "02",
  },
  {
    icon: Rocket,
    title: "Start Learning",
    description: "Follow your customized study plan and track your progress.",
    step: "03",
  },
  {
    icon: CheckCircle,
    title: "Achieve Success",
    description: "Reach your academic goals and celebrate your achievements.",
    step: "04",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            How StudyHub
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Works for You
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps and transform your study experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines - Hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-primary opacity-20" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative text-center space-y-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative inline-block">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <Icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm shadow-md">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
