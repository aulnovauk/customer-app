export type ThemeMode =
  | 'light'
  | 'dark'
  | 'warm'
  | 'masculine'
  | 'unisex'
  | 'genz'
  | 'luxe'
  | 'sunset'
  | 'ocean'
  | 'royal'
  | 'mint'
  | 'sakura'
  | 'cyber';

export interface ThemeColors {
  brandPrimary: string;
  brandPrimaryLight: string;
  brandPrimaryLighter: string;
  brandPrimaryDark: string;
  brandPrimaryDarker: string;
  brandPrimary50: string;
  brandPrimary100: string;
  brandPrimary200: string;
  brandPrimary300: string;
  brandPrimary400: string;
  brandPrimary500: string;
  brandPrimary600: string;
  brandPrimary700: string;
  accentGold: string;
  accentGoldLight: string;
  accentGoldDark: string;
  background: string;
  backgroundElevated: string;
  backgroundSubtle: string;
  surface: string;
  surfaceElevated: string;
  surfaceOverlay: string;
  surfaceGlassLight: string;
  surfaceGlassMedium: string;
  surfaceGlassHeavy: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textInverse: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  borderLight: string;
  borderMedium: string;
  borderStrong: string;
  borderBrand: string;
  cardElevated: string;
  primarySubtle: string;
  iconIndigo: string;
  iconRose: string;
  iconAmber: string;
  iconEmerald: string;
  iconPink: string;
  iconPurple: string;
  iconBlue: string;
  iconGray: string;
  goldWarm: string;
  goldPale: string;
  radius: number;
}

export const lightTheme: ThemeColors = {
  brandPrimary: '#FF1B8D',
  brandPrimaryLight: '#FF6B9D',
  brandPrimaryLighter: '#FFA8C5',
  brandPrimaryDark: '#E6007A',
  brandPrimaryDarker: '#CC0066',
  brandPrimary50: '#FEF2F5',
  brandPrimary100: '#FDE6ED',
  brandPrimary200: '#FCC9DB',
  brandPrimary300: '#F9A3BD',
  brandPrimary400: '#F186AC',
  brandPrimary500: '#E85A8B',
  brandPrimary600: '#D6427A',
  brandPrimary700: '#C42A69',
  accentGold: '#FFD700',
  accentGoldLight: '#FFE55C',
  accentGoldDark: '#E6C200',
  background: '#FFFFFF',
  backgroundElevated: '#FFFFFF',
  backgroundSubtle: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceOverlay: 'rgba(255, 255, 255, 0.95)',
  surfaceGlassLight: 'rgba(255, 255, 255, 0.6)',
  surfaceGlassMedium: 'rgba(255, 255, 255, 0.75)',
  surfaceGlassHeavy: 'rgba(255, 255, 255, 0.9)',
  textPrimary: '#0F0F10',
  textSecondary: '#5C5C60',
  textTertiary: '#9B9B9F',
  textDisabled: '#C7C7CC',
  textInverse: '#FFFFFF',
  success: '#10B981',
  successLight: '#34D399',
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  error: '#EF4444',
  errorLight: '#F87171',
  borderLight: 'rgba(0, 0, 0, 0.06)',
  borderMedium: 'rgba(0, 0, 0, 0.1)',
  borderStrong: 'rgba(0, 0, 0, 0.15)',
  borderBrand: '#FCC9DB',
  cardElevated: 'rgba(255, 255, 255, 0.9)',
  primarySubtle: 'rgba(255, 27, 141, 0.1)',
  iconIndigo: '#6366F1',
  iconRose: '#F43F5E',
  iconAmber: '#F59E0B',
  iconEmerald: '#10B981',
  iconPink: '#EC4899',
  iconPurple: '#8B5CF6',
  iconBlue: '#3B82F6',
  iconGray: '#6B7280',
  goldWarm: '#C8A96A',
  goldPale: '#E6D3A3',
  radius: 16,
};

export const darkTheme: ThemeColors = {
  brandPrimary: '#FF6B9D',
  brandPrimaryLight: '#FF8DB5',
  brandPrimaryLighter: '#FFB5CC',
  brandPrimaryDark: '#FF1B8D',
  brandPrimaryDarker: '#E6007A',
  brandPrimary50: '#2A1520',
  brandPrimary100: '#3D1C2E',
  brandPrimary200: '#5E2845',
  brandPrimary300: '#8A3D64',
  brandPrimary400: '#B8527E',
  brandPrimary500: '#E85A8B',
  brandPrimary600: '#FF6B9D',
  brandPrimary700: '#FF8DB5',
  accentGold: '#FFD700',
  accentGoldLight: '#FFE55C',
  accentGoldDark: '#E6C200',
  background: '#0A0A0B',
  backgroundElevated: '#1A1A1D',
  backgroundSubtle: '#141416',
  surface: '#1A1A1D',
  surfaceElevated: '#242428',
  surfaceOverlay: 'rgba(26, 26, 29, 0.95)',
  surfaceGlassLight: 'rgba(26, 26, 29, 0.6)',
  surfaceGlassMedium: 'rgba(26, 26, 29, 0.75)',
  surfaceGlassHeavy: 'rgba(26, 26, 29, 0.9)',
  textPrimary: '#F5F5F7',
  textSecondary: '#A1A1A6',
  textTertiary: '#6E6E73',
  textDisabled: '#48484A',
  textInverse: '#0F0F10',
  success: '#34D399',
  successLight: '#6EE7B7',
  warning: '#FBBF24',
  warningLight: '#FDE68A',
  error: '#F87171',
  errorLight: '#FCA5A5',
  borderLight: 'rgba(255, 255, 255, 0.08)',
  borderMedium: 'rgba(255, 255, 255, 0.12)',
  borderStrong: 'rgba(255, 255, 255, 0.18)',
  borderBrand: '#5E2845',
  cardElevated: 'rgba(26, 26, 29, 0.9)',
  primarySubtle: 'rgba(255, 107, 157, 0.15)',
  iconIndigo: '#818CF8',
  iconRose: '#FB7185',
  iconAmber: '#FBBF24',
  iconEmerald: '#34D399',
  iconPink: '#F472B6',
  iconPurple: '#A78BFA',
  iconBlue: '#60A5FA',
  iconGray: '#9CA3AF',
  goldWarm: '#D4AF37',
  goldPale: '#F0D680',
  radius: 16,
};

