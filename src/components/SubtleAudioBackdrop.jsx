import React, { useRef, useEffect, useState, useCallback } from "react";

/**
 * SubtleAudioBackdrop (circular, multi-peak â€œspectrum landscapeâ€)
 * - Circular base (concentric rings + radial mesh)
 * - Multiple peaks (audio-driven gaussians) moving gently
 * - Creamy red palette (no neon)
 */

const FFT_SIZE = 4096;
const SMOOTHING = 0.85;
const LERP_FACTOR = 0.27;

const RINGS = 95;          // concentric circles count
const SEGMENTS = 160;      // points per ring

const NUM_PEAKS = 12;
const PEAK_SIGMA = 0.16;   // in normalized radius units (0..1-ish)
const PEAK_MOVE_SPEED = 0.00027;

const AUDIO_RESPONSE_BOOST = 2.2;
const ENERGY_FLOOR = 0.08;

const MAX_PEAK_HEIGHT = 78;
const BASE_RIPPLE = 6;

// Creamy reds (dark -> light)
const PALETTE = [
  [56, 14, 16],
  [91, 28, 28],
  [139, 58, 58],
  [196, 106, 90],
  [245, 230, 218],
];

// 3D â€œcameraâ€
const TILT_X = 0.28;     // even more side-on perspective
const ROT_Y = -0.06;     // reduce side skew
const CAMERA_Z = 760;    // flatter view, less top-down distortion
const SCALE = 1.0;
const CANVAS_OVERSCAN_Y = 1.2; // small vertical overscan to reduce clipping at edges

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function paletteColor(t) {
  const tt = clamp01(t) * (PALETTE.length - 1);
  const i0 = Math.floor(tt);
  const i1 = Math.min(PALETTE.length - 1, i0 + 1);
  const f = tt - i0;

  const a = PALETTE[i0];
  const b = PALETTE[i1];
  return [
    lerp(a[0], b[0], f),
    lerp(a[1], b[1], f),
    lerp(a[2], b[2], f),
  ];
}

// Subtle â€œcreamâ€ glow without neon: brighten toward palette end based on intensity.
function getStrokeRGB(depthT, intensity, alphaBoost = 0) {
  const base = paletteColor(depthT);
  const cream = paletteColor(0.95);

  // Blend a bit toward cream when intensity rises
  const mix = clamp01(0.15 + intensity * 0.55);
  const r = lerp(base[0], cream[0], mix);
  const g = lerp(base[1], cream[1], mix);
  const b = lerp(base[2], cream[2], mix);

  const a = clamp01(0.10 + intensity * 0.35 + alphaBoost);
  return { r: r | 0, g: g | 0, b: b | 0, a };
}

// 3D rotate + perspective project
function project3D(x, y, z, cx, cy) {
  // rotate Y
  const cosY = Math.cos(ROT_Y);
  const sinY = Math.sin(ROT_Y);
  let x1 = x * cosY + z * sinY;
  let z1 = -x * sinY + z * cosY;

  // tilt around X
  const cosX = Math.cos(TILT_X);
  const sinX = Math.sin(TILT_X);
  let y2 = y * cosX - z1 * sinX;
  let z2 = y * sinX + z1 * cosX;

  // perspective
  const p = CAMERA_Z / (CAMERA_Z + z2);
  return {
    x: cx + x1 * p * SCALE,
    y: cy + y2 * p * SCALE,
    p,
  };
}

