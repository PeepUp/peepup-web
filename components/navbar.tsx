"use client";

import NextLink from "next/link";

import * as UI from "@nextui-org/react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
    const isInSignUpPage = usePathname() === "/signup";
    const [isOnSearch, setIsOnSearch] = useState(false);

    const searchInput = (
        <UI.Input
            aria-label="Search"
            lang="en"
            size="md"
            name="search"
            classNames={{
                inputWrapper: "bg-default-50",
                input: "text-sm font-semibold",
            }}
            endContent={
                <UI.Kbd className="hidden lg:inline-block" keys={["command"]}>
                    {`+   K`}
                </UI.Kbd>
            }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
                !isOnSearch ? (
                    <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                ) : null
            }
            onInput={(e) => {
                if ((e.target as HTMLInputElement).value !== "") {
                    setIsOnSearch(true);
                } else {
                    setIsOnSearch(false);
                }
            }}
            type="search"
        />
    );

    return (
        <UI.Navbar maxWidth="2xl" position="sticky">
            <UI.NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <UI.NavbarItem className="gap-3 max-w-fit">
                    <NextLink
                        className="flex justify-start items-center gap-1"
                        href="/"
                        replace
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <p className="font-randrake font-medium text-2xl select-none">
                            PeepUp
                        </p>
                    </NextLink>
                </UI.NavbarItem>
            </UI.NavbarContent>

            <UI.NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <UI.NavbarItem className="hidden sm:flex gap-2">
                    <ThemeSwitch />
                </UI.NavbarItem>
                <UI.NavbarItem className="hidden md:flex">
                    <UI.Button
                        as={NextLink}
                        className="text-sm font-medium font-sans"
                        href={isInSignUpPage ? "/signin" : "/signup"}
                        variant="solid"
                    >
                        {isInSignUpPage ? "Sign In" : "Sign Up"}
                    </UI.Button>
                </UI.NavbarItem>
            </UI.NavbarContent>

            <UI.NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch />
                <UI.NavbarMenuToggle />
            </UI.NavbarContent>

            <UI.NavbarMenu>
                {searchInput}
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <UI.NavbarMenuItem key={`${item}-${index}`}>
                            <UI.Link
                                color={
                                    index === 2
                                        ? "primary"
                                        : index === siteConfig.navMenuItems.length - 1
                                          ? "danger"
                                          : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item.label}
                            </UI.Link>
                        </UI.NavbarMenuItem>
                    ))}
                </div>
            </UI.NavbarMenu>
        </UI.Navbar>
    );
};
