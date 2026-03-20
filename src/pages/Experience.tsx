import { Link } from "react-router-dom";
import PageEdgeShadow from "@/components/PageEdgeShadow";

const Experience = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 py-12">
        <PageEdgeShadow className="relative flex w-full max-w-4xl flex-col items-center justify-center rounded-[1.75rem] px-8 py-16">
          <Link
            to="/"
            className="absolute left-14 top-10 font-handwritten text-xl text-burgundy-dark transition-colors hover:text-burgundy"
          >
            {"<"} back home
          </Link>

          <h1 className="mb-8 font-display text-5xl text-burgundy-dark md:text-7xl">
            Experience
          </h1>

          <p className="max-w-2xl text-center font-handwritten text-xl text-foreground/80">
            Coming soon...
          </p>
        </PageEdgeShadow>
      </div>
    </div>
  );
};

export default Experience;
