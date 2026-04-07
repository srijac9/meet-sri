import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  id?: string;
  style?: CSSProperties;
}

const SectionReveal = ({ children, className = "", delayMs = 0, id, style }: SectionRevealProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -18% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={containerRef}
      className={className}
      style={{
        ...style,
        scrollMarginTop: "1.5rem",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(5rem) scale(0.985)",
        filter: isVisible ? "none" : "blur(14px)",
        transition: `opacity 860ms ease, transform 980ms cubic-bezier(0.22, 1, 0.36, 1), filter 860ms ease`,
        transitionDelay: `${delayMs}ms`,
        willChange: isVisible ? "auto" : "opacity, transform, filter",
        overflow: "visible",
      }}
    >
      {children}
    </section>
  );
};

export default SectionReveal;
