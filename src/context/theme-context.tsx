import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

type ThemeName = keyof typeof Colors;

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [manualTheme, setManualTheme] = useState<ThemeName | null>(null);

  const theme = manualTheme ?? (systemColorScheme === 'dark' ? 'dark' : 'light');

  const setTheme = (t: ThemeName) => {
    setManualTheme(t);
  };

  const isDark =
    theme === 'dark' ||
    theme === 'amoled' ||
    theme === 'midnight' ||
    theme === 'ocean' ||
    theme === 'forest';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeColor() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeColor must be used within a ThemeProvider');
  }
  return Colors[ctx.theme];
}

export function useThemeName() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeName must be used within a ThemeProvider');
  }
  return ctx.theme;
}

export function useSetTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useSetTheme must be used within a ThemeProvider');
  }
  return ctx.setTheme;
}

export function useIsDark() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useIsDark must be used within a ThemeProvider');
  }
  return ctx.isDark;
}