"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Kbd } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";

import { useState } from "react";

export const Navbar = () => {
  const [isOnSearch, setIsOnSearch] = useState(false);

  const searchInput = (
    <Input
      aria-label="Search"
      lang="en"
      size="md"
      name="search"
      classNames={{
        inputWrapper: "bg-default-50",
        input: "text-sm font-semibold",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          {`+   K`}
        </Kbd>
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
    <NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarItem className="gap-3 max-w-fit">
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
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={NextLink}
            className="text-sm font-medium font-sans text-current"
            href={"/signup"}
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
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
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
