"use client";

import NextLink from "next/link";
import React from "react";

import * as UI from "@nextui-org/react";

import { toast } from "sonner";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { useGlobalContext } from "@/context/store/global";
import { useAuth } from "@/hooks/auth/useAuth";
import { getTokenSession } from "@/lib/session/token";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const { data } = useGlobalContext();
    const { push } = useRouter();
    const access = getTokenSession("_access") ?? "";
    const { verifyAuth, loading, signout } = useAuth();
    const isInSignUpPage = usePathname() === "/signup";
    const [isOnSearch, setIsOnSearch] = useState(false);

    React.useEffect(() => {
        if (access && Object.keys(data).length === 0) {
            verifyAuth(access);
        }
    }, [access, data, data.identity, data.isAuthenticated]);

    React.useEffect(() => {
        if (data) {
            if (data.identity) {
                toast.success(`Welcome back, ${data.identity.username}!`, {
                    position: "bottom-center",
                    duration: 2000,
                });
            }
        }
    }, [data]);

    const handleSignout = async () => {
        await signout(access);
        return push("/");
    };

    const AvatarUser = () => (
        <>
            <UI.Dropdown placement="bottom">
                <UI.DropdownTrigger>
                    <UI.User
                        name=""
                        draggable={false}
                        avatarProps={{
                            name: data.identity.username,
                            isBordered: true,
                            size: "sm",
                            src: data
                                ? data.identity.avatar
                                : "https://avatars.githubusercontent.com/u/58453383?v=4",
                        }}
                    />
                </UI.DropdownTrigger>
                <UI.DropdownMenu aria-label="Profile Actions" variant="flat">
                    <UI.DropdownItem
                        key="profile"
                        className="h-14 gap-2"
                        textValue="profile"
                    >
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{data.identity.email}</p>
                    </UI.DropdownItem>
                    <UI.DropdownItem key="settings" textValue="Settings">
                        Settings
                    </UI.DropdownItem>
                    <UI.DropdownItem key="analytics" textValue="Analytics">
                        Analytics
                    </UI.DropdownItem>
                    <UI.DropdownItem key="help_and_feedback" textValue="Help & Feedback">
                        Help & Feedback
                    </UI.DropdownItem>
                    <UI.DropdownItem
                        key="logout"
                        textValue="log out"
                        onClick={handleSignout}
                    >
                        Log out
                    </UI.DropdownItem>
                </UI.DropdownMenu>
            </UI.Dropdown>
        </>
    );

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

    const SignUpInButton = () => (
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

                {data && data.identity ? (
                    <AvatarUser />
                ) : loading ? (
                    <div className="max-w-[140px] w-full flex items-center gap-3">
                        <div>
                            <UI.Skeleton className="flex rounded-full w-8 h-8" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <UI.Skeleton className="h-3 w-3/5 rounded-lg" />
                            <UI.Skeleton className="h-3 w-4/5 rounded-lg" />
                        </div>
                    </div>
                ) : (
                    <SignUpInButton />
                )}
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
