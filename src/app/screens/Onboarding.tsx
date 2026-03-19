import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, Sparkles, MapPin, Calendar, Star } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGx1eHVyeSUyMGludGVyaW9yfGVufDF8fHx8MTczOTkyNzQ4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    eyebrow: "DISCOVER",
    title: "Your perfect\nbeauty salon",
    subtitle: "Find top-rated salons & stylists near you with real-time availability",
    icon: MapPin,
    gradient: "linear-gradient(135deg, #E85A8B, #D946A0)",
  },
  {
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhaXJzdHlsaXN0JTIwYm9va2luZyUyMGFwcG9pbnRtZW50fGVufDF8fHx8MTczOTkyNzQ4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    eyebrow: "BOOK INSTANTLY",
    title: "One tap\nappointments",
    subtitle: "Schedule your beauty routine with ease. Choose your stylist, date & time",
    icon: Calendar,
    gradient: "linear-gradient(135deg, #C8A96A, #E6D3A3)",
  },
  {
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJlYXV0eSUyMHRyZWF0bWVudCUyMHJlbGF4aW5nfGVufDF8fHx8MTczOTkyNzQ4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    eyebrow: "PREMIUM EXPERIENCE",
    title: "Luxury beauty\nservices",
    subtitle: "Access exclusive treatments, expert stylists & premium care",
    icon: Star,
    gradient: "linear-gradient(135deg, #F59E0B, #EAB308)",
  },
  {
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3Mzk5Mjc0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    eyebrow: "GET STARTED",
    title: "Your beauty\njourney begins",
    subtitle: "Join thousands of happy customers discovering their perfect look",
    icon: Sparkles,
    gradient: "linear-gradient(135deg, #E85A8B, #F59E0B)",
  },
];

export function Onboarding() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const isLast = current === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      // Store that onboarding has been completed
      localStorage.setItem("onboarding_completed", "true");
      navigate("/app");
    } else {
      setDirection(1);
      setCurrent((c) => c + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding_completed", "true");
    navigate("/app");
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold && current > 0) {
      // Swipe right - go to previous
      setDirection(-1);
      setCurrent((c) => c - 1);
    } else if (info.offset.x < -swipeThreshold && current < slides.length - 1) {
      // Swipe left - go to next
      setDirection(1);
      setCurrent((c) => c + 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const IconComponent = slides[current].icon;

  return (
    <div className="h-screen overflow-hidden relative max-w-[390px] mx-auto" style={{ backgroundColor: 'var(--background)' }}>
      {/* Background Image Layer with Swipe */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`bg-${current}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ 
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{ background: slides[current].gradient }}
          />
          
          {/* Glassmorphic top fade */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm" />
        </motion.div>
      </AnimatePresence>

      {/* Skip Button */}
      <motion.button
        onClick={handleSkip}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-14 right-6 z-20 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
        whileHover={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
      >
        Skip
      </motion.button>

      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 pt-24 pb-12">
        
        {/* Top Icon Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`icon-${current}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center"
          >
            <div 
              className="relative w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{
                background: slides[current].gradient,
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-40"
                style={{ background: slides[current].gradient }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              <IconComponent className="w-10 h-10 text-white relative z-10" strokeWidth={2} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Content */}
        <div>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`content-${current}`}
              custom={direction}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mb-6"
              >
                <div
                  className="h-0.5 rounded-full"
                  style={{ 
                    width: '32px',
                    background: slides[current].gradient,
                    boxShadow: '0 2px 12px rgba(232, 90, 139, 0.4)',
                  }}
                />
                <span
                  className="text-xs font-black tracking-[0.15em] uppercase"
                  style={{ 
                    background: slides[current].gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {slides[current].eyebrow}
                </span>
              </motion.div>

              {/* Title */}
              <h1 
                className="text-5xl font-black text-white mb-4 leading-[1.08] whitespace-pre-line"
                style={{ 
                  letterSpacing: '-0.03em',
                  textShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                {slides[current].title}
              </h1>

              {/* Subtitle */}
              <p 
                className="text-lg mb-10 leading-relaxed max-w-[320px]"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500,
                }}
              >
                {slides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots + CTA Row */}
          <div className="flex items-center justify-between">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className="relative"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{
                      width: i === current ? 32 : 8,
                      height: 8,
                      opacity: i === current ? 1 : 0.3,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="rounded-full"
                    style={{
                      background: i === current 
                        ? slides[current].gradient 
                        : '#FFFFFF',
                      boxShadow: i === current 
                        ? '0 4px 16px rgba(232, 90, 139, 0.5)' 
                        : 'none',
                    }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Next / Get Started Button */}
            <motion.button
              onClick={handleNext}
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden font-black transition-all duration-300"
              style={{
                background: isLast 
                  ? 'linear-gradient(135deg, #E85A8B, #D946A0, #E85A8B)'
                  : slides[current].gradient,
                padding: isLast ? '16px 32px' : '0',
                width: isLast ? 'auto' : '64px',
                height: '64px',
                borderRadius: isLast ? '999px' : '50%',
                boxShadow: '0 12px 32px -8px rgba(232, 90, 139, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['200% 0', '-200% 0'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <span className="relative z-10 flex items-center justify-center gap-2 text-white text-base">
                {isLast && "Get Started"}
                <motion.div
                  animate={!isLast ? {
                    x: [0, 4, 0],
                  } : {}}
                  transition={{
                    duration: 1.2,
                    repeat: !isLast ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
                </motion.div>
              </span>
            </motion.button>
          </div>

          {/* Swipe Indicator (only on first slide) */}
          {current === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-xs font-semibold"
            >
              <motion.div
                animate={{ x: [-8, 8, -8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ←
              </motion.div>
              Swipe to explore
              <motion.div
                animate={{ x: [-8, 8, -8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}