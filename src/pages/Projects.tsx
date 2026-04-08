import { Clock3, Play } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import breadboardImage from "@/assets/breadboard.png";
import dermacareImage from "@/assets/dermacare.png";
import dillpklImage from "@/assets/dillpklImage.png";
import devpostIconImage from "@/assets/devpost.png";
import footprintImage from "@/assets/footprint.png";
import githubIconImage from "@/assets/github.png";
import iClickImage from "@/assets/iclick.png";
import irrigationSystemImage from "@/assets/irrigationsystem.png";
import personalWebsiteImage from "@/assets/personal-website.png";
import playlistGif from "@/assets/playlist.gif";
import recipeFinderImage from "@/assets/recipefinder.png";
import projectsHeader from "@/assets/projects-portfolio.png";

interface ProjectsProps {
  embedded?: boolean;
}

interface ProjectItem {
  title: string;
  imageUrl: string;
  subtitle: string;
  dateAdded: string;
  githubUrl?: string;
  devpostUrl?: string;
  videoUrl?: string;
}

interface PlaylistRowProps extends ProjectItem {
  index: number;
}

const projectItems: ProjectItem[] = [
  {
    title: "dill.pkl",
    imageUrl: dillpklImage,
    subtitle:
      "An agent-based AutoML web app that automates and explains the end-to-end machine learning pipeline from raw data to deployment.",
    dateAdded: "March 2026",
    githubUrl: "https://github.com/srijac9/dill.pkl",
    devpostUrl: "https://devpost.com/software/dill-pkl",
    videoUrl: "https://youtu.be/gd5_XDCytLc",
  },
  {
    title: "iClick",
    imageUrl: iClickImage,
    subtitle:
      "An accessibility app that enables hands-free computer navigation using eye tracking, blink gestures, and voice input.",
    dateAdded: "Feb 2026",
    githubUrl: "https://github.com/srijac9/iClick",
    devpostUrl: "https://devpost.com/software/iclick-4rynjv",
  },
  {
    title: "BREAD.board",
    imageUrl: breadboardImage,
    subtitle:
      "An interactive learning tool that uses a live camera feed and real-time voice guidance to help users build circuits on a breadboard step by step.",
    dateAdded: "Jan 2026",
    githubUrl: "https://github.com/srijac9/nexhacks",
    devpostUrl: "https://devpost.com/software/circuit-build",
  },
  {
    title: "foot.print",
    imageUrl: footprintImage,
    subtitle:
      "An AI tool that redesigns your room using Feng Shui principles and generates a 3D layout from a video scan.",
    dateAdded: "July 2025",
    githubUrl: "https://github.com/srijac9/foot.print",
    devpostUrl: "https://devpost.com/software/foot-print",
    videoUrl: "https://youtu.be/GHOyehbWS0U",
  },
  {
    title: "DermaCare",
    imageUrl: dermacareImage,
    subtitle:
      "A skincare app that scans and analyzes product ingredients and provides AI-powered recommendations based on your skin type.",
    dateAdded: "June 2025",
    githubUrl: "https://github.com/srijac9/DermaCare",
    devpostUrl: "https://devpost.com/software/secret-project-m6s25w",
    videoUrl: "https://youtu.be/j2ykAA4lfdY",
  },
  {
    title: "Soil Irrigation System",
    imageUrl: irrigationSystemImage,
    subtitle:
      "A microcontroller-based irrigation system that monitors soil moisture and automatically waters plants when needed.",
    dateAdded: "Dec 2024",
    githubUrl: "https://github.com/srijac9/Soil-Irrigation-System",
  },
  {
    title: "Recipe Finder",
    imageUrl: recipeFinderImage,
    subtitle:
      "A web app that finds recipes based on the user's cravings and desired ingredients.",
    dateAdded: "Dec 2022",
    devpostUrl: "https://devpost.com/software/recipe-finder-xed0oz",
  },
  {
    title: "meet sri",
    imageUrl: personalWebsiteImage,
    subtitle:
      "My personal website for sharing my projects, experiences, and photos.",
    dateAdded: "Mar 2026",
    githubUrl: "https://github.com/srijac9/meet-sri",
  },
];

