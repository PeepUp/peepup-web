import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        randrake: ["var(--font-randrake)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            background: "#FAF9F9",
            foreground: "#303030",
            danger: {
              default: "#ff5a5f",
              foreground: "#f4fff8",
            },
          },
        },
        dark: {
          colors: {
            background: "#101010",
            foreground: "#EFE6DD",
            danger: {
              default: "#ff5a5f",
              foreground: "#f4fff8",
            },
          },
        },
      },
    }),
  ],
};
