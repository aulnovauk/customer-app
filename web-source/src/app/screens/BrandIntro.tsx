import { useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";
import { useNavigate } from "react-router";
import { Sparkles } from "lucide-react";

export function BrandIntro() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Entrance sequence
    const sequence = async () => {
      // Wait a bit for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Trigger animations
      await controls.start("visible");
      
      // Wait for 2.5 seconds to let user appreciate the brand
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Start exit
      setIsExiting(true);
      
      // Navigate after exit animation
      setTimeout(() => {
        // Mark brand intro as shown
        localStorage.setItem("brand_intro_shown", "true");
        navigate("/app", { replace: true });
      }, 800);
    };

    sequence();
  }, [navigate, controls]);

  return (
    <motion.div
      className="h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: 'var(--gradient-brand-purple)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'var(--text-inverse)' }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -50, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: 'var(--text-inverse)' }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -60, 0],
          y: [0, 60, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Sparkle particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          initial={{ 
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -30],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-8">
        
        {/* Sparkle icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: {
                duration: 1,
                ease: [0.34, 1.56, 0.64, 1],
              }
            }
          }}
          className="mb-8"
        >
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 w-24 h-24 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <div
              className="relative w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 2px 8px rgba(255, 255, 255, 0.2)',
              }}
            >
              <Sparkles className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </motion.div>
        </motion.div>

        {/* Brand Name - Animated letter by letter */}
        <div className="mb-4 overflow-hidden">
          <motion.h1
            className="text-6xl font-black text-white text-center"
            style={{
              letterSpacing: '-0.03em',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }
              }
            }}
          >
            {"StyleMate".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.5 + i * 0.05,
                      duration: 0.5,
                      ease: 'easeOut',
                    }
                  }
                }}
                style={{ display: 'inline-block' }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 1.2,
                duration: 0.8,
                ease: 'easeOut',
              }
            }
          }}
          className="mb-12"
        >
          <p 
            className="text-white text-lg font-medium tracking-wide text-center"
            style={{
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            Beauty & Wellness, Simplified
          </p>
        </motion.div>

        {/* Shimmer line */}
        <motion.div
          className="relative w-48 h-1 rounded-full overflow-hidden"
          style={{ 
            background: 'rgba(255, 255, 255, 0.2)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                delay: 1.5,
                duration: 0.6,
                ease: 'easeOut',
              }
            }
          }}
        >
          <motion.div
            className="absolute inset-0 h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
              width: '50%',
            }}
            animate={{
              x: ['-100%', '300%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: 1.8,
            }}
          />
        </motion.div>

        {/* By line */}
        <motion.p
          className="absolute bottom-16 text-white/60 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 0.6,
              transition: {
                delay: 1.8,
                duration: 0.8,
              }
            }
          }}
        >
          by Aulnova Techsoft
        </motion.p>
      </div>

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.2) 100%)',
        }}
      />
    </motion.div>
  );
}
