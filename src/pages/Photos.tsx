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
import p18Image from "@/assets/p18.jpeg";
import p19Image from "@/assets/p19.JPG";
import p20Image from "@/assets/p20.JPG";
import p21Image from "@/assets/p21.JPG";
import p22Image from "@/assets/p22.jpeg";
import p23Image from "@/assets/p23.jpeg";
import p24Image from "@/assets/p24.JPG";
import p25Image from "@/assets/p25.JPG";
import p26Image from "@/assets/p26.JPG";
import p27Image from "@/assets/p27.JPG";
import p28Image from "@/assets/p28.jpeg";
import p29Image from "@/assets/p29.jpeg";
import p30Image from "@/assets/p30.jpeg";
import p31Image from "@/assets/p31.jpeg";
import p32Image from "@/assets/p32.JPG";
import p33Image from "@/assets/p33.JPG";
import p34Image from "@/assets/p34.JPG";
import p35Image from "@/assets/p35.JPG";
import p36Image from "@/assets/p36.JPG";
import p37Image from "@/assets/p37.JPG";

interface PhotosProps {
  embedded?: boolean;
}

interface PhotoItem {
  id: number;
  src: string;
  alt: string;
  location: "ontario" | "italy" | "vancouver" | "maritimes";
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
  { id: 18, src: p18Image, alt: "Vancouver photo 18", location: "vancouver" },
  { id: 19, src: p19Image, alt: "Photo 19", location: "italy" },
  { id: 20, src: p20Image, alt: "Photo 20", location: "italy" },
  { id: 21, src: p21Image, alt: "Photo 21", location: "italy" },
  { id: 22, src: p22Image, alt: "Vancouver photo 22", location: "vancouver" },
  { id: 23, src: p23Image, alt: "Vancouver photo 23", location: "vancouver" },
  { id: 24, src: p24Image, alt: "Photo 24", location: "italy" },
  { id: 25, src: p25Image, alt: "Photo 25", location: "italy" },
  { id: 26, src: p26Image, alt: "Photo 26", location: "italy" },
  { id: 27, src: p27Image, alt: "Maritimes photo 27", location: "maritimes" },
  { id: 28, src: p28Image, alt: "Vancouver photo 28", location: "vancouver" },
  { id: 29, src: p29Image, alt: "Vancouver photo 29", location: "vancouver" },
  { id: 30, src: p30Image, alt: "Vancouver photo 30", location: "vancouver" },
  { id: 31, src: p31Image, alt: "Vancouver photo 31", location: "vancouver" },
  { id: 32, src: p32Image, alt: "Maritimes photo 32", location: "maritimes" },
  { id: 33, src: p33Image, alt: "Maritimes photo 33", location: "maritimes" },
  { id: 34, src: p34Image, alt: "Maritimes photo 34", location: "maritimes" },
  { id: 35, src: p35Image, alt: "Maritimes photo 35", location: "maritimes" },
  { id: 36, src: p36Image, alt: "Maritimes photo 36", location: "maritimes" },
  { id: 37, src: p37Image, alt: "Maritimes photo 37", location: "maritimes" },
];

const photoItemsById = new Map(photoItems.map((photo) => [photo.id, photo]));
const createColumnLayout = (columnIds: number[][]) =>
  columnIds.map((column) =>
    column
      .map((id) => photoItemsById.get(id))
      .filter((photo): photo is PhotoItem => Boolean(photo)),
  );

const twoColumnLayout = createColumnLayout([
  [32, 30, 26, 9, 13, 14, 25, 6, 22, 5, 19, 7, 28, 2, 11, 21, 31, 36, 27],
  [33, 18, 1, 10, 12, 15, 3, 4, 17, 16, 24, 20, 23, 8, 29, 34, 35, 37],
]);

const threeColumnLayout = createColumnLayout([
  [32, 20, 3, 18, 17, 12, 4, 10, 21, 30, 8, 31, 36],
  [33, 6, 15, 2, 22, 14, 7, 11, 28, 16, 5, 37],
  [34, 25, 9, 24, 13, 26, 1, 23, 19, 29, 35, 27],
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
  vancouver: createColumnLayout([
    [18, 30],
    [22, 28, 31],
    [23, 29],
  ]),
  maritimes: createColumnLayout([
    [32, 35, 27],
    [33, 36],
    [34, 37],
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
                    setActiveFilter((current) => (current === "maritimes" ? "all" : "maritimes"))
                  }
                  className="absolute -translate-x-1/2 -translate-y-full bg-transparent p-0 text-left focus-visible:outline-none"
                  style={{ left: "33%", top: "30.5%" }}
                  aria-label="Filter photos to the Maritimes"
                  aria-pressed={activeFilter === "maritimes"}
                  title="Maritimes"
                >
                  <img
                    src={activeFilter === "maritimes" ? pinClickedImage : pinImage}
                    alt=""
                    aria-hidden="true"
                    className={`w-5 object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)] transition-all duration-300 sm:w-6 md:w-7 ${
                      activeFilter === "maritimes"
                        ? "scale-[1.14]"
                        : "opacity-88 hover:-translate-y-1 hover:scale-[1.12] hover:drop-shadow-[0_14px_24px_rgba(0,0,0,0.42)]"
                    }`}
                    draggable={false}
                  />
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-1 text-[0.62rem] font-typewriter uppercase tracking-[0.18em] transition-colors ${
                      activeFilter === "maritimes"
                        ? "bg-paper text-burgundy-dark"
                        : "bg-background/70 text-paper/85"
                    }`}
                  >
                    Maritimes
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveFilter((current) => (current === "vancouver" ? "all" : "vancouver"))
                  }
                  className="absolute -translate-x-1/2 -translate-y-full bg-transparent p-0 text-left focus-visible:outline-none"
                  style={{ left: "12.5%", top: "31%" }}
                  aria-label="Filter photos to Vancouver"
                  aria-pressed={activeFilter === "vancouver"}
                  title="Vancouver"
                >
                  <img
                    src={activeFilter === "vancouver" ? pinClickedImage : pinImage}
                    alt=""
                    aria-hidden="true"
                    className={`w-5 object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)] transition-all duration-300 sm:w-6 md:w-7 ${
                      activeFilter === "vancouver"
                        ? "scale-[1.14]"
                        : "opacity-88 hover:-translate-y-1 hover:scale-[1.12] hover:drop-shadow-[0_14px_24px_rgba(0,0,0,0.42)]"
                    }`}
                    draggable={false}
                  />
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-1 text-[0.62rem] font-typewriter uppercase tracking-[0.18em] transition-colors ${
                      activeFilter === "vancouver"
                        ? "bg-paper text-burgundy-dark"
                        : "bg-background/70 text-paper/85"
                    }`}
                  >
                    Vancouver
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