const SubtleAudioBackdrop = ({
  src,
  file,
  title = "Now Playing",
  subtitle = "Add src/file to react with your track",
  autoStart = false,
  height = 420,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const fileUrlRef = useRef(null);

  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const rafRef = useRef(0);

  const smoothedRef = useRef(new Float32Array(2048));
  const dataArrayRef = useRef(new Uint8Array(2048));

  const peaksRef = useRef(
    Array.from({ length: NUM_PEAKS }, (_, i) => ({
      // polar-ish placement in normalized disc space (-1..1)
      px: (Math.random() * 2 - 1) * 0.55,
      pz: (Math.random() * 2 - 1) * 0.55,
      vx: (Math.random() * 2 - 1) * 0.0009,
      vz: (Math.random() * 2 - 1) * 0.0009,
      amp: 0,
      // map peaks across spectrum bins
      freqBin: Math.floor((i / NUM_PEAKS) * 700),
    }))
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  /* =========================
     AUDIO SETUP
     ========================= */
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.preload = "auto";
    audioRef.current = audio;

    if (file) {
      const url = URL.createObjectURL(file);
      fileUrlRef.current = url;
      audio.src = url;
    } else if (src) {
      audio.src = src;
    }

    const onCanPlay = () => setIsReady(true);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    };
  }, [src, file]);

  const initAudioContext = useCallback(() => {
    if (ctxRef.current || !audioRef.current) return;

    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = FFT_SIZE;
    analyser.smoothingTimeConstant = SMOOTHING;

    const source = audioCtx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    ctxRef.current = audioCtx;
    analyserRef.current = analyser;

    const len = analyser.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(len);
    smoothedRef.current = new Float32Array(len);
  }, []);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;

    if (!ctxRef.current) initAudioContext();
    if (ctxRef.current?.state === "suspended") await ctxRef.current.resume();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying, initAudioContext]);

  /* =========================
     RENDER LOOP
     ========================= */
  useEffect(() => {
    const draw = (tMs) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      const drawWidth = rect.width;
      const drawHeight = rect.height * CANVAS_OVERSCAN_Y;
      const canvasOffsetY = (drawHeight - rect.height) * 0.5;

      // Overscan the canvas vertically so big geometry isn't clipped at section edges.
      canvas.style.left = "0px";
      canvas.style.top = `${-canvasOffsetY}px`;
      canvas.style.width = `${drawWidth}px`;
      canvas.style.height = `${drawHeight}px`;
      canvas.width = drawWidth * dpr;
      canvas.height = drawHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Transparent canvas so the page background shows through.
      ctx.clearRect(0, 0, drawWidth, drawHeight);

      // Audio sample
      const analyser = analyserRef.current;
      const smoothed = smoothedRef.current;
      const dataArray = dataArrayRef.current;

      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < smoothed.length; i++) {
          smoothed[i] += (dataArray[i] - smoothed[i]) * LERP_FACTOR;
        }
      }

      // Energy (low bins)
      let energy = 0;
      const N = Math.min(220, smoothed.length);
      for (let i = 0; i < N; i++) {
        const n = smoothed[i] / 255;
        energy += n * n;
      }
      energy = Math.sqrt(energy / Math.max(1, N));
      energy = Math.max(energy, ENERGY_FLOOR);

      // Update peaks (gentle drift, bounce in disc bounds)
      const peaks = peaksRef.current;
      const time = tMs * 0.001;

      for (const p of peaks) {
        const idx = Math.min(p.freqBin, smoothed.length - 1);
        const binSmoothed = smoothed[idx] / 255;
        const binRaw = dataArray[idx] / 255;
        const bin = Math.max(binSmoothed, binRaw * 0.72);
        p.amp += (bin * AUDIO_RESPONSE_BOOST - p.amp) * 0.14;

        // drift + slight orbit wobble
        p.px += p.vx + Math.sin(time * 0.65 + p.freqBin) * PEAK_MOVE_SPEED * 0.2;
        p.pz += p.vz + Math.cos(time * 0.55 + p.freqBin) * PEAK_MOVE_SPEED * 0.2;

        const bound = 0.72;
        if (Math.abs(p.px) > bound) p.vx *= -1;
        if (Math.abs(p.pz) > bound) p.vz *= -1;

        // keep inside disc softly
        const rr = Math.hypot(p.px, p.pz);
        if (rr > 0.78) {
          p.px *= 0.985;
          p.pz *= 0.985;
        }
      }

      // Height field on disc
      const heightAt = (nx, nz) => {
        // nx,nz are in normalized disc coordinates (-1..1), but we only call inside radius
        const r = Math.hypot(nx, nz);
        const a = Math.atan2(nz, nx);

        // base ripples (subtle)
        let y =
          Math.sin(a * 3.0 + time * 0.9) * (BASE_RIPPLE * (0.35 + energy * 0.35)) +
          Math.cos(r * 7.0 - time * 1.1) * (BASE_RIPPLE * 0.25);

        // peaks
        const dyn = MAX_PEAK_HEIGHT * (0.20 + energy * 1.35);
        for (const p of peaks) {
          const dx = nx - p.px;
          const dz = nz - p.pz;
          const dist2 = dx * dx + dz * dz;
          const g = Math.exp(-dist2 / (2 * PEAK_SIGMA * PEAK_SIGMA));
          // soften spike tops a bit
          y += (p.amp * dyn) * Math.pow(g, 1.0);
        }

        // fade toward edge so the disc stays â€œcontainedâ€
        const edgeFade = Math.pow(1 - clamp01(r), 0.55);
        y *= 0.55 + edgeFade * 0.85;
        y = Math.max(-16, y);

        // Invert so positive energy lifts peaks upward on screen.
        return -y;
      };

      // Screen center + responsive size to fill the right-side hero area.
      const isNarrow = drawWidth < 760;
      const cx = drawWidth * (isNarrow ? 0.50 : 0.53);
      const cy = drawHeight * (isNarrow ? 0.52 : 0.54);
      const discRadius = Math.min(
        drawWidth * (isNarrow ? 0.46 : 0.54),
        drawHeight * (isNarrow ? 0.72 : 0.86)
      );

      // Draw disc surface: concentric ring polylines
      // (This gives the â€œcircular baseâ€ + many peaks look)
      for (let ri = 0; ri < RINGS; ri++) {
        const rT = ri / (RINGS - 1);
        const rWorld = rT * discRadius;

        ctx.beginPath();
        let started = false;

        for (let si = 0; si <= SEGMENTS; si++) {
          const sT = si / SEGMENTS;
          const theta = sT * Math.PI * 2;

          const nx = Math.cos(theta) * rT;
          const nz = Math.sin(theta) * rT;

          // only inside disc (always true for rings), but keeps the intent clear
          if (rT > 1) continue;

          const y = heightAt(nx, nz);

          const xW = Math.cos(theta) * rWorld;
          const zW = Math.sin(theta) * rWorld;

          const p = project3D(xW, y, zW, cx, cy);

          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }

        const depthT = rT; // color shift from center->edge
        const stroke = getStrokeRGB(depthT * 0.9, energy, 0.02);

        ctx.strokeStyle = `rgba(${stroke.r},${stroke.g},${stroke.b},${stroke.a})`;
        ctx.lineWidth = 1.05;
        ctx.stroke();
      }

      // Add a light radial mesh (sparingly) so it feels like a â€œgridâ€
      const RADIALS = 18;
      for (let k = 0; k < RADIALS; k++) {
        const theta = (k / RADIALS) * Math.PI * 2;
        ctx.beginPath();

        let started = false;
        for (let ri = 0; ri < RINGS; ri += 2) {
          const rT = ri / (RINGS - 1);
          const rWorld = rT * discRadius;

          const nx = Math.cos(theta) * rT;
          const nz = Math.sin(theta) * rT;
          const y = heightAt(nx, nz);

          const xW = Math.cos(theta) * rWorld;
          const zW = Math.sin(theta) * rWorld;

          const p = project3D(xW, y, zW, cx, cy);

          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }

        const stroke = getStrokeRGB(0.65, energy, -0.02);
        ctx.strokeStyle = `rgba(${stroke.r},${stroke.g},${stroke.b},${stroke.a * 0.55})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Base rim (outer circle) for that â€œdisc edgeâ€
      {
        ctx.beginPath();
        const rimSteps = 220;
        for (let i = 0; i <= rimSteps; i++) {
          const tt = i / rimSteps;
          const theta = tt * Math.PI * 2;
          const xW = Math.cos(theta) * discRadius;
          const zW = Math.sin(theta) * discRadius;

          // slight rim lift so it reads
          const y = heightAt(Math.cos(theta), Math.sin(theta)) * 0.10 - 2.0;

          const p = project3D(xW, y, zW, cx, cy);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        const stroke = getStrokeRGB(0.92, energy, 0.08);
        ctx.strokeStyle = `rgba(${stroke.r},${stroke.g},${stroke.b},${stroke.a})`;
        ctx.lineWidth = 1.35;
        ctx.stroke();
      }

      // Tiny â€œsparkleâ€ dots to mimic the dotted surface feel (subtle, not neon)
      {
        const dots = 260;
        for (let i = 0; i < dots; i++) {
          const rr = Math.sqrt(Math.random()); // bias toward center
          const theta = Math.random() * Math.PI * 2;

          const nx = Math.cos(theta) * rr;
          const nz = Math.sin(theta) * rr;

          const y = heightAt(nx, nz);

          const xW = nx * discRadius;
          const zW = nz * discRadius;

          const p = project3D(xW, y, zW, cx, cy);

          const depthT = rr;
          const stroke = getStrokeRGB(depthT, energy, 0.02);

          // brighter near peaks (very lightly)
          const peakHint = clamp01((y / (MAX_PEAK_HEIGHT * 0.8)) * 0.35);

          ctx.fillStyle = `rgba(${stroke.r},${stroke.g},${stroke.b},${(stroke.a * 0.35 + peakHint) * 0.55})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (autoStart && isReady) togglePlay();
  }, [autoStart, isReady, togglePlay]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible"
      style={{
        height: `${height}px`,
      }}
    >
      <canvas ref={canvasRef} className="absolute left-0 pointer-events-none" />

      {/* Overlay UI (matches your â€œNow Playingâ€ vibe) */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="pointer-events-none select-none">
          <h2
            className="text-3xl font-semibold text-white"
            style={{ fontFamily: "cursive" }}
          >
            {title}
          </h2>
          <p className="mt-1 text-sm text-white/70">{subtitle}</p>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="h-14 w-14 rounded-full bg-[#F5E6DA] text-[#1A0A0B] flex items-center justify-center shadow-xl active:scale-95 transition"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <span className="text-lg font-semibold">
              {isPlaying ? "II" : "â–¶"}
            </span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default SubtleAudioBackdrop;

