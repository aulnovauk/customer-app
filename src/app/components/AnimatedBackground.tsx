import { motion } from "motion/react";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { FloatingOrbs } from "./FloatingOrbs";
import { BackgroundPattern } from "./BackgroundPattern";
import { useTheme } from "../context/ThemeContext";

type BackgroundTheme = {
  gradient: string;
  meshColors: string[];
  overlay?: string;
  orbColors?: string[];
  orbIntensity?: "light" | "medium" | "heavy";
  pattern?: "dots" | "grid" | "waves" | "circles" | "none";
};

// Light mode themes
const lightThemes: Record<string, BackgroundTheme> = {
  onboarding: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#FFE5F1", "#FFF0E5", "#FFF8E5", "#F5E5FF"],
    orbIntensity: "light",
    pattern: "none",
  },
  home: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#FFE0EB", "#FFE8DA", "#FFE8EB", "#F0E0FF"],
    orbIntensity: "light",
    pattern: "none",
  },
  explore: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#FFD5EB", "#FFE0C8", "#D0E8FF", "#FFE5D5"],
    orbIntensity: "light",
    pattern: "none",
  },
  bookings: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#D5DEFF", "#FFE0E8", "#FFE8E0", "#DED5FF"],
    orbIntensity: "light",
    pattern: "none",
  },
  favorites: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#FFCADD", "#FFD5E0", "#FFDDE8", "#FFCDDF"],
    orbIntensity: "light",
    pattern: "none",
  },
  profile: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#FFE5D5", "#FFDDE0", "#FFEADD", "#FFD5DD"],
    orbIntensity: "light",
    pattern: "none",
  },
  salon: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#FFE8DA", "#FFDDE8", "#FFE5DA"],
    orbIntensity: "light",
    pattern: "none",
  },
  booking: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#FFE5DD", "#D5E8FF", "#FFDDE5"],
    orbIntensity: "light",
    pattern: "none",
  },
  payment: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#D8FFE0", "#FFE5DD", "#FFDDE8"],
    orbIntensity: "light",
    pattern: "none",
  },
  confirmation: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#CCFFE0", "#FFEADD", "#FFD5E8"],
    orbIntensity: "light",
    pattern: "none",
  },
  events: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#FFE0F0", "#F0E0FF", "#E0F0FF", "#FFE0E0"],
    orbIntensity: "light",
    pattern: "none",
  },
  shop: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
    overlay: "none",
    orbColors: ["#FFE5D0", "#D0FFE5", "#E5D0FF", "#FFD0E5"],
    orbIntensity: "light",
    pattern: "none",
  },
  default: {
    gradient: "#FFFFFF",
    meshColors: ["#FFFFFF", "#FFFFFF"],
    orbColors: ["#FFF5F0", "#FFF0F5"],
    orbIntensity: "light",
    pattern: "none",
  },
};

