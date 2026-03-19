import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Sparkles } from "lucide-react";

export function Splash() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const onboardingCompleted = localStorage.getItem("onboarding_completed");
    const geolocationGranted = localStorage.getItem("geolocation_permission");
    const notificationGranted = localStorage.getItem("notification_permission");
    const brandIntroShown = localStorage.getItem("brand_intro_shown");

    // Determine where to navigate
    if (!onboardingCompleted) {
      navigate("/onboarding", { replace: true });
    } else if (!geolocationGranted) {
      navigate("/geolocation", { replace: true });
    } else if (!notificationGranted) {
      navigate("/notifications-setup", { replace: true });
    } else if (!brandIntroShown) {
      navigate("/brand-intro", { replace: true });
    } else {
      navigate("/app", { replace: true });
    }
  }, [isReady, navigate]);

  return (
    <div 
      className="h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #E85A8B 0%, #D946A0 50%, #A855F7 100%)',
      }}
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-40 blur-3xl"
        style={{ background: '#F59E0B' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ background: '#C8A96A' }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            duration: 1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative mb-6"
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-60"
            style={{ 
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Logo */}
          <div 
            className="relative w-28 h-28 rounded-[32px] flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 1)',
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles 
                className="w-14 h-14" 
                strokeWidth={2}
                style={{
                  background: 'linear-gradient(135deg, #E85A8B, #D946A0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 
            className="text-4xl font-black text-white mb-2"
            style={{
              letterSpacing: '-0.02em',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
            }}
          >
            Beauté
          </h1>
          <p className="text-white/80 text-sm font-semibold tracking-[0.2em] uppercase text-center">
            Luxury Beauty
          </p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/90"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 text-white/60 text-xs font-medium"
      >
        v1.0.0
      </motion.div>
    </div>
  );
}