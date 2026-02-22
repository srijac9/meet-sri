import { useEffect, useState } from "react";

interface HeartItem {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  useEffect(() => {
    const count = 18;
    const generated: HeartItem[] = Array.from({ length: count }, (_, i) => {
      const baseLeft = ((i + 0.5) / count) * 100;
      const jitter = (Math.random() - 0.5) * 6;
      return {
        id: i,
        left: Math.max(2, Math.min(98, baseLeft + jitter)),
        size: Math.random() * 10 + 6,
        delay: Math.random() * 12,
        duration: Math.random() * 10 + 12,
        opacity: Math.random() * 0.3 + 0.1,
      };
    });
    setHearts(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[12] overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            bottom: "-20px",
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            animation: `float-heart ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          }}
          viewBox="0 0 24 24"
          fill="#F3E5D0"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
};

export default FloatingHearts;
