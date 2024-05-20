import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "linkedark": {
          50: "#F6F5F4",
          100: "#EAE8E6",
          200: "#D0CDC8",
          300: "#B5B1AA",
          400: "#9B958C",
          500: "#807A6F",
          600: "#625D55",
          700: "#44413B",
          800: "#262421",
          900: "#131211",
          DEFAULT: "#131211",
          950: "#080807"
        },
        "linkeblue": {
          50: "#ECF5FE",
          100: "#D3E8FD",
          200: "#ADD4FB",
          300: "#81BDF9",
          400: "#5AA8F7",
          500: "#2E91F4",
          600: "#0C7DEE",
          700: "#0A66C2",
          DEFAULT: "#0A66C2",
          800: "#074583",
          900: "#03213F",
          950: "#021222"
        },
        "discordark": {
          50: "#ECEDEE",
          100: "#DCDDE0",
          200: "#B8BBC1",
          300: "#9296A0",
          400: "#707480",
          500: "#51545D",
          600: "#313338",
          DEFAULT: "#313338",
          700: "#282A2E",
          800: "#1F2023",
          900: "#151618",
          950: "#111113"
        },
        "blurple": {
          50: "#ECEEFE",
          100: "#DEE0FC",
          200: "#BDC2FA",
          300: "#9CA3F7",
          400: "#7A85F5",
          500: "#5865F2",
          600: "#1C2DED",
          700: "#0E1DB9",
          800: "#0A137B",
          900: "#050A3E",
          950: "#02041C"
        }
      }
    },
  },
  plugins: [],
};
export default config;
