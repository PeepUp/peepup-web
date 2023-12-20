// MyInput.tsx
import { extendVariants, Input } from "@nextui-org/react";

export const CustomeInput = extendVariants(Input, {
    variants: {
        color: {
            darker: {
                inputWrapper: [
                    "border-none",
                    "shadow-none",
                    "transition-colors",
                    "focus-within:bg-zinc-100",
                    "data-[hover=true]:border-zinc-600",
                    "data-[hover=true]:bg-zinc-100",
                    "group-data-[focus=true]:border-zinc-600",
                    // dark theme
                    "dark:bg-[#202020]",
                    "dark:data-[hover=true]:bg-[#2A2A2A]",
                    "dark:focus-within:bg-[#202020]",
                ],
                input: [
                    "font-medium",
                    "text-foreground",
                    "placeholder:text-sm",
                    "placeholder:text-zinc-600",
                    // dark theme
                    "dark:placeholder:text-[#7a7a7a]",
                ],
            },
        },
        size: {
            xs: {
                inputWrapper: "h-unit-6 min-h-unit-6 px-1",
                input: "text-tiny",
            },
            md: {
                inputWrapper: "h-unit-10 min-h-unit-10",
                input: "text-small",
            },
            xl: {
                inputWrapper: "h-unit-14 min-h-unit-14",
                input: "text-medium",
            },
        },
        radius: {
            xs: {
                inputWrapper: "rounded",
            },
            sm: {
                inputWrapper: "rounded-[4px]",
            },
        },
        textSize: {
            base: {
                input: "text-base",
            },
        },
        removeLabel: {
            true: {
                label: "hidden",
            },
            false: {},
        },
    },
    defaultVariants: {
        color: "darker",
        textSize: "base",
        removeLabel: true,
    },
});
