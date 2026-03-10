import { Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import meetMeTitle from "@/assets/MeetMe.png";

const About = () => {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="relative min-h-screen bg-paper text-burgundy-dark overflow-x-hidden">
      <FloatingHearts fillColor="rgba(139, 58, 58, 0.35)" />

      <Link
        to="/"
        className="absolute top-8 left-8 z-20 text-burgundy-dark hover:text-burgundy transition-colors font-handwritten text-xl"
      >
        {"<- back home"}
      </Link>

      <div className="relative z-10 pt-16 md:pt-16 pb-1">
        <header className="w-full flex flex-col items-center gap-0.5 pb-1">
          <div className="w-full px-4 md:px-8">
            <div className="h-[3px] w-full bg-[#3a0a0f]" />
            <div className="h-px w-full bg-[#3a0a0f]/70 mt-1" />
          </div>

          <div className="w-full flex items-center justify-between px-4 md:px-8 pt-0.5">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c4a882]">
              Est. 2025
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c4a882]">
              Personal Edition
            </span>
          </div>

          <div className="w-full flex justify-center py-0.5">
            <div className="w-[320px] md:w-[460px] h-[84px] md:h-[110px] overflow-hidden">
              <img
                src={meetMeTitle}
                alt="Meet Me"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-between px-4 md:px-8 pt-0.5">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c4a882]">
              Vol. I, No. 1
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c4a882]">
              {today}
            </span>
          </div>

          <div className="w-full px-4 md:px-8 pt-0.5">
            <div className="h-px w-full bg-[#3a0a0f]/70" />
            <div className="h-[3px] w-full bg-[#3a0a0f] mt-1" />
          </div>
        </header>
      </div>
    </main>
  );
};

export default About;
