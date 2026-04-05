import { Clock3, ExternalLink, Github, Play } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import breadboardImage from "@/assets/breadboard.png";
import dermacareImage from "@/assets/dermacare.png";
import dillpklImage from "@/assets/dillpklImage.png";
import footprintImage from "@/assets/footprint.png";
import iClickImage from "@/assets/iclick.png";
import irrigationSystemImage from "@/assets/irrigationsystem.png";
import personalWebsiteImage from "@/assets/personal-website.png";
import recipeFinderImage from "@/assets/recipefinder.png";
import projectsHeader from "@/assets/projects-portfolio.png";

interface ProjectsProps {
  embedded?: boolean;
}

interface ProjectItem {
  title: string;
  imageUrl: string;
  subtitle: string;
  album: string;
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
    subtitle: "Machine Learning, Python, LLM",
    album: "AI Builds",
    dateAdded: "Jan 2026",
    githubUrl: "https://github.com/srijac9/dill.pkl",
    devpostUrl: "https://devpost.com/software/dill-pkl",
    videoUrl: "https://youtu.be/gd5_XDCytLc",
  },
  {
    title: "iClick",
    imageUrl: iClickImage,
    subtitle: "Python, Computer Vision, Machine Learning",
    album: "Hackathon Projects",
    dateAdded: "Dec 2025",
    githubUrl: "https://github.com/srijac9/iClick",
    devpostUrl: "https://devpost.com/software/iclick-4rynjv",
  },
  {
    title: "BREAD.board",
    imageUrl: breadboardImage,
    subtitle: "Python, TypeScript, LLM",
    album: "Hackathon Projects",
    dateAdded: "Nov 2025",
    githubUrl: "https://github.com/srijac9/nexhacks",
    devpostUrl: "https://devpost.com/software/circuit-build",
  },
  {
    title: "foot.print",
    imageUrl: footprintImage,
    subtitle: "Python, Blender, Computer Vision",
    album: "Hackathon Projects",
    dateAdded: "Oct 2025",
    githubUrl: "https://github.com/srijac9/foot.print",
    devpostUrl: "https://devpost.com/software/foot-print",
    videoUrl: "https://youtu.be/GHOyehbWS0U",
  },
  {
    title: "DermaCare",
    imageUrl: dermacareImage,
    subtitle: "Python, LLM, Web Scraping",
    album: "Hackathon Projects",
    dateAdded: "Sep 2025",
    githubUrl: "https://github.com/srijac9/DermaCare",
    devpostUrl: "https://devpost.com/software/secret-project-m6s25w",
    videoUrl: "https://youtu.be/j2ykAA4lfdY",
  },
  {
    title: "Soil Irrigation System",
    imageUrl: irrigationSystemImage,
    subtitle: "Hardware, C, Microcontrollers",
    album: "Embedded Builds",
    dateAdded: "May 2024",
    githubUrl: "https://github.com/srijac9/Soil-Irrigation-System",
  },
  {
    title: "Recipe Finder",
    imageUrl: recipeFinderImage,
    subtitle: "Python, Web Scraping",
    album: "Personal Builds",
    dateAdded: "Jan 2024",
    devpostUrl: "https://devpost.com/software/recipe-finder-xed0oz",
  },
  {
    title: "meet sri",
    imageUrl: personalWebsiteImage,
    subtitle: "TypeScript, CSS, Portfolio",
    album: "Personal Builds",
    dateAdded: "Mar 2026",
    githubUrl: "https://github.com/srijac9/meet-sri",
  },
];

