import { Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import MusicPlayerCard from "@/components/MusicPlayerCard";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p9 from "@/assets/p9.jpg";
import p10 from "@/assets/p10.jpg";
import projectsHeader from "@/assets/projects-portfolio.png";

const projectItems = [
  { title: "Portfolio Site", subtitle: "React - Tailwind", imageUrl: p1 },
  { title: "Photo Journal", subtitle: "Three.js - Shader", imageUrl: p2 },
  { title: "Music Visualizer", subtitle: "Canvas - Audio API", imageUrl: p3 },
  { title: "Task Flow", subtitle: "TypeScript - UX", imageUrl: p4 },
  { title: "Weather Board", subtitle: "API - Components", imageUrl: p5 },
  { title: "Campus Map", subtitle: "Data Viz - UI", imageUrl: p6 },
  { title: "Movie Finder", subtitle: "Search - Filters", imageUrl: p9 },
  { title: "Recipe Lab", subtitle: "State - Design", imageUrl: p10 },
];

const Projects = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <FloatingHearts />

      <div className="relative z-10 min-h-screen py-12">
        <Link
          to="/"
          className="absolute left-6 top-6 z-20 rounded-full border border-paper/30 bg-background/65 px-4 py-2 text-lg font-handwritten text-paper backdrop-blur-sm transition-colors hover:text-paper/80"
        >
          {"<"} back home
        </Link>

        <div className="mt-24" style={{ paddingLeft: "2rem" }}>
          <img
            src={projectsHeader}
            alt="Projects Portfolio"
            className="mb-8 block object-contain"
            style={{ width: "30rem", maxWidth: "50rem", height: "auto" }}
          />
        </div>

        <div className="mt-4 w-full px-4">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectItems.map((project) => (
              <MusicPlayerCard
                key={project.title}
                title={project.title}
                subtitle={project.subtitle}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
