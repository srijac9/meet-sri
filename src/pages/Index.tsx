import { Link } from "react-router-dom";
import TornPaper from "@/components/TornPaper";
import NameTitle from "@/components/NameTitle";
import RotatingDisc from "@/components/RotatingDisc";
import FloatingHearts from "@/components/FloatingHearts";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Torn paper on the left */}
      <TornPaper />
      
      {/* Floating hearts decoration */}
      <FloatingHearts />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 px-8 py-12">
        {/* Left side - Name */}
        <div className="md:ml-32 lg:ml-40">
          <NameTitle />
        </div>
        
        {/* Right side - Rotating disc */}
        <div className="flex-shrink-0">
          <RotatingDisc />
        </div>
      </div>
      
      {/* Decorative tape strips */}
      <div 
        className="absolute top-8 left-1/4 w-24 h-6 bg-paper/30 transform -rotate-12"
        style={{ 
          background: 'linear-gradient(90deg, transparent, hsl(37 55% 86% / 0.4), transparent)',
        }}
      />
      <div 
        className="absolute bottom-12 right-1/4 w-20 h-5 bg-paper/30 transform rotate-6"
        style={{ 
          background: 'linear-gradient(90deg, transparent, hsl(37 55% 86% / 0.3), transparent)',
        }}
      />

      {/* Temporary quick link while building the projects page */}
      <Link
        to="/projects"
        className="absolute top-6 right-6 z-20 rounded-full border border-paper/40 bg-background/70 px-4 py-2 text-sm font-handwritten text-paper transition-colors hover:text-paper/80"
      >
        open projects
      </Link>
    </div>
  );
};

export default Index;
