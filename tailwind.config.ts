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
        prime: {
          blue: "#1399FF",
          dark: "#0F1117",
          card: "#1A1F2E",
          border: "#252D3D",
        },
        amazon: {
          orange: "#FF9900",
        },
        nascar: {
          red: "#CC0000",
          gold: "#FFD700",
        },
      },
    },
  },
  plugins: [],
};

export default config;
