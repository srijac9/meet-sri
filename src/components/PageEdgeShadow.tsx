import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageEdgeShadowProps = {
  children: ReactNode;
  className?: string;
};

const PageEdgeShadow = ({ children, className }: PageEdgeShadowProps) => {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-8 w-8 bg-[linear-gradient(90deg,rgba(18,3,5,0),rgba(18,3,5,0.12)_58%,rgba(18,3,5,0.28))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -right-8 w-8 bg-[linear-gradient(270deg,rgba(18,3,5,0),rgba(18,3,5,0.12)_58%,rgba(18,3,5,0.28))]"
      />
      {children}
    </div>
  );
};

export default PageEdgeShadow;
