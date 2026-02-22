import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import MusicPlayerCard from "@/components/MusicPlayerCard";
import SubtleAudioBackdrop from "@/components/SubtleAudioBackdrop";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p9 from "@/assets/p9.jpg";
import p10 from "@/assets/p10.jpg";
import projectsHeader from "@/assets/projects-portfolio.png";
import favouriteSong from "@/assets/favourite-song.mp3";

const projectItems = [
  { title: "Portfolio Site", subtitle: "React - Tailwind", imageUrl: p1 },
  { title: "Photo Journal", subtitle: "Three.js - Shader", imageUrl: p2 },
  { title: "Music Visualizer", subtitle: "Canvas - Audio API", imageUrl: p3 },
  { title: "Task Flow", subtitle: "TypeScript - UX", imageUrl: p4 },
  { title: "Weather Board", subtitle: "API - Components", imageUrl: p5 },
  { title: "Campus Map", subtitle: "Data Viz - UI", imageUrl: p6 },
  { title: "Movie Finder", subtitle: "Search - Filters", imageUrl: p9 },
  { title: "Recipe Lab", subtitle: "State - Design", imageUrl: p10 },
];

const SONG_NAME = "Favorite Song";

const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const Projects = () => {
  const [playback, setPlayback] = useState({ currentTime: 0, duration: 0 });

  const handlePlaybackProgress = useCallback(
    ({ currentTime, duration }: { currentTime: number; duration: number }) => {
      setPlayback({ currentTime, duration });
    },
    []
  );

  const progress = useMemo(() => {
    if (!playback.duration) return 0;
    return Math.min(1, Math.max(0, playback.currentTime / playback.duration));
  }, [playback.currentTime, playback.duration]);

  const timeDisplay = useMemo(() => {
    if (!playback.duration) return "--:--";
    const remaining = playback.duration - playback.currentTime;
    return formatTime(remaining);
  }, [playback.currentTime, playback.duration]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <FloatingHearts />

      <div className="relative z-10 min-h-screen py-12">
        <Link
          to="/"
          className="absolute left-6 top-6 z-20 rounded-full border border-paper/30 bg-background/65 px-4 py-2 text-lg font-handwritten text-paper backdrop-blur-sm transition-colors hover:text-paper/80"
        >
          {"<"} back home
        </Link>

        <div className="mt-24 w-full px-4">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            <img
              src={projectsHeader}
              alt="Projects Portfolio"
              className="mt-20 block w-full max-w-[28rem] object-contain lg:justify-self-center"
              style={{ height: "auto" }}
            />
            <div className="relative lg:col-span-2">
              <SubtleAudioBackdrop
                src={favouriteSong}
                title=""
                subtitle=""
                onPlaybackProgress={handlePlaybackProgress}
                controlsClassName="sm:translate-x-8"
                autoStart={false}
                height={360}
              />
              <div className="pointer-events-none absolute -left-16 top-[42%] z-20 sm:-left-12">
                <p
                  className="max-w-[420px] text-center text-[24px] font-light leading-relaxed tracking-wider sm:text-[30px]"
                  style={{ color: "rgba(255, 255, 255, 0.94)" }}
                >
                  <span>Favourite song of</span>
                  <span className="block">the month</span>
                </p>
                <svg
                  className="absolute left-[90%] top-[88%] z-30 hidden h-[64px] w-[88px] -translate-y-1/2 -rotate-12 sm:block"
                  width="88"
                  height="64"
                  viewBox="0 0 88 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M9 9 C 12 27, 30 38, 60 42"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M49 35 L61 42 L47 49"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="pointer-events-none absolute inset-x-8 top-[67%] z-20 -translate-y-1/2 sm:inset-x-10">
                <div className="mx-auto w-[78%] max-w-[36rem] sm:translate-x-8">
                  <div className="mb-1 flex items-center justify-between gap-4">
                    <p
                      className="mb-1 text-[11px] font-light uppercase tracking-[0.4em] sm:text-xs"
                      style={{ color: "rgba(245, 230, 218, 0.74)" }}
                    >
                      {SONG_NAME}
                    </p>
                    <p
                      className="mb-1 text-[11px] font-light uppercase tracking-[0.4em] sm:text-xs"
                      style={{ color: "rgba(245, 230, 218, 0.74)" }}
                    >
                      {timeDisplay}
                    </p>
                  </div>
                  <div
                    className="relative h-[2px] w-full rounded-full"
                    style={{ backgroundColor: "rgba(245, 230, 218, 0.26)" }}
                  >
                    <div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{
                        width: `${progress * 100}%`,
                        backgroundColor: "rgba(245, 230, 218, 0.7)",
                      }}
                    />
                    <div
                      className="absolute top-1/2 h-2.5 w-2.5 rounded-full"
                      style={{
                        left: `${progress * 100}%`,
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(245, 230, 218, 0.9)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 w-full px-4">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectItems.map((project) => (
              <MusicPlayerCard
                key={project.title}
                title={project.title}
                subtitle={project.subtitle}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
