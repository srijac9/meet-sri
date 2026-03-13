import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center border border-burgundy-dark/20 bg-paper px-3 py-3 [backface-visibility:hidden] md:px-4"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <span className="flex h-full w-full flex-col justify-between text-left">
                      <span className="mt-2 block font-handwritten text-[1.05rem] leading-[1.5] text-burgundy-dark/90 md:mt-3 md:text-[1.18rem]">
                        {item.body}
                      </span>
                      <span className="mt-3 inline-block border-t border-burgundy-dark/20 pt-2 font-typewriter text-[10px] uppercase tracking-[0.24em] text-burgundy-dark/70 md:text-xs">
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
    </div>
  );
};

export default Photos;
