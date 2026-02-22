import { useState } from "react";
import { ExternalLink, Play, SkipBack, SkipForward, X } from "lucide-react";
import albumCover from "@/assets/p1.jpg";

interface MusicPlayerCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  hasVideo?: boolean;
  videoUrl?: string;
  liveUrl?: string;
}

const MusicPlayerCard = ({
  title = "Moonlit Landing",
  subtitle = "React - Tailwind",
  description = "A responsive landing page with smooth transitions and a warm editorial feel.",
  imageUrl = albumCover,
  hasVideo = false,
  videoUrl,
  liveUrl,
}: MusicPlayerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <article
        className="group relative mx-auto h-full w-full max-w-[24rem]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="rounded-lg bg-card p-3 pb-5 transition-all duration-500 ease-out"
          style={{
            boxShadow: isHovered
              ? "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,230,211,0.1)"
              : "0 8px 24px rgba(0,0,0,0.3)",
            transform: isHovered
              ? "translateY(-8px) rotate(-0.5deg)"
              : "translateY(0) rotate(0deg)",
          }}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#3a0a0f]/10">
            <img
              src={imageUrl}
              alt={title}
              className={`h-full w-full object-cover transition-all duration-700 ${
                imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
              } ${isHovered ? "scale-[1.03]" : "scale-100"}`}
              onLoad={() => setImageLoaded(true)}
            />

            <div
              className={`absolute inset-0 flex flex-col justify-end p-4 transition-all duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "linear-gradient(to top, rgba(58,10,15,0.9) 0%, rgba(58,10,15,0.4) 50%, transparent 100%)",
              }}
            >
              <p className="font-handwritten text-base leading-relaxed text-[#f5e6d3]">
                {description}
              </p>
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-handwritten text-sm text-[#c4a882] transition-colors hover:text-[#f5e6d3]"
                >
                  visit project <ExternalLink className="size-3" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-3 px-1">
            <p className="font-handwritten text-lg tracking-wide text-card-foreground/70">
              {subtitle}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-center gap-5 px-1">
            <button
              className="text-[#6b1e28] transition-colors hover:text-[#8b3a3a] disabled:opacity-30"
              disabled={!hasVideo}
              aria-label="Previous"
            >
              <SkipBack className="size-5" fill="currentColor" />
            </button>

            <button
              onClick={() => hasVideo && setShowVideo(true)}
              className={`relative flex size-10 items-center justify-center rounded-full transition-all duration-300 ${
                hasVideo
                  ? "cursor-pointer bg-[#6b1e28] text-[#f5e6d3] hover:scale-110 hover:bg-[#8b3a3a]"
                  : "cursor-not-allowed bg-[#6b1e28]/30 text-[#f5e6d3]/40"
              }`}
              disabled={!hasVideo}
              aria-label={hasVideo ? "Play demo video" : "No video available"}
            >
              <Play className="ml-0.5 size-4" fill="currentColor" />
              {hasVideo ? (
                <span
                  className={`absolute inset-0 rounded-full border-2 border-[#6b1e28] transition-all duration-500 ${
                    isHovered ? "scale-125 opacity-0" : "scale-100 opacity-0"
                  }`}
                />
              ) : null}
            </button>

            <button
              className="text-[#6b1e28] transition-colors hover:text-[#8b3a3a] disabled:opacity-30"
              disabled={!hasVideo}
              aria-label="Next"
            >
              <SkipForward className="size-5" fill="currentColor" />
            </button>
          </div>
        </div>

        <div
          className={`absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rounded-sm transition-all duration-500 ${
            isHovered ? "-rotate-1 opacity-60" : "rotate-1 opacity-40"
          }`}
          style={{
            background: "rgba(245,230,211,0.2)",
            backdropFilter: "blur(2px)",
          }}
          aria-hidden="true"
        />
      </article>

      {showVideo ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} video preview`}
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-[#2a0a0e] p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 rounded-full bg-white/10 p-1 text-white transition-colors hover:bg-white/20"
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
            >
              <X className="size-4" />
            </button>
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="aspect-video w-full rounded-md bg-black"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-md bg-black/40 text-[#f5e6d3]">
                No video URL has been added yet.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MusicPlayerCard;
