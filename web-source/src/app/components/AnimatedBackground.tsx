import { motion } from "motion/react";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { FloatingOrbs } from "./FloatingOrbs";
import { BackgroundPattern } from "./BackgroundPattern";
import { useTheme } from "../context/ThemeContext";
import {
  type BackgroundTheme,
  lightThemes,
  darkThemes,
  warmThemes,
} from "../constants/animationColors";

type ThemeMode =
  | "light"
  | "dark"
  | "warm"
  | "masculine"
  | "unisex"
  | "genz"
  | "luxe"
  | "sunset"
  | "ocean"
  | "royal"
  | "mint"
  | "sakura"
  | "cyber";

function getThemeFromPath(
  pathname: string,
  themeMode: ThemeMode
): BackgroundTheme {
  const themes =
    themeMode === "dark"
      ? darkThemes
      : themeMode === "warm"
        ? warmThemes
        : lightThemes;

  if (pathname === "/" || pathname.startsWith("/onboarding"))
    return themes.onboarding;
  if (pathname === "/app" || pathname === "/app/") return themes.home;
  if (pathname.startsWith("/app/explore")) return themes.explore;
  if (pathname.startsWith("/app/bookings")) return themes.bookings;
  if (pathname.startsWith("/app/favorites")) return themes.favorites;
  if (pathname.startsWith("/app/events")) return themes.events ?? themes.default;
  if (pathname.startsWith("/app/shop")) return themes.shop ?? themes.default;
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
    getThemeFromPath(location.pathname, theme as ThemeMode)
  );

  useEffect(() => {
    const newTheme = getThemeFromPath(location.pathname, theme as ThemeMode);
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
              width:
                index === 0
                  ? "60%"
                  : index === 1
                    ? "50%"
                    : index === 2
                      ? "45%"
                      : "40%",
              paddingBottom:
                index === 0
                  ? "60%"
                  : index === 1
                    ? "50%"
                    : index === 2
                      ? "45%"
                      : "40%",
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
            theme === "dark"
              ? "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)"
              : "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.015) 100%)",
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
