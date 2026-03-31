import { useTheme } from '@/context/ThemeContext';
import { themes, type ThemeColors } from '@/constants/colors';

export function useColors(): ThemeColors {
  const { theme } = useTheme();
  return themes[theme];
}
