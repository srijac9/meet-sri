import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import photosCollage from "@/assets/photos-collage.png";
import aboutCollage from "@/assets/about-collage.png";
import discCollage from "@/assets/disc-collage.svg";
import projectsTitle from "@/assets/projects.png";
import experienceTitle from "@/assets/experience.png";
import photosTitle from "@/assets/photos-title.png";
import aboutTitle from "@/assets/about-title.png";

interface RotatingDiscProps {
  isPlaying: boolean;
}

const RotatingDisc = ({ isPlaying }: RotatingDiscProps) => {
  const navigate = useNavigate();
  const [discRotation, setDiscRotation] = useState(0);
  const [isSettlingToPause, setIsSettlingToPause] = useState(false);
  const rotationRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasPlayedRef = useRef(false);
  const projectsBaseTransform = "scale(1.20)";
  const projectsHoverTransform = "scale(1.30)";
  const experienceBaseTransform = "scale(2.20)";
  const experienceHoverTransform = "scale(2.375)";
  const photosBaseTransform = "translateY(5.5rem) scale(1.35)";
  const photosHoverTransform = "translateY(5.9rem) scale(1.45)";
  const cornerTextSharedStyles = {
    textShadow: "0 2px 8px rgba(0,0,0,0.7)",
  } as const;

  useEffect(() => {
    const clearRaf = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const clearSettleTimeout = () => {
      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current);
        settleTimeoutRef.current = null;
      }
    };

    clearRaf();
    clearSettleTimeout();
    lastFrameTimeRef.current = null;

    if (isPlaying) {
      hasPlayedRef.current = true;
      setIsSettlingToPause(false);

      const spin = (timestamp: number) => {
        if (lastFrameTimeRef.current === null) {
          lastFrameTimeRef.current = timestamp;
        }

        const deltaSeconds = (timestamp - lastFrameTimeRef.current) / 1000;
        lastFrameTimeRef.current = timestamp;

        rotationRef.current = (rotationRef.current + deltaSeconds * 18) % 360;
        setDiscRotation(rotationRef.current);
        rafRef.current = requestAnimationFrame(spin);
      };

      rafRef.current = requestAnimationFrame(spin);

      return () => {
        clearRaf();
        clearSettleTimeout();
      };
    }

    if (hasPlayedRef.current) {
      const current = rotationRef.current;
      const target = 0;

      if (Math.abs(current - target) > 0.1) {
        setIsSettlingToPause(true);
        rotationRef.current = target;
        setDiscRotation(target);

        settleTimeoutRef.current = setTimeout(() => {
          setIsSettlingToPause(false);
        }, 900);
      }
    }

    return () => {
      clearRaf();
      clearSettleTimeout();
    };
  }, [isPlaying]);

  return (
    <div className="relative">
      {/* Corner labels (shown when disc is paused) */}
      <div
        className="pointer-events-none absolute whitespace-nowrap transition-all duration-700 ease-out"
        style={{
          ...cornerTextSharedStyles,
          top: "7%",
          left: "-46%",
          opacity: isPlaying ? 0 : 1,
          transform: isPlaying
            ? "translate(42px, 24px)"
            : "translate(0, 0)",
        }}
      >
        <p className="font-handwritten text-3xl text-white md:text-4xl">Projects</p>
        <p className="mt-1 font-handwritten text-sm text-white/75">things I have built</p>
      </div>

      <div
        className="pointer-events-none absolute whitespace-nowrap transition-all duration-700 ease-out"
        style={{
          ...cornerTextSharedStyles,
          top: "7%",
          right: "-46%",
          opacity: isPlaying ? 0 : 1,
          transform: isPlaying
            ? "translate(-42px, 24px)"
            : "translate(0, 0)",
        }}
      >
        <p className="font-handwritten text-3xl text-white md:text-4xl">Photos</p>
        <p className="mt-1 font-handwritten text-sm text-white/75">moments I have captured</p>
      </div>

      <div
        className="pointer-events-none absolute whitespace-nowrap transition-all duration-700 ease-out"
        style={{
          ...cornerTextSharedStyles,
          bottom: "7%",
          left: "-46%",
          opacity: isPlaying ? 0 : 1,
          transform: isPlaying
            ? "translate(42px, -24px)"
            : "translate(0, 0)",
        }}
      >
        <p className="font-handwritten text-3xl text-white md:text-4xl">Experience</p>
        <p className="mt-1 font-handwritten text-sm text-white/75">roles and internships</p>
      </div>

      <div
        className="pointer-events-none absolute whitespace-nowrap transition-all duration-700 ease-out"
        style={{
          ...cornerTextSharedStyles,
          bottom: "7%",
          right: "-46%",
          opacity: isPlaying ? 0 : 1,
          transform: isPlaying
            ? "translate(-42px, -24px)"
            : "translate(0, 0)",
        }}
      >
        <p className="font-handwritten text-3xl text-white md:text-4xl">About me</p>
        <p className="mt-1 font-handwritten text-sm text-white/75">a little bit about me</p>
      </div>

      {/* Soft glow behind the disc */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-full blur-3xl"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, #D4B896 0%, transparent 70%)",
          opacity: 0.14,
        }}
      />

      {/* Outer disc ring */}
      <div
        className="relative h-[23rem] w-[23rem] rounded-full p-3 md:h-[31rem] md:w-[31rem] lg:h-[37rem] lg:w-[37rem]"
        style={{
          background:
            "linear-gradient(135deg, #1f1f1f 0%, #0d0d0d 50%, #262626 100%)",
          boxShadow: "0 12px 48px rgba(0, 0, 0, 0.45)",
        }}
      >
        {/* Inner rotating disc */}
        <div
          className="w-full h-full rounded-full overflow-hidden relative"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #3D0A0A 0%, #3D0A0A 12%, transparent 12.5%), radial-gradient(circle at 50% 50%, transparent 12.5%, #5A1010 13%, #6E1414 22%, #8B2020 30%, #7A1A1A 45%, #6E1414 55%, #8B2020 70%, #A94442 85%, #171717 95%, #080808 100%)",
            transform: `rotate(${discRotation}deg)`,
            transition: isSettlingToPause
              ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
            willChange: "transform",
          }}
        >
          {/* Disc background */}
          <img
            src={discCollage}
            alt="Disc background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1, opacity: 0.9 }}
          />

          {/* Subtle grooves */}
          {[24, 32, 40, 48, 56, 64, 72, 80, 88].map((size) => (
            <div
              key={size}
              className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
              style={{
                zIndex: 2,
                width: `${size}%`,
                height: `${size}%`,
                transform: "translate(-50%, -50%)",
                border: "1px solid rgba(243, 229, 208, 0.04)",
              }}
            />
          ))}

          {/* Inner disc shadow (UNDER images) */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              zIndex: 3,
              boxShadow: "inset 0 4px 16px rgba(0, 0, 0, 0.2)",
            }}
          />

          {/* Photos collage (top-right) */}
          <div
            className="absolute"
            style={{
              top: 0,
              left: "50%",
              width: "50%",
              height: "50%",
              pointerEvents: "none",
              zIndex: 4,
            }}
          >
            <img
              src={photosCollage}
              alt="Photos collage"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: "translate(-1.05rem, 14.175rem) scale(2.5)",
              }}
            />
          </div>

          {/* About collage (bottom-right) */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              width: "50%",
              height: "50%",
              pointerEvents: "none",
              zIndex: 4,
            }}
          >
            <img
              src={aboutCollage}
              alt="About collage"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: "translate(-1.25rem, -3.6rem) scale(2.5)",
              }}
            />
          </div>

          {/* Divider lines (visual only) */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
            <div
              className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2"
              style={{
                background:
                  "linear-gradient(90deg, transparent 8%, rgba(243,229,208,0.12) 25%, rgba(243,229,208,0.12) 75%, transparent 92%)",
              }}
            />
            <div
              className="absolute left-1/2 top-0 w-[2px] h-full -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(180deg, transparent 8%, rgba(243,229,208,0.12) 25%, rgba(243,229,208,0.12) 75%, transparent 92%)",
              }}
            />
          </div>

          {/* PROJECTS BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/projects")}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (!img) return;
              img.style.transform = projectsHoverTransform;
              img.style.filter = "drop-shadow(0 10px 16px rgba(0,0,0,0.35))";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (!img) return;
              img.style.transform = projectsBaseTransform;
              img.style.filter = "drop-shadow(0 0 0 rgba(0,0,0,0))";
            }}
            className="absolute group"
            style={{
              top: "38%",
              left: "32%",
              transform: "translate(-50%, -50%)",
              zIndex: 6,
              background: "transparent",
              border: "none",
              padding: 0,
              lineHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "9.25rem",
              height: "6rem",
            }}
            aria-label="Go to Projects"
          >
            <img
              src={projectsTitle}
              alt="Projects"
              draggable={false}
              className="transition-transform duration-300"
              style={{
                filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
                width: "13.5rem",
                maxWidth: "38vw",
                transform: projectsBaseTransform,
                transformOrigin: "center",
                pointerEvents: "none",
              }}
            />
          </button>

          {/* EXPERIENCE BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/experience")}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (!img) return;
              img.style.transform = experienceHoverTransform;
              img.style.filter = "drop-shadow(0 10px 16px rgba(0,0,0,0.35))";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (!img) return;
              img.style.transform = experienceBaseTransform;
              img.style.filter = "drop-shadow(0 0 0 rgba(0,0,0,0))";
            }}
            className="absolute group"
            style={{
              top: "62.5%",
              left: "29.5%",
              transform: "translate(-50%, -50%)",
              zIndex: 6,
              background: "transparent",
              border: "none",
              padding: 0,
              lineHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "10rem",
              height: "6rem",
            }}
            aria-label="Go to Experience"
          >
            <img
              src={experienceTitle}
              alt="Experience"
              draggable={false}
              className="transition-transform duration-300"
              style={{
                filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
                width: "13.5rem",
                maxWidth: "38vw",
                transform: experienceBaseTransform,
                transformOrigin: "center",
                pointerEvents: "none",
              }}
            />
          </button>

          {/* PHOTOS BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/photos")}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (!img) return;
              img.style.transform = photosHoverTransform;
              img.style.filter = "drop-shadow(0 10px 16px rgba(0,0,0,0.35))";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (!img) return;
              img.style.transform = photosBaseTransform;
              img.style.filter = "drop-shadow(0 0 0 rgba(0,0,0,0))";
            }}
            className="absolute group"
            style={{
              top: "42%",
              left: "72%",
              transform: "translate(-50%, -50%)",
              zIndex: 6,
              background: "transparent",
              border: "none",
              padding: 0,
              lineHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "9rem",
              height: "9rem",
              borderRadius: "9999px",
            }}
            aria-label="Go to Photos"
          >
            <img
              src={photosTitle}
              alt="Photos"
              draggable={false}
              className="transition-transform duration-300"
              style={{
                filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
                width: "17rem",
                maxWidth: "42vw",
                transform: photosBaseTransform,
                transformOrigin: "center",
                pointerEvents: "none",
              }}
            />
          </button>

          {/* ABOUT BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/about")}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (!img) return;
              img.style.transform = "scale(1.48)";
              img.style.filter = "drop-shadow(0 10px 16px rgba(0,0,0,0.35))";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (!img) return;
              img.style.transform = "scale(1.35)";
              img.style.filter = "drop-shadow(0 0 0 rgba(0,0,0,0))";
            }}
            className="absolute group"
            style={{
              top: "65%",
              left: "70%",
              transform: "translate(-50%, -50%)",
              zIndex: 6,
              background: "transparent",
              border: "none",
              padding: 0,
              lineHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "9rem",
              height: "9rem",
              borderRadius: "9999px",
            }}
            aria-label="Go to About Me"
          >
            <img
              src={aboutTitle}
              alt="About Me"
              draggable={false}
              className="transition-transform duration-300"
              style={{
                filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
                width: "18rem",
                maxWidth: "46vw",
                transform: "scale(1.30)",
                transformOrigin: "center",
                pointerEvents: "none",
              }}
            />
          </button>

          {/* Center hole */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-[9] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
            style={{
              top: "50%",
              left: "50%",
              background:
                "linear-gradient(135deg, #1b1b1b 0%, #0b0b0b 50%, #202020 100%)",
              boxShadow:
                "0 2px 10px rgba(0, 0, 0, 0.55), inset 0 1px 3px rgba(255, 255, 255, 0.12)",
            }}
          />

          {/* Glossy reflection */}
          <div
            className="pointer-events-none absolute left-1/4 top-0 h-1/2 w-1/2 rounded-full"
            style={{
              zIndex: 7,
              background: "linear-gradient(180deg, rgba(243,229,208,0.06) 0%, transparent 100%)",
              transform: "rotate(-25deg)",
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default RotatingDisc;

