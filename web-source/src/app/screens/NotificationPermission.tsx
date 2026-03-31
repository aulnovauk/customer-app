import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Bell, X, Calendar, Sparkles, Gift } from "lucide-react";

export function NotificationPermission() {
  const navigate = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleAllow = async () => {
    setIsRequesting(true);

    try {
      // Check if notifications are supported
      if (!("Notification" in window)) {
        handleSkip();
        return;
      }

      // Request permission
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        localStorage.setItem("notification_permission", "granted");
        
        // Show a welcome notification
        new Notification("Welcome to Beauté! 💅", {
          body: "You're all set! Start discovering amazing beauty salons near you.",
          icon: "/icon.png",
        });
      } else {
        localStorage.setItem("notification_permission", "denied");
      }
      
      // Navigate to brand intro (first time) or app
      const brandIntroShown = localStorage.getItem("brand_intro_shown");
      if (!brandIntroShown) {
        navigate("/brand-intro", { replace: true });
      } else {
        navigate("/app", { replace: true });
      }
    } catch {
      handleSkip();
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("notification_permission", "denied");
    
    // Navigate to brand intro (first time) or app
    const brandIntroShown = localStorage.getItem("brand_intro_shown");
    if (!brandIntroShown) {
      navigate("/brand-intro", { replace: true });
    } else {
      navigate("/app", { replace: true });
    }
  };

  return (
    <div 
      className="h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Skip Button */}
      <motion.button
        onClick={handleSkip}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-14 right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: 'var(--muted)',
          color: 'var(--foreground)',
        }}
        whileHover={{ 
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        
        {/* Animated Bell Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative mb-12"
        >
          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(200, 169, 106, 0.2) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(200, 169, 106, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />

          {/* Main icon container */}
          <div 
            className="relative w-32 h-32 rounded-[40px] flex items-center justify-center"
            style={{
              background: 'var(--gradient-slide-gold)',
              boxShadow: '0 24px 48px -12px rgba(200, 169, 106, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* Floating sparkle */}
            <motion.div
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center"
              style={{
                boxShadow: '0 8px 24px -6px rgba(200, 169, 106, 0.5)',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Sparkles className="w-5 h-5" style={{ color: 'var(--color-gold-warm)' }} />
            </motion.div>

            {/* Main bell icon */}
            <motion.div
              animate={{
                rotate: [0, 12, -12, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeInOut',
              }}
            >
              <Bell className="w-16 h-16 text-white" strokeWidth={2} fill="white" />
            </motion.div>

            {/* Notification badge */}
            <motion.div
              className="absolute top-6 right-6 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black"
              style={{
                background: 'var(--gradient-brand-button-cta)',
                boxShadow: 'var(--shadow-brand-button)',
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              3
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="h-0.5 w-8 rounded-full"
              style={{ background: 'var(--gradient-slide-gold-90)' }}
            />
            <span
              className="text-xs font-black tracking-[0.15em] uppercase"
              style={{
                background: 'var(--gradient-slide-gold)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              STAY UPDATED
            </span>
            <div
              className="h-0.5 w-8 rounded-full"
              style={{ background: 'var(--gradient-slide-gold-90-rev)' }}
            />
          </div>

          <h1 
            className="text-4xl font-black mb-4"
            style={{
              color: 'var(--foreground)',
              letterSpacing: '-0.02em',
            }}
          >
            Never miss
            <br />
            an appointment
          </h1>

          <p 
            className="text-base leading-relaxed max-w-[300px] mx-auto"
            style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}
          >
            Get timely reminders, exclusive offers, and updates about your bookings
          </p>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-3 mb-12"
        >
          {[
            { 
              icon: Calendar, 
              text: "Appointment reminders",
              color: "var(--brand-primary-500)"
            },
            { 
              icon: Gift, 
              text: "Exclusive deals & offers",
              color: "var(--color-gold-warm)"
            },
            { 
              icon: Sparkles, 
              text: "New salon openings",
              color: "var(--color-purple-vibrant)"
            },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  backgroundColor: 'rgba(200, 169, 106, 0.05)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${feature.color}15`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: feature.color }} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                  {feature.text}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="px-6 pb-8"
      >
        {/* Enable Notifications Button */}
        <motion.button
          onClick={handleAllow}
          disabled={isRequesting}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          className="w-full relative overflow-hidden font-black text-white text-base mb-3 transition-all duration-300"
          style={{
            background: 'var(--gradient-slide-gold)',
            padding: '18px 32px',
            borderRadius: '20px',
            boxShadow: '0 16px 32px -8px rgba(200, 169, 106, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            opacity: isRequesting ? 0.7 : 1,
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
          
          <span className="relative z-10">
            {isRequesting ? "Requesting..." : "Enable Notifications"}
          </span>
        </motion.button>

        {/* Not Now Link */}
        <button
          onClick={handleSkip}
          className="w-full text-sm font-semibold transition-opacity duration-300 hover:opacity-70"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Maybe later
        </button>

        {/* Privacy Note */}
        <p className="text-center text-xs mt-4 px-4" style={{ color: 'var(--muted-foreground)', opacity: 0.7 }}>
          You can change notification preferences anytime in settings
        </p>
      </motion.div>
    </div>
  );
}