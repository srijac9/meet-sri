import { useEffect, useRef, useState } from "react";
import aboutMeDiscPoster from "@/assets/about-me-disc-poster.png";
import aboutMeDiscVideo from "@/assets/about-me-disc.mp4";
import discPlayer from "@/assets/disc-player.png";

const REST_ANGLE = -15;
const ENGAGED_ANGLE = 15;
const DRAG_SLOPE_X = -0.22;
const DRAG_SLOPE_Y = -0.08;
const SHOW_TARGET_DEBUG = false;
const MIN_ARM_ANGLE = Math.min(REST_ANGLE, ENGAGED_ANGLE);
const MAX_ARM_ANGLE = Math.max(REST_ANGLE, ENGAGED_ANGLE);

// Invisible play zone for the record surface. Tweak these percentages if you move the disc.
const DISC_TARGET = {
  centerX: 38,
  centerY: 47.5,
  radius: 26,
} as const;

// Tonearm button placement within the square player stage.
const TONEARM_LAYOUT = {
  left: 57,
  top: 21,
  width: 34,
  height: (34 * 1112) / 722,
  pivotX: 80.6,
  pivotY: 15.1,
  tipX: 18.7,
  tipY: 88.6,
} as const;

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  startAngle: number;
  moved: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const getNeedleTip = (armAngle: number) => {
  const pivotX = TONEARM_LAYOUT.left + (TONEARM_LAYOUT.width * TONEARM_LAYOUT.pivotX) / 100;
  const pivotY = TONEARM_LAYOUT.top + (TONEARM_LAYOUT.height * TONEARM_LAYOUT.pivotY) / 100;
  const tipX = TONEARM_LAYOUT.left + (TONEARM_LAYOUT.width * TONEARM_LAYOUT.tipX) / 100;
  const tipY = TONEARM_LAYOUT.top + (TONEARM_LAYOUT.height * TONEARM_LAYOUT.tipY) / 100;

  const radians = toRadians(armAngle);
  const deltaX = tipX - pivotX;
  const deltaY = tipY - pivotY;

  return {
    x: pivotX + deltaX * Math.cos(radians) - deltaY * Math.sin(radians),
    y: pivotY + deltaX * Math.sin(radians) + deltaY * Math.cos(radians),
  };
};

const isNeedleOnDisc = (armAngle: number) => {
  const needleTip = getNeedleTip(armAngle);
  const dx = needleTip.x - DISC_TARGET.centerX;
  const dy = needleTip.y - DISC_TARGET.centerY;
  return Math.hypot(dx, dy) <= DISC_TARGET.radius;
};

interface AboutDiscPlayerProps {
  embedded?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const AboutDiscPlayer = ({ embedded = false, onPlayStateChange }: AboutDiscPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const [armAngle, setArmAngle] = useState(REST_ANGLE);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const isEngaged = hasInteracted && isNeedleOnDisc(armAngle);

  useEffect(() => {
    onPlayStateChange?.(isEngaged);
  }, [isEngaged, onPlayStateChange]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isEngaged) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          /* Ignore autoplay interruptions triggered by browser policies. */
        });
      }
      return;
    }

    video.pause();
    if (video.currentTime !== 0) {
      video.currentTime = 0;
    }
  }, [isEngaged]);

  const snapTonearm = (nextAngle: number) => {
    setArmAngle(isNeedleOnDisc(nextAngle) ? ENGAGED_ANGLE : REST_ANGLE);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setHasInteracted(true);

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startAngle: armAngle,
      moved: false,
    };

    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;
    const moved = Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3;

    if (moved && !dragState.moved) {
      dragStateRef.current = { ...dragState, moved: true };
    }

    setArmAngle(
      clamp(dragState.startAngle + deltaX * DRAG_SLOPE_X + deltaY * DRAG_SLOPE_Y, MIN_ARM_ANGLE, MAX_ARM_ANGLE),
    );
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);

    if (dragState.moved) {
      snapTonearm(armAngle);
    } else {
      setArmAngle((prev) => (isNeedleOnDisc(prev) ? REST_ANGLE : ENGAGED_ANGLE));
    }

    dragStateRef.current = null;
  };

  const handlePointerCancel = () => {
    dragStateRef.current = null;
    setIsDragging(false);
    snapTonearm(armAngle);
  };

  return (
    <div className="mx-auto w-full max-w-[30rem] sm:mx-0 sm:max-w-[30rem] lg:max-w-[40rem]">
      <div className="relative aspect-square w-full overflow-visible select-none">
        <div
          aria-hidden="true"
          className="absolute inset-[9%] rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(255,236,227,0.28) 0%, transparent 72%)" }}
        />

        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            src={aboutMeDiscVideo}
            poster={aboutMeDiscPoster}
            muted
            loop
            playsInline
            preload="auto"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${DISC_TARGET.centerX - DISC_TARGET.radius}%`,
              top: `${DISC_TARGET.centerY - DISC_TARGET.radius}%`,
              width: `${DISC_TARGET.radius * 2}%`,
              height: `${DISC_TARGET.radius * 2}%`,
              border: SHOW_TARGET_DEBUG ? "2px dashed rgba(255,255,255,0.45)" : "none",
              background: SHOW_TARGET_DEBUG ? "rgba(255,255,255,0.08)" : "transparent",
            }}
          />
        </div>

        <button
          type="button"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className="absolute z-20 touch-none cursor-grab bg-transparent p-0 active:cursor-grabbing"
          style={{
            aspectRatio: "722 / 1112",
            left: `${TONEARM_LAYOUT.left}%`,
            top: `${TONEARM_LAYOUT.top}%`,
            width: `${TONEARM_LAYOUT.width}%`,
            transform: `rotate(${armAngle}deg)`,
            transformOrigin: `${TONEARM_LAYOUT.pivotX}% ${TONEARM_LAYOUT.pivotY}%`,
            transition: isDragging ? "none" : "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          aria-label={isEngaged ? "Lift the needle off the disc" : "Place the needle onto the disc"}
          aria-pressed={isEngaged}
        >
          <img
            src={discPlayer}
            alt=""
            className="pointer-events-none absolute max-w-none select-none drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]"
            style={{
              width: "270.1%",
              left: "-146.9%",
              top: "-16.8%",
            }}
            draggable={false}
          />
        </button>

        {SHOW_TARGET_DEBUG ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper"
            style={{
              left: `${getNeedleTip(armAngle).x}%`,
              top: `${getNeedleTip(armAngle).y}%`,
            }}
          />
        ) : null}
      </div>

      <p
        className={`-mt-3 text-center font-typewriter text-[0.68rem] uppercase tracking-[0.22em] sm:-mt-4 sm:text-left ${
          embedded ? "text-paper/75" : "text-burgundy-dark/80"
        }`}
      >
        Drag the needle onto the disc to play it.
      </p>
    </div>
  );
};

export default AboutDiscPlayer;
