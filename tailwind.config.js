import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                current: "currentColor",
                chinese: {
                    dark: "rgb(16, 16, 16)",
                    DEFAULT: "rgb(16, 16, 16)",
                    light: "rgb(239, 239, 239)",
                },
            },
            fontFamily: {
                randrake: ["var(--font-randrake)"],
            },
        },
    },
    plugins: [
        nextui({
            addCommonColors: false,
            themes: {
                light: {
                    colors: {
                        background: "rgb(242, 240, 235)",
                        foreground: "#2A2A2A",
                    },
                },
                dark: {
                    colors: {
                        content1: "#1c1c1c",
                        content2: "#1c1c1c",
                        content3: "#1c1c1c",
                        content4: "#1c1c1c",
                        background: "rgb(16, 16, 16)",
                        foreground: "#a7a7a7",
                        primary: {
                            foreground: "#EFE6DD",
                            DEFAULT: "#1a1a1a",
                            background: "#2B2B2B",
                        },
                        secondary: {
                            foreground: "#252525",
                            DEFAULT: "#f5cb5c",
                            background: "#2B2B2B",
                        },
                        default: {
                            foreground: "#EFE6DD",
                            DEFAULT: "#202020",
                            background: "#1a1a1a",
                        },
                    },
                },
            },
        }),
    ],
};
