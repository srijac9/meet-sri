import { useCallback, useEffect, useRef, useState } from "react";
import RotatingDisc from "@/components/RotatingDisc";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import SectionReveal from "@/components/SectionReveal";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Photos from "./Photos";

const SECTION_IDS = {
  about: "about-section",
  projects: "projects-section",
  experience: "experience-section",
  photos: "photos-section",
} as const;

const ONE_PAGE_BACKGROUND =
  "linear-gradient(180deg, #7a1410 0%, #71110e 42%, #68100d 100%)";
const DISC_SECTION_HEIGHT_CLASS = "h-[132vh] md:h-[120vh] lg:h-[110vh]";
const DISC_ANIMATION_START_FRACTION = 0.14;
const DISC_ANIMATION_RANGE_FRACTION = 0.36;

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [discScrollProgress, setDiscScrollProgress] = useState(0);
  const [experienceFilmOffset, setExperienceFilmOffset] = useState(0);
  const discSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!discSectionRef.current) return;
      const rect = discSectionRef.current.getBoundingClientRect();
      const sectionHeight = discSectionRef.current.offsetHeight;
      const scrollOffset = Math.max(-rect.top, 0);
      const animationStart = sectionHeight * DISC_ANIMATION_START_FRACTION;
      const animationRange = sectionHeight * DISC_ANIMATION_RANGE_FRACTION;
      const progress = Math.min(
        Math.max((scrollOffset - animationStart) / animationRange, 0),
        1,
      );
      setDiscScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSectionSelect = useCallback((section: keyof typeof SECTION_IDS) => {
    const element = document.getElementById(SECTION_IDS[section]);
    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <div className="bg-background">
      <HeroSection />

      <PageEdgeShadow
        className="relative w-full"
        style={{ background: ONE_PAGE_BACKGROUND }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            background: [
              "radial-gradient(ellipse at center, transparent 40%, rgba(61,8,8,0.42) 100%)",
              "linear-gradient(180deg, rgba(20,4,5,0.12) 0%, rgba(20,4,5,0) 16%, rgba(20,4,5,0) 84%, rgba(20,4,5,0.16) 100%)",
              "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 28%)",
            ].join(", "),
          }}
        />

        <div className="relative z-10">
          <main
            ref={discSectionRef}
            className={`relative overflow-hidden ${DISC_SECTION_HEIGHT_CLASS}`}
          >
            <div
              className="sticky top-0 z-20 flex h-screen flex-col items-center justify-start gap-10 px-4 pb-16 pt-60 sm:gap-12 sm:pt-64 md:pt-72 lg:justify-center"
              style={{
                opacity: 1 - discScrollProgress * 1.65,
                transform: `scale(${1 + discScrollProgress * 0.12})`,
                filter: `blur(${discScrollProgress * 11}px)`,
                willChange: "opacity, transform, filter",
              }}
            >
              <div style={{ transform: `translateY(${discScrollProgress * -42}px)` }}>
                <RotatingDisc isPlaying={isPlaying} onSectionSelect={handleSectionSelect} />
              </div>
              <div style={{ transform: `translateY(${discScrollProgress * -18}px)` }}>
                <MusicPlayer isPlaying={isPlaying} onToggle={togglePlay} />
              </div>
            </div>

          </main>

          <div className="relative space-y-40 overflow-x-clip md:space-y-52">
            <SectionReveal id={SECTION_IDS.about}>
              <About embedded />
            </SectionReveal>

            <SectionReveal id={SECTION_IDS.projects} delayMs={80}>
              <Projects embedded />
            </SectionReveal>

            <SectionReveal id={SECTION_IDS.experience} delayMs={120}>
              <Experience
                embedded
                onFilmStripOffsetChange={setExperienceFilmOffset}
              />
            </SectionReveal>

            <SectionReveal
              id={SECTION_IDS.photos}
              delayMs={160}
              style={{ marginTop: `${experienceFilmOffset}px` }}
            >
              <Photos embedded />
            </SectionReveal>
          </div>
        </div>
      </PageEdgeShadow>
    </div>
  );
};

export default Index;
