import "@/styles/globals.css";

import clsx from "clsx";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { fontMono, fontSans } from "@/config/fonts";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: [
            { url: "/assets/favicons/favicon.ico", rel: "shortcut icon" },
            {
                url: "/assets/favicons/favicon-16x16.png",
                rel: "icon",
                sizes: "16x16",
            },
            {
                url: "/assets/favicons/favicon-32x32.png",
                rel: "icon",
                sizes: "32x32",
            },
        ],
        apple: ["/assets/favicons/apple-touch-icon.png"],
    },
};

const fontRandrake = localFont({
    src: [{ path: "../public/fonts/Randrake.ttf" }],
    variable: "--font-randrake",
    weight: "500",
    style: "normal",
    display: "optional",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={clsx([
                fontSans.variable,
                fontMono.variable,
                fontRandrake.variable,
            ])}
        >
            <head />
            <body
                className={clsx(
                    "min-h-screen bg-background font-sans antialiased",
                    "text-current selection:bg-[#F25F5C] selection:text-[#1A1A1A]",
                    "dark:selection:bg-[#f5cb5c] dark:selection:text-[#1C1C1C]"
                )}
            >
                <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                    <Toaster
                        toastOptions={{
                            position: "bottom-center",
                            duration: 5000,
                        }}
                    />
                    <div className="relative flex flex-col h-screen">
                        <Navbar />
                        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                            {children}
                        </main>
                        <footer className="w-full flex items-center justify-center py-3"></footer>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
