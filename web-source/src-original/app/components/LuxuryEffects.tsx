import { motion } from "motion/react";
import { ReactNode } from "react";

// Premium badge with shimmer effect
export function PremiumBadge({ 
  children, 
  variant = "gold" 
}: { 
  children: ReactNode; 
  variant?: "gold" | "rose" | "platinum" 
}) {
  const variants = {
    gold: {
      background: "var(--gradient-gold-sheen)",
      shimmer: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
    },
    rose: {
      background: "var(--gradient-luxury)",
      shimmer: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
    },
    platinum: {
      background: "var(--gradient-platinum-sheen)",
      shimmer: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
    },
  };

  return (
    <motion.div
      className="relative inline-flex items-center px-3 py-1.5 rounded-full overflow-hidden"
      style={{ background: variants[variant].background }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="relative z-10 text-white text-xs font-bold tracking-wide uppercase">
        {children}
      </span>
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: variants[variant].shimmer,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

// Luxury rating display with golden stars
export function LuxuryRating({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl"
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        boxShadow: "var(--elevation-2)",
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex items-center gap-1">
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="url(#gold-gradient)"
          />
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "var(--color-gold-300)" }} />
              <stop offset="50%" style={{ stopColor: "var(--color-gold-500)" }} />
              <stop offset="100%" style={{ stopColor: "var(--color-gold-700)" }} />
            </linearGradient>
          </defs>
        </motion.svg>
        <span className="text-sm font-bold" style={{ color: "var(--luxury-charcoal-800)" }}>
          {rating}
        </span>
      </div>
      {reviews && (
        <span className="text-xs" style={{ color: "var(--luxury-charcoal-400)" }}>
          ({reviews})
        </span>
      )}
    </motion.div>
  );
}

// Premium divider with gradient
export function LuxuryDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-px ${className}`}>
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: "var(--gradient-luxury)" }}
      />
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: "linear-gradient(90deg, transparent, var(--luxury-gold-400), transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Floating shine effect overlay
export function ShineOverlay() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 55%, transparent 100%)",
        backgroundSize: "200% 200%",
      }}
      animate={{
        backgroundPosition: ["200% 200%", "-200% -200%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// Premium section header
export function LuxuryHeading({ 
  children, 
  subtitle, 
  icon 
}: { 
  children: ReactNode; 
  subtitle?: string; 
  icon?: ReactNode;
}) {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-3 mb-1">
        {icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            {icon}
          </motion.div>
        )}
        <h2 
          className="text-2xl font-bold tracking-tight" 
          style={{ 
            color: "var(--foreground)",
            letterSpacing: "-0.02em",
          }}
        >
          {children}
        </h2>
      </div>
      {subtitle && (
        <motion.p
          className="text-sm"
          style={{ color: "var(--luxury-charcoal-400)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

// Gold accent pill
export function GoldAccent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${className}`}
      style={{ color: "var(--luxury-gold-600)" }}
    >
      {children}
    </span>
  );
}

// Premium price display
export function LuxuryPrice({ price, period }: { price: string; period?: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-xs" style={{ color: "var(--luxury-charcoal-400)" }}>
        from
      </span>
      <span 
        className="text-xl font-bold tracking-tight" 
        style={{ 
          color: "var(--foreground)",
          letterSpacing: "-0.02em",
        }}
      >
        {price}
      </span>
      {period && (
        <span className="text-xs" style={{ color: "var(--luxury-charcoal-400)" }}>
          {period}
        </span>
      )}
    </div>
  );
}

// Silk-like card overlay
export function SilkOverlay({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
      }}
    />
  );
}

// Luxury status indicator
export function StatusIndicator({ 
  status, 
  label 
}: { 
  status: "open" | "closing" | "closed"; 
  label: string;
}) {
  const colors = {
    open: { bg: "var(--color-success-light)", dot: "var(--color-success)", text: "var(--color-success-dark)" },
    closing: { bg: "var(--color-warning-light)", dot: "var(--color-warning)", text: "var(--color-warning-dark)" },
    closed: { bg: "var(--neutral-200)", dot: "var(--neutral-500)", text: "var(--neutral-700)" },
  };

  return (
    <div 
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm"
      style={{ backgroundColor: colors[status].bg }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: colors[status].dot }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-xs font-semibold" style={{ color: colors[status].text }}>
        {label}
      </span>
    </div>
  );
}
