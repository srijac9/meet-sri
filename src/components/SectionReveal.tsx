import { ReactNode, useEffect, useRef, useState } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  id?: string;
}

const SectionReveal = ({ children, className = "", delayMs = 0, id }: SectionRevealProps) => {
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
        threshold: 0.28,
        rootMargin: "0px 0px -14% 0px",
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
        scrollMarginTop: "1.5rem",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(5rem) scale(0.985)",
        filter: isVisible ? "blur(0)" : "blur(14px)",
        transition: `opacity 860ms ease, transform 980ms cubic-bezier(0.22, 1, 0.36, 1), filter 860ms ease`,
        transitionDelay: `${delayMs}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </section>
  );
};

export default SectionReveal;
