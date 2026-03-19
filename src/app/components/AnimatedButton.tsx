import { motion, MotionProps } from "motion/react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface AnimatedButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "luxury";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function AnimatedButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: AnimatedButtonProps) {
  const baseStyles = "rounded-full font-bold transition-all duration-300 ease-in-out";
  
  const variantStyles = {
    primary: "text-white shadow-md",
    secondary: "border-2 shadow-sm",
    ghost: "shadow-sm",
    luxury: "text-white shadow-lg",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  return (
    <motion.button
      className={combinedClassName}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Specialized luxury gradient button with enhanced animations
export function LuxuryButton({
  children,
  className = "",
  fullWidth = false,
  ...props
}: Omit<AnimatedButtonProps, "variant">) {
  return (
    <motion.button
      className={`rounded-full px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 ease-in-out ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      style={{
        background: "var(--gradient-luxury)",
      }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Icon button with press animation
export function IconButton({
  children,
  className = "",
  ...props
}: Omit<AnimatedButtonProps, "variant" | "size">) {
  return (
    <motion.button
      className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ease-in-out ${className}`}
      style={{
        backgroundColor: "var(--surface-glass-medium)",
        boxShadow: "var(--elevation-2)",
      }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "var(--elevation-3)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Card button for selectable items (dates, times, services)
export function SelectableCard({
  children,
  selected = false,
  className = "",
  ...props
}: AnimatedButtonProps & { selected?: boolean }) {
  return (
    <motion.button
      className={`rounded-2xl border-2 text-sm font-bold transition-all duration-300 ease-in-out ${className}`}
      style={
        selected
          ? {
              borderColor: "var(--brand-rose-400)",
              backgroundColor: "var(--luxury-champagne-100)",
              boxShadow: "var(--shadow-md)",
            }
          : {
              borderColor: "var(--border-light)",
              backgroundColor: "var(--card)",
              boxShadow: "var(--shadow-sm)",
            }
      }
      whileTap={{ scale: 0.95 }}
      whileHover={!selected ? { scale: 1.02, y: -2 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}