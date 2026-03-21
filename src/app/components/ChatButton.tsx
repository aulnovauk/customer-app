import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  isOnline?: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function ChatButton({ isOnline = true, onClick }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-9 h-9 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
      }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.08 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      {/* Chat Icon */}
      <MessageCircle 
        className="w-4 h-4" 
        style={{ color: 'var(--brand-primary)' }} 
      />
      
      {/* Online Status Indicator */}
      {isOnline && (
        <>
          {/* Pulsing ring animation */}
          <motion.span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
            style={{
              backgroundColor: 'var(--color-success)',
              opacity: 0.3,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Solid status dot */}
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            style={{
              backgroundColor: 'var(--color-success)',
              borderColor: 'rgba(255, 255, 255, 0.95)',
            }}
          />
        </>
      )}
      
      {/* Offline Status Indicator */}
      {!isOnline && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
          style={{
            backgroundColor: 'var(--muted-foreground)',
            borderColor: 'rgba(255, 255, 255, 0.95)',
          }}
        />
      )}
    </motion.button>
  );
}
