import { Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import SudokuPanel from "@/components/SudokuPanel";
import chitturiTitle from "@/assets/CHITTURI.png";
import srijaDrawing from "@/assets/srija-drawing.png";
import srijaTitle from "@/assets/SRIJA.png";

const About = () => {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const articleParagraphs = [
    "Srija Chitturi is a computer engineering student who loves building digital experiences that feel both thoughtful and playful. She is especially drawn to front-end development, creative interfaces, and projects that make technology feel more human.",
    "When she is not coding, she is usually chasing a new idea, collecting visual inspiration, or refining the tiny details that make a project memorable. Her favorite work lives somewhere between engineering, storytelling, and design.",
    "This site is her little internet newspaper: part portfolio, part scrapbook, and part running record of the things she is making, learning, and loving right now.",
  ];

  const skillAds = [
    {
      icon: "AI",
      title: "Artificial Intelligence",
      lines: ["Creative Computing", "Smart Systems", "Future-Facing Ideas"],
      footer: "Curious about what comes next",
    },
    {
      icon: "ML",
      title: "Machine-Learning",
      lines: ["Patterns", "Prediction", "Model Exploration"],
      footer: "Learning from data",
    },
    {
      icon: "</>",
      title: "Full-Stack Development",
      lines: ["Frontend", "Backend", "End-to-End Builds"],
      footer: "Built all the way through",
    },
    {
      icon: "UX",
      title: "UX/UI Design",
      lines: ["Wireframes", "Visual Design", "User-Centered Thinking"],
      footer: "Design with intention",
    },
  ];

  const sidebarClippings = [
    {
      title: "Currently",
      text: "Building thoughtful interfaces, collecting inspiration, and refining the little details.",
    },
    {
      title: "Coffee Order",
      text: "Iced cappuccino, always nearby during a good coding session.",
    },
    {
      title: "Off Duty",
      text: "Drawings, moodboards, music, and tiny design details I cannot stop tweaking.",
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
              Srija in illustrated form, framed like a clipped portrait in the middle of
              the page.
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
                {articleParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-serif text-[1.02rem] leading-[1.45] text-[#1f1110]"
                  >
                    {paragraph}
                  </p>
                ))}
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
                className="grid min-h-[17rem] grid-cols-[4.8rem_1fr] gap-4 rounded-[1.35rem] border-[3px] border-[#140606] bg-paper px-4 py-5 shadow-[inset_0_0_0_2px_rgba(20,6,6,0.08)]"
              >
                <div className="flex items-start justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#140606] text-[#140606]">
                    <span className="font-typewriter text-xl font-bold leading-none">
                      {skill.icon}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-[1.2rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.22em] text-[#140606] md:text-[1.35rem]">
                    {skill.title}
                  </h4>

                  <div className="mt-3 space-y-1">
                    {skill.lines.map((line) => (
                      <p
                        key={line}
                        className="text-[0.95rem] font-semibold not-italic uppercase leading-[1.05] tracking-[0.18em] text-[#5b2620]"
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="mx-auto mb-2 h-px w-20 bg-[#140606]/35" />
                    <p className="text-center font-typewriter text-[11px] uppercase tracking-[0.18em] text-[#5b2620]">
                      {skill.footer}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
          <div className="rounded-[1.35rem] border-[3px] border-[#140606] bg-paper px-5 py-4">
            <p className="font-handwritten text-2xl leading-tight text-[#2a0908] md:text-3xl">
              "Look good, feel good, do good."
            </p>
            <p className="mt-3 text-right font-typewriter text-xs uppercase tracking-[0.22em] text-[#5b2620]">
              - Srija Chitturi
            </p>
          </div>

            <div className="pt-4">
              <div className="mb-4 h-[2px] w-full" style={fadedRule} />
              <p className="text-[1.95rem] font-black not-italic uppercase leading-[1.02] tracking-[0.22em] text-[#140606] md:text-[2.5rem]">
                Full-Stack Dreams, Front-End Heart
              </p>
            <p className="mt-3 font-serif text-base leading-relaxed text-[#1f1110]">
              From code to composition, this space is meant to feel like a clipped
              page from an ongoing story.
            </p>
          </div>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.42fr_1fr]">
          <aside className="rounded-[1.35rem] border-[3px] border-[#140606] bg-paper px-4 py-5">
            <div className="pb-2 text-center">
              <h4 className="text-[1.35rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.24em] text-[#140606]">
                Extra
              </h4>
              <p className="mt-1 font-typewriter text-[10px] uppercase tracking-[0.22em] text-[#5b2620]">
                Side Column
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
      </section>
      </div>
      </PageEdgeShadow>
    </main>
  );
};

export default About;
