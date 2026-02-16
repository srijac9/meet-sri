import { useNavigate } from "react-router-dom";
import photosCollage from "@/assets/photos-collage.png";
import aboutCollage from "@/assets/about-collage.png";
import discCollage from "@/assets/disc-collage.svg";
import photosTitle from "@/assets/photos-title.png";
import aboutTitle from "@/assets/about-title.png";

const RotatingDisc = () => {
  const navigate = useNavigate();
  const photosBaseTransform = "translateY(5.5rem) scale(1.35)";
  const photosHoverTransform = "translateY(5.5rem) scale(1.45)";

  return (
    <div className="relative">
      {/* Outer disc ring */}
      <div
        className="w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full p-2"
        style={{
          background:
            "linear-gradient(135deg, hsl(37 55% 90%) 0%, hsl(37 50% 88%) 50%, hsl(37 55% 92%) 100%)",
          boxShadow:
            "0 10px 40px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Inner rotating disc */}
        <div className="w-full h-full rounded-full overflow-hidden relative animate-spin-slow">
          {/* Disc background */}
          <img
            src={discCollage}
            alt="Disc background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          />

          {/* Inner disc shadow (UNDER images) */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              zIndex: 1,
              boxShadow: "inset 0 4px 12px rgba(0, 0, 0, 0.18)",
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
              zIndex: 2,
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
              zIndex: 2,
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
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
            <div
              className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2"
              style={{
                background:
                  "linear-gradient(90deg, transparent 10%, hsl(var(--paper)) 30%, hsl(var(--paper)) 70%, transparent 90%)",
              }}
            />
            <div
              className="absolute left-1/2 top-0 w-[2px] h-full -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(180deg, transparent 10%, hsl(var(--paper)) 30%, hsl(var(--paper)) 70%, transparent 90%)",
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
              zIndex: 4,
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
              zIndex: 4,
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

          {/* Center hole */}
          <div
            className="absolute w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "linear-gradient(135deg, hsl(37 55% 90%) 0%, hsl(37 50% 88%) 50%, hsl(37 55% 92%) 100%)",
              boxShadow:
                "0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.5)",
              zIndex: 5,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RotatingDisc;
