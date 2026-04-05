import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type TapeData = {
  label: string;
  sub: string;
  shell: string;
  spineBg: string;
  titleColor: string;
  subtitleColor: string;
  accent: string;
  stamp?: string;
  expandable: boolean;
  role?: string;
  company?: string;
  years?: string;
  description?: string;
  mixtapeNote?: string;
  tech?: string[];
  achievements?: string[];
};

const TAPES: TapeData[] = [
  {
    label: "INTERN",
    sub: "STARTUP CO - 2015",
    shell: "#0b0909",
    spineBg: "#120f10",
    titleColor: "#efe2cf",
    subtitleColor: "#b84a43",
    accent: "#b14c45",
    stamp: "SIDE A",
    expandable: false,
  },
  {
    label: "JR. DEV",
    sub: "AGENCY - 2016",
    shell: "#090808",
    spineBg: "#130f10",
    titleColor: "#f3ede3",
    subtitleColor: "#c9877d",
    accent: "#852f30",
    stamp: "DEMO",
    expandable: false,
  },
  {
    label: "Spirit of Math",
    sub: "SEPT 2022-JUNE 2024",
    shell: "#0c0909",
    spineBg: "#140f10",
    titleColor: "#c53d3d",
    subtitleColor: "#efe2cf",
    accent: "#c65d59",
    stamp: "EP",
    expandable: true,
    role: "Assistant Teacher",
    company: "Spirit of Math Schools",
    years: "Sept 2022-June 2024",
    description:
      "Guided elementary students through drills, lessons, and homework support that strengthened problem-solving skills while keeping the classroom encouraging and safe.",
    mixtapeNote: "teaching problem-solving + building confidence",
    tech: ["Student Support", "Lesson Support", "Problem Solving", "Parent Communication"],
    achievements: [
      "Guided 90+ students in grades one to four twice weekly through drills, lessons, and homework support",
      "Built a safe and supportive learning environment while helping students grow their confidence in math",
      "Collaborated with parents to track progress, discuss challenges, and suggest improvement strategies at home",
    ],
  },
  {
    label: "CONTRACT",
    sub: "FREELANCE - 2019",
    shell: "#0c090a",
    spineBg: "#120f10",
    titleColor: "#efe2cf",
    subtitleColor: "#bd5d56",
    accent: "#7d2f31",
    stamp: "001",
    expandable: false,
  },
  {
    label: "MID DEV",
    sub: "SAAS CO - 2019-2020",
    shell: "#0b0909",
    spineBg: "#100d0e",
    titleColor: "#efe2cf",
    subtitleColor: "#b65952",
    accent: "#a53f3f",
    stamp: "VOL 2",
    expandable: false,
  },
  {
    label: "Trexo Robotics",
    sub: "MAY-AUG 2025",
    shell: "#070606",
    spineBg: "#100c0d",
    titleColor: "#f4ece3",
    subtitleColor: "#cf4348",
    accent: "#7e3233",
    stamp: "EP",
    expandable: true,
    role: "Business Automation Intern",
    company: "Trexo Robotics",
    years: "May 2025-August 2025",
    description:
      "Worked across data, reporting, and automation to turn manual processes into scalable systems that helped teams move faster and make better decisions.",
    mixtapeNote: "automation, analytics + cross-team execution",
    tech: ["SQL", "AWS Athena", "Amazon QuickSight", "JavaScript", "Python", "Zapier"],
    achievements: [
      "Extracted, manipulated, and analyzed large datasets with SQL and AWS Athena, then built a partner dashboard in Amazon QuickSight",
      "Automated 10 workflows across multiple teams using JavaScript, Python, and Zapier to reduce manual effort and standardize operations",
      "Led a major automation rollout by managing timelines, coordinating cross-functional teams, and delivering the final processes successfully",
    ],
  },
  {
    label: "SIDE GIG",
    sub: "PERSONAL - 2021",
    shell: "#0b0909",
    spineBg: "#140f10",
    titleColor: "#efe2cf",
    subtitleColor: "#c06b67",
    accent: "#c06b67",
    stamp: "HOME",
    expandable: false,
  },
  {
    label: "CONSULT",
    sub: "VARIOUS - 2022",
    shell: "#0b0909",
    spineBg: "#120e0f",
    titleColor: "#efe3d0",
    subtitleColor: "#cb6b63",
    accent: "#93393a",
    stamp: "MX",
    expandable: false,
  },
  {
    label: "Mission Perform",
    sub: "JAN 2026-PRESENT",
    shell: "#0a0808",
    spineBg: "#110e0f",
    titleColor: "#efe2cf",
    subtitleColor: "#b84a43",
    accent: "#9c3535",
    stamp: "EP",
    expandable: true,
    role: "Full Stack Developer Intern",
    company: "Mission Perform Inc",
    years: "January 2026-Present",
    description:
      "Built and shipped full-stack product features while designing automation systems that connected business tools, backend services, and cloud infrastructure.",
    mixtapeNote: "full-stack features + cloud automation",
    tech: ["JavaScript", "React", "Node.js", "MongoDB", "AWS Lambda", "EventBridge Scheduler", "AWS EC2"],
    achievements: [
      "Architected and deployed full-stack web application features using JavaScript, React, Node.js, and MongoDB",
      "Designed an automated SharePoint synchronization pipeline with AWS Lambda and EventBridge Scheduler to keep systems in sync and remove manual entry",
      "Developed backend services on AWS EC2 to support scheduled automation tasks and API-driven data synchronization",
    ],
  },
  {
    label: "NEXT",
    sub: "THE FUTURE - TBD",
    shell: "#0b0909",
    spineBg: "#120e0f",
    titleColor: "#b53f39",
    subtitleColor: "#efe2cf",
    accent: "#bf5e54",
    stamp: "TBD",
    expandable: false,
  },
];

