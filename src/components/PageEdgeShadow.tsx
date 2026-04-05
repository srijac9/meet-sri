import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageEdgeShadowProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const PageEdgeShadow = ({ children, className, style }: PageEdgeShadowProps) => {
  return (
    <div className={cn("relative overflow-x-clip", className)} style={style}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-[linear-gradient(90deg,rgba(18,3,5,0.28),rgba(18,3,5,0.12)_42%,rgba(18,3,5,0))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-[linear-gradient(270deg,rgba(18,3,5,0.28),rgba(18,3,5,0.12)_42%,rgba(18,3,5,0))]"
      />
      {children}
    </div>
  );
};

export default PageEdgeShadow;
