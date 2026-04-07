import { useCallback, useMemo, useState } from "react";
import SubtleAudioBackdrop from "@/components/SubtleAudioBackdrop";
import favouriteSong from "@/assets/favourite-song.mp3";

const TRACK_TITLE = "Voices of Eternity";
const ARTIST_NAME = "Yuri Megis";
const LICENSE_NAME = "Licensing: CC BY 4.0";
const LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/";
const NO_CHANGES_NOTE = "No changes made";
const COPYRIGHT_NOTICE = "Copyright: © Yuri Megis";
const DISCLAIMER_NOTICE = "Disclaimer: No warranties given.";
const SOURCE_LABEL = "Source material";
const SOURCE_URL = "https://freemusicarchive.org/music/ura-megis/single/voices-of-eternity-3/";

const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

interface SongFindFeatureProps {
  className?: string;
  controlsClassName?: string;
  height?: number;
  centerXOffset?: number;
}

const SongFindFeature = ({
  className = "",
  controlsClassName = "",
  height = 360,
  centerXOffset = -40,
}: SongFindFeatureProps) => {
  const [playback, setPlayback] = useState({ currentTime: 0, duration: 0 });

  const handlePlaybackProgress = useCallback(
    ({ currentTime, duration }: { currentTime: number; duration: number }) => {
      setPlayback({ currentTime, duration });
    },
    [],
  );

  const progress = useMemo(() => {
    if (!playback.duration) return 0;
    return Math.min(1, Math.max(0, playback.currentTime / playback.duration));
  }, [playback.currentTime, playback.duration]);

  const timeDisplay = useMemo(() => {
    if (!playback.duration) return "--:--";
    return formatTime(playback.duration - playback.currentTime);
  }, [playback.currentTime, playback.duration]);

  return (
    <div className={`relative ${className}`.trim()}>
      <SubtleAudioBackdrop
        src={favouriteSong}
        title=""
        subtitle=""
        onPlaybackProgress={handlePlaybackProgress}
        controlsClassName={controlsClassName}
        autoStart={false}
        height={height}
        centerXOffset={centerXOffset}
      />
      <div className="pointer-events-none absolute right-[5%] top-[29%] z-20 sm:right-[8%] sm:top-[28%] lg:right-[10%]">
        <p
          className="max-w-[300px] font-handwritten text-[25px] leading-[1.08] tracking-normal sm:text-[30px]"
          style={{ color: "rgba(245, 230, 218, 0.72)" }}
        >
          <span>cool song find</span>
          <span className="block">of the month</span>
        </p>
      </div>
      <div className="pointer-events-none absolute inset-x-8 top-[67%] z-20 -translate-y-1/2 sm:inset-x-10">
        <div className="mx-auto w-[78%] max-w-[36rem] sm:translate-x-8">
          <div className="mb-1 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <p
                className="mb-1 text-[12px] font-light uppercase tracking-[0.4em] sm:text-[13px]"
                style={{ color: "rgba(245, 230, 218, 0.74)" }}
              >
                {TRACK_TITLE}
              </p>
              <p
                className="text-[11px] font-light tracking-[0.2em] sm:text-[12px]"
                style={{ color: "rgba(245, 230, 218, 0.72)" }}
              >
                {ARTIST_NAME}
              </p>
            </div>
            <div className="flex items-end">
              <p
                className="mb-1 text-[12px] font-light uppercase tracking-[0.4em] sm:text-[13px]"
                style={{ color: "rgba(245, 230, 218, 0.74)" }}
              >
                {timeDisplay}
              </p>
            </div>
          </div>
          <div
            className="relative h-[2px] w-full rounded-full"
            style={{ backgroundColor: "rgba(245, 230, 218, 0.26)" }}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                backgroundColor: "rgba(245, 230, 218, 0.7)",
              }}
            />
            <div
              className="absolute top-1/2 h-2.5 w-2.5 rounded-full"
              style={{
                left: `${progress * 100}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(245, 230, 218, 0.9)",
              }}
            />
          </div>
          <div className="mt-2 flex justify-end">
            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-2">
                <a
                  href={LICENSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto text-[14px] underline underline-offset-2 transition-opacity hover:opacity-80 sm:text-[15px]"
                  style={{ color: "rgba(245, 230, 218, 0.82)" }}
                >
                  {LICENSE_NAME}
                </a>
                <p
                  className="text-[13px] sm:text-[14px]"
                  style={{ color: "rgba(245, 230, 218, 0.72)" }}
                >
                  {NO_CHANGES_NOTE}
                </p>
                <p
                  className="text-[13px] sm:text-[14px]"
                  style={{ color: "rgba(245, 230, 218, 0.68)" }}
                >
                  {DISCLAIMER_NOTICE}
                </p>
                <a
                  href={SOURCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto text-[13px] underline underline-offset-2 transition-opacity hover:opacity-80 sm:text-[14px]"
                  style={{ color: "rgba(245, 230, 218, 0.82)" }}
                >
                  {SOURCE_LABEL}
                </a>
              </div>
              <p
                className="text-[12px] sm:text-[13px]"
                style={{ color: "rgba(245, 230, 218, 0.72)" }}
              >
                {COPYRIGHT_NOTICE}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongFindFeature;
