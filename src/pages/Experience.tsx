import { Link } from "react-router-dom";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import ExperienceStack from "@/components/ExperienceStack";
import experienceTitle from "@/assets/experience-title.png";
import workTitle from "@/assets/work-title.png";

const Experience = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#efe2c7]">
      <PageEdgeShadow className="relative z-10 mx-auto min-h-screen w-full max-w-[1380px]">
        <div className="absolute inset-x-0 top-6 z-20 px-6 md:px-12 lg:px-16">
          <Link
            to="/"
            className="ml-5 mt-2 inline-flex rounded-full border border-burgundy-dark/30 bg-paper/75 px-4 py-2 text-lg font-handwritten text-burgundy-dark backdrop-blur-sm transition-colors hover:text-burgundy"
          >
            {"<"} back home
          </Link>
        </div>

        <div className="pointer-events-none absolute left-0 top-20 z-[15] w-full px-6 md:top-24 md:w-[28rem] md:px-10 lg:top-28 lg:w-[34rem] lg:px-14">
          <div className="flex flex-col items-start text-left">
            <img
              src={workTitle}
              alt="Work"
              className="relative z-10 w-[11.5rem] drop-shadow-[0_10px_24px_rgba(47,12,14,0.18)] md:w-[14rem] lg:w-[16rem]"
              draggable={false}
            />
            <img
              src={experienceTitle}
              alt="Experience"
              className="-mt-1.5 w-[24rem] max-w-none drop-shadow-[0_12px_28px_rgba(47,12,14,0.22)] md:-mt-2 md:w-[30rem] lg:-mt-3 lg:w-[34rem]"
              draggable={false}
            />
          </div>
        </div>

        <ExperienceStack />
      </PageEdgeShadow>
    </div>
  );
};

export default Experience;
