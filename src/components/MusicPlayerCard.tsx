import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import albumCover from "@/assets/p1.jpg";

interface MusicPlayerCardProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}

const MusicPlayerCard = ({
  title = "Starlight Dreams",
  subtitle = "Aurora • Midnight Sessions",
  imageUrl = albumCover,
}: MusicPlayerCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="mx-auto h-full w-full max-w-[24rem] rounded-[24px] bg-card p-5 shadow-2xl shadow-black/40 transition-shadow duration-300 hover:shadow-black/60">
      <div className="mx-auto w-[92%] overflow-hidden rounded-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="mt-4 px-1">
        <h3 className="truncate text-lg font-bold text-foreground">{title}</h3>
        <p className="truncate text-base text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-8">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground"
          aria-label="Previous track"
        >
          <SkipBack size={16} fill="currentColor" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-150 hover:scale-105 active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-0.5" />
          )}
        </button>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground"
          aria-label="Next track"
        >
          <SkipForward size={16} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayerCard;
