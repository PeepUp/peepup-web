import "@/styles/globals.css";

import * as UI from "@nextui-org/react";
import * as React from "react";

import clsx from "clsx";
import localFont from "next/font/local";

import { Toaster } from "sonner";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import { toasterProps } from "@/config/toast";
import { fontMono, fontSans } from "@/config/fonts";
import { GlobalDataProvider } from "@/context/store/global";

import type { Metadata } from "next";
import Link from "next/link";

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
                    <GlobalDataProvider>
                        <div className="relative flex flex-col h-screen">
                            <Navbar />
                            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                                {children}
                            </main>
                            <footer className="w-full flex flex-col items-start justify-center">
                                <UI.Divider />
                                <UI.Spacer y={8} />
                                <div className="flex max-md:flex-col justify-around items-center w-5/6">
                                    <div className="flex">
                                        {/*
                                        <UI.Link
                                            as={Link}
                                            href={siteConfig.links.repository}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            color="foreground"
                                            size="sm"
                                            isExternal
                                            showAnchorIcon
                                            className="max-md:text-xs text-md"
                                        >
                                            See PeepUp on GitHub
                                        </UI.Link> */}

                                        <p className="text-md font-medium max-md:text-xs">
                                            © 2023 PeepUp. {new Date().getFullYear()}
                                            <span className="text-md font-medium max-md:text-xs">
                                                {" "}
                                                All rights reserved.
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex space-x-4">
                                        <Link
                                            className="flex justify-start items-center gap-1"
                                            href="/"
                                            replace
                                        >
                                            <p className="font-randrake font-medium text-4xl select-none">
                                                PeepUp
                                            </p>
                                        </Link>
                                    </div>

                                    <div className="flex space-x-4">
                                        <UI.Link
                                            as={Link}
                                            href={siteConfig.links.privacyPolicy}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            color="foreground"
                                            size="sm"
                                            className="max-md:text-xs text-md"
                                        >
                                            Privacy Policy
                                        </UI.Link>
                                        <UI.Link
                                            as={Link}
                                            href={siteConfig.links.termsOfService}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            color="foreground"
                                            size="sm"
                                            className="max-md:text-xs text-md"
                                        >
                                            Terms of Service
                                        </UI.Link>
                                    </div>
                                </div>
                                <UI.Spacer y={8} />
                            </footer>
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