// Dark mode themes
const darkThemes: Record<string, BackgroundTheme> = {
  onboarding: {
    gradient: "linear-gradient(135deg, #1a0f13 0%, #1a1410 25%, #121212 50%, #130f1a 75%, #1a0f13 100%)",
    meshColors: ["#2a1520", "#2a1a10", "#1a1a1a", "#1e152a", "#2a1520"],
    overlay: "radial-gradient(circle at 20% 50%, rgba(139, 69, 89, 0.15), transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 99, 69, 0.15), transparent 50%)",
    orbColors: ["#3a2028", "#3a2818", "#3a2030", "#2e253a"],
    orbIntensity: "light",
    pattern: "none",
  },
  home: {
    gradient: "linear-gradient(160deg, #1a0f13 0%, #1a1410 30%, #121212 60%, #1a0f15 100%)",
    meshColors: ["#2a1520", "#2a1a10", "#1a1a1a", "#2a1525"],
    overlay: "radial-gradient(circle at 30% 20%, rgba(139, 69, 89, 0.1), transparent 40%)",
    orbColors: ["#3a2028", "#3a2818", "#3a2030"],
    orbIntensity: "light",
    pattern: "dots",
  },
  explore: {
    gradient: "linear-gradient(140deg, #1a0f15 0%, #1a1510 25%, #0f1520 50%, #1a1410 75%, #1a0f18 100%)",
    meshColors: ["#2a1525", "#2a1a10", "#1a2030", "#2a1e10", "#251a2a"],
    overlay: "radial-gradient(circle at 15% 30%, rgba(139, 69, 89, 0.12), transparent 35%)",
    orbColors: ["#3a2030", "#3a2518", "#2a3040", "#3a2820"],
    orbIntensity: "light",
    pattern: "circles",
  },
  bookings: {
    gradient: "linear-gradient(150deg, #0f1520 0%, #1a0f15 35%, #1a1410 70%, #15101a 100%)",
    meshColors: ["#1a2030", "#2a1520", "#2a1a10", "#201a2a"],
    overlay: "radial-gradient(circle at 25% 40%, rgba(79, 96, 122, 0.12), transparent 40%)",
    orbColors: ["#2a3040", "#3a2028", "#3a2818"],
    orbIntensity: "light",
    pattern: "grid",
  },
  favorites: {
    gradient: "linear-gradient(155deg, #2a1520 0%, #1a0f13 30%, #121212 60%, #2a1523 100%)",
    meshColors: ["#3a2028", "#2a1520", "#1a1a1a", "#3a2030"],
    overlay: "radial-gradient(circle at 40% 30%, rgba(139, 49, 79, 0.08), transparent 40%)",
    orbColors: ["#4a2838", "#4a3028", "#4a2840"],
    orbIntensity: "medium",
    pattern: "waves",
  },
  profile: {
    gradient: "linear-gradient(145deg, #1a1410 0%, #1a0f13 35%, #1a1410 70%, #1a0f10 100%)",
    meshColors: ["#2a1a10", "#2a1520", "#2a1e10", "#2a1518"],
    overlay: "radial-gradient(circle at 20% 25%, rgba(139, 99, 69, 0.12), transparent 40%)",
    orbColors: ["#3a2818", "#3a2028", "#3a2820"],
    orbIntensity: "light",
    pattern: "dots",
  },
  salon: {
    gradient: "linear-gradient(135deg, #1a1410 0%, #1a0f15 50%, #1a1410 100%)",
    meshColors: ["#2a1a10", "#2a1525", "#2a1a10"],
    overlay: "radial-gradient(circle at 50% 20%, rgba(139, 108, 79, 0.1), transparent 50%)",
    orbColors: ["#3a2818", "#3a2030", "#3a2818"],
    orbIntensity: "light",
    pattern: "none",
  },
  booking: {
    gradient: "linear-gradient(140deg, #1a1410 0%, #0f1520 50%, #1a0f13 100%)",
    meshColors: ["#2a1a10", "#1a2030", "#2a1520"],
    overlay: "radial-gradient(circle at 30% 40%, rgba(100, 120, 140, 0.12), transparent 45%)",
    orbColors: ["#3a2818", "#2a3540", "#3a2028"],
    orbIntensity: "light",
    pattern: "dots",
  },
  payment: {
    gradient: "linear-gradient(160deg, #0f1a10 0%, #1a1410 50%, #1a0f13 100%)",
    meshColors: ["#1a2515", "#2a1a10", "#2a1520"],
    overlay: "radial-gradient(circle at 50% 30%, rgba(79, 139, 89, 0.1), transparent 50%)",
    orbColors: ["#2a3520", "#3a2818", "#3a2028"],
    orbIntensity: "light",
    pattern: "grid",
  },
  confirmation: {
    gradient: "linear-gradient(150deg, #0f1a10 0%, #1a1510 50%, #1a0f15 100%)",
    meshColors: ["#1a2515", "#2a1e10", "#2a1525"],
    overlay: "radial-gradient(circle at 50% 50%, rgba(89, 149, 99, 0.12), transparent 60%)",
    orbColors: ["#2a3520", "#3a2a18", "#3a2030"],
    orbIntensity: "light",
    pattern: "circles",
  },
  default: {
    gradient: "linear-gradient(135deg, #0f0f0f 0%, #1a1410 100%)",
    meshColors: ["#1a1a1a", "#2a1a10"],
    orbColors: ["#2a2a2a", "#3a2818"],
    orbIntensity: "light",
    pattern: "none",
  },
};

