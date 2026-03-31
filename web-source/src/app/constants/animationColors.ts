/**
 * Animation color data for Framer Motion background transitions.
 *
 * POLICY NOTE — hex literals are intentional here:
 * These values are used as Framer Motion `animate` prop targets (e.g.
 * `animate={{ background: color }}`). Framer Motion interpolates between
 * these values at runtime using its own color parser; it cannot resolve
 * CSS custom properties (`var(--token)`) as animation values. Replacing
 * these literals with CSS variables would silently break all background
 * animations. Centralising them in this module (rather than scattering
 * them across component files) is the correct isolation strategy for
 * this category of colour constant.
 *
 * The Recharts attribute-selector strings in chart.tsx (`[stroke='#ccc']`)
 * are exempt for the same library-integration reason.
 */
export type BackgroundTheme = {
  gradient: string;
  meshColors: string[];
  overlay?: string;
  orbColors?: string[];
  orbIntensity?: "light" | "medium" | "heavy";
  pattern?: "dots" | "grid" | "waves" | "circles" | "none";
};

export const lightThemes: Record<string, BackgroundTheme> = {
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

export const darkThemes: Record<string, BackgroundTheme> = {
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

export const warmThemes: Record<string, BackgroundTheme> = {
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

export const DEFAULT_ORB_COLORS = ["#FFE8F5", "#FFE8D5", "#E0F0FF", "#FFF0E0", "#F5E8FF"];
export const DEFAULT_SPARKLE_COLOR = "#FFE8F5";