const PlaylistRow = ({
  index,
  title,
  imageUrl,
  subtitle,
  dateAdded,
  githubUrl,
  devpostUrl,
  videoUrl,
}: PlaylistRowProps) => {
  return (
    <div className="group relative grid grid-cols-[3.3rem_6.5rem_minmax(0,1.7fr)_minmax(0,0.9fr)_6.75rem] items-center gap-6 border border-transparent px-4 py-5 transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:scale-[1.012] hover:border-[#f5e6d3]/10 hover:bg-[#892129]/24 hover:shadow-[0_24px_48px_rgba(34,4,6,0.34),0_0_26px_rgba(34,4,6,0.16)] sm:grid-cols-[4rem_7.25rem_minmax(0,2.15fr)_minmax(0,0.95fr)_9rem] sm:px-6 sm:py-6">
      <div className="flex items-center justify-center">
        {videoUrl ? (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-full border border-[#f5e6d3]/14 bg-[#f5e6d3]/8 text-paper/85 shadow-[0_10px_18px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105 hover:bg-[#f5e6d3]/14 hover:text-paper sm:size-12"
            title={`Play ${title}`}
            aria-label={`Play ${title} demo`}
          >
            <Play className="ml-0.5 size-[1.45rem] sm:size-[1.55rem]" fill="currentColor" />
          </a>
        ) : (
          <span className="font-typewriter text-[1.05rem] tracking-[0.08em] text-paper/68 transition-colors duration-300 group-hover:text-paper/92">
            {index}
          </span>
        )}
      </div>

      <img
        src={imageUrl}
        alt={title}
        className="h-[6.25rem] w-[6.25rem] rounded-[0.65rem] object-cover shadow-[0_14px_28px_rgba(0,0,0,0.26)] transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_18px_36px_rgba(0,0,0,0.34)] sm:h-[7rem] sm:w-[7rem]"
        loading="lazy"
        width={112}
        height={112}
      />

      <div className="min-w-0">
        <p className="truncate font-handwritten text-[2.35rem] leading-none text-paper transition-transform duration-300 ease-out group-hover:translate-x-1 sm:text-[2.7rem]">
          {title}
        </p>
        <div className="mt-1.5 min-w-0 text-paper/62">
          <p className="overflow-hidden pb-0.5 font-sans text-[0.96rem] leading-[1.32] text-paper/68 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:text-[1.04rem] sm:leading-[1.36]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <span className="truncate font-sans text-[1.12rem] text-paper/72 sm:text-[1.22rem]">
          {dateAdded}
        </span>
      </div>

      <div className="flex items-center justify-end gap-4 text-paper/72 sm:gap-5">
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-none"
            title="GitHub"
            aria-label={`Open ${title} on GitHub`}
          >
            <img
              src={githubIconImage}
              alt=""
              className="h-[4.5rem] w-[4.5rem] cursor-pointer object-contain opacity-82 drop-shadow-[0_10px_14px_rgba(0,0,0,0.2)] transition-[opacity,filter] duration-300 ease-out group-hover:[animation:playlist-link-float_2.6s_cubic-bezier(0.4,0,0.2,1)_infinite] group-hover:opacity-100 group-hover:drop-shadow-[0_18px_28px_rgba(0,0,0,0.4)] hover:opacity-100 hover:drop-shadow-[0_20px_32px_rgba(0,0,0,0.45)] sm:h-[5.5rem] sm:w-[5.5rem]"
              loading="lazy"
              width={88}
              height={88}
            />
          </a>
        ) : null}

        {devpostUrl ? (
          <a
            href={devpostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-none"
            title="Devpost"
            aria-label={`Open ${title} on Devpost`}
          >
            <img
              src={devpostIconImage}
              alt=""
              className="h-[4.5rem] w-[4.5rem] cursor-pointer object-contain opacity-82 drop-shadow-[0_10px_14px_rgba(0,0,0,0.2)] transition-[opacity,filter] duration-300 ease-out group-hover:[animation:playlist-link-float_2.6s_cubic-bezier(0.4,0,0.2,1)_infinite] group-hover:opacity-100 group-hover:drop-shadow-[0_18px_28px_rgba(0,0,0,0.4)] hover:opacity-100 hover:drop-shadow-[0_20px_32px_rgba(0,0,0,0.45)] sm:h-[5.5rem] sm:w-[5.5rem]"
              loading="lazy"
              width={88}
              height={88}
            />
          </a>
        ) : null}
      </div>
    </div>
  );
};

