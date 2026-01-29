import { cn } from "@/lib/utils";

interface CutoutLetterProps {
  letter: string;
  variant?: "white" | "dark" | "cream";
  rotation?: number;
  className?: string;
}

const CutoutLetter = ({ letter, variant = "white", rotation = 0, className }: CutoutLetterProps) => {
  const variantStyles = {
    white: "bg-white text-burgundy-dark",
    dark: "bg-burgundy-dark text-white",
    cream: "bg-paper text-burgundy-dark border border-burgundy-dark/20",
  };

  return (
    <span
      className={cn(
        "inline-block px-3 py-2 font-typewriter text-4xl md:text-5xl lg:text-6xl font-bold",
        "shadow-md transition-transform hover:scale-105",
        variantStyles[variant],
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {letter}
    </span>
  );
};

export default CutoutLetter;