const PROMPT_TAPE: TapeData = {
  label: "CLICK THE",
  sub: "CASSETTES",
  shell: "#0b0909",
  spineBg: "#120e0f",
  titleColor: "#efe2cf",
  subtitleColor: "#f3ddd1",
  accent: "#bf5e54",
  stamp: "EP",
  expandable: false,
};

const EXPANDABLE_SLIDE_DISTANCE = 1.1;
const STANDARD_HOVER_SHIFT = 0.18;
const STACK_SHIFT_AFTER_HOVER = 0.26;
const HOVER_RELEASE_DELAY_MS = 180;
const CASSETTE_TITLE_FONT_STACK = `"Franklin Gothic Demi", "Arial Narrow", Arial, sans-serif`;
const CASSETTE_SUBTITLE_FONT_STACK = `"Franklin Gothic Medium", Arial, sans-serif`;
const PROMPT_CASSETTE_FONT_STACK = `'Caveat', cursive`;

const EXPANDABLE_TAPE_DIRECTIONS = TAPES.reduce<Record<number, -1 | 1>>((directions, tape, index) => {
  if (tape.expandable) {
    directions[index] = -1;
  }

  return directions;
}, {});

function getExpandableDirection(index: number) {
  return EXPANDABLE_TAPE_DIRECTIONS[index] ?? -1;
}

function getPanelSide(index: number) {
  return getExpandableDirection(index) === -1 ? "left" : "right";
}

function getExpandableTrackNumber(index: number) {
  return TAPES.slice(0, index + 1).filter((tape) => tape.expandable).length;
}

function getStackHorizontalOffset(viewportWidth: number) {
  if (viewportWidth >= 1280) {
    return 1.15;
  }

  if (viewportWidth >= 1024) {
    return 0.98;
  }

  if (viewportWidth >= 700) {
    return 0.82;
  }

  return 0;
}

function getRenderedTitleColor(tape: TapeData) {
  return tape.expandable ? "#f4ece3" : "#b84a43";
}

function shouldRenderCassetteSubtitle(tape: TapeData) {
  return tape === PROMPT_TAPE;
}

function getCassetteTitleFontStack(tape: TapeData) {
  return tape === PROMPT_TAPE ? PROMPT_CASSETTE_FONT_STACK : CASSETTE_TITLE_FONT_STACK;
}

function getCassetteSubtitleFontStack(tape: TapeData) {
  return tape === PROMPT_TAPE ? PROMPT_CASSETTE_FONT_STACK : CASSETTE_SUBTITLE_FONT_STACK;
}

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startSize: number,
  font: (size: number) => string
) {
  let size = startSize;
  ctx.font = font(size);

  while (ctx.measureText(text).width > maxWidth && size > 10) {
    size -= 1;
    ctx.font = font(size);
  }

  return size;
}

function drawPaperNoise(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 180; i += 1) {
    ctx.fillStyle = Math.random() > 0.5 ? "rgba(120,24,29,0.22)" : "rgba(255,246,234,0.16)";
    ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 1.8, Math.random() * 1.8);
  }
  ctx.globalAlpha = 1;
}

function drawShellEdges(ctx: CanvasRenderingContext2D, width: number, height: number, tape: TapeData) {
  ctx.strokeStyle = "rgba(239,226,207,0.2)";
  ctx.lineWidth = 7;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  ctx.strokeStyle = "rgba(239,226,207,0.05)";
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 42, width - 84, height - 84);

  ctx.strokeStyle = "rgba(239,226,207,0.08)";
  ctx.lineWidth = 2;

  for (let i = 0; i < 5; i += 1) {
    const leftX = 74 + i * 18;
    const rightX = width - 74 - i * 18;
    ctx.beginPath();
    ctx.moveTo(leftX, 96);
    ctx.lineTo(leftX - 32, height - 96);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rightX, 96);
    ctx.lineTo(rightX + 32, height - 96);
    ctx.stroke();
  }

  ctx.strokeStyle = `${tape.accent}cc`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(92, 114);
  ctx.lineTo(width - 92, 114);
  ctx.stroke();
}

