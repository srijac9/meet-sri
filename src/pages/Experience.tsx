import { Link } from "react-router-dom";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import ExperienceStack from "@/components/ExperienceStack";
import experienceTitle from "@/assets/experience-title.png";
import workTitle from "@/assets/work-title.png";

interface ExperienceProps {
  embedded?: boolean;
}

const Experience = ({ embedded = false }: ExperienceProps) => {
  const Shell = embedded ? "div" : PageEdgeShadow;
  return (
    <div className={`relative min-h-screen overflow-x-clip ${embedded ? "bg-transparent" : "bg-[#efe2c7]"}`}>
      <Shell
        className={`relative z-10 min-h-screen w-full ${embedded ? "" : "mx-auto max-w-[1380px]"}`}
      >
        {!embedded ? (
          <div className="absolute inset-x-0 top-6 z-20 px-6 md:px-12 lg:px-16">
            <Link
              to="/"
              className="ml-5 mt-2 inline-flex rounded-full border border-burgundy-dark/30 bg-paper/75 px-4 py-2 text-lg font-handwritten text-burgundy-dark backdrop-blur-sm transition-colors hover:text-burgundy"
            >
              {"<"} back home
            </Link>
          </div>
        ) : null}

        <div className={`pointer-events-none absolute left-0 z-[15] w-full px-6 md:w-[28rem] md:px-10 lg:w-[34rem] lg:px-14 ${embedded ? "top-10 md:top-14 lg:top-16" : "top-20 md:top-24 lg:top-28"}`}>
          <div className="flex flex-col items-start text-left">
            <img
              src={workTitle}
              alt="Work"
              className="relative z-10 w-[13.75rem] drop-shadow-[0_10px_24px_rgba(47,12,14,0.18)] md:w-[17rem] lg:w-[20rem]"
              draggable={false}
            />
            <img
              src={experienceTitle}
              alt="Experience"
              className="-mt-2.5 w-[28.5rem] max-w-none drop-shadow-[0_12px_28px_rgba(47,12,14,0.22)] md:-mt-3 md:w-[36rem] lg:-mt-3.5 lg:w-[41rem]"
              draggable={false}
            />
          </div>
        </div>

        <ExperienceStack />
      </Shell>
    </div>
  );
};

export default Experience;
