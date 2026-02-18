import { useEffect, useRef, useState } from "react";
import srijaLogo from "@/assets/srija-name.png";

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const progress = Math.min(Math.max(-rect.top / (sectionHeight * 0.5), 0), 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[150vh]" style={{ backgroundColor: "#0A0A0A" }}>
      <div
        className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden"
        style={{
          opacity: 1 - scrollProgress * 1.8,
          transform: `scale(${1 + scrollProgress * 0.15})`,
          filter: `blur(${scrollProgress * 12}px)`,
          willChange: "opacity, transform, filter",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="mb-8" style={{ transform: `translateY(${scrollProgress * -60}px)` }}>
          <img
            src={srijaLogo}
            alt="Srija"
            className="h-auto w-[220px] object-contain drop-shadow-[0_0_40px_rgba(169,68,66,0.15)] sm:w-[320px]"
          />
        </div>

        <p
          className="mb-1 text-[11px] font-light uppercase tracking-[0.4em] sm:text-xs"
          style={{
            color: "rgba(212, 184, 150, 0.6)",
            transform: `translateY(${scrollProgress * -30}px)`,
          }}
        >
          creative portfolio
        </p>

        <div
          className="mb-4 mt-3"
          style={{
            width: "30px",
            height: "1px",
            backgroundColor: "rgba(212, 184, 150, 0.2)",
            transform: `translateY(${scrollProgress * -25}px) scaleX(${1 - scrollProgress})`,
          }}
        />

        <p
          className="max-w-[240px] text-center text-[10px] font-light leading-relaxed tracking-wider sm:text-[11px]"
          style={{
            color: "rgba(212, 184, 150, 0.35)",
            transform: `translateY(${scrollProgress * -20}px)`,
          }}
        >
          art, music, and everything in between
        </p>

        <div
          className="absolute bottom-12 flex flex-col items-center gap-3"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 4) }}
        >
          <span className="text-[9px] font-light uppercase tracking-[0.35em]" style={{ color: "rgba(102, 102, 102, 0.7)" }}>
            scroll down
          </span>
          <div className="relative h-10 w-[1px] overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
            <div
              className="absolute left-0 top-0 w-full rounded-full"
              style={{
                height: "35%",
                backgroundColor: "rgba(212, 184, 150, 0.5)",
                animation: "scroll-line 2.2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
