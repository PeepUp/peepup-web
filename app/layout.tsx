import "@/styles/globals.css";

import * as React from "react";

import clsx from "clsx";
import localFont from "next/font/local";

import { Toaster } from "sonner";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { toasterProps } from "@/config/toast";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { fontMono, fontSans } from "@/config/fonts";
import { GlobalDataProvider } from "@/context/store/global";

import type { Metadata } from "next";

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
                    "text-foreground bg-background selection:bg-[#E5CFF7] selection:text-[#1A1A1A]",
                    "dark:selection:bg-[#F5CB5C] dark:selection:text-[#252525]"
                )}
            >
                <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                    <GlobalDataProvider>
                        <div className="relative flex flex-col h-screen">
                            <Navbar />
                            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                                {children}
                            </main>
                            <Footer />
                        </div>
                        <Toaster
                            duration={toasterProps.duration}
                            richColors
                            closeButton
                            visibleToasts={3}
                            theme="system"
                        />
                    </GlobalDataProvider>
                </Providers>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
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
