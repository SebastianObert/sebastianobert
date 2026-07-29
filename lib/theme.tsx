"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface ThemeState {
  sunset: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [sunset, setSunset] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSunset(localStorage.getItem("sunsetMode") === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("sunsetMode", String(sunset));
      document.documentElement.classList.toggle("sunset", sunset);
    }
  }, [sunset, mounted]);

  const toggle = useCallback(() => setSunset((prev) => !prev), []);

  if (!mounted) return <>{children}</>;

  return <ThemeContext.Provider value={{ sunset, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { sunset: false, toggle: () => {} };
  return ctx;
}
