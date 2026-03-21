import { motion } from "motion/react";
import { useMemo } from "react";
import { DEFAULT_ORB_COLORS } from "../constants/animationColors";

interface FloatingOrbsProps {
  count?: number;
  colors?: string[];
  intensity?: "light" | "medium" | "heavy";
}

export function FloatingOrbs({
  count = 8,
  colors = DEFAULT_ORB_COLORS,
  intensity = "medium",
}: FloatingOrbsProps) {
  const opacityMap = {
    light: 0.08,
    medium: 0.12,
    heavy: 0.18,
  };

  const blurMap = {
    light: "40px",
    medium: "60px",
    heavy: "80px",
  };

  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      size: 100 + Math.random() * 200,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
  }, [count, colors]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${blurMap[intensity]})`,
            opacity: opacityMap[intensity],
          }}
          initial={{
            x: `${orb.initialX}vw`,
            y: `${orb.initialY}vh`,
            scale: 0.8,
          }}
          animate={{
            x: [
              `${orb.initialX}vw`,
              `${(orb.initialX + 30) % 100}vw`,
              `${(orb.initialX + 60) % 100}vw`,
              `${orb.initialX}vw`,
            ],
            y: [
              `${orb.initialY}vh`,
              `${(orb.initialY + 40) % 100}vh`,
              `${(orb.initialY + 20) % 100}vh`,
              `${orb.initialY}vh`,
            ],
            scale: [0.8, 1.2, 0.9, 0.8],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
