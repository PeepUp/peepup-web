import "@/styles/globals.css";

import clsx from "clsx";
import Link from "next/link";
import localFont from "next/font/local";

import * as UI from "@nextui-org/react";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import { toasterProps } from "@/config/toast";
import { fontMono, fontSans } from "@/config/fonts";

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
                    "text-foreground bg-background selection:bg-[#999999] selection:text-[#1A1A1A]",
                    "dark:selection:bg-[#919190] dark:selection:text-[#252525]"
                )}
            >
                <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                    <div className="relative flex flex-col h-screen">
                        <Navbar />
                        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                            {children}
                        </main>
                        <footer className="w-full flex flex-col items-start justify-center py-2">
                            <UI.Divider />
                            <div className="flex mt-4 pl-12 max-md:flex-col">
                                <UI.Link
                                    as={Link}
                                    href={siteConfig.links.repository}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    color="foreground"
                                    size="sm"
                                    isExternal
                                    showAnchorIcon
                                    className="max-md:text-xs"
                                >
                                    See PeepUp on GitHub
                                </UI.Link>
                                <UI.Spacer x={4} />
                                <p className="text-sm font-medium max-md:text-xs">
                                    © {new Date().getFullYear()} {siteConfig.name}
                                    <span> All rights reserved.</span>
                                </p>
                            </div>
                        </footer>
                    </div>
                    <Toaster
                        duration={toasterProps.duration}
                        richColors
                        closeButton
                        visibleToasts={3}
                        theme="system"
                        toastOptions={
                            {
                                /* style: {
                                fontSize: "0.9rem",
                            },
                            classNames: {
                                title: "font-semibold text-md",
                                info: "font-semibold",
                                warning: "font-semibold",
                                error: "font-semibold",
                                success: "font-semibold",
                                description: "font-medium text-md",
                                loader: "font-semibold",
                            }, */
                            }
                        }
                    />
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
