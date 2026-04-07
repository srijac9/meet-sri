import { useEffect, useRef, useState } from "react";
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

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const FILM_STRIP_SCROLL_OVERSHOOT_UP = 0.45;
const FILM_STRIP_SCROLL_OVERSHOOT_DOWN = 0.3;

function getFilmStripMetrics(viewportWidth: number) {
  if (viewportWidth >= 1280) {
    return { expandedOffset: 0, collapsedOffset: -760, dragRange: 760 };
  }

  if (viewportWidth >= 1024) {
    return { expandedOffset: 0, collapsedOffset: -645, dragRange: 645 };
  }

  if (viewportWidth >= 768) {
    return { expandedOffset: 0, collapsedOffset: -500, dragRange: 500 };
  }

  if (viewportWidth >= 640) {
    return { expandedOffset: 0, collapsedOffset: -410, dragRange: 410 };
  }

  return { expandedOffset: 0, collapsedOffset: -330, dragRange: 330 };
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
              <div className="pointer-events-none flex flex-col items-start">
                <img
                  src={workTitle}
                  alt="Work"
                  className="relative z-10 w-[13.75rem] drop-shadow-[0_10px_24px_rgba(47,12,14,0.18)] md:w-[17rem] lg:w-[20rem]"
                  draggable={false}
                />
                <img
                  src={experienceTitle}
                  alt="Experience"
                  className="-mt-2.5 w-[28.5rem] max-w-none drop-shadow-[0_12px_28px_rgba(47,12,14,0.22)] md:-mt-3 md:w-[36rem] lg:-mt-3.5 lg:w-[41rem]"
                  draggable={false}
                />
              </div>
              <div className="relative -mt-4 flex w-[11rem] shrink-0 flex-col items-center self-end md:-mt-5 md:w-[15.5rem] lg:mr-3 lg:-mt-3 lg:w-[24rem] xl:w-[27.5rem]">
                <img
                  src={filmRoll}
                  alt="Film roll"
                  className="pointer-events-none relative z-[2] w-[11rem] object-contain drop-shadow-[0_14px_32px_rgba(47,12,14,0.22)] sm:w-[13rem] md:w-[15.5rem] lg:w-[24rem] xl:w-[27.5rem]"
                  draggable={false}
                />
                <div className="-mt-[2.2rem] h-[38rem] w-[25rem] max-w-none sm:-mt-[2.55rem] sm:h-[44rem] sm:w-[30rem] md:-mt-[3.45rem] md:h-[55rem] md:w-[38rem] lg:-mt-[5.55rem] lg:h-[82rem] lg:w-[60rem] xl:-mt-[6.45rem] xl:h-[94rem] xl:w-[69rem]">
                  <div className="flex h-full w-full justify-center overflow-hidden pb-[3rem] sm:pb-[3.5rem] md:pb-[4rem] lg:pb-[5rem] xl:pb-[5.5rem]">
                    <img
                      src={filmStrip}
                      alt="Film strip"
                      className={`relative z-[1] w-[39rem] max-w-none cursor-grab touch-none object-contain contrast-[1.08] active:cursor-grabbing sm:w-[47rem] md:w-[60rem] lg:w-[89rem] xl:w-[102rem] ${
                        isDraggingFilmStrip ? "cursor-grabbing" : ""
                      }`}
                      style={{
                        transform: `translateY(${filmStripTranslateY}px)`,
                        clipPath: "inset(0 4.5% 0 4.5%)",
                      }}
                      onPointerDown={(event) => {
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
                      }}
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default Experience;
