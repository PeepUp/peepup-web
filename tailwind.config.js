import { nextui } from "@nextui-org/theme";
import { typography } from "@tailwindcss/typography";

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
            typography(theme) {
                return {
                    dark: {
                        css: {
                            color: theme("colors.gray.300"),
                            '[class~="lead"]': { color: theme("colors.gray.400") },
                            a: { color: theme("colors.gray.100") },
                            strong: { color: theme("colors.gray.100") },
                            "ul > li::before": {
                                backgroundColor: theme("colors.gray.700"),
                            },
                            hr: { borderColor: theme("colors.gray.800") },
                            blockquote: {
                                color: theme("colors.gray.100"),
                                borderLeftColor: theme("colors.gray.800"),
                            },
                            h1: { color: theme("colors.gray.100") },
                            h2: { color: theme("colors.gray.100") },
                            h3: { color: theme("colors.gray.100") },
                            h4: { color: theme("colors.gray.100") },
                            code: { color: theme("colors.gray.100") },
                            "a code": { color: theme("colors.gray.100") },
                            pre: {
                                color: theme("colors.gray.200"),
                                backgroundColor: theme("colors.gray.800"),
                            },
                            thead: {
                                color: theme("colors.gray.100"),
                                borderBottomColor: theme("colors.gray.700"),
                            },
                            "tbody tr": { borderBottomColor: theme("colors.gray.800") },
                        },
                    },
                };
            },
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
    variants: {
        extend: { typography: ["dark"] },
    },
    plugins: [
        require("@tailwindcss/typography"),
        nextui({
            addCommonColors: false,
            themes: {
                light: {
                    colors: {
                        background: "rgb(242, 240, 235)",
                        foreground: "#2A2A2A",
                    },
                    secondary: {
                        foreground: "#252525",
                        DEFAULT: "#f5cb5c",
                        background: "#2B2B2B",
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
