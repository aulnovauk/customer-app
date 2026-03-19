import { motion, AnimatePresence } from "motion/react";
import { ReactNode } from "react";
import { useLocation } from "react-router";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
