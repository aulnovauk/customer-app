import { motion, MotionProps } from "motion/react";
import { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

interface AnimatedCardProps extends Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  children: ReactNode;
  hoverable?: boolean;
  delay?: number;
}

interface AnimatedButtonCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children: ReactNode;
  hoverable?: boolean;
  delay?: number;
}

// Standard card with lift effect on hover
export function AnimatedCard({
  children,
  className = "",
  hoverable = true,
  delay = 0,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`rounded-3xl transition-all duration-300 ease-in-out ${className}`}
      style={{
        backgroundColor: "var(--card)",
        boxShadow: "var(--elevation-2)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={
        hoverable
          ? {
              y: -6,
              boxShadow: "var(--elevation-4)",
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }
          : {}
      }
      whileTap={hoverable ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Glassmorphic card with enhanced effects
export function GlassCard({
  children,
  className = "",
  hoverable = true,
  delay = 0,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`rounded-3xl border backdrop-blur-xl transition-all duration-300 ease-in-out ${className}`}
      style={{
        backgroundColor: "var(--card-glass)",
        borderColor: "var(--border-glass)",
        boxShadow: "var(--shadow-md)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={
        hoverable
          ? {
              y: -6,
              boxShadow: "var(--shadow-xl)",
              backgroundColor: "var(--background-glass)",
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }
          : {}
      }
      whileTap={hoverable ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Venue/Salon card with image and content
export function VenueCard({
  children,
  className = "",
  onClick,
  delay = 0,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Category card (circular) with bounce effect
export function CategoryCard({
  children,
  className = "",
  onClick,
  delay = 0,
  ...props
}: AnimatedButtonCardProps) {
  return (
    <motion.button
      className={`flex flex-col items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileTap={{ scale: 0.93 }}
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Service/Booking card with selection state
export function ServiceCard({
  children,
  className = "",
  selected = false,
  onClick,
  delay = 0,
  ...props
}: AnimatedCardProps & { selected?: boolean }) {
  return (
    <motion.div
      className={`rounded-3xl p-5 cursor-pointer transition-all duration-300 ease-in-out ${className}`}
      style={
        selected
          ? {
              backgroundColor: "var(--luxury-champagne-100)",
              borderColor: "var(--brand-rose-400)",
              boxShadow: "var(--shadow-brand-md)",
            }
          : {
              backgroundColor: "var(--card)",
              borderColor: "var(--border-light)",
              boxShadow: "var(--shadow-sm)",
            }
      }
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: selected ? 0 : -3,
        boxShadow: selected ? "var(--shadow-brand-lg)" : "var(--shadow-md)",
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Floating action button with pulse animation
export function FloatingButton({
  children,
  className = "",
  pulse = false,
  ...props
}: AnimatedButtonCardProps & { pulse?: boolean }) {
  return (
    <motion.button
      className={`rounded-full shadow-2xl transition-all duration-300 ease-in-out ${className}`}
      style={{
        background: "var(--gradient-luxury)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={
        pulse
          ? {
              opacity: 1,
              y: 0,
              boxShadow: [
                "0 20px 40px rgba(236, 72, 153, 0.3)",
                "0 25px 50px rgba(236, 72, 153, 0.4)",
                "0 20px 40px rgba(236, 72, 153, 0.3)",
              ],
            }
          : { opacity: 1, y: 0 }
      }
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: 0.3 },
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        scale: 1.02,
        y: -2,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}