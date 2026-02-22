import { Link } from "react-router-dom";
import TornPaper from "@/components/TornPaper";
import NameTitle from "@/components/NameTitle";
import { useCallback, useState } from "react";
import RotatingDisc from "@/components/RotatingDisc";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <div className="bg-background">
      <HeroSection />

      <main
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, #7d1010 0%, #6e1414 45%, #5c0f10 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(61,8,8,0.45) 100%)",
          }}
        />

        <div className="relative z-20 flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-14 sm:gap-8">
          <RotatingDisc isPlaying={isPlaying} onToggle={togglePlay} />
          <MusicPlayer isPlaying={isPlaying} onToggle={togglePlay} />
        </div>
      </main>
    </div>
  );
};

export default Index;
