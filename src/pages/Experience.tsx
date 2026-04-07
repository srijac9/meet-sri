import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import experienceTitle from "@/assets/experience-title.png";
import filmRoll from "@/assets/film-roll.png";
import filmStrip from "@/assets/film-strip.png";
import workTitle from "@/assets/work-title.png";

interface ExperienceProps {
  embedded?: boolean;
  onFilmStripOffsetChange?: (offset: number) => void;
}

interface ExperienceEntry {
  period: string;
  role: string;
  organization: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const FILM_STRIP_SCROLL_OVERSHOOT_UP = 0.45;
const FILM_STRIP_SCROLL_OVERSHOOT_DOWN = 0.3;

const experienceEntries: ExperienceEntry[] = [
  {
    period: "Jan '26 - Present",
    role: "Full Stack Developer Intern",
    organization: "Mission Perform Inc",
    summary:
      "Built and deployed full-stack features, backend automation services, and cross-system synchronization workflows for web applications and internal data operations.",
    highlights: [
      "Architected and deployed full-stack features for web applications using JavaScript, React, Node.js, and MongoDB",
      "Designed an automated SharePoint data synchronization pipeline using AWS Lambda and EventBridge Scheduler to eliminate manual entry processes",
      "Developed backend services deployed on AWS EC2 to support scheduled automation tasks and API-driven data synchronization",
    ],
    technologies: ["JavaScript", "React", "Node.js", "MongoDB", "AWS Lambda", "AWS EC2"],
  },
  {
    period: "May '25 - Aug '25",
    role: "Business Automation Intern",
    organization: "Trexo Robotics",
    summary:
      "Worked across data, reporting, and automation initiatives to streamline internal operations, support decision-making, and deliver scalable workflow improvements.",
    highlights: [
      "Extracted, manipulated, and analyzed large datasets using SQL and AWS Athena, then built a key partner dashboard in Amazon QuickSight",
      "Automated 10+ workflows across multiple teams using JavaScript, Python, and Zapier to reduce manual effort and standardize operations",
      "Drove end-to-end execution of a major automation initiative, aligning cross-functional teams and timelines to improve operational efficiency",
    ],
    technologies: ["SQL", "AWS Athena", "QuickSight", "JavaScript", "Python", "Zapier"],
  },
  {
    period: "Sept '22 - June '24",
    role: "Assistant Teacher",
    organization: "Spirit of Math Schools",
    summary:
      "Supported elementary students in developing problem-solving skills through twice-weekly math instruction, homework help, and a safe, encouraging learning environment.",
    highlights: [
      "Guided 90+ students in grades one to four through quick drills, lessons, and homework support",
      "Collaborated with parents to track student progress, discuss challenges, and suggest strategies for improvement at home",
    ],
    technologies: [],
  },
];

function ExperienceEntryCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <article className="group flex items-stretch gap-3 overflow-hidden rounded-[1.4rem] px-5 py-4.5 transition-[transform] duration-300 hover:-translate-y-0.5 sm:gap-4 sm:px-6 sm:py-5">
      <div className="relative flex w-4 shrink-0 justify-center">
        <div className="absolute left-1/2 top-6 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-paper/45 bg-[#f1dcc0] transition-all duration-300 group-hover:scale-110 group-hover:border-paper/80 group-hover:bg-paper group-hover:shadow-[0_0_0_7px_rgba(241,220,192,0.14),0_0_20px_rgba(241,220,192,0.28)]" />
        <div className="absolute bottom-1 left-1/2 top-[2.25rem] w-px -translate-x-1/2 bg-paper/60 transition-colors duration-300 group-hover:bg-paper/90" />
      </div>

      <div className="min-w-0 max-w-[46rem] sm:max-w-[50rem]">
        <h3 className="mt-1.5 font-typewriter text-[1.18rem] leading-[1.02] text-paper sm:text-[1.38rem]">
          {entry.role}
        </h3>
        <div className="mt-1.5 flex items-baseline justify-between gap-4">
          <p className="font-typewriter text-[0.84rem] text-paper/82 sm:text-[0.92rem]">
            {entry.organization}
          </p>
          <p className="shrink-0 text-right font-typewriter text-[0.72rem] uppercase tracking-[0.22em] text-paper/72 sm:text-[0.78rem]">
            {entry.period}
          </p>
        </div>
        <p className="mt-3 max-w-[45rem] font-typewriter text-[0.84rem] leading-[1.5] text-paper/70 sm:max-w-[49rem] sm:text-[0.9rem]">
          {entry.summary}
        </p>

