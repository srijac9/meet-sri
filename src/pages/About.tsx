import { useState } from "react";
import { Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import SudokuPanel from "@/components/SudokuPanel";
import chitturiTitle from "@/assets/CHITTURI.png";
import srijaDrawing from "@/assets/srija-drawing.png";
import srijaTitle from "@/assets/SRIJA.png";

const About = () => {
  const [expandedSkills, setExpandedSkills] = useState<string[]>([]);
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const leftColumnParagraphs = [
    "I'm a Computer Engineering student at the University of Waterloo and an aspiring Software Engineer with a passion for Full-Stack development and AI. I can never sit still, and I'm always building or creating something, from coding projects and exploring new technologies to experimenting with different forms of art.",
    "I'm currently expanding my Full-Stack background into AI Engineering, leveraging Python and Machine Learning to integrate intelligence into my builds and push the boundaries of what can be created.",
  ];

  const rightColumnParagraphs = [
    "Outside of coding, I love fashion and shopping, so I decided to combine the two. When I was younger, I would randomly design clothes, so now I'm working on a project that lets me sketch clothing designs and automatically convert them into 3D models. It's been really exciting to bring those childhood ideas to life.",
    "I also enjoy travelling, photography (if that wasn't already clear), playing sports, gaming, and taking on creative projects. If you share any of these interests, feel free to connect with me on LinkedIn at the bottom of the page!",
  ];

  const skillAds = [
    {
      icon: "AI",
      title: "Artificial Intelligence",
      description:
        "I've been exploring AI systems, especially how LLMs and agent-based workflows can be used in real-world applications.",
      footer: "",
    },
    {
      icon: "ML",
      title: "Machine Learning",
      description:
        "I've had experience developing ML pipelines, from working with raw data to training and improving models.",
      footer: "",
    },
    {
      icon: "</>",
      title: "Full-Stack Development",
      description:
        "I enjoy building full-stack applications, handling everything from frontend interfaces to backend logic and APIs.",
      footer: "",
    },
    {
      icon: "UX",
      title: "UI/UX Design",
      description:
        "I love designing clean and intuitive interfaces that are both visually appealing and easy to use.",
      footer: "",
    },
  ];

  const sidebarClippings = [
    {
      title: "Study Spot in Waterloo",
      text: "E7 Windows",
    },
    {
      title: "Season I Love Dressing For",
      text: "Fall",
    },
    {
      title: "Favorite Thing to Photograph",
      text: "Building architecture",
    },
    {
      title: "Random Obsession I Had",
      text: "DIY fuse bead earrings",
    },
    {
      title: "A Place I Want to Visit",
      text: "Cappadocia, Turkey",
    },
    {
      title: "Recent Puzzle Obsession",
      text: "Sudoku",
    },
  ];

  const fadedRule = {
    background:
      "linear-gradient(90deg, rgba(58,10,15,0) 0%, rgba(58,10,15,0.95) 10%, rgba(58,10,15,1) 50%, rgba(58,10,15,0.95) 90%, rgba(58,10,15,0) 100%)",
  } as const;

  const fadedThinRule = {
    background:
      "linear-gradient(90deg, rgba(58,10,15,0) 0%, rgba(58,10,15,0.55) 12%, rgba(58,10,15,0.75) 50%, rgba(58,10,15,0.55) 88%, rgba(58,10,15,0) 100%)",
  } as const;

  const toggleSkill = (title: string) => {
    setExpandedSkills((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  };

  const getSkillDetailsId = (title: string) =>
    `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-details`;

  return (
    <main className="relative min-h-screen bg-paper text-burgundy-dark overflow-x-hidden">
      <FloatingHearts fillColor="rgba(139, 58, 58, 0.35)" />

      <PageEdgeShadow className="relative z-10 mx-auto min-h-screen w-full max-w-[1380px]">
        <div className="absolute inset-x-0 top-6 z-20 px-6 md:px-12 lg:px-16">
          <Link
            to="/"
            className="ml-5 mt-2 inline-flex rounded-full border border-burgundy-dark/30 bg-paper/75 px-4 py-2 text-lg font-handwritten text-burgundy-dark backdrop-blur-sm transition-colors hover:text-burgundy"
          >
            {"<"} back home
          </Link>
        </div>

      <div className="relative z-10 px-6 pt-32 pb-3 md:px-12 md:pt-40 lg:px-16">
        <header className="flex w-full flex-col items-center gap-1 pb-3">
          <div className="w-full">
            <div
              className="h-[2px] w-full"
              style={fadedRule}
            />
            <div
              className="mt-1 h-px w-full"
              style={fadedThinRule}
            />
          </div>

          <div className="flex w-full items-center justify-between pt-2">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c4a882]">
              Est. 2025
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c4a882]">
              Personal Edition
            </span>
          </div>

          <div className="flex w-full justify-center py-5 md:py-7">
            <div className="relative flex flex-col items-center text-[#140606]">
              <p className="font-handwritten text-base leading-none text-[#5b2620] md:text-lg">
                Spotlight On
              </p>
              <div className="mt-1 mx-auto flex w-fit items-center justify-center gap-3 md:gap-5">
                <img
                  src={srijaTitle}
                  alt="Srija"
                  className="h-auto w-[18rem] object-contain md:w-[28rem]"
                  draggable={false}
                />

                <div
                  className="flex shrink-0 items-center gap-1.5 text-[#140606] md:gap-2"
                  aria-hidden="true"
                >
                  <span className="block rotate-[-10deg]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.7] md:h-7 md:w-7">
                      <path d="M12 2.5 14.7 9l6.8.5-5.2 4.4 1.7 6.6L12 16.7l-6 3.8 1.7-6.6-5.2-4.4 6.8-.5Z" />
                    </svg>
                  </span>
                  <span className="block translate-y-1">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current md:h-4.5 md:w-4.5">
                      <path d="m12 3 2.1 5.4L20 11l-5.1 3.4L16.5 20 12 16.9 7.5 20l1.6-5.6L4 11l5.9-2.6Z" />
                    </svg>
                  </span>
                  <span className="block rotate-[12deg]">
                    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-none stroke-current stroke-[1.7] md:h-6 md:w-6">
                      <path d="M12 2.5 14.7 9l6.8.5-5.2 4.4 1.7 6.6L12 16.7l-6 3.8 1.7-6.6-5.2-4.4 6.8-.5Z" />
                    </svg>
                  </span>
                </div>

                <img
                  src={chitturiTitle}
                  alt="Chitturi"
                  className="h-auto w-[30rem] object-contain md:w-[40rem]"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between pt-2">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c4a882]">
              Vol. I, No. 1
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c4a882]">
              {today}
            </span>
          </div>

          <div className="w-full pt-2">
            <div
              className="h-px w-full"
              style={fadedThinRule}
            />
            <div
              className="mt-1 h-[2px] w-full"
              style={fadedRule}
            />
          </div>
        </header>
      </div>

      <div className="relative z-10 px-6 pb-16 md:px-12 lg:px-16">
      <section>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
          <figure className="mx-auto w-full max-w-[28rem] space-y-3 lg:mx-0">
            <div
              className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] border-[3px] border-[#140606] bg-transparent"
              aria-label="Srija drawing"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={srijaDrawing}
                  alt="Illustration of Srija"
                  className="h-full w-full object-contain"
                  style={{ transform: "translateY(1%) scale(1.03)" }}
                  draggable={false}
                />
              </div>
            </div>
            <figcaption className="font-typewriter text-xs leading-snug text-[#2a0908]">
              A drawing of me!
            </figcaption>
          </figure>

          <article className="pt-1">
            <div className="flex items-start justify-between gap-4">
              <p className="font-handwritten text-2xl leading-none text-[#2a0908] md:text-4xl">
                Exclusive!
              </p>
              <p className="pt-1 text-right font-typewriter text-[11px] uppercase tracking-[0.22em] text-[#2a0908] md:text-xs">
                Find me next to a laptop and an ICED Cappucino
              </p>
            </div>

            <h2 className="mt-4 w-full text-center text-[2.35rem] font-black not-italic uppercase leading-[1.02] tracking-[0.28em] text-[#140606] sm:text-[2.9rem] md:text-[3.4rem]">
              About Me
            </h2>

            <div className="mt-5">
              <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                <div className="space-y-4">
                  {leftColumnParagraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-serif text-[1.02rem] leading-[1.45] text-[#1f1110]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="space-y-4">
                  {rightColumnParagraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-serif text-[1.02rem] leading-[1.45] text-[#1f1110]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        <section className="mt-14">
          <div className="mb-5 w-full">
            <div className="h-[2px] w-full" style={fadedRule} />
            <div className="bg-paper px-6 py-2 text-center">
              <h3 className="text-[2.1rem] font-black not-italic uppercase leading-[1.02] tracking-[0.24em] text-[#140606] md:text-[2.7rem]">
                Interests & Technologies
              </h3>
            </div>
            <div className="h-[2px] w-full" style={fadedRule} />
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {skillAds.map((skill) => (
              <article
                key={skill.title}
                className="rounded-[1.35rem] border-[3px] border-[#140606] bg-paper px-4 py-5 shadow-[inset_0_0_0_2px_rgba(20,6,6,0.08)]"
              >
                <button
                  type="button"
                  onClick={() => toggleSkill(skill.title)}
                  className="grid w-full grid-cols-[4.5rem_1fr_auto] items-start gap-3 text-left"
                  aria-expanded={expandedSkills.includes(skill.title)}
                  aria-controls={getSkillDetailsId(skill.title)}
                >
                  <div className="flex items-start justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#140606] text-[#140606]">
                      <span className="font-typewriter text-lg font-bold leading-none">
                        {skill.icon}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <h4 className="text-[1.05rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.18em] text-[#140606] md:text-[1.15rem]">
                      {skill.title}
                    </h4>
                  </div>

                  <div className="flex justify-end pt-1">
                    <span
                      className={`flex h-9 w-9 items-center justify-center font-handwritten text-[2.2rem] leading-none text-[#5b2620] transition-transform duration-200 ${
                        expandedSkills.includes(skill.title) ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                </button>

                {expandedSkills.includes(skill.title) ? (
                  <div
                    id={getSkillDetailsId(skill.title)}
                    className="ml-1 mt-4 pr-2"
                  >
                    <p className="font-serif text-[0.98rem] leading-relaxed text-[#5b2620] md:text-[1.02rem]">
                      {skill.description}
                    </p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
          <div className="rounded-[1.35rem] border-[3px] border-[#140606] bg-paper px-5 py-4">
            <p className="ml-6 mt-4 font-handwritten text-2xl leading-tight text-[#2a0908] md:ml-8 md:text-3xl">
              "Look good, feel good, do good."
            </p>
            <p className="mt-3 pr-2 text-right font-typewriter text-xs uppercase tracking-[0.22em] text-[#5b2620]">
              - Srija Chitturi
            </p>
          </div>

            <div className="pt-4">
              <div className="mb-4 h-[2px] w-full" style={fadedRule} />
              <p className="text-[1.95rem] font-black not-italic uppercase leading-[1.02] tracking-[0.22em] text-[#140606] md:text-[2.5rem]">
                A Quote I Live By
              </p>
            <p className="mt-3 font-serif text-base leading-relaxed text-[#1f1110]">
              If I&apos;m ever nervous, I put on nice clothes, get ready, feel
              good, and I do better than I anticipated.
            </p>
          </div>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.42fr_1fr]">
          <aside className="rounded-[1.35rem] border-[3px] border-[#140606] bg-paper px-4 py-5">
            <div className="pb-2 text-center">
              <h4 className="text-[1.35rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.24em] text-[#140606]">
                Random Favorites
              </h4>
              <p className="mt-1 font-typewriter text-[10px] uppercase tracking-[0.22em] text-[#5b2620]">
                Personal Picks
              </p>
              <div className="mt-3 h-[2px] w-full" style={fadedRule} />
            </div>

            <div className="mt-4 space-y-4">
              {sidebarClippings.map((item) => (
                <div key={item.title} className="pb-4 last:pb-0">
                  <p className="text-[1rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.2em] text-[#140606]">
                    {item.title}
                  </p>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-[#1f1110]">
                    {item.text}
                  </p>
                  {item.title !== sidebarClippings[sidebarClippings.length - 1].title ? (
                    <div className="mt-4 h-px w-full" style={fadedThinRule} />
                  ) : null}
                </div>
              ))}
            </div>
          </aside>

          <SudokuPanel />
        </section>

        <section className="mt-4 bg-paper px-6 py-12 md:px-8">
          <div className="mb-10 h-[2px] w-full" style={fadedRule} />

          <div className="grid gap-8 md:grid-cols-[1.35fr_0.65fr] md:items-center">
            <div>
              <h4 className="font-handwritten text-[2.2rem] leading-none text-[#140606] md:text-[2.8rem]">
                Contact Me
              </h4>
              <p className="mt-4 max-w-[42rem] font-serif text-base leading-relaxed text-[#1f1110]">
                <span className="block">
                  If you want to talk about projects, fashion, travel, or just want to chat,
                </span>
                <span className="block">
                  feel free to connect with me on LinkedIn. Just click on the discs :)
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-5 md:justify-end">
              <span className="font-typewriter text-[10px] uppercase tracking-[0.22em] text-[#5b2620] md:hidden">
                Find Me Here
              </span>

              <a
                href="https://github.com/srijac9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group relative flex h-28 w-28 animate-spin-slow items-center justify-center rounded-full border-[7px] border-[#140606] transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, #4b1717 0%, #4b1717 18%, #692020 36%, #5a1618 56%, #2a0b0d 78%, #140606 100%)",
                  boxShadow: "0 10px 24px rgba(20, 6, 6, 0.18)",
                }}
              >
                <div className="pointer-events-none absolute inset-[14%] rounded-full border border-paper/10" />
                <div className="pointer-events-none absolute inset-[24%] rounded-full border border-paper/10" />
                <div className="pointer-events-none absolute inset-[34%] rounded-full border border-paper/10" />
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-[#140606] shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.19-.02-2.16-3.2.69-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.69.08-.69 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.35.95.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.18a11.1 11.1 0 0 1 5.8 0c2.22-1.49 3.19-1.18 3.19-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.82 1.19 3.08 0 4.42-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/srijachitturi06/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="relative flex h-28 w-28 animate-spin-slow items-center justify-center rounded-full border-[7px] border-[#140606] transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, #4b1717 0%, #4b1717 18%, #692020 36%, #5a1618 56%, #2a0b0d 78%, #140606 100%)",
                  boxShadow: "0 10px 24px rgba(20, 6, 6, 0.18)",
                  animationDirection: "reverse",
                }}
              >
                <div className="pointer-events-none absolute inset-[14%] rounded-full border border-paper/10" />
                <div className="pointer-events-none absolute inset-[24%] rounded-full border border-paper/10" />
                <div className="pointer-events-none absolute inset-[34%] rounded-full border border-paper/10" />
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-[#140606] shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                    <path d="M4.98 3.5A2.49 2.49 0 1 0 5 8.48 2.49 2.49 0 0 0 4.98 3.5ZM3 9h4v12H3Zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05C21.1 8.59 22 10.8 22 14.08V21h-4v-6.13c0-1.46-.03-3.34-2.03-3.34-2.04 0-2.35 1.59-2.35 3.23V21h-4Z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </section>
      </section>
      </div>
      </PageEdgeShadow>
    </main>
  );
};

export default About;