export const themes: Record<ThemeMode, ThemeColors> = {
  light: lightTheme,
  dark: darkTheme,
  warm: {
    ...lightTheme,
    background: '#FFF8F0',
    backgroundElevated: '#FFFAF5',
    backgroundSubtle: '#FFF5EB',
    surface: '#FFFAF5',
    surfaceElevated: '#FFFFFF',
    brandPrimary: '#E85A8B',
    textPrimary: '#2C1810',
    textSecondary: '#6B4F3E',
  },
  masculine: {
    ...darkTheme,
    brandPrimary: '#3B82F6',
    brandPrimaryLight: '#60A5FA',
    brandPrimaryDark: '#2563EB',
    background: '#0F1419',
    backgroundElevated: '#1C2430',
    surface: '#1C2430',
    surfaceElevated: '#263340',
  },
  unisex: {
    ...lightTheme,
    brandPrimary: '#8B5CF6',
    brandPrimaryLight: '#A78BFA',
    brandPrimaryDark: '#7C3AED',
    brandPrimary500: '#8B5CF6',
    primarySubtle: 'rgba(139, 92, 246, 0.1)',
  },
  genz: {
    ...lightTheme,
    brandPrimary: '#EC4899',
    brandPrimaryLight: '#F472B6',
    brandPrimaryDark: '#DB2777',
    background: '#FFF0F7',
    backgroundElevated: '#FFF5FB',
    accentGold: '#06B6D4',
    accentGoldLight: '#22D3EE',
  },
  luxe: {
    ...darkTheme,
    brandPrimary: '#D4AF37',
    brandPrimaryLight: '#E6C555',
    brandPrimaryDark: '#B8972E',
    background: '#0A0A0A',
    backgroundElevated: '#1A1A1A',
    accentGold: '#D4AF37',
  },
  sunset: {
    ...lightTheme,
    brandPrimary: '#F97316',
    brandPrimaryLight: '#FB923C',
    brandPrimaryDark: '#EA580C',
    background: '#FFFBF5',
    backgroundElevated: '#FFF8ED',
    primarySubtle: 'rgba(249, 115, 22, 0.1)',
  },
  ocean: {
    ...lightTheme,
    brandPrimary: '#0EA5E9',
    brandPrimaryLight: '#38BDF8',
    brandPrimaryDark: '#0284C7',
    background: '#F0F9FF',
    backgroundElevated: '#F5FBFF',
    primarySubtle: 'rgba(14, 165, 233, 0.1)',
  },
  royal: {
    ...darkTheme,
    brandPrimary: '#7C3AED',
    brandPrimaryLight: '#8B5CF6',
    brandPrimaryDark: '#6D28D9',
    background: '#0C0A14',
    backgroundElevated: '#1A1528',
    accentGold: '#FFD700',
  },
  mint: {
    ...lightTheme,
    brandPrimary: '#10B981',
    brandPrimaryLight: '#34D399',
    brandPrimaryDark: '#059669',
    background: '#F0FDF4',
    backgroundElevated: '#F5FFF8',
    primarySubtle: 'rgba(16, 185, 129, 0.1)',
  },
  sakura: {
    ...lightTheme,
    brandPrimary: '#F472B6',
    brandPrimaryLight: '#F9A8D4',
    brandPrimaryDark: '#EC4899',
    background: '#FFF5F9',
    backgroundElevated: '#FFFAFC',
    primarySubtle: 'rgba(244, 114, 182, 0.1)',
  },
  cyber: {
    ...darkTheme,
    brandPrimary: '#06B6D4',
    brandPrimaryLight: '#22D3EE',
    brandPrimaryDark: '#0891B2',
    background: '#030712',
    backgroundElevated: '#111827',
    accentGold: '#FBBF24',
  },
};

export const gradientColors = {
  brandPurpleReverse: ['#E85A8B', '#D946A0', '#A855F7'] as const,
  brandPurple: ['#A855F7', '#D946A0', '#E85A8B'] as const,
  brandSunset: ['#EC4899', '#F43F5E', '#FB923C'] as const,
  brandRose: ['#EC4899', '#F43F5E'] as const,
  primary: ['#FF1B8D', '#FF6B9D', '#FFA8C5'] as const,
  primaryBold: ['#CC0066', '#FF1B8D', '#FF6B9D'] as const,
  gold: ['#FFD700', '#FFE55C'] as const,
  luxury: ['#FF1B8D', '#FF6B9D', '#FFA8C5', '#FFD700'] as const,
  success: ['#10B981', '#34D399'] as const,
  slideGold: ['#C8A96A', '#E6D3A3'] as const,
  slideAmber: ['#F59E0B', '#EAB308'] as const,
  slideLuxury: ['#E85A8B', '#F59E0B'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 34,
  display: 42,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  black: '800' as const,
};