// Warm mode themes
const warmThemes: Record<string, BackgroundTheme> = {
  onboarding: {
    gradient: "linear-gradient(135deg, #fff8ed 0%, #fff5ed 25%, #fffbf5 50%, #fff8ed 75%, #fff5ed 100%)",
    meshColors: ["#ffeed5", "#fff5e0", "#fffbf0", "#fff0d5", "#ffeed8"],
    overlay: "radial-gradient(circle at 20% 50%, rgba(255, 218, 185, 0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 228, 196, 0.2), transparent 50%)",
    orbColors: ["#ffe5c8", "#fff0d8", "#ffe8c8", "#fff3d5"],
    orbIntensity: "medium",
    pattern: "none",
  },
  home: {
    gradient: "linear-gradient(160deg, #fff8f0 0%, #fff5ed 30%, #fffaf5 60%, #fff8ed 100%)",
    meshColors: ["#fff0e0", "#ffeed8", "#fff8f0", "#fff0d8"],
    overlay: "radial-gradient(circle at 30% 20%, rgba(255, 218, 185, 0.15), transparent 40%)",
    orbColors: ["#ffe8d5", "#fff0d8", "#ffe5d0", "#fff3dd"],
    orbIntensity: "light",
    pattern: "dots",
  },
  explore: {
    gradient: "linear-gradient(140deg, #fff5ed 0%, #fff8ed 25%, #fffaf0 50%, #fff5e8 75%, #fff8ed 100%)",
    meshColors: ["#ffeed8", "#fff0d5", "#fff8e8", "#ffeed0", "#fff0d8"],
    overlay: "radial-gradient(circle at 15% 30%, rgba(255, 218, 185, 0.18), transparent 35%)",
    orbColors: ["#ffe5c8", "#ffe8c5", "#fff0d5", "#ffe8c8"],
    orbIntensity: "medium",
    pattern: "circles",
  },
  bookings: {
    gradient: "linear-gradient(150deg, #fff8ed 0%, #fff5f0 35%, #fff8ed 70%, #fff5ed 100%)",
    meshColors: ["#fff0d8", "#ffeed0", "#fff0e0", "#ffeed5"],
    overlay: "radial-gradient(circle at 25% 40%, rgba(255, 218, 185, 0.15), transparent 40%)",
    orbColors: ["#ffe8d0", "#ffe5c8", "#ffe8d5", "#ffeed8"],
    orbIntensity: "light",
    pattern: "grid",
  },
  favorites: {
    gradient: "linear-gradient(155deg, #fff3ed 0%, #fff5ed 30%, #fffaf5 60%, #fff3ed 100%)",
    meshColors: ["#ffe8d5", "#ffeed0", "#fff3e0", "#ffe8d8"],
    overlay: "radial-gradient(circle at 40% 30%, rgba(255, 192, 159, 0.12), transparent 40%)",
    orbColors: ["#ffe0c5", "#ffe5d0", "#ffe8d5", "#ffe0c8"],
    orbIntensity: "medium",
    pattern: "waves",
  },
  profile: {
    gradient: "linear-gradient(145deg, #fff8ed 0%, #fff5ed 35%, #fffaf0 70%, #fff5e8 100%)",
    meshColors: ["#fff0d8", "#ffeed5", "#fff5e0", "#ffeed0"],
    overlay: "radial-gradient(circle at 20% 25%, rgba(255, 218, 185, 0.18), transparent 40%)",
    orbColors: ["#ffe8d0", "#ffe5c8", "#ffeed5", "#ffe5c5"],
    orbIntensity: "light",
    pattern: "dots",
  },
  salon: {
    gradient: "linear-gradient(135deg, #fffaf0 0%, #fff5ed 50%, #fff8ed 100%)",
    meshColors: ["#fff5e0", "#ffeed8", "#fff0d8"],
    overlay: "radial-gradient(circle at 50% 20%, rgba(255, 218, 185, 0.18), transparent 50%)",
    orbColors: ["#ffeed5", "#ffe8d0", "#ffeed8"],
    orbIntensity: "light",
    pattern: "none",
  },
  booking: {
    gradient: "linear-gradient(140deg, #fff8ed 0%, #fff5f0 50%, #fff8ed 100%)",
    meshColors: ["#fff0d8", "#ffeed8", "#fff0dd"],
    overlay: "radial-gradient(circle at 30% 40%, rgba(255, 228, 196, 0.2), transparent 45%)",
    orbColors: ["#ffe8d0", "#ffe8d5", "#ffe5d0"],
    orbIntensity: "light",
    pattern: "dots",
  },
  payment: {
    gradient: "linear-gradient(160deg, #f5fef0 0%, #fff8ed 50%, #fff5ed 100%)",
    meshColors: ["#e8ffe0", "#fff0d8", "#ffeed5"],
    overlay: "radial-gradient(circle at 50% 30%, rgba(200, 238, 185, 0.15), transparent 50%)",
    orbColors: ["#dfffcd", "#ffe8d0", "#ffe5c8"],
    orbIntensity: "light",
    pattern: "grid",
  },
  confirmation: {
    gradient: "linear-gradient(150deg, #f5fef0 0%, #fffaf0 50%, #fff5ed 100%)",
    meshColors: ["#e0ffe0", "#fff5dd", "#ffeed5"],
    overlay: "radial-gradient(circle at 50% 50%, rgba(200, 238, 185, 0.18), transparent 60%)",
    orbColors: ["#d8ffd0", "#ffeed8", "#ffe5d0"],
    orbIntensity: "light",
    pattern: "circles",
  },
  default: {
    gradient: "linear-gradient(135deg, #fefbf5 0%, #fff8ed 100%)",
    meshColors: ["#fffbf5", "#fff0d8"],
    orbColors: ["#fff8ed", "#ffeed5"],
    orbIntensity: "light",
    pattern: "none",
  },
};

