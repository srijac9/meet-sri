import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import Scene from "@/components/Scene";
import galleryTitle from "@/assets/gallery-title-cropped.png";

const galleryItems = [
  {
    id: 1,
    image: "p1.jpg",
    alt: "Gallery photo 1",
    place: "Venice 2025",
    body: "One of my proudest shots, capturing both the moon and a plane at once.",
  },
  {
    id: 2,
    image: "p2.jpg",
    alt: "Gallery photo 2",
    place: "Ottawa 2026",
    body: "Found the perfect framing and timing, and they seem at peace enjoying the surroundings.",
  },
  {
    id: 3,
    image: "p3.jpg",
    alt: "Gallery photo 3",
    place: "Venice 2025",
    body: "I love how the sun is shining in this photo so much, and I can feel the life in this photo.",
  },
  {
    id: 4,
    image: "p4.jpg",
    alt: "Gallery photo 4",
    place: "Venice 2025",
    body: "Everything is so vibrant in Venice, from the boats to the water to the buildings.",
  },
  {
    id: 5,
    image: "p5.jpg",
    alt: "Gallery photo 5",
    place: "Rome 2025",
    body: "The walls have just a tint of yellow and blue, and this beam of light reflected that perfectly. One of my favourite pictures.",
  },
  {
    id: 6,
    image: "p6.jpg",
    alt: "Gallery photo 6",
    place: "Ontario 2025",
    body: "My first Blue Jays game. We unfortunately lost, but I loved this shot of the stands.",
  },
  {
    id: 7,
    image: "p7.jpg",
    alt: "Gallery photo 7",
    place: "Atlanta 2025",
    body: "The smoke from this factory at sunset looked really fiery.",
  },
  {
    id: 8,
    image: "p8.jpg",
    alt: "Gallery photo 8",
    place: "Venice 2025",
    body: "Venice at night is just beautiful, especially the way the light reflects on the water beside the city.",
  },
  {
    id: 9,
    image: "p9.jpg",
    alt: "Gallery photo 9",
    place: "Venice 2025",
    body: "Travelling between places in water is the coolest thing ever. I wish I could stay there forever.",
  },
  {
    id: 10,
    image: "p10.jpg",
    alt: "Gallery photo 10",
    place: "Ontario 2025",
    body: "I love skiing, and this moment felt straight out of a painting.",
  },
  {
    id: 11,
    image: "p11.jpg",
    alt: "Gallery photo 11",
    place: "Ontario 2025",
    body: "The colours of the fields looked really good. I took this from the Wutai Shan Buddhist Garden.",
  },
  {
    id: 12,
    image: "p12.jpg",
    alt: "Gallery photo 12",
    place: "Venice 2025",
    body: "The colour palette of this photo is just so soft on the eyes.",
  },
  {
    id: 13,
    image: "p13.jpg",
    alt: "Gallery photo 13",
    place: "Venice 2025",
    body: "My favourite place in the world, and this was just perfect timing with the boat and the background.",
  },
  {
    id: 14,
    image: "p14.jpg",
    alt: "Gallery photo 14",
    place: "Rome 2025",
    body: "I liked the contrast of the Colosseum with the bright blue sky.",
  },
  {
    id: 15,
    image: "p15.jpg",
    alt: "Gallery photo 15",
    place: "Rome 2025",
    body: "Baby yellow is one of my favourite colours, and these buildings just looked so pretty in the sun.",
  },
  {
    id: 16,
    image: "p16.jpg",
    alt: "Gallery photo 16",
    place: "Ontario 2025",
    body: "This was one of the first photos I took using my Canon SX740, and I was so impressed by the zoom on the camera.",
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
    <div className="min-h-screen bg-burgundy-dark text-burgundy-dark">
      <PageEdgeShadow className="relative mx-auto min-h-screen w-full max-w-[1380px] px-6 md:px-12 lg:px-16">
        <header className="relative z-20 w-full overflow-visible">
          <div className="relative aspect-[16/6] min-h-[260px] w-full overflow-hidden md:min-h-[320px]">
            <Scene />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-burgundy-dark/10 via-burgundy-dark/25 to-burgundy-dark/80" />
          </div>

          <div className="absolute inset-x-0 top-6 z-20">
            <Link
              to="/"
              className="ml-5 mt-2 inline-flex rounded-full border border-paper/30 bg-background/65 px-4 py-2 text-lg font-handwritten text-paper backdrop-blur-sm transition-colors hover:text-paper/80"
            >
              {"<"} back home
            </Link>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-[-78px] z-30 md:bottom-[-96px]">
            <div className="text-center">
              <img
                src={galleryTitle}
                alt="Gallery"
                className="mx-auto w-[24rem] max-w-[88vw] drop-shadow-[0_10px_22px_rgba(0,0,0,0.35)] md:w-[38rem]"
                style={{ transform: "translateY(44px)" }}
              />
            </div>
          </div>
        </header>

        <section className="relative z-10 -mt-2 bg-burgundy-dark md:-mt-4">
          <div className="pt-10 md:pt-5">
            <div className="grid w-full grid-cols-2 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {galleryItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleCard(item.id)}
                  aria-pressed={flippedCards.has(item.id)}
                  aria-label={`Flip gallery card ${item.id}`}
                  className="group relative aspect-[3/2] h-full w-full [perspective:1200px] transition-transform duration-500 hover:z-20 hover:-translate-y-1 focus:outline-none focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-burgundy-dark/40"
                >
                  <span
                    className="absolute inset-0 block [transform-style:preserve-3d] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                    style={{ transform: flippedCards.has(item.id) ? "rotateY(180deg)" : "rotateY(0deg)" }}
                  >
                    <span className="absolute inset-0 overflow-hidden border border-paper/10 bg-[linear-gradient(150deg,rgba(120,16,28,0.18),rgba(120,16,28,0.04))] shadow-[0_10px_24px_rgba(40,8,12,0.24)] [backface-visibility:hidden]">
                      {(() => {
                        const imgSrc =
                          assetMap.get(item.image) ||
                          assetMap.get(item.image.toUpperCase()) ||
                          "";

                        return (
                          <img
                            src={imgSrc}
                            alt={item.alt}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        );
                      })()}
                      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,246,230,0.12),transparent_42%),linear-gradient(180deg,transparent_40%,rgba(59,7,12,0.22)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute inset-0 ring-1 ring-paper/0 transition-all duration-500 group-hover:ring-paper/20" />
                    </span>
                    <span
                      className="absolute inset-0 flex items-center justify-center border border-paper/10 bg-[#6b1820] px-3 py-3 [backface-visibility:hidden] md:px-4"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span className="flex h-full w-full flex-col justify-between text-left">
                        <span className="mt-2 block font-handwritten text-[1.05rem] leading-[1.5] text-paper/90 md:mt-3 md:text-[1.18rem]">
                          {item.body}
                        </span>
                        <span className="mt-3 inline-block border-t border-paper/15 pt-2 font-typewriter text-[10px] uppercase tracking-[0.24em] text-paper/65 md:text-xs">
                          {item.place}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="h-12 bg-burgundy-dark md:h-16" aria-hidden="true" />
      </PageEdgeShadow>
    </div>
  );
};

export default Photos;