        <div className="mt-4">
          <ul className="space-y-1.5">
            {entry.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 font-typewriter text-[0.82rem] leading-[1.42] text-paper/70 sm:text-[0.88rem]"
              >
                <span className="mt-[0.38rem] inline-block h-2 w-2 shrink-0 rounded-full border border-paper/45 bg-transparent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {entry.technologies.length > 0 ? (
          <div className="mt-4">
            <h4 className="font-typewriter text-[0.94rem] text-paper sm:text-[1.02rem]">
              Technologies
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-paper/18 bg-[#381010]/28 px-3 py-1.5 font-typewriter text-[0.74rem] uppercase tracking-[0.16em] text-paper/78 sm:text-[0.78rem]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function getFilmStripMetrics(viewportWidth: number) {
  if (viewportWidth >= 1280) {
    return { expandedOffset: 0, collapsedOffset: -800, dragRange: 800 };
  }

  if (viewportWidth >= 1024) {
    return { expandedOffset: 0, collapsedOffset: -680, dragRange: 680 };
  }

  if (viewportWidth >= 768) {
    return { expandedOffset: 0, collapsedOffset: -530, dragRange: 530 };
  }

  if (viewportWidth >= 640) {
    return { expandedOffset: 0, collapsedOffset: -435, dragRange: 435 };
  }

  return { expandedOffset: 0, collapsedOffset: -350, dragRange: 350 };
}

function getFilmStripAutoScrollDelta(pointerY: number, viewportHeight: number) {
  const edgeThreshold = Math.min(140, viewportHeight * 0.18);
  const maxStep = 22;

  if (pointerY < edgeThreshold) {
    const intensity = (edgeThreshold - pointerY) / edgeThreshold;
    return -Math.ceil(intensity * maxStep);
  }

  if (pointerY > viewportHeight - edgeThreshold) {
    const intensity = (pointerY - (viewportHeight - edgeThreshold)) / edgeThreshold;
    return Math.ceil(intensity * maxStep);
  }

  return 0;
}

const Experience = ({
  embedded = false,
  onFilmStripOffsetChange,
}: ExperienceProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const Shell = embedded ? "div" : PageEdgeShadow;
  const [filmPull, setFilmPull] = useState(1);
  const [isDraggingFilmStrip, setIsDraggingFilmStrip] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );
  const filmDragRef = useRef({ pointerId: -1, startPageY: 0, startPull: 1 });
  const latestPointerClientYRef = useRef(0);
  const autoScrollFrameRef = useRef<number | null>(null);
  const latestFilmPullRef = useRef(filmPull);
  const latestFilmPullRawRef = useRef(filmPull);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    latestFilmPullRef.current = filmPull;
  }, [filmPull]);

  const getExperienceSectionTop = () => {
    if (!embedded) {
      return null;
    }

    const section = rootRef.current?.closest("section");
    if (!section) {
      return null;
    }

    return section.getBoundingClientRect().top + window.scrollY;
  };

  useEffect(() => {
    if (!isDraggingFilmStrip) {
      return undefined;
    }

    const updateFilmPullFromClientY = (clientY: number) => {
      const { dragRange } = getFilmStripMetrics(viewportWidth);
      const currentPageY = clientY + window.scrollY;
      const rawPull =
        filmDragRef.current.startPull +
          (currentPageY - filmDragRef.current.startPageY) / dragRange;
      const nextPull = clamp(rawPull, 0, 1);

      latestFilmPullRawRef.current = rawPull;
      latestFilmPullRef.current = nextPull;
      setFilmPull(nextPull);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== filmDragRef.current.pointerId) {
        return;
      }

      latestPointerClientYRef.current = event.clientY;
      updateFilmPullFromClientY(event.clientY);
    };

    const stopDragging = (event: PointerEvent) => {
      if (event.pointerId !== filmDragRef.current.pointerId) {
        return;
      }

      setIsDraggingFilmStrip(false);
      filmDragRef.current.pointerId = -1;
      latestPointerClientYRef.current = 0;
      if (autoScrollFrameRef.current !== null) {
        window.cancelAnimationFrame(autoScrollFrameRef.current);
        autoScrollFrameRef.current = null;
      }
    };

    const stepAutoScroll = () => {
      const scrollDelta = getFilmStripAutoScrollDelta(
        latestPointerClientYRef.current,
        window.innerHeight,
      );

      if (scrollDelta !== 0) {
        const currentRawPull = latestFilmPullRawRef.current;
        const currentPull = latestFilmPullRef.current;
        const experienceSectionTop = getExperienceSectionTop();
        const isAtUpperLimit =
          scrollDelta < 0 &&
          (currentPull <= 0 && experienceSectionTop !== null
            ? window.scrollY <= experienceSectionTop
            : currentRawPull <= -FILM_STRIP_SCROLL_OVERSHOOT_UP);
        const isAtLowerLimit =
          scrollDelta > 0 && currentRawPull >= 1 + FILM_STRIP_SCROLL_OVERSHOOT_DOWN;

        if (isAtUpperLimit || isAtLowerLimit) {
          autoScrollFrameRef.current = window.requestAnimationFrame(stepAutoScroll);
          return;
        }

        const maxScrollY =
          document.documentElement.scrollHeight - window.innerHeight;
        let nextScrollY = clamp(window.scrollY + scrollDelta, 0, maxScrollY);

        if (scrollDelta < 0 && currentPull <= 0 && experienceSectionTop !== null) {
          nextScrollY = Math.max(nextScrollY, experienceSectionTop);
        }

        if (nextScrollY !== window.scrollY) {
          window.scrollTo({ top: nextScrollY });
          updateFilmPullFromClientY(latestPointerClientYRef.current);
        }
      }

      autoScrollFrameRef.current = window.requestAnimationFrame(stepAutoScroll);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
    autoScrollFrameRef.current = window.requestAnimationFrame(stepAutoScroll);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
      if (autoScrollFrameRef.current !== null) {
        window.cancelAnimationFrame(autoScrollFrameRef.current);
        autoScrollFrameRef.current = null;
      }
    };
  }, [isDraggingFilmStrip, viewportWidth]);

  const { collapsedOffset, expandedOffset } = getFilmStripMetrics(viewportWidth);
  const filmStripTranslateY =
    collapsedOffset + (expandedOffset - collapsedOffset) * filmPull;

  const handleFilmStripPointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    latestPointerClientYRef.current = event.clientY;
    latestFilmPullRawRef.current = filmPull;
    latestFilmPullRef.current = filmPull;
    filmDragRef.current = {
      pointerId: event.pointerId,
      startPageY: event.clientY + window.scrollY,
      startPull: filmPull,
    };
    setIsDraggingFilmStrip(true);
  };

  useEffect(() => {
    onFilmStripOffsetChange?.(filmStripTranslateY);
  }, [filmStripTranslateY, onFilmStripOffsetChange]);

  return (
    <div
      ref={rootRef}
      className={`relative overflow-x-clip ${embedded ? "bg-transparent" : "bg-[#efe2c7]"}`}
    >
      <Shell
        className={`relative z-10 w-full ${embedded ? "" : "mx-auto max-w-[1380px]"}`}
      >
        {!embedded ? (
          <div className="absolute inset-x-0 top-6 z-20 px-6 md:px-12 lg:px-16">
            <Link
              to="/"
              className="ml-5 mt-2 inline-flex rounded-full border border-burgundy-dark/30 bg-paper/75 px-4 py-2 text-lg font-handwritten text-burgundy-dark backdrop-blur-sm transition-colors hover:text-burgundy"
            >
              {"<"} back home
            </Link>
          </div>
        ) : null}

        <div className={`px-6 pb-16 md:px-12 lg:px-16 ${embedded ? "pt-16 md:pt-20" : "pt-24"}`}>
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8 flex flex-col gap-6 text-left md:mb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
              <div className="relative flex min-w-0 flex-1 flex-col items-start lg:min-h-[82rem] xl:min-h-[92rem]">
                <div className="pointer-events-none relative z-20 flex flex-col items-start">
                  <img
                    src={workTitle}
                    alt="Work"
                    className="relative z-10 w-[13.75rem] md:w-[17rem] lg:w-[20rem]"
                    draggable={false}
                  />
                  <img
                    src={experienceTitle}
                    alt="Experience"
                    className="-mt-2.5 w-[28.5rem] max-w-none md:-mt-3 md:w-[36rem] lg:-mt-3.5 lg:w-[41rem]"
                    draggable={false}
                  />
                </div>

                <div className="pointer-events-auto hidden w-full overflow-hidden lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-[19.25rem] lg:block xl:top-[20.5rem]">
                  <div
                    className="absolute inset-x-0 top-0 flex flex-col gap-8 will-change-transform xl:gap-10"
                    style={{ transform: `translateY(${filmStripTranslateY}px)` }}
                  >
                    {experienceEntries.map((entry) => (
                      <div key={entry.period} className="w-full max-w-[46rem] xl:max-w-[50rem]">
                        <ExperienceEntryCard entry={entry} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative -mt-4 flex w-[11rem] shrink-0 flex-col items-center self-end md:-mt-5 md:w-[15.5rem] lg:mr-3 lg:-mt-3 lg:w-[24rem] xl:w-[27.5rem]">
                <img
                  src={filmRoll}
                  alt="Film roll"
                  className="pointer-events-none relative z-[2] w-[11rem] object-contain drop-shadow-[0_14px_32px_rgba(47,12,14,0.22)] sm:w-[13rem] md:w-[15.5rem] lg:w-[24rem] xl:w-[27.5rem]"
                  draggable={false}
                />
                <div className="-mt-[2.2rem] h-[38rem] w-[25rem] max-w-none sm:-mt-[2.55rem] sm:h-[44rem] sm:w-[30rem] md:-mt-[3.45rem] md:h-[55rem] md:w-[38rem] lg:-mt-[5.55rem] lg:h-[82rem] lg:w-[60rem] xl:-mt-[6.45rem] xl:h-[94rem] xl:w-[69rem]">
                  <div className="relative flex h-full w-full justify-center overflow-hidden pb-[3rem] sm:pb-[3.5rem] md:pb-[4rem] lg:pb-[5rem] xl:pb-[5.5rem]">
                    <img
                      src={filmStrip}
                      alt="Film strip"
                      className="pointer-events-none relative z-[1] w-[39rem] max-w-none object-contain contrast-[1.08] sm:w-[47rem] md:w-[60rem] lg:w-[89rem] xl:w-[102rem]"
                      style={{
                        transform: `translateY(${filmStripTranslateY}px)`,
                        clipPath: "inset(0 4.5% 0 4.5%)",
                      }}
                      draggable={false}
                    />
                    <button
                      type="button"
                      aria-label="Drag film strip"
                      className={`absolute left-1/2 top-0 z-[2] w-[5.6rem] cursor-grab touch-none bg-transparent sm:w-[6.6rem] md:w-[8rem] lg:w-[11.5rem] xl:w-[13rem] ${
                        isDraggingFilmStrip ? "cursor-grabbing" : ""
                      }`}
                      style={{
                        bottom:
                          viewportWidth >= 1280
                            ? "5.5rem"
                            : viewportWidth >= 1024
                              ? "5rem"
                              : viewportWidth >= 768
                                ? "4rem"
                                : viewportWidth >= 640
                                  ? "3.5rem"
                                  : "3rem",
                        transform: `translate(-50%, ${filmStripTranslateY}px)`,
                      }}
                      onPointerDown={handleFilmStripPointerDown}
                    />
                  </div>
                </div>
                <p
                  className="-mt-3 text-center font-typewriter text-[0.66rem] uppercase tracking-[0.32em] text-paper/82 will-change-transform sm:-mt-3.5 sm:text-[0.72rem] md:-mt-4 md:text-[0.76rem]"
                  style={{ transform: `translateY(${filmStripTranslateY}px)` }}
                >
                  pull up/down the strip!
                </p>
              </div>
            </div>

            <div className="space-y-6 lg:hidden">
              {experienceEntries.map((entry) => (
                <ExperienceEntryCard key={entry.period} entry={entry} />
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default Experience;
