import { useState } from "react";
import { ExternalLink, Play, SkipBack, SkipForward, X } from "lucide-react";
import albumCover from "@/assets/p1.jpg";

interface MusicPlayerCardProps {
  title?: string;
  tags?: string[];
  description?: string;
  imageUrl?: string;
  hasVideo?: boolean;
  videoUrl?: string;
  liveUrl?: string;
}

const getYouTubeEmbedUrl = (url?: string) => {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
  } catch {
    return null;
  }

  return null;
};

const getFakePlayerStats = (title: string, hasVideo: boolean) => {
  const seed = title.length;
  const progress = 28 + (seed % 35);
  const volume = 54 + (seed % 28);
  const elapsedMinutes = 1 + (seed % 3);
  const elapsedSeconds = (12 + seed * 7) % 60;
  const remainingMinutes = 1 + ((seed + 1) % 2);
  const remainingSeconds = (7 + seed * 5) % 60;

  return {
    progress,
    volume,
    elapsed: `${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, "0")}`,
    remaining: `-${remainingMinutes}:${remainingSeconds.toString().padStart(2, "0")}`,
  };
};

const MusicPlayerCard = ({
  title = "Moonlit Landing",
  tags = ["React - Tailwind"],
  description = "A responsive landing page with smooth transitions and a warm editorial feel.",
  imageUrl = albumCover,
  hasVideo = false,
  videoUrl,
  liveUrl,
}: MusicPlayerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);
  const fakePlayer = getFakePlayerStats(title, hasVideo);
  const compactTags = tags.length > 3 || tags.join("").length > 28;
  return (
    <>
      <article
        className="group relative h-full w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="rounded-[28px] border border-[#f5e6d3]/20 px-4 pb-5 pt-4 transition-all duration-500 ease-out"
          style={{
            backgroundColor: "rgba(232, 217, 196, 0.82)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: isHovered
              ? "0 18px 34px rgba(0,0,0,0.32), 0 0 0 1px rgba(245,230,211,0.08)"
              : "0 8px 20px rgba(0,0,0,0.22)",
            transform: isHovered
              ? "translateY(-6px) rotate(-0.4deg)"
              : "translateY(0) rotate(0deg)",
          }}
        >
          <div className="relative mx-2.5 h-[13.45rem] overflow-hidden rounded-[20px] bg-[#3a0a0f]/10 xl:h-[15rem]">
            <img
              src={imageUrl}
              alt={title}
              className={`h-full w-full object-cover transition-all duration-700 ${
                imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
              } ${isHovered ? "scale-[1.03]" : "scale-100"}`}
              onLoad={() => setImageLoaded(true)}
            />

            <div
              className={`absolute inset-0 flex flex-col justify-end p-3 transition-all duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.74) 52%, rgba(0,0,0,0.32) 100%)",
              }}
            >
              <p className="font-handwritten text-[1.15rem] leading-relaxed text-[#fff4ea] xl:text-[1.25rem]">
                {description}
              </p>
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-handwritten text-sm text-[#ffd7c4] transition-colors hover:text-white"
                >
                  visit project <ExternalLink className="size-3" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-3.5 px-1 text-center">
            <p className="font-handwritten text-[1.16rem] leading-tight tracking-wide text-[#6b1e28] xl:text-[1.24rem]">
              {title}
            </p>
            <div className="mt-2 flex items-center justify-center overflow-hidden px-3">
              <div
                className={`flex max-w-full flex-nowrap items-center justify-center overflow-hidden ${
                  compactTags ? "gap-1" : "gap-1.5"
                }`}
              >
                {tags.map((tag) => (
                  <p
                    key={tag}
                    className={`truncate rounded-full bg-[#6b1e28] text-[#f5e6d3] ${
                      compactTags
                        ? "px-2 py-[0.22rem] text-[0.46rem] tracking-[0.1em]"
                        : "px-2.5 py-1 text-[0.53rem] tracking-[0.14em]"
                    } uppercase`}
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 px-5">
            <div className="relative h-[3px] w-full rounded-full bg-[#6b1e28]/45">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-[#6b1e28]"
                style={{ width: `${fakePlayer.progress}%` }}
              />
              <div
                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#8b2330] shadow-[0_0_0_1px_rgba(90,17,24,0.3)]"
                style={{ left: `${fakePlayer.progress}%`, transform: "translate(-50%, -50%)" }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[0.78rem] text-[#6b1e28]">
              <span>{fakePlayer.elapsed}</span>
              <span>{fakePlayer.remaining}</span>
            </div>
          </div>

          <div
            className="mt-3.5 flex items-center justify-center gap-8 px-1"
            style={{ opacity: hasVideo ? "0.95" : "0.42" }}
          >
            <button
              className="text-[#6b1e28] transition-colors hover:text-[#8b3a3a] disabled:opacity-30"
              disabled={!hasVideo}
              aria-label="Previous"
            >
              <SkipBack className="size-5" fill="currentColor" strokeWidth={2.5} />
            </button>

            <button
              onClick={() => hasVideo && setShowVideo(true)}
              className={`relative flex size-12 items-center justify-center rounded-full transition-all duration-300 ${
                hasVideo
                  ? "cursor-pointer bg-[#6b1e28] text-[#f5e6d3] hover:scale-110 hover:bg-[#8b3a3a]"
                  : "cursor-not-allowed bg-[#6b1e28]/30 text-[#f5e6d3]/40"
              }`}
              disabled={!hasVideo}
              aria-label={hasVideo ? "Play demo video" : "No video available"}
            >
              <Play className="ml-0.5 size-[1.05rem]" fill="currentColor" />
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
              <SkipForward className="size-5" fill="currentColor" strokeWidth={2.5} />
            </button>
          </div>

          <div className="mt-2.5 h-[10px]" aria-hidden="true" />
        </div>

        <div
          className={`absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rounded-sm transition-all duration-500 ${
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
            {youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title={`${title} video preview`}
                className="aspect-video w-full rounded-md bg-black"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : videoUrl ? (
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
