import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        "prime-blue":  "#00A8FF",
        "amz-orange":  "#FF9900",
        "dash-green":  "#00C896",
        "dash-red":    "#FF4F5B",
        "dash-purple": "#7C6FFF",
        "dash-yellow": "#F59E0B",
        bg: {
          base:    "#060A12",
          surface: "#0C1220",
          raised:  "#111827",
          overlay: "#162032",
        },
        border: {
          subtle:  "#1A2437",
          default: "#243044",
          strong:  "#2E3F56",
        },
        text: {
          primary:   "#E8ECF4",
          secondary: "#8B97AA",
          tertiary:  "#4E5E74",
        },
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
