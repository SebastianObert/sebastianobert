"use client";

import { AuthProvider } from "../lib/auth";
import { ThemeProvider } from "../lib/theme";
import CustomCursor from "./components/CustomCursor";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <CustomCursor />
      </AuthProvider>
    </ThemeProvider>
  );
}
