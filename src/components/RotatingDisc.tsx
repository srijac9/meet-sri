import { useNavigate } from "react-router-dom";
import photosCollage from "@/assets/photos-collage.png";
import aboutCollage from "@/assets/about-collage.png";
import discCollage from "@/assets/disc-collage.svg";
import photosTitle from "@/assets/photos-title.png";
import aboutTitle from "@/assets/about-title.png";

interface RotatingDiscProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const RotatingDisc = ({ isPlaying, onToggle }: RotatingDiscProps) => {
  const navigate = useNavigate();
  const photosBaseTransform = "translateY(5.5rem) scale(1.35)";
  const photosHoverTransform = "translateY(5.5rem) scale(1.45)";

  return (
    <div className="relative">
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
        className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full p-2"
        style={{
          background:
            "linear-gradient(135deg, hsl(37 55% 90%) 0%, hsl(37 50% 88%) 50%, hsl(37 55% 92%) 100%)",
          boxShadow:
            "0 12px 48px rgba(0, 0, 0, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Inner rotating disc */}
        <div
          className={`w-full h-full rounded-full overflow-hidden relative ${isPlaying ? "animate-spin-slow" : ""}`}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #3D0A0A 0%, #3D0A0A 12%, transparent 12.5%), radial-gradient(circle at 50% 50%, transparent 12.5%, #5A1010 13%, #6E1414 22%, #8B2020 30%, #7A1A1A 45%, #6E1414 55%, #8B2020 70%, #A94442 85%, #D4B896 95%, #F3E5D0 100%)",
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
                transform: "translate(-0.8rem, 11rem) scale(2.5)",
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
                transform: "translate(-0.9rem, -2.5rem) scale(2.5)",
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
              width: "7.5rem",
              height: "7.5rem",
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
                width: "14rem",
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
              width: "7.5rem",
              height: "7.5rem",
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
                width: "15rem",
                maxWidth: "46vw",
                transform: "scale(1.35)",
                transformOrigin: "center",
                pointerEvents: "none",
              }}
            />
          </button>

          {/* Center hole / play toggle */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="absolute z-[9] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-105 sm:h-16 sm:w-16 md:h-20 md:w-20"
            style={{
              top: "50%",
              left: "50%",
              background:
                "linear-gradient(135deg, hsl(37 55% 90%) 0%, hsl(37 50% 88%) 50%, hsl(37 55% 92%) 100%)",
              boxShadow:
                "0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.5)",
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

      {/* Play hint below disc */}
      <p
        className="mt-5 text-center font-elegant text-3xl tracking-wide text-paper/45 transition-opacity duration-300"
        style={{
          animation: isPlaying ? "none" : "pulse-glow 2.5s ease-in-out infinite",
        }}
      >
        {isPlaying ? "click disc to pause" : "click disc to play"}
      </p>
    </div>
  );
};

export default RotatingDisc;