function drawStamp(ctx: CanvasRenderingContext2D, width: number, tape: TapeData) {
  if (!tape.stamp) {
    return;
  }

  ctx.fillStyle = tape.accent;
  ctx.beginPath();
  ctx.roundRect(width - 296, 98, 144, 70, 14);
  ctx.fill();

  ctx.fillStyle = "#fff7ee";
  ctx.font = '700 34px "Special Elite", Arial, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(tape.stamp, width - 224, 133);
  ctx.textAlign = "left";
}

function drawExpandableArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  scale = 1
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = color;

  for (let index = 0; index < 3; index += 1) {
    const offset = index * 11;
    ctx.beginPath();
    ctx.moveTo(18 - offset, -10);
    ctx.lineTo(-2 - offset, 0);
    ctx.lineTo(18 - offset, 10);
    ctx.lineTo(12 - offset, 0);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function makeTapeTexture(tape: TapeData, isActive: boolean) {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable");
  }

  ctx.fillStyle = tape.shell;
  ctx.fillRect(0, 0, width, height);
  drawPaperNoise(ctx, width, height);
  drawShellEdges(ctx, width, height, tape);

  const spineX = 118;
  const spineY = 164;
  const spineWidth = width - 236;
  const spineHeight = height - 328;

  ctx.fillStyle = tape.spineBg;
  ctx.beginPath();
  ctx.roundRect(spineX, spineY, spineWidth, spineHeight, 22);
  ctx.fill();

  ctx.fillStyle = tape.accent;
  ctx.fillRect(spineX, spineY, 24, spineHeight);
  ctx.fillRect(spineX + spineWidth - 24, spineY, 24, spineHeight);

  if (!isActive) {
    ctx.fillStyle = "rgba(118,104,97,0.16)";
    ctx.beginPath();
    ctx.roundRect(spineX, spineY, spineWidth, spineHeight, 22);
    ctx.fill();
  }

  ctx.strokeStyle = isActive ? "rgba(239,226,207,0.26)" : "rgba(239,226,207,0.15)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.roundRect(spineX, spineY, spineWidth, spineHeight, 22);
  ctx.stroke();

  drawStamp(ctx, width, tape);
  const titleFont = (size: number) => `700 ${size}px ${getCassetteTitleFontStack(tape)}`;
  const titleSize = fitText(ctx, tape.label, spineWidth - 140, height * 0.2, titleFont);
  const showSubtitle = shouldRenderCassetteSubtitle(tape);

  ctx.save();
  ctx.translate(width / 2, height * (showSubtitle ? 0.44 : 0.5));
  ctx.scale(tape === PROMPT_TAPE ? 1 : 0.98, tape === PROMPT_TAPE ? 1.18 : 1.28);
  ctx.font = titleFont(titleSize);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.42)";
  ctx.shadowBlur = 5;
  ctx.shadowOffsetY = 2;
  const renderedTitleColor = getRenderedTitleColor(tape);
  ctx.fillStyle = isActive ? renderedTitleColor : `${renderedTitleColor}d2`;
  ctx.fillText(tape.label, 0, 0);
  ctx.restore();

  if (tape.expandable) {
    drawExpandableArrow(
      ctx,
      spineX + 58,
      spineY + spineHeight / 2,
      isActive ? renderedTitleColor : `${renderedTitleColor}cc`,
      0.78
    );
  }

  if (showSubtitle) {
    const subFont = (size: number) => `700 ${size}px ${getCassetteSubtitleFontStack(tape)}`;
    const subSize = fitText(ctx, tape.sub, spineWidth - 190, height * 0.088, subFont);
    ctx.save();
    ctx.translate(width / 2, height * 0.565);
    ctx.scale(1, tape === PROMPT_TAPE ? 1.04 : 1.08);
    ctx.font = subFont(subSize);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = isActive ? "#f5ddd1" : "rgba(245,221,209,0.82)";
    ctx.fillText(tape.sub, 0, 0, spineWidth - 190);
    ctx.restore();
  }

  ctx.strokeStyle = isActive ? `${tape.accent}bb` : `${tape.accent}66`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(spineX + 80, height * 0.79);
  ctx.lineTo(width - spineX - 80, height * 0.79);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

