import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Scene from "@/components/Scene";
import galleryTitle from "@/assets/gallery-title-cropped.png";

const galleryItems = [
  {
    id: 1,
    image: "p1.jpg",
    alt: "Gallery photo 1",
    heading: "City Walk",
    body: "Golden hour sidewalks, soft grain, and the rush of streetlights switching on.",
  },
  {
    id: 2,
    image: "p2.jpg",
    alt: "Gallery photo 2",
    heading: "Weekend Notes",
    body: "Slow mornings, film coffee, and a pocket full of small moments worth keeping.",
  },
  {
    id: 3,
    image: "p3.jpg",
    alt: "Gallery photo 3",
    heading: "Candid Frames",
    body: "Unposed expressions and blurred motion that make the memory feel alive.",
  },
  {
    id: 4,
    image: "p4.jpg",
    alt: "Gallery photo 4",
    heading: "Travel Roll",
    body: "Train windows, passing fields, and snapshots between one place and the next.",
  },
  {
    id: 5,
    image: "p5.jpg",
    alt: "Gallery photo 5",
    heading: "Late Light",
    body: "Shadows stretching long while the sky turns from warm amber into deep indigo.",
  },
  {
    id: 6,
    image: "p6.jpg",
    alt: "Gallery photo 6",
    heading: "After Hours",
    body: "Neon reflections, quiet streets, and texture-heavy night scenes.",
  },
  {
    id: 7,
    image: "p7.jpg",
    alt: "Gallery photo 7",
    heading: "Memory Strip",
    body: "A collage of fleeting details that only make sense when seen together.",
  },
  {
    id: 8,
    image: "p8.jpg",
    alt: "Gallery photo 8",
    heading: "Studio Day",
    body: "Contact sheets, test shots, and little experiments in composition.",
  },
  {
    id: 9,
    image: "p9.jpg",
    alt: "Gallery photo 9",
    heading: "Home Reel",
    body: "Ordinary corners turned cinematic by soft contrast and morning haze.",
  },
  {
    id: 10,
    image: "p10.jpg",
    alt: "Gallery photo 10",
    heading: "Road Scenes",
    body: "Signs, rain marks, and small stops that shape the whole journey.",
  },
  {
    id: 11,
    image: "p11.jpg",
    alt: "Gallery photo 11",
    heading: "Frame 11",
    body: "Tap to reveal notes for this photo.",
  },
  {
    id: 12,
    image: "p12.jpg",
    alt: "Gallery photo 12",
    heading: "Frame 12",
    body: "Tap to reveal notes for this photo.",
  },
  {
    id: 13,
    image: "p13.jpg",
    alt: "Gallery photo 13",
    heading: "Frame 13",
    body: "Tap to reveal notes for this photo.",
  },
  {
    id: 14,
    image: "p14.jpg",
    alt: "Gallery photo 14",
    heading: "Frame 14",
    body: "Tap to reveal notes for this photo.",
  },
  {
    id: 15,
    image: "p15.jpg",
    alt: "Gallery photo 15",
    heading: "Frame 15",
    body: "Tap to reveal notes for this photo.",
  },
  {
    id: 16,
    image: "p16.jpg",
    alt: "Gallery photo 16",
    heading: "Frame 16",
    body: "Tap to reveal notes for this photo.",
  },
];

const Photos = () => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const assetMap = useMemo(() => {
    const modules = import.meta.glob<string>("../assets/*.{jpg,JPG,jpeg,JPEG,png,PNG,svg,SVG}", {
      eager: true,
      import: "default",
    });

    const map = new Map<string, string>();
    for (const [path, url] of Object.entries(modules)) {
      const file = path.split("/").pop();
      if (file) map.set(file, url);
    }
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-paper text-burgundy-dark">
      <header className="relative z-20 h-[82vh] min-h-[520px] w-full overflow-visible">
        <Scene />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-burgundy-dark/10 via-burgundy-dark/25 to-burgundy-dark/80" />

        <Link
          to="/"
          className="absolute left-6 top-6 z-20 rounded-full border border-paper/30 bg-background/65 px-4 py-2 text-lg font-handwritten text-paper backdrop-blur-sm transition-colors hover:text-paper/80"
        >
          {"<"} back home
        </Link>

        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-full max-w-5xl -translate-x-1/2 translate-y-1 px-6 text-center md:translate-y-2">
          <img
            src={galleryTitle}
            alt="Gallery"
            className="mx-auto w-[24rem] max-w-[88vw] drop-shadow-[0_10px_22px_rgba(0,0,0,0.35)] md:w-[38rem]"
            style={{ transform: "translateY(64px)" }}
          />
          <p
            className="font-handwritten text-base text-paper/90 md:text-xl"
            style={{ marginTop: "-42px", transform: "translateY(-6px)" }}
          >
            my photo journal
          </p>
        </div>
      </header>

      <section className="relative z-0 bg-paper">
        <div className="w-full p-0">
          <div className="grid w-full grid-cols-4 gap-1">
            {galleryItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => toggleCard(item.id)}
                aria-pressed={flippedCards.has(item.id)}
                aria-label={`Flip gallery card ${item.id}`}
                className="relative aspect-[3/2] h-full w-full [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-dark/40"
              >
                <span
                  className="absolute inset-0 block [transform-style:preserve-3d] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: flippedCards.has(item.id) ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  <span className="absolute inset-0 overflow-hidden border border-burgundy-dark/20 bg-[linear-gradient(150deg,rgba(120,16,28,0.14),rgba(247,233,206,0.34))] shadow-[0_10px_24px_rgba(80,20,20,0.14)] [backface-visibility:hidden]">
                    <img
                      src={`/src/assets/${item.image}`}
                      alt={item.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center border border-burgundy-dark/20 bg-paper px-3 [backface-visibility:hidden]"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <span className="text-center">
                      <span className="block font-elegant text-lg leading-tight text-burgundy-dark md:text-xl">
                        {item.heading}
                      </span>
                      <span className="mt-2 block font-handwritten text-sm leading-snug text-burgundy-dark/85 md:text-base">
                        {item.body}
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Photos;
