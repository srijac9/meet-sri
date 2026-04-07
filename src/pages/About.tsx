import { Link } from "react-router-dom";
import { useState } from "react";
import AboutDiscPlayer from "@/components/AboutDiscPlayer";
import FloatingHearts from "@/components/FloatingHearts";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import SongFindFeature from "@/components/SongFindFeature";
import aboutMeAnimation from "@/assets/about-me-animation.gif";
import chitturiTitle from "@/assets/CHITTURI.png";
import contactMeImage from "@/assets/contact-me.png";
import githubImage from "@/assets/github.png";
import linkedinImage from "@/assets/linkedin.png";
import srijaTitle from "@/assets/SRIJA.png";

interface AboutProps {
  embedded?: boolean;
}

const bioParagraphs = [
  "I'm a Computer Engineering student at the University of Waterloo and an aspiring Software Engineer with a passion for Full-Stack development and AI. I can never sit still, and I'm always building or creating something, from coding projects and exploring new technologies to experimenting with different forms of art. I'm currently expanding my Full-Stack background into AI Engineering, leveraging Python and Machine Learning to integrate intelligence into my builds and push the boundaries of what can be created.",
  "Outside of coding, I love fashion and shopping, so I decided to combine the two. When I was younger, I would randomly design clothes, so now I'm working on a project that lets me sketch clothing designs and automatically convert them into 3D models. It's been really exciting to bring those childhood ideas to life. I also enjoy travelling, photography, playing sports, gaming, and trying random hobbies.",
];

const About = ({ embedded = false }: AboutProps) => {
  const [isDiscPlaying, setIsDiscPlaying] = useState(false);
  const Shell = embedded ? "div" : PageEdgeShadow;

  return (
    <main
      className={`relative min-h-screen overflow-x-clip text-burgundy-dark ${embedded ? "bg-transparent" : "bg-paper"}`}
    >
      {!embedded ? <FloatingHearts fillColor="rgba(139, 58, 58, 0.35)" /> : null}

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

        <section
          className={`relative z-10 px-6 md:px-12 lg:px-16 ${embedded ? "pt-0 pb-12 md:pt-0" : "pt-32 pb-20 md:pt-40"}`}
        >
          {embedded ? (
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden overflow-visible xl:block">
              <div className="mx-auto max-w-[1280px]">
                <div className="relative h-[23rem]">
                  <div className="pointer-events-auto absolute right-[-5.5rem] top-[-1.75rem] z-30 opacity-80 2xl:right-[-3.5rem]">
                    <SongFindFeature className="w-[63rem]" height={360} centerXOffset={-40} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="relative mx-auto max-w-[1280px] space-y-0">
            <div className="pointer-events-none relative z-40 mb-[-0.75rem] flex select-none justify-start lg:mb-[-1rem]">
              <div className="flex w-full max-w-[80rem] flex-col items-start gap-1 overflow-hidden sm:gap-2 md:gap-3">
                <img
                  src={srijaTitle}
                  alt="Srija"
                  className="h-auto w-[10.5rem] min-w-0 object-contain sm:w-[13.5rem] md:w-[16.5rem] lg:w-[20rem] xl:w-[23rem]"
                  draggable={false}
                />
                <img
                  src={chitturiTitle}
                  alt="Chitturi"
                  className="h-auto w-[16.5rem] min-w-0 object-contain sm:w-[22rem] md:w-[27rem] lg:w-[32rem] xl:w-[37rem]"
                  draggable={false}
                />
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 items-start gap-10 sm:grid-cols-[minmax(18rem,26rem)_minmax(0,1fr)] lg:min-h-[68vh] lg:grid-cols-[minmax(22rem,34rem)_minmax(0,1fr)] lg:gap-20">
              <div className="flex w-full flex-col items-center gap-5 sm:items-start">
                <AboutDiscPlayer embedded={embedded} onPlayStateChange={setIsDiscPlaying} />
              </div>

              <div
                className="mt-12 w-full min-w-0 self-start sm:mt-13 sm:border-l sm:border-burgundy-dark/20 sm:pl-8 lg:mt-[3.75rem] lg:pl-12"
              >
                {isDiscPlaying ? (
                  <div className="w-full overflow-hidden">
                    <img
                      src={aboutMeAnimation}
                      className="block h-auto w-full"
                      alt="About me animation"
                      draggable={false}
                    />
                  </div>
                ) : (
                  <div className="space-y-8">
                    {bioParagraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className={`max-w-[44rem] font-sans text-left text-[1rem] leading-[1.75] md:text-[1.06rem] ${embedded ? "text-paper/90" : "text-[#1f1110]"}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="mt-10 flex w-full flex-col gap-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
              <div className="w-full max-w-[40rem] sm:max-w-[42rem] lg:max-w-[46rem]">
                <img
                  src={contactMeImage}
                  alt="Contact me"
                  className="h-auto w-full object-contain"
                  draggable={false}
                />
              </div>

              <div className="flex items-center justify-end gap-4 self-end sm:self-center lg:gap-5">
                <a
                  href="https://github.com/srijac9"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Srija's GitHub profile"
                  className="group transition-transform duration-300 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none"
                >
                  <img
                    src={githubImage}
                    alt="GitHub"
                    className="h-auto w-[4.5rem] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.34)] sm:w-[5rem] lg:w-[6.5rem]"
                    draggable={false}
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/srijachitturi06"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Srija's LinkedIn profile"
                  className="group transition-transform duration-300 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none"
                >
                  <img
                    src={linkedinImage}
                    alt="LinkedIn"
                    className="h-auto w-[4.5rem] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.34)] sm:w-[5rem] lg:w-[6.5rem]"
                    draggable={false}
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </Shell>
    </main>
  );
};

export default About;
