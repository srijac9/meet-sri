import { useNavigate } from "react-router-dom";
import photosCollage from "@/assets/photos-collage.png";
import aboutCollage from "@/assets/about-collage.png";
import discCollage from "@/assets/disc-collage.svg";

const quadrants = [
  { label: "Projects", path: "/projects", rotation: -45, image: discCollage },
  { label: "Photos", path: "/photos", rotation: 45, image: photosCollage },
  { label: "Experience", path: "/experience", rotation: 225, image: discCollage },
  { label: "About Me", path: "/about", rotation: 135, image: aboutCollage },
];

const RotatingDisc = () => {
  const navigate = useNavigate();

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
        {/* Inner disc with images - rotating */}
        <div
          className="w-full h-full rounded-full overflow-hidden relative animate-spin-slow"
          style={{
            boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Background image for quadrants */}
          <img
            src={discCollage}
            alt="Background collage"
            className="w-full h-full object-cover"
            style={{ position: "relative", zIndex: 0 }}
          />

          {/* Inner disc shadow — MUST be UNDER the photos */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              // subtle depth, but placed beneath collages
              boxShadow: "inset 0 4px 12px rgba(0, 0, 0, 0.18)",
              zIndex: 0.8,
            }}
          />

          {/* Photos - positioned in top-right quadrant area */}
          <div
            className="absolute"
            style={{
              top: 0,
              left: "50%",
              width: "50%",
              height: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <img
              src={photosCollage}
              alt="Photos"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center center",
                display: "block",
                transform: "translate(-2.3rem, 2rem) scale(2.5)",
              }}
            />
          </div>

          {/* About Me - positioned in bottom-right quadrant area */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              width: "50%",
              height: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <img
              src={aboutCollage}
              alt="About Me"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center center",
                display: "block",
                transform: "translate(-0.85rem, -2.7rem) scale(2.5)",
              }}
            />
          </div>

          {/* Quadrant divider lines */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
            {/* Horizontal line */}
            <div
              className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2"
              style={{
                background:
                  "linear-gradient(90deg, transparent 10%, hsl(var(--paper)) 30%, hsl(var(--paper)) 70%, transparent 90%)",
              }}
            />
            {/* Vertical line */}
            <div
              className="absolute left-1/2 top-0 w-[2px] h-full -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(180deg, transparent 10%, hsl(var(--paper)) 30%, hsl(var(--paper)) 70%, transparent 90%)",
              }}
            />
          </div>

          {/* Clickable quadrants */}
          {quadrants.map((quadrant, index) => (
            <button
              key={quadrant.label}
              onClick={() => navigate(quadrant.path)}
              className="absolute w-1/2 h-1/2 group cursor-pointer transition-all duration-300 hover:bg-burgundy/20"
              style={{
                top: index < 2 ? 0 : "50%",
                left: index % 2 === 0 ? 0 : "50%",
                zIndex: 3,
                clipPath:
                  index === 0
                    ? "polygon(100% 0%, 0% 0%, 100% 100%)"
                    : index === 1
                    ? "polygon(0% 0%, 100% 0%, 0% 100%)"
                    : index === 2
                    ? "polygon(0% 0%, 100% 100%, 0% 100%)"
                    : "polygon(100% 0%, 100% 100%, 0% 100%)",
              }}
            >
              <span
                className="absolute font-handwritten text-paper text-lg md:text-xl lg:text-2xl font-bold drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{
                  top: index < 2 ? "25%" : "55%",
                  left: index % 2 === 0 ? "25%" : "55%",
                  transform: "translate(-50%, -50%)",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                {quadrant.label}
              </span>
            </button>
          ))}

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
