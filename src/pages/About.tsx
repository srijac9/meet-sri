import { Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";

const About = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 py-12">
        <Link 
          to="/" 
          className="absolute top-8 left-8 text-burgundy-dark hover:text-burgundy transition-colors font-handwritten text-xl"
        >
          ← back home
        </Link>
        
        <h1 className="font-display text-5xl md:text-7xl text-burgundy-dark mb-8">
          About Me
        </h1>
        
        <p className="text-foreground/80 text-xl font-handwritten text-center max-w-2xl">
          Coming soon... ✨
        </p>
      </div>
    </div>
  );
};

export default About;
