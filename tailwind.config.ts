import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cursor: {
          cream: "#f5f3ef",
          beige: "#e8e4dc",
          olive: "#4a5d4a",
          "olive-dark": "#3d4d3d",
          charcoal: "#2c2c2c",
          muted: "#8a8a8a",
          warm: "#d4cfc4",
        },
        dark: {
          bg: "#181818",
          card: "#1a1a1a",
          border: "#2a2a2a",
          hover: "#333333",
          text: "#e5e5e5",
          muted: "#888888",
          accent: "#3b82f6",
        },
      },
      fontFamily: {
        serif: ["Instrument Serif", "Georgia", "serif"],
        sans: [
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        nature:
          'linear-gradient(to bottom, rgba(245, 243, 239, 0.9), rgba(245, 243, 239, 0.7)), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80")',
      },
    },
  },
  plugins: [],
};
export default config;