const Projects = ({ embedded = false }: ProjectsProps) => {
  const Shell = embedded ? "div" : PageEdgeShadow;

  return (
    <div
      className="relative min-h-screen overflow-x-clip"
      style={{
        background: embedded ? "transparent" : "#5a0d13",
      }}
    >
      {!embedded ? <FloatingHearts /> : null}

      <Shell
        className={`relative z-10 min-h-screen w-full ${embedded ? "" : "mx-auto max-w-[1380px]"}`}
      >
        {!embedded ? (
          <div className="absolute inset-x-0 top-6 z-20 px-6 md:px-12 lg:px-16">
            <Link
              to="/"
              className="ml-5 mt-2 inline-flex rounded-full border border-paper/30 bg-background/65 px-4 py-2 text-lg font-handwritten text-paper backdrop-blur-sm transition-colors hover:text-paper/80"
            >
              {"<"} back home
            </Link>
          </div>
        ) : null}

        <div className={`px-6 pb-12 md:px-12 lg:px-16 ${embedded ? "pt-16 md:pt-20" : "pt-24"}`}>
          <div className="mx-auto max-w-[1280px]">
            <div className="flex w-full items-end justify-between gap-6 sm:gap-8">
              <img
                src={projectsHeader}
                alt="Projects Portfolio"
                className="mt-20 block w-full max-w-[36rem] object-contain xl:max-w-[40rem]"
                style={{ height: "auto" }}
              />
              <div className="-ml-2 mt-16 hidden shrink-0 -translate-y-[10px] sm:-ml-3 sm:block lg:-ml-5">
                <img
                  src={playlistGif}
                  alt="Playlist"
                  className="w-[14rem] object-contain sm:w-[18rem] md:w-[23rem] lg:w-[30rem] xl:w-[34rem]"
                  draggable={false}
                />
                <p className="mt-4 text-center font-typewriter text-[0.72rem] uppercase tracking-[0.28em] text-paper/78 sm:text-[0.76rem]">
                  scan spotify code for my playlist :)
                </p>
              </div>
            </div>

            <div className="mt-8 w-full">
            <div
              className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-paper/35 to-transparent"
              aria-hidden="true"
            />

              <div className="bg-transparent">
                <div className="px-2 sm:px-3">
                  <div className="grid grid-cols-[3.3rem_6.5rem_minmax(0,1.7fr)_minmax(0,0.9fr)_6.75rem] items-center gap-6 px-4 py-4 text-[0.95rem] tracking-[0.02em] text-paper/60 sm:grid-cols-[4rem_7.25rem_minmax(0,2.15fr)_minmax(0,0.95fr)_9rem] sm:px-6 sm:text-[1.02rem]">
                    <span className="text-center">#</span>
                    <span aria-hidden="true" />
                    <span className="font-sans text-[0.88rem] font-medium sm:text-[0.96rem]">Title</span>
                    <span className="font-sans text-[0.88rem] font-medium sm:text-[0.96rem]">Date added</span>
                    <span className="flex items-center justify-end">
                      <Clock3 className="size-[1.05rem] stroke-[1.8] sm:size-[1.12rem]" />
                    </span>
                  </div>
                </div>

                <div className="space-y-2 px-2 py-2 sm:px-3">
                  {projectItems.map((project, index) => (
                    <PlaylistRow
                      key={project.title}
                      index={index + 1}
                      title={project.title}
                      imageUrl={project.imageUrl}
                      subtitle={project.subtitle}
                      dateAdded={project.dateAdded}
                      githubUrl={project.githubUrl}
                      devpostUrl={project.devpostUrl}
                      videoUrl={project.videoUrl}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default Projects;
