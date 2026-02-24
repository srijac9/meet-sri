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
  {
    title: "Portfolio Site",
    subtitle: "React - Tailwind",
    description:
      "A responsive landing page with smooth scroll animations and a dreamy visual direction.",
    imageUrl: p1,
    hasVideo: true,
    liveUrl: "#",
  },
  {
    title: "Photo Journal",
    subtitle: "Three.js - Shader",
    description:
      "An interactive gallery experiment with depth, motion, and custom visual effects.",
    imageUrl: p2,
    hasVideo: true,
    liveUrl: "#",
  },
  {
    title: "Music Visualizer",
    subtitle: "Canvas - Audio API",
    description:
      "A generative audio-reactive canvas that transforms sound into animated scenes.",
    imageUrl: p3,
    hasVideo: false,
    liveUrl: "#",
  },
  {
    title: "Task Flow",
    subtitle: "TypeScript - UX",
    description:
      "A clean productivity interface focused on flow, organization, and accessible interactions.",
    imageUrl: p4,
    hasVideo: true,
    liveUrl: "#",
  },
  {
    title: "Weather Board",
    subtitle: "API - Components",
    description:
      "A modular weather dashboard with component-driven layouts and quick city switching.",
    imageUrl: p5,
    hasVideo: false,
    liveUrl: "#",
  },
  {
    title: "Campus Map",
    subtitle: "Data Viz - UI",
    description:
      "A map-based campus explorer with layered data views and easy route highlighting.",
    imageUrl: p6,
    hasVideo: true,
    liveUrl: "#",
  },
  {
    title: "Movie Finder",
    subtitle: "Search - Filters",
    description:
      "A discovery app with fast search, smart filtering, and polished recommendation cards.",
    imageUrl: p9,
    hasVideo: true,
    liveUrl: "#",
  },
  {
    title: "Recipe Lab",
    subtitle: "State - Design",
    description:
      "A playful recipe experience blending state-driven flows with warm visual styling.",
    imageUrl: p10,
    hasVideo: false,
    liveUrl: "#",
  },
];

const TRACK_TITLE = "Voices of Eternity";
const ARTIST_NAME = "Yuri Megis";
const LICENSE_NAME = "Licensing: CC BY 4.0";
const LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/";
const NO_CHANGES_NOTE = "No changes made";
const COPYRIGHT_NOTICE = "Copyright: © Yuri Megis";
const DISCLAIMER_NOTICE = "Disclaimer: No warranties given.";
const SOURCE_LABEL = "Source material";
const SOURCE_URL = "https://freemusicarchive.org/music/ura-megis/single/voices-of-eternity-3/";

const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const Projects = () => {
  const [playback, setPlayback] = useState({ currentTime: 0, duration: 0 });
  const [activeFilter, setActiveFilter] = useState("all");

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

  const filters = useMemo(
    () => ["all", ...Array.from(new Set(projectItems.map((item) => item.subtitle.split(" - ")[0])))],
    []
  );

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projectItems
        : projectItems.filter((item) => item.subtitle.startsWith(activeFilter)),
    [activeFilter]
  );

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #4b090f 0%, #5a0d13 34%, var(--background) 72%, var(--background) 100%)",
      }}
    >
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
              <div className="pointer-events-none absolute -left-20 top-[42%] z-20 sm:-left-12">
                <p
                  className="max-w-[420px] text-center text-[24px] font-light leading-relaxed tracking-wider sm:text-[30px]"
                  style={{ color: "rgba(255, 255, 255, 0.94)" }}
                >
                  <span>Cool song find</span>
                  <span className="block">of the month</span>
                </p>
                <svg
                  className="absolute left-[110%] top-[86%] z-30 hidden h-[64px] w-[88px] -translate-y-1/2 -rotate-12 sm:block"
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
                    <div className="flex flex-col">
                      <p
                        className="mb-1 text-[12px] font-light uppercase tracking-[0.4em] sm:text-[13px]"
                        style={{ color: "rgba(245, 230, 218, 0.74)" }}
                      >
                        {TRACK_TITLE}
                      </p>
                      <p
                        className="text-[11px] font-light tracking-[0.2em] sm:text-[12px]"
                        style={{ color: "rgba(245, 230, 218, 0.72)" }}
                      >
                        {ARTIST_NAME}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p
                        className="mb-1 text-[12px] font-light uppercase tracking-[0.4em] sm:text-[13px]"
                        style={{ color: "rgba(245, 230, 218, 0.74)" }}
                      >
                        {timeDisplay}
                      </p>
                    </div>
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
                  <div className="mt-2 flex justify-end">
                    <div className="flex flex-col items-end gap-0.5">
                      <div className="flex items-center gap-2">
                        <a
                          href={LICENSE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto text-[14px] underline underline-offset-2 transition-opacity hover:opacity-80 sm:text-[15px]"
                          style={{ color: "rgba(245, 230, 218, 0.82)" }}
                        >
                          {LICENSE_NAME}
                        </a>
                        <p
                          className="text-[13px] sm:text-[14px]"
                          style={{ color: "rgba(245, 230, 218, 0.72)" }}
                        >
                          {NO_CHANGES_NOTE}
                        </p>
                        <p
                          className="text-[13px] sm:text-[14px]"
                          style={{ color: "rgba(245, 230, 218, 0.68)" }}
                        >
                          {DISCLAIMER_NOTICE}
                        </p>
                        <a
                          href={SOURCE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto text-[13px] underline underline-offset-2 transition-opacity hover:opacity-80 sm:text-[14px]"
                          style={{ color: "rgba(245, 230, 218, 0.82)" }}
                        >
                          {SOURCE_LABEL}
                        </a>
                      </div>
                      <p
                        className="text-[12px] sm:text-[13px]"
                        style={{ color: "rgba(245, 230, 218, 0.72)" }}
                      >
                        {COPYRIGHT_NOTICE}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 w-full px-4">
          <div className="w-full">
            <div
              className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-paper/35 to-transparent"
              aria-hidden="true"
            />
            <nav
              className="mb-6 flex flex-wrap gap-2 sm:pl-[max(0px,calc((((100%-1.5rem)/2)-24rem)/2))] lg:pl-[max(0px,calc((((100%-4.5rem)/4)-24rem)/2))]"
              aria-label="Project filters"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-1.5 font-handwritten text-base transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-[#6b1e28] text-[#f5e6d3] shadow-md"
                      : "bg-[#f5e6d3]/10 text-[#c4a882] hover:bg-[#f5e6d3]/20 hover:text-[#f5e6d3]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </nav>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProjects.map((project) => (
                <MusicPlayerCard
                  key={project.title}
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  hasVideo={project.hasVideo}
                  liveUrl={project.liveUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

