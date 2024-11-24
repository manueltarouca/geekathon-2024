'use client';
import { createContext, useEffect, useState, useMemo, useCallback, useContext } from 'react';

export interface ThemeContextType {
  theme: string;
  changeTheme: (event: any) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null as any,
  changeTheme: () => {},
});

const useThemeDetector = () => {
  const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: business)').matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
  const mqListener = (e: { matches: boolean | ((prevState: boolean) => boolean) }) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: business)');
    darkThemeMq.addEventListener('change', mqListener);
    return () => darkThemeMq.removeEventListener('change', mqListener);
  }, []);
  return isDarkTheme;
};

export const ThemeProvider = ({ children }: any) => {
  const isDarkTheme = useThemeDetector();

  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') ?? (isDarkTheme ? 'business' : 'light'));

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', localTheme as string);
  }, [theme, isDarkTheme]);

  const changeTheme = useCallback((event?: any) => {
    const nextTheme: string | null = event.target.value || null;
    setTheme(nextTheme as string);
  }, []);

  const value = useMemo(() => ({ theme, changeTheme }), [theme, changeTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
