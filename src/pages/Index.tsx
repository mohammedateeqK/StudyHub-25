import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import bgMesh from "@/assets/bg-mesh.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-page relative">
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{ backgroundImage: `url(${bgMesh})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
