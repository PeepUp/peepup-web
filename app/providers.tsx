"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
            </QueryClientProvider>
        </NextUIProvider>
    );
}