function getThemeFromPath(pathname: string, themeMode: 'light' | 'dark' | 'warm'): BackgroundTheme {
  const themes = themeMode === 'dark' ? darkThemes : themeMode === 'warm' ? warmThemes : lightThemes;
  
  if (pathname === "/" || pathname.startsWith("/onboarding")) return themes.onboarding;
  if (pathname === "/app" || pathname === "/app/") return themes.home;
  if (pathname.startsWith("/app/explore")) return themes.explore;
  if (pathname.startsWith("/app/bookings")) return themes.bookings;
  if (pathname.startsWith("/app/favorites")) return themes.favorites;
  if (pathname.startsWith("/app/events")) return themes.events || themes.default;
  if (pathname.startsWith("/app/shop")) return themes.shop || themes.default;
  if (pathname.startsWith("/app/profile")) return themes.profile;
  if (pathname.startsWith("/salon")) return themes.salon;
  if (pathname.startsWith("/booking")) return themes.booking;
  if (pathname.startsWith("/payment")) return themes.payment;
  if (pathname.startsWith("/confirmation")) return themes.confirmation;
  return themes.default;
}

export function AnimatedBackground() {
  const location = useLocation();
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<BackgroundTheme>(
    getThemeFromPath(location.pathname, theme)
  );

  useEffect(() => {
    const newTheme = getThemeFromPath(location.pathname, theme);
    setCurrentTheme(newTheme);
  }, [location.pathname, theme]);

  return (
    <>
      {/* Base gradient layer with smooth transition */}
      <motion.div
        className="fixed inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          background: currentTheme.gradient,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Animated mesh gradient overlay */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {currentTheme.meshColors.map((color, index) => (
          <motion.div
            key={`${location.pathname}-${theme}-${index}`}
            className="absolute rounded-full blur-3xl opacity-40"
            style={{
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              width: index === 0 ? "60%" : index === 1 ? "50%" : index === 2 ? "45%" : "40%",
              paddingBottom: index === 0 ? "60%" : index === 1 ? "50%" : index === 2 ? "45%" : "40%",
            }}
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: 0.8,
            }}
            animate={{
              top: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              left: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              scale: [0.8, 1.1, 0.9, 1.0],
            }}
            transition={{
              duration: 20 + index * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Additional overlay for depth */}
      {currentTheme.overlay && (
        <motion.div
          className="fixed inset-0 -z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            background: currentTheme.overlay,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}

      {/* Subtle grain texture for premium feel */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Soft vignette effect */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            theme === 'dark' 
              ? "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%)"
              : "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.015) 100%)",
        }}
      />

      {/* Floating orbs */}
      {currentTheme.orbColors && (
        <FloatingOrbs
          colors={currentTheme.orbColors}
          intensity={currentTheme.orbIntensity}
        />
      )}

      {/* Background pattern */}
      {currentTheme.pattern && (
        <BackgroundPattern pattern={currentTheme.pattern} />
      )}
    </>
  );
}