function makeSideTexture(tape: TapeData) {
  const width = 1024;
  const height = 112;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable");
  }

  ctx.fillStyle = tape.shell;
  ctx.fillRect(0, 0, width, height);
  drawPaperNoise(ctx, width, height);

  ctx.fillStyle = tape.spineBg;
  ctx.fillRect(24, height * 0.15, width - 48, height * 0.7);

  ctx.fillStyle = tape.accent;
  ctx.fillRect(24, height * 0.15, 12, height * 0.7);
  ctx.fillRect(width - 36, height * 0.15, 12, height * 0.7);

  ctx.strokeStyle = "rgba(239,226,207,0.24)";
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  ctx.font = `700 ${height * 0.4}px ${getCassetteTitleFontStack(tape)}`;
  const showSubtitle = shouldRenderCassetteSubtitle(tape);
  ctx.textAlign = showSubtitle ? "left" : "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 3;
  ctx.fillStyle = getRenderedTitleColor(tape);
  ctx.save();
  ctx.translate(showSubtitle ? 54 : width / 2, height * 0.49);
  ctx.scale(tape === PROMPT_TAPE ? 1 : 0.98, tape === PROMPT_TAPE ? 1.14 : 1.24);
  ctx.fillText(tape.label, 0, 0);
  ctx.restore();
  ctx.shadowBlur = 0;

  if (showSubtitle) {
    const titleWidth = ctx.measureText(tape.label).width;
    ctx.font = `700 ${height * 0.22}px ${getCassetteSubtitleFontStack(tape)}`;
    ctx.fillStyle = "#f5ddd1";
    ctx.fillText(` - ${tape.sub}`, 60 + titleWidth, height * 0.49, width - titleWidth - 190);
  }

  if (tape.stamp) {
    ctx.fillStyle = tape.accent;
    ctx.beginPath();
    ctx.roundRect(width - 168, 26, 112, 42, 12);
    ctx.fill();
    ctx.fillStyle = "#fff8f0";
    ctx.font = `700 ${height * 0.17}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 2;
    ctx.fillText(tape.stamp, width - 112, 48);
    ctx.textAlign = "left";
    ctx.shadowBlur = 0;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

function makePromptFaceTexture(tape: TapeData) {
  const width = 1024;
  const height = 640;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable");
  }

  ctx.fillStyle = tape.shell;
  ctx.fillRect(0, 0, width, height);
  drawPaperNoise(ctx, width, height);
  drawShellEdges(ctx, width, height, tape);

  const labelX = 112;
  const labelY = 176;
  const labelWidth = width - 224;
  const labelHeight = height - 288;

  ctx.fillStyle = tape.spineBg;
  ctx.beginPath();
  ctx.roundRect(labelX, labelY, labelWidth, labelHeight, 30);
  ctx.fill();

  ctx.fillStyle = tape.accent;
  ctx.fillRect(labelX, labelY, 28, labelHeight);
  ctx.fillRect(labelX + labelWidth - 28, labelY, 28, labelHeight);

  ctx.strokeStyle = "rgba(239,226,207,0.22)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.roundRect(labelX, labelY, labelWidth, labelHeight, 30);
  ctx.stroke();

  drawStamp(ctx, width, tape);

  const titleFont = (size: number) => `700 ${size}px ${getCassetteTitleFontStack(tape)}`;
  const titleSize = fitText(ctx, tape.label, labelWidth - 120, 140, titleFont);
  ctx.save();
  ctx.translate(width / 2, height * 0.50);
  ctx.scale(tape === PROMPT_TAPE ? 1 : 0.98, tape === PROMPT_TAPE ? 1.1 : 1.18);
  ctx.font = titleFont(titleSize);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.42)";
  ctx.shadowBlur = 5;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = getRenderedTitleColor(tape);
  ctx.fillText(tape.label, 0, -22);
  ctx.restore();

  const subFont = (size: number) => `700 ${size}px ${getCassetteSubtitleFontStack(tape)}`;
  const subSize = fitText(ctx, tape.sub, labelWidth - 160, 68, subFont);
  ctx.save();
  ctx.translate(width / 2, height * 0.60);
  ctx.scale(1, 1.04);
  ctx.font = subFont(subSize);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = tape.subtitleColor;
  ctx.fillText(tape.sub, 0, 0);
  ctx.restore();

  ctx.strokeStyle = `${tape.accent}bb`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(labelX + 82, height * 0.74);
  ctx.lineTo(width - labelX - 82, height * 0.74);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

function ExpandedPanel({
  tape,
  trackNumber,
  onClose,
}: {
  tape: TapeData;
  trackNumber: string;
  onClose: () => void;
}) {
  if (!tape.expandable) {
    return null;
  }

  const panelAccent = "#7c3531";
  const panelAccentSoft = "#b28d84";
  const panelBody = "#5a4742";
  const noteIcons = ["✧", "♥", "✦"];

  return (
    <div
      className="absolute left-4 top-[20rem] z-20 w-[22rem] transition-all duration-300 md:left-8 md:top-[23rem] md:w-[25rem] lg:left-10 lg:top-[25rem] lg:w-[27rem]"
    >
      <div
        className="relative px-6 pb-4 pt-4"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-0 h-6 w-20 -rotate-[5deg] rounded-b-[8px]"
          style={{ background: "rgba(124, 53, 49, 0.12)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 right-4 top-2 h-px"
          style={{ background: "rgba(124, 53, 49, 0.24)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full"
          style={{ background: "rgba(124, 53, 49, 0.07)" }}
        />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border text-base font-semibold transition-colors"
          style={{
            background: "rgba(124, 53, 49, 0.08)",
            borderColor: "rgba(124, 53, 49, 0.14)",
            color: panelAccent,
          }}
          aria-label="Close expanded tape details"
        >
          x
        </button>
        <div
          className="inline-flex -rotate-[3deg] rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.22em]"
          style={{
            background: "rgba(124, 53, 49, 0.08)",
            color: panelAccent,
            border: "1px solid rgba(124, 53, 49, 0.12)",
          }}
        >
          TRACK {trackNumber}
        </div>
        <div className="mt-3 text-[2.4rem] font-black leading-none md:text-[2.8rem] lg:text-[3.15rem]" style={{ color: panelAccent }}>
          {tape.role}
        </div>
        {tape.mixtapeNote ? (
          <div className="mt-2 font-handwritten text-[1.15rem] leading-snug md:text-[1.3rem]" style={{ color: "#b3665f" }}>
            "{tape.mixtapeNote}"
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div
            className="-rotate-[2deg] rounded-[18px] px-4 py-2.5"
            style={{
              background: "rgba(124, 53, 49, 0.08)",
              border: "1px solid rgba(124, 53, 49, 0.1)",
              boxShadow: "0 8px 18px rgba(124, 53, 49, 0.06)",
            }}
          >
            <div className="text-[1.1rem] font-semibold leading-none md:text-[1.22rem]" style={{ color: panelAccent }}>
              {tape.company} ♥
            </div>
          </div>
          <div className="pb-1 text-[1rem] font-semibold tracking-[0.08em] md:text-[1.1rem]" style={{ color: "#8a6861" }}>
            {tape.years}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="mt-3 h-[2px] w-24 rotate-[1deg]"
          style={{ background: "linear-gradient(90deg, rgba(124,53,49,0.55), rgba(124,53,49,0.08))" }}
        />
      </div>

      <div className="relative mt-3 space-y-4 px-6 pb-5 pt-3" style={{ color: panelBody }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-3 font-handwritten text-4xl"
          style={{ color: "rgba(124, 53, 49, 0.22)" }}
        >
          xoxo
        </div>
        <p className="max-w-[38rem] pr-6 text-[17px] leading-8 md:text-[18px]">{tape.description}</p>

        <div className="rotate-[-1deg]">
          <div className="mb-2 text-[12px] font-semibold tracking-[0.24em]" style={{ color: panelAccentSoft }}>
            TECH STACK ✧
          </div>
          <div className="flex flex-wrap gap-2">
            {tape.tech?.map((tech) => (
              <span
                key={tech}
                className="rounded-full px-3.5 py-2 text-[13px] font-semibold md:text-[14px]"
                style={{
                  background: "rgba(124, 53, 49, 0.08)",
                  color: panelAccent,
                  border: "1px solid rgba(124, 53, 49, 0.12)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="translate-x-1 rotate-[1deg]">
          <div className="mb-2 text-[12px] font-semibold tracking-[0.24em]" style={{ color: panelAccentSoft }}>
            NOTES ♡
          </div>
          <ul className="space-y-2">
            {tape.achievements?.map((achievement, index) => (
              <li key={achievement} className="flex items-start gap-3 text-[15px] leading-7">
                <span className="mt-[2px] text-sm font-semibold" style={{ color: panelAccent }}>
                  {noteIcons[index % noteIcons.length]}
                </span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function EmptyPanel() {
  return (
    <div className="pointer-events-none absolute left-4 top-[28rem] z-10 w-[22rem] px-6 md:left-8 md:top-[31rem] md:w-[25rem] lg:left-10 lg:top-[33rem] lg:w-[27rem]">
      <div>
        <div
          className="font-handwritten text-[1.15rem] tracking-[0.08em]"
          style={{ color: "#9c3535" }}
        >
          PRESS PLAY
        </div>
        <p
          className="mt-3 font-handwritten text-[1.45rem] leading-[1.75] md:text-[1.6rem]"
          style={{
            color: "#9c3535",
            textShadow: "0 10px 22px rgba(156, 53, 53, 0.12)",
          }}
        >
          Click a cassette to open a chapter from the stack. When one is selected,
          this space fills with the role, the time period, the tech I used, and a
          few notes from that part of the journey.
        </p>
      </div>
    </div>
  );
}

const ExperienceStack = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const hoveredRef = useRef<number | null>(null);
  const expandedRef = useRef<number | null>(null);
  const hoverReleaseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frontMaterialsRef = useRef<THREE.MeshLambertMaterial[]>([]);
  const textureCacheRef = useRef<{
    active: THREE.CanvasTexture[];
    inactive: THREE.CanvasTexture[];
    side: THREE.CanvasTexture[];
  }>({
    active: [],
    inactive: [],
    side: [],
  });
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const clearHoverReleaseTimeout = useCallback(() => {
    if (hoverReleaseTimeoutRef.current) {
      clearTimeout(hoverReleaseTimeoutRef.current);
      hoverReleaseTimeoutRef.current = null;
    }
  }, []);

  const applyTapeTextureState = useCallback((hoverIndex: number | null, expandedIndex: number | null) => {
    const frontMaterials = frontMaterialsRef.current;
    const textureCache = textureCacheRef.current;

    if (!frontMaterials.length) {
      return;
    }

    frontMaterials.forEach((material, index) => {
      const isActive = hoverIndex === null || index === hoverIndex || expandedIndex === index;
      const nextMap = isActive ? textureCache.active[index] : textureCache.inactive[index];

      if (material.map !== nextMap) {
        material.map = nextMap;
        material.needsUpdate = true;
      }
    });
  }, []);

  useEffect(() => {
    expandedRef.current = expanded;
    applyTapeTextureState(hoveredRef.current, expanded);
  }, [expanded, applyTapeTextureState]);

  useEffect(() => {
    const element = mountRef.current;
    if (!element) {
      return undefined;
    }

    const width = element.clientWidth;
    const height = element.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 13.1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearAlpha(0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    element.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.82);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff5eb, 0.95);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0003;
    keyLight.shadow.normalBias = 0.015;
    keyLight.shadow.camera.left = -16;
    keyLight.shadow.camera.right = 16;
    keyLight.shadow.camera.top = 12;
    keyLight.shadow.camera.bottom = -12;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 28;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf0f5ff, 0.28);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const tapeWidth = 2.66;
    const tapeHeight = 0.36;
    const tapeDepth = 1.56;
    const tapeGap = 0.04;
    const stackHeight = TAPES.length * (tapeHeight + tapeGap);
    const baseY = -stackHeight / 2;

    const meshes: THREE.Mesh[] = [];
    const currentY: number[] = [];
    const currentX: number[] = [];
    const texturesToDispose: THREE.Texture[] = [];
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];
    const frontMaterials: THREE.MeshLambertMaterial[] = [];
    const activeTextures: THREE.CanvasTexture[] = [];
    const inactiveTextures: THREE.CanvasTexture[] = [];
    const sideTextures: THREE.CanvasTexture[] = [];

    const group = new THREE.Group();
    group.rotation.z = -0.03;
    group.scale.setScalar(0.94);
    group.position.x = getStackHorizontalOffset(width);
    group.position.y = -0.85;
    scene.add(group);

    TAPES.forEach((tape, index) => {
      const frontTexture = makeTapeTexture(tape, true);
      const inactiveTexture = makeTapeTexture(tape, false);
      const sideTexture = makeSideTexture(tape);
      texturesToDispose.push(frontTexture, inactiveTexture, sideTexture);
      activeTextures.push(frontTexture);
      inactiveTextures.push(inactiveTexture);
      sideTextures.push(sideTexture);

      const geometry = new THREE.BoxGeometry(tapeWidth, tapeHeight, tapeDepth);
      geometriesToDispose.push(geometry);

      const materials = [
        new THREE.MeshLambertMaterial({ color: tape.shell }),
        new THREE.MeshLambertMaterial({ color: tape.shell }),
        new THREE.MeshLambertMaterial({ map: sideTexture }),
        new THREE.MeshLambertMaterial({ color: tape.shell }),
        new THREE.MeshLambertMaterial({ map: frontTexture }),
        new THREE.MeshLambertMaterial({ color: tape.shell }),
      ];
      materialsToDispose.push(...materials);
      frontMaterials.push(materials[4] as THREE.MeshLambertMaterial);

      const mesh = new THREE.Mesh(geometry, materials);
      mesh.rotation.z = (Math.random() - 0.5) * 0.11;
      mesh.rotation.y = (Math.random() - 0.5) * 0.035;
      mesh.rotation.x = (Math.random() - 0.5) * 0.02;

      const y = baseY + index * (tapeHeight + tapeGap) + tapeHeight / 2;
      const xOffset = 0.04 + Math.random() * 0.08;
      mesh.position.set(xOffset, y, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { index, baseY: y, baseX: xOffset, tape };

      group.add(mesh);
      meshes.push(mesh);
      currentY.push(y);
      currentX.push(xOffset);
    });

    const promptFrontTexture = makeTapeTexture(PROMPT_TAPE, true);
    const promptFaceTexture = makePromptFaceTexture(PROMPT_TAPE);
    const promptSideTexture = makeSideTexture(PROMPT_TAPE);
    texturesToDispose.push(promptFrontTexture, promptFaceTexture, promptSideTexture);

    const promptGeometry = new THREE.BoxGeometry(tapeWidth, tapeHeight, tapeDepth * 0.9);
    geometriesToDispose.push(promptGeometry);

    const promptMaterials = [
      new THREE.MeshLambertMaterial({ color: PROMPT_TAPE.shell }),
      new THREE.MeshLambertMaterial({ color: PROMPT_TAPE.shell }),
      new THREE.MeshLambertMaterial({ map: promptFaceTexture }),
      new THREE.MeshLambertMaterial({ map: promptFaceTexture }),
      new THREE.MeshLambertMaterial({ map: promptFrontTexture }),
      new THREE.MeshLambertMaterial({ map: promptSideTexture }),
    ];
    materialsToDispose.push(...promptMaterials);

    const promptMesh = new THREE.Mesh(promptGeometry, promptMaterials);
    promptMesh.position.set(0.28, baseY + stackHeight + 0.92, 0.16);
    promptMesh.rotation.x = Math.PI / 2 - 0.06;
    promptMesh.rotation.y = -0.1;
    promptMesh.rotation.z = -0.18;
    promptMesh.castShadow = true;
    promptMesh.receiveShadow = true;
    group.add(promptMesh);

    const promptCurrentPosition = promptMesh.position.clone();
    const promptCurrentRotation = {
      x: promptMesh.rotation.x,
      y: promptMesh.rotation.y,
      z: promptMesh.rotation.z,
    };
    const promptAnchorOffset = new THREE.Vector3(0.16, 0.88, 0.12);
    const promptAnchorRotation = new THREE.Euler(0, 0, 0);

    frontMaterialsRef.current = frontMaterials;
    textureCacheRef.current = {
      active: activeTextures,
      inactive: inactiveTextures,
      side: sideTextures,
    };

    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.12 });
    const groundGeometry = new THREE.PlaneGeometry(40, 24);
    geometriesToDispose.push(groundGeometry);
    materialsToDispose.push(groundMaterial);

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.x = -2.1;
    ground.position.y = baseY - 0.28;
    ground.receiveShadow = true;
    group.add(ground);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const getTapeIndexFromPointer = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const hits = raycaster.intersectObjects(meshes, false);
      const hitIndex =
        hits.length > 0
          ? (hits[0].object.userData.index as number | null)
          : null;
      const isExpandableHit = hitIndex !== null ? TAPES[hitIndex].expandable : false;

      return { hits, hitIndex, isExpandableHit };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (expandedRef.current !== null) {
        hoveredRef.current = expandedRef.current;
        setHovered(expandedRef.current);
        applyTapeTextureState(expandedRef.current, expandedRef.current);
        element.style.cursor = "default";
        return;
      }

      const { hits, hitIndex: nextHovered, isExpandableHit } = getTapeIndexFromPointer(event);

      if (nextHovered !== null) {
        clearHoverReleaseTimeout();
      }

      if (nextHovered === null && hoveredRef.current !== null) {
        if (!hoverReleaseTimeoutRef.current) {
          hoverReleaseTimeoutRef.current = setTimeout(() => {
            hoveredRef.current = null;
            setHovered(null);
            applyTapeTextureState(null, expandedRef.current);
            hoverReleaseTimeoutRef.current = null;
            element.style.cursor = "default";
          }, HOVER_RELEASE_DELAY_MS);
        }

        return;
      }

      if (nextHovered !== hoveredRef.current) {
        hoveredRef.current = nextHovered;
        setHovered(nextHovered);
        applyTapeTextureState(nextHovered, expandedRef.current);
      }

      if (hits.length > 0) {
        element.style.cursor = isExpandableHit ? "pointer" : "default";
      } else {
        element.style.cursor = "default";
      }
    };

    const onClick = (event: MouseEvent) => {
      if (expandedRef.current !== null) {
        return;
      }

      const { hitIndex, isExpandableHit } = getTapeIndexFromPointer(event);
      if (hitIndex === null || !isExpandableHit) {
        return;
      }

      hoveredRef.current = hitIndex;
      setHovered(hitIndex);
      applyTapeTextureState(hitIndex, expandedRef.current);

      const tape = TAPES[hitIndex];
      if (!tape.expandable) {
        return;
      }

      setExpanded((current) => (current === hitIndex ? null : hitIndex));
    };

    let rotationY = 0;
    let rotationX = 0;
    let isDragging = false;
    let previousMouse = { x: 0, y: 0 };

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMouse = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onDrag = (event: MouseEvent) => {
      if (!isDragging) {
        return;
      }

      const deltaX = event.clientX - previousMouse.x;
      const deltaY = event.clientY - previousMouse.y;
      rotationY += deltaX * 0.006;
      rotationX += deltaY * 0.006;
      rotationX = Math.max(-0.35, Math.min(0.35, rotationX));
      previousMouse = { x: event.clientX, y: event.clientY };
    };

    const onResize = () => {
      const nextWidth = element.clientWidth;
      const nextHeight = element.clientHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
      group.position.x = getStackHorizontalOffset(nextWidth);
    };

    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("click", onClick);
    element.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("resize", onResize);

    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      group.rotation.y += (rotationY - group.rotation.y) * 0.06;
      group.rotation.x += (rotationX - group.rotation.x) * 0.06;
      rotationY *= 0.97;
      rotationX *= 0.97;

      meshes.forEach((mesh, index) => {
        const hoverIndex = hoveredRef.current;
        const expandedIndex = expandedRef.current;
        let targetY = mesh.userData.baseY;
        let targetX = mesh.userData.baseX;
        let targetScale = 1;

        if (expandedIndex === index) {
          targetX = mesh.userData.baseX + EXPANDABLE_SLIDE_DISTANCE * getExpandableDirection(index);
          targetScale = 1.06;
          targetY += 0.12;
        } else if (expandedIndex !== null) {
          if (index > expandedIndex) {
            targetY += 0.22;
          }
          if (index < expandedIndex) {
            targetY -= 0.12;
          }
        } else if (hoverIndex !== null) {
          if (index === hoverIndex) {
            targetY += STANDARD_HOVER_SHIFT;
            targetScale = TAPES[index].expandable ? 1.045 : 1.03;
            if (TAPES[index].expandable) {
              targetX = mesh.userData.baseX + EXPANDABLE_SLIDE_DISTANCE * getExpandableDirection(index);
            }
          } else if (index > hoverIndex) {
            targetY += STACK_SHIFT_AFTER_HOVER;
          }
        }

        currentY[index] += (targetY - currentY[index]) * 0.1;
        currentX[index] += (targetX - currentX[index]) * 0.1;
        mesh.position.y = currentY[index];
        mesh.position.x = currentX[index];
        mesh.scale.x += (targetScale - mesh.scale.x) * 0.08;
        mesh.scale.z += (targetScale - mesh.scale.z) * 0.08;
      });

      const topMesh = meshes[meshes.length - 1];
      if (topMesh) {
        promptAnchorRotation.set(0, 0, topMesh.rotation.z * 0.72);
        const targetPromptPosition = promptAnchorOffset.clone().applyEuler(promptAnchorRotation);
        targetPromptPosition.add(topMesh.position);

        const targetPromptRotationX = Math.PI / 2 - 0.08 + topMesh.rotation.x * 0.35;
        const targetPromptRotationY = -0.1 + topMesh.rotation.y * 0.8;
        const targetPromptRotationZ = topMesh.rotation.z - 0.22;

        promptCurrentPosition.lerp(targetPromptPosition, 0.11);
        promptCurrentRotation.x += (targetPromptRotationX - promptCurrentRotation.x) * 0.11;
        promptCurrentRotation.y += (targetPromptRotationY - promptCurrentRotation.y) * 0.11;
        promptCurrentRotation.z += (targetPromptRotationZ - promptCurrentRotation.z) * 0.11;

        promptMesh.position.copy(promptCurrentPosition);
        promptMesh.rotation.set(
          promptCurrentRotation.x,
          promptCurrentRotation.y,
          promptCurrentRotation.z
        );
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearHoverReleaseTimeout();
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("click", onClick);
      element.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("resize", onResize);

      group.clear();
      renderer.dispose();
      texturesToDispose.forEach((texture) => texture.dispose());
      materialsToDispose.forEach((material) => material.dispose());
      geometriesToDispose.forEach((geometry) => geometry.dispose());

      if (element.contains(renderer.domElement)) {
        element.removeChild(renderer.domElement);
      }
    };
  }, [applyTapeTextureState, clearHoverReleaseTimeout]);

  const expandedTape = expanded !== null ? TAPES[expanded] : null;
  const expandedTrackNumber =
    expanded !== null ? String(getExpandableTrackNumber(expanded)).padStart(2, "0") : "01";
  const pageHeight = expandedTape ? "calc(100vh + 38rem)" : "calc(100vh + 24rem)";
  return (
    <div
      className="relative min-h-screen overflow-x-clip overflow-y-visible"
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: pageHeight,
      }}
    >
      <div
        className="w-full overflow-visible md:absolute md:inset-y-0 md:left-[10rem] md:right-0 md:w-auto lg:left-[12rem] xl:left-[14rem]"
        style={{ height: pageHeight }}
      >
        <div ref={mountRef} className="h-full w-full" />
      </div>
      {expandedTape ? (
        <ExpandedPanel
          tape={expandedTape}
          trackNumber={expandedTrackNumber}
          onClose={() => setExpanded(null)}
        />
      ) : (
        <EmptyPanel />
      )}
    </div>
  );
};

export default ExperienceStack;
