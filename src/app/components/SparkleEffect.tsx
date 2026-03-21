import { motion } from "motion/react";
import { useMemo } from "react";
import { DEFAULT_SPARKLE_COLOR } from "../constants/animationColors";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface SparkleEffectProps {
  count?: number;
  enabled?: boolean;
  color?: string;
}

export function SparkleEffect({
  count = 15,
  enabled = true,
  color = DEFAULT_SPARKLE_COLOR,
}: SparkleEffectProps) {
  const sparkles: Sparkle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      duration: 1 + Math.random() * 2,
    }));
  }, [count]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            background: color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${color}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
