import { useState } from "react";
import { Link } from "react-router-dom";
import PageEdgeShadow from "@/components/PageEdgeShadow";
import galleryTitle from "@/assets/gallery.png";
import worldMapImage from "@/assets/world-map.png";
import pinClickedImage from "@/assets/pin-clicked.png";
import pinImage from "@/assets/pin.png";
import p1Image from "@/assets/p1.jpg";
import p2Image from "@/assets/p2.jpg";
import p3Image from "@/assets/p3.jpg";
import p4Image from "@/assets/p4.jpg";
import p5Image from "@/assets/p5.jpg";
import p6Image from "@/assets/p6.jpg";
import p7Image from "@/assets/p7.jpg";
import p8Image from "@/assets/p8.jpg";
import p9Image from "@/assets/p9.jpg";
import p10Image from "@/assets/p10.jpg";
import p11Image from "@/assets/p11.jpg";
import p12Image from "@/assets/p12.jpg";
import p13Image from "@/assets/p13.jpg";
import p14Image from "@/assets/p14.jpg";
import p15Image from "@/assets/p15.jpg";
import p16Image from "@/assets/p16.jpg";
import p17Image from "@/assets/p17.JPG";
import p19Image from "@/assets/p19.JPG";
import p20Image from "@/assets/p20.JPG";
import p21Image from "@/assets/p21.JPG";
import p24Image from "@/assets/p24.JPG";
import p25Image from "@/assets/p25.JPG";
import p26Image from "@/assets/p26.JPG";

interface PhotosProps {
  embedded?: boolean;
}

interface PhotoItem {
  id: number;
  src: string;
  alt: string;
  location: "ontario" | "italy";
}

type PhotoLocationFilter = "all" | PhotoItem["location"];

const photoItems: PhotoItem[] = [
  { id: 1, src: p1Image, alt: "Photo 1", location: "italy" },
  { id: 2, src: p2Image, alt: "Photo 2", location: "ontario" },
  { id: 3, src: p3Image, alt: "Photo 3", location: "italy" },
  { id: 4, src: p4Image, alt: "Photo 4", location: "italy" },
  { id: 5, src: p5Image, alt: "Photo 5", location: "italy" },
  { id: 6, src: p6Image, alt: "Photo 6", location: "ontario" },
  { id: 7, src: p7Image, alt: "Photo 7", location: "ontario" },
  { id: 8, src: p8Image, alt: "Photo 8", location: "italy" },
  { id: 9, src: p9Image, alt: "Photo 9", location: "italy" },
  { id: 10, src: p10Image, alt: "Photo 10", location: "ontario" },
  { id: 11, src: p11Image, alt: "Photo 11", location: "ontario" },
  { id: 12, src: p12Image, alt: "Photo 12", location: "italy" },
  { id: 13, src: p13Image, alt: "Photo 13", location: "italy" },
  { id: 14, src: p14Image, alt: "Photo 14", location: "italy" },
  { id: 15, src: p15Image, alt: "Photo 15", location: "italy" },
  { id: 16, src: p16Image, alt: "Photo 16", location: "ontario" },
  { id: 17, src: p17Image, alt: "Photo 17", location: "ontario" },
  { id: 19, src: p19Image, alt: "Photo 19", location: "italy" },
  { id: 20, src: p20Image, alt: "Photo 20", location: "italy" },
  { id: 21, src: p21Image, alt: "Photo 21", location: "italy" },
  { id: 24, src: p24Image, alt: "Photo 24", location: "italy" },
  { id: 25, src: p25Image, alt: "Photo 25", location: "italy" },
  { id: 26, src: p26Image, alt: "Photo 26", location: "italy" },
];

const photoItemsById = new Map(photoItems.map((photo) => [photo.id, photo]));
const createColumnLayout = (columnIds: number[][]) =>
  columnIds.map((column) =>
    column
      .map((id) => photoItemsById.get(id))
      .filter((photo): photo is PhotoItem => Boolean(photo)),
  );

const twoColumnLayout = createColumnLayout([
  [26, 9, 13, 14, 25, 6, 5, 19, 7, 2, 11, 21],
  [1, 10, 12, 15, 3, 4, 17, 16, 24, 20, 8],
]);

const threeColumnLayout = createColumnLayout([
  [20, 3, 17, 12, 4, 10, 21, 8],
  [6, 15, 2, 14, 7, 11, 16, 5],
  [25, 9, 24, 13, 26, 1, 19],
]);

const filteredThreeColumnLayouts = {
  ontario: createColumnLayout([
    [2, 16, 17],
    [6, 10],
    [7, 11],
  ]),
  italy: createColumnLayout([
    [21, 9, 25, 24, 19, 8],
    [14, 1, 12, 5, 20],
    [3, 13, 15, 26, 4],
  ]),
} satisfies Record<PhotoItem["location"], PhotoItem[][]>;

const Photos = ({ embedded = false }: PhotosProps) => {
  const Shell = embedded ? "div" : PageEdgeShadow;
  const [activeFilter, setActiveFilter] = useState<PhotoLocationFilter>("all");
  const photoCardClassName =
    "group relative overflow-hidden";
  const photoImageClassName =
    "block h-auto w-full";
  const photoOverlayClassName =
    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(26,4,6,0)_24%,rgba(26,4,6,0.1)_48%,rgba(26,4,6,0.22)_68%,rgba(26,4,6,0.36)_86%,rgba(26,4,6,0.52)_100%)]";
  const visiblePhotos =
    activeFilter === "all"
      ? photoItems
      : photoItems.filter((photo) => photo.location === activeFilter);
  const visibleTwoColumnLayout = twoColumnLayout
    .map((column) =>
      activeFilter === "all"
        ? column
        : column.filter((photo) => photo.location === activeFilter),
    )
    .filter((column) => column.length > 0);
  const visibleThreeColumnLayout = threeColumnLayout
    .map((column) =>
      activeFilter === "all"
        ? column
        : column.filter((photo) => photo.location === activeFilter),
    )
    .filter((column) => column.length > 0);
  const activeThreeColumnLayout =
    activeFilter === "all"
      ? visibleThreeColumnLayout
      : filteredThreeColumnLayouts[activeFilter];

  return (
    <div className={`relative w-full text-paper ${embedded ? "bg-transparent" : "bg-burgundy-dark"}`}>
      <Shell
        className={`relative w-full px-6 pb-16 md:px-12 lg:px-16 ${embedded ? "pt-16 md:pt-20" : "mx-auto max-w-[1380px] pt-8"}`}
      >
        {!embedded ? (
          <div className="relative z-20 pb-6">
            <Link
              to="/"
              className="ml-5 mt-2 inline-flex rounded-full border border-paper/30 bg-background/65 px-4 py-2 text-lg font-handwritten text-paper backdrop-blur-sm transition-colors hover:text-paper/80"
            >
              {"<"} back home
            </Link>
          </div>
        ) : null}

        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between md:mb-12">
            <img
              src={galleryTitle}
              alt="Gallery"
              className="relative z-0 w-[23rem] max-w-[82vw] origin-left-bottom scale-[1.08] object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.35)] md:w-[33rem] md:scale-[1.12]"
              draggable={false}
            />
            <div className="relative z-10 flex w-[27rem] max-w-[92vw] flex-col items-center sm:-ml-10 sm:w-[32rem] md:-ml-16 md:w-[41rem] lg:-ml-24 lg:w-[47rem]">
              <div className="relative w-full">
                <img
                  src={worldMapImage}
                  alt="World map"
                  className="w-full object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.28)]"
                  draggable={false}
                />
                <button
                  type="button"
                  onClick={() =>
                    setActiveFilter((current) => (current === "ontario" ? "all" : "ontario"))
                  }
                  className="absolute -translate-x-1/2 -translate-y-full bg-transparent p-0 text-left focus-visible:outline-none"
                  style={{ left: "26.5%", top: "30.5%" }}
                  aria-label="Filter photos to Ontario"
                  aria-pressed={activeFilter === "ontario"}
                  title="Ontario"
                >
                  <img
                    src={activeFilter === "ontario" ? pinClickedImage : pinImage}
                    alt=""
                    aria-hidden="true"
                    className={`w-5 object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)] transition-all duration-300 sm:w-6 md:w-7 ${
                      activeFilter === "ontario"
                        ? "scale-[1.14]"
                        : "opacity-88 hover:-translate-y-1 hover:scale-[1.12] hover:drop-shadow-[0_14px_24px_rgba(0,0,0,0.42)]"
                    }`}
                    draggable={false}
                  />
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-1 text-[0.62rem] font-typewriter uppercase tracking-[0.18em] transition-colors ${
                      activeFilter === "ontario"
                        ? "bg-paper text-burgundy-dark"
                        : "bg-background/70 text-paper/85"
                    }`}
                  >
                    Ontario
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveFilter((current) => (current === "italy" ? "all" : "italy"))
                  }
                  className="absolute -translate-x-1/2 -translate-y-full bg-transparent p-0 text-left focus-visible:outline-none"
                  style={{ left: "53.5%", top: "30.5%" }}
                  aria-label="Filter photos to Italy"
                  aria-pressed={activeFilter === "italy"}
                  title="Italy"
                >
                  <img
                    src={activeFilter === "italy" ? pinClickedImage : pinImage}
                    alt=""
                    aria-hidden="true"
                    className={`w-5 object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)] transition-all duration-300 sm:w-6 md:w-7 ${
                      activeFilter === "italy"
                        ? "scale-[1.14]"
                        : "opacity-88 hover:-translate-y-1 hover:scale-[1.12] hover:drop-shadow-[0_14px_24px_rgba(0,0,0,0.42)]"
                    }`}
                    draggable={false}
                  />
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-1 text-[0.62rem] font-typewriter uppercase tracking-[0.18em] transition-colors ${
                      activeFilter === "italy"
                        ? "bg-paper text-burgundy-dark"
                        : "bg-background/70 text-paper/85"
                    }`}
                  >
                    Italy
                  </span>
                </button>
              </div>
              <div className="mt-4 flex min-h-[2.5rem] items-center justify-center">
                {activeFilter === "all" ? (
                  <p className="text-center text-[0.68rem] font-typewriter uppercase tracking-[0.22em] text-paper/74">
                    click a pin to filter
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveFilter("all")}
                    className="rounded-full border border-paper/28 bg-background/40 px-3 py-1.5 text-[0.68rem] font-typewriter uppercase tracking-[0.22em] text-paper/86 transition-colors hover:bg-background/55"
                  >
                    show all
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:hidden">
            {visiblePhotos.map((photo) => (
              <figure
                key={photo.id}
                className={photoCardClassName}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={photoImageClassName}
                  data-gallery-photo="true"
                  loading="lazy"
                />
                <span className={photoOverlayClassName} />
              </figure>
            ))}
          </div>

          <div className="hidden items-start gap-4 sm:flex lg:hidden">
            {visibleTwoColumnLayout.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="flex-1 space-y-4"
              >
                {column.map((photo) => {
                  return (
                    <figure
                      key={photo.id}
                      className={photoCardClassName}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className={photoImageClassName}
                        loading="lazy"
                      />
                      <span className={photoOverlayClassName} />
                    </figure>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="hidden items-start gap-4 lg:flex">
            {activeThreeColumnLayout.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="flex-1 space-y-4"
              >
                {column.map((photo) => {
                  return (
                    <figure
                      key={photo.id}
                      className={photoCardClassName}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className={photoImageClassName}
                        loading="lazy"
                      />
                      <span className={photoOverlayClassName} />
                    </figure>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default Photos;
