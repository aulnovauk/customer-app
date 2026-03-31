import React, { createContext, useContext, useEffect, useState } from 'react';

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

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

const ALL_THEMES: ThemeMode[] = [
  'light', 'dark', 'warm', 'masculine', 'unisex', 'genz', 
  'luxe', 'sunset', 'ocean', 'royal', 'mint', 'sakura', 'cyber'
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      // Check both keys in case of migration
      const savedAppTheme = localStorage.getItem('app-theme') as ThemeMode | null;
      const savedGlowbookTheme = localStorage.getItem('glowbook-theme') as ThemeMode | null;
      return savedAppTheme || savedGlowbookTheme || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all possible theme classes
    root.classList.remove(...ALL_THEMES);
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage consistently
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-theme', theme);
      localStorage.setItem('glowbook-theme', theme);
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
