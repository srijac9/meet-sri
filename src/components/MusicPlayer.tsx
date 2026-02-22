import { useEffect, useRef, useState } from "react";
import { SkipBack, Play, Pause, SkipForward } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

function Waveform({ isPlaying }: { isPlaying: boolean }) {
  const bars = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex items-center gap-[2px]" aria-hidden="true">
      {bars.map((bar) => (
        <div
          key={bar}
          className="w-[2px] rounded-full bg-[#A94442]"
          style={{
            height: isPlaying ? undefined : "4px",
            animation: isPlaying
              ? `waveform ${0.4 + bar * 0.1}s ease-in-out ${bar * 0.05}s infinite alternate`
              : "none",
            minHeight: "4px",
            maxHeight: "16px",
            transition: "height 0.3s ease-out",
          }}
        />
      ))}
    </div>
  );
}

const MusicPlayer = ({ isPlaying, onToggle }: MusicPlayerProps) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 0.15;
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-3 flex justify-center">
        <span
          className="inline-block rounded-full px-3 py-1 text-xs tracking-widest uppercase"
          style={{
            backgroundColor: "rgba(243, 229, 208, 0.12)",
            color: "#D4B896",
            animation: isPlaying ? "bounce-soft 2s ease-in-out infinite" : "none",
          }}
        >
          now playing
        </span>
      </div>

      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "rgba(243, 229, 208, 0.08)",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(243,229,208,0.05)",
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-elegant text-lg text-paper">{"hi, this is srija \u2661"}</p>
            <p className="text-xs text-paper/60">portfolio side A</p>
          </div>
          <Waveform isPlaying={isPlaying} />
        </div>

        <div className="mb-4">
          <div className="h-1 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(243, 229, 208, 0.12)" }}>
            <div
              className="h-full rounded-full transition-all duration-100 ease-linear"
              style={{
                width: `${progress}%`,
                backgroundColor: "#A94442",
              }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-paper/60">
            <span>
              {Math.floor((progress / 100) * 3)}:
              {String(Math.floor(((progress / 100) * 180) % 60)).padStart(2, "0")}
            </span>
            <span>3:00</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button className="text-paper/60 transition-colors hover:text-paper" aria-label="Previous track">
            <SkipBack size={18} />
          </button>

          <button
            onClick={onToggle}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-105"
            style={{
              backgroundColor: "#A94442",
              boxShadow: "0 2px 8px rgba(169, 68, 66, 0.4)",
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={18} className="text-paper" />
            ) : (
              <Play size={18} className="ml-0.5 text-paper" />
            )}
          </button>

          <button className="text-paper/60 transition-colors hover:text-paper" aria-label="Next track">
            <SkipForward size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
