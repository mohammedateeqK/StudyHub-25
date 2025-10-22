import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section id="pricing" className="scroll-mt-24 py-24 md:py-28 lg:py-32 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-base font-medium text-white">Limited Time Offer</span>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-bold text-white leading-[0.9]">
            Access Quality Notes &
            <span className="block">Ace Your Tests</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Get comprehensive study notes and practice with expertly crafted tests. 
            Everything you need to excel in your academics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <Link to="/signup">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white hover:bg-white/90 text-primary shadow-xl group text-lg px-10 py-5"
              >
                Get Notes & Tests
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <p className="text-base text-white/80">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </div>
      
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
    </section>
  );
};

export default CTA;