const PlaylistRow = ({
  index,
  title,
  imageUrl,
  subtitle,
  album,
  dateAdded,
  githubUrl,
  devpostUrl,
  videoUrl,
}: PlaylistRowProps) => {
  return (
    <div className="group grid grid-cols-[2.75rem_4.5rem_minmax(0,1.45fr)_minmax(0,0.85fr)_minmax(0,0.9fr)_4.25rem] items-center gap-4 px-4 py-3 transition-colors duration-300 hover:bg-[#7c1f26]/18 sm:grid-cols-[3.25rem_4.75rem_minmax(0,1.65fr)_minmax(0,1fr)_minmax(0,1fr)_5rem] sm:px-6 sm:py-4">
      <div className="flex items-center justify-center">
        {videoUrl ? (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-9 items-center justify-center rounded-full border border-[#f5e6d3]/14 bg-[#f5e6d3]/8 text-paper/85 shadow-[0_10px_18px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105 hover:bg-[#f5e6d3]/14 hover:text-paper"
            title={`Play ${title}`}
            aria-label={`Play ${title} demo`}
          >
            <Play className="ml-0.5 size-[1.2rem]" fill="currentColor" />
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
        className="h-[4.1rem] w-[4.1rem] rounded-[0.45rem] object-cover shadow-[0_12px_24px_rgba(0,0,0,0.24)]"
        loading="lazy"
        width={66}
        height={66}
      />

      <div className="min-w-0">
        <p className="truncate font-handwritten text-[1.9rem] leading-none text-paper sm:text-[2rem]">
          {title}
        </p>
        <div className="mt-1 flex min-w-0 items-center gap-2 text-paper/62">
          {videoUrl ? (
            <span className="flex size-5 items-center justify-center rounded-[4px] border border-paper/25 bg-paper/5">
              <Play className="ml-[1px] size-2.5" fill="currentColor" />
            </span>
          ) : null}
          <p className="truncate font-sans text-[0.92rem] leading-tight text-paper/68 sm:text-[1rem]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <p className="truncate font-sans text-[1rem] text-paper/68 sm:text-[1.05rem]">
          {album}
        </p>
      </div>

      <div className="min-w-0">
        <span className="truncate font-sans text-[0.98rem] text-paper/72 sm:text-[1.02rem]">
          {dateAdded}
        </span>
      </div>

      <div className="flex items-center justify-end gap-4 text-paper/72 sm:gap-5">
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-paper"
            title="GitHub"
            aria-label={`Open ${title} on GitHub`}
          >
            <Github className="size-[1.05rem]" />
          </a>
        ) : null}

        {devpostUrl ? (
          <a
            href={devpostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-paper"
            title="Devpost"
            aria-label={`Open ${title} on Devpost`}
          >
            <ExternalLink className="size-[1.05rem]" />
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
            <div className="flex justify-start">
              <img
                src={projectsHeader}
                alt="Projects Portfolio"
                className="mt-20 block w-full max-w-[34rem] object-contain"
                style={{ height: "auto" }}
              />
            </div>

            <div className="mx-auto mt-8 w-full max-w-[72rem]">
            <div
              className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-paper/35 to-transparent"
              aria-hidden="true"
            />

              <div className="overflow-hidden bg-transparent">
                <div className="grid grid-cols-[2.75rem_4.5rem_minmax(0,1.45fr)_minmax(0,0.85fr)_minmax(0,0.9fr)_4.25rem] items-center gap-4 px-4 py-4 text-[0.72rem] tracking-[0.02em] text-paper/58 sm:grid-cols-[3.25rem_4.75rem_minmax(0,1.65fr)_minmax(0,1fr)_minmax(0,1fr)_5rem] sm:px-6">
                  <span className="text-center">#</span>
                  <span aria-hidden="true" />
                  <span className="font-sans text-[0.75rem] font-medium">Title</span>
                  <span className="font-sans text-[0.75rem] font-medium">Album</span>
                  <span className="font-sans text-[0.75rem] font-medium">Date added</span>
                  <span className="flex items-center justify-end">
                    <Clock3 className="size-[0.95rem] stroke-[1.8]" />
                  </span>
                </div>

                <div>
                  {projectItems.map((project, index) => (
                    <PlaylistRow
                      key={project.title}
                      index={index + 1}
                      title={project.title}
                      imageUrl={project.imageUrl}
                      subtitle={project.subtitle}
                      album={project.album}
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
