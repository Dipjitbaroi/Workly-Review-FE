import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F7F8F9",
          100: "#EEF0F3",
          200: "#D5DAE1",
          300: "#BBC3CF",
          400: "#8896AB",
          500: "#006BFF",
          600: "#4D5F7A",
          700: "#404F65",
          800: "#333F51",
          900: "#2A3342",
        },
        success: "#16A34A",
        danger: "#D7503D",
        warning: "#DD8E0A",
        info: "#3575DD",
        black: "#2A3342",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
