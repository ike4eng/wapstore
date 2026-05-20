import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eafff6",
          100: "#ccffe8",
          200: "#99ffd2",
          300: "#5cffb6",
          400: "#2ee99b",
          500: "#15c680",
          600: "#0ea56a",
          700: "#0b8055",
          800: "#0c6345",
          900: "#0b503a",
          950: "#062d22"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;

