import { motion } from "motion/react";

interface HolographicOverlayProps {
  enabled?: boolean;
  intensity?: number;
}

export function HolographicOverlay({
  enabled = false,
  intensity = 0.08,
}: HolographicOverlayProps) {
  if (!enabled) return null;

  return (
    <>
      {/* Animated holographic gradient */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              115deg,
              transparent 0%,
              rgba(255, 182, 193, ${intensity}) 25%,
              transparent 35%,
              rgba(176, 224, 230, ${intensity}) 50%,
              transparent 60%,
              rgba(221, 160, 221, ${intensity}) 75%,
              transparent 100%
            )
          `,
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Prismatic light effect */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none opacity-30"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, ${intensity * 0.5}) 2px,
              rgba(255, 255, 255, ${intensity * 0.5}) 4px
            )
          `,
        }}
        animate={{
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rainbow shimmer */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
              rgba(255, 192, 203, ${intensity * 1.5}) 0%,
              rgba(255, 218, 185, ${intensity}) 20%,
              rgba(255, 255, 224, ${intensity * 0.8}) 30%,
              rgba(176, 224, 230, ${intensity}) 45%,
              rgba(221, 160, 221, ${intensity * 0.7}) 60%,
              transparent 80%
            )
          `,
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
