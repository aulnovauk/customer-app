import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

type PatternType = "dots" | "grid" | "waves" | "circles" | "none";

interface BackgroundPatternProps {
  pattern?: PatternType;
  opacity?: number;
  animate?: boolean;
}

export function BackgroundPattern({
  pattern = "dots",
  opacity = 0.03,
  animate = true,
}: BackgroundPatternProps) {
  const { theme } = useTheme();
  
  if (pattern === "none") return null;

  // Use different colors based on theme
  const patternColor = theme === 'dark' ? '%23ffffff' : '%23000000';
  
  const patterns = {
    dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='${patternColor}'/%3E%3C/svg%3E")`,
    grid: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='${patternColor}' stroke-width='1'/%3E%3C/svg%3E")`,
    waves: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 0, 50 10 T 100 10' stroke='${patternColor}' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
    circles: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='25' fill='none' stroke='${patternColor}' stroke-width='1'/%3E%3C/svg%3E")`,
  };

  return (
    <motion.div
      className="fixed inset-0 -z-10 pointer-events-none"
      key={`pattern-${theme}`}
      style={{
        backgroundImage: patterns[pattern],
        backgroundRepeat: "repeat",
        opacity,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: animate ? opacity : opacity }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
}