import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-gradient-to-br",
    "from-orange-950", "via-orange-700", "to-orange-400",
    "from-cyan-950", "via-cyan-700", "to-cyan-400",
    "from-emerald-950", "via-emerald-700", "to-emerald-400",
    "from-indigo-950", "via-indigo-700", "to-indigo-400",
    "from-teal-950", "via-teal-700", "to-teal-400",
    "from-pink-950", "via-pink-700", "to-pink-400",
    "from-fuchsia-950", "via-fuchsia-700", "to-fuchsia-400",
    "from-yellow-950", "via-yellow-700", "to-yellow-400",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;