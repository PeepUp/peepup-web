"use client";

import React from "react";
import NextLink from "next/link";

import * as UI from "@nextui-org/react";
import * as Icons from "@/components/icons";

import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { SearchInput } from "./input/search/search";
import { getTokenSession } from "@/lib/session/token";
import { ThemeSwitch } from "@/components/theme-switch";
import { useGlobalContext } from "@/context/store/global";

export const Navbar = () => {
  const { data } = useGlobalContext();
  const { push } = useRouter();
  const access = getTokenSession("_access") ?? "";
  const { verifyAuth, loading, signout } = useAuth();
  const onTheSignupPage = usePathname() === "/signup";
  const onTheExplorePage = usePathname() === "/explore";

  React.useEffect(() => {
    if (access && Object.keys(data).length === 0) {
      verifyAuth(access);
    }
  }, [access, data, data.identity, data.isAuthenticated]);

  const handleSignout = async () => {
    await signout(access);

    toast.success("Signed out successfully!", {
      duration: 2000,
      position: "top-center",
    });

    return push("/");
  };

  const AvatarUser = () => (
    <UI.Dropdown placement="bottom">
      <UI.DropdownTrigger>
        <UI.User
          name=""
          className="cursor-pointer"
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
          <UI.Link color="secondary" href={`/${data?.identity?.username}`}>
            <h5 className="font-semibold">{data.identity.email}</h5>
          </UI.Link>
        </UI.DropdownItem>
        <UI.DropdownItem
          key="settings"
          textValue="Settings"
          endContent={<Icons.SettingIcon size={18} className="" />}
        >
          Settings
        </UI.DropdownItem>

        <UI.DropdownItem key="dashboard" textValue="Dashboard">
          <UI.Link color="foreground" href={`/${data?.identity?.username}`}>
            <p>Dashboard</p>
          </UI.Link>
        </UI.DropdownItem>

        <UI.DropdownItem key="help_and_feedback" textValue="Help & Feedback">
          Help & Feedback
        </UI.DropdownItem>
        <UI.DropdownItem
          key="logout"
          textValue="log out"
          endContent={<Icons.LogoutIcon size={20} />}
          onClick={handleSignout}
        >
          Log out
        </UI.DropdownItem>
      </UI.DropdownMenu>
    </UI.Dropdown>
  );

  const ExploreMenuButton = () => (
    <UI.Button
      as={NextLink}
      className="font-sans text-sm font-medium"
      href={onTheExplorePage ? "/" : "/explore"}
      variant="flat"
      startContent={
        onTheExplorePage ? (
          <Icons.HomeIcon size={18} />
        ) : (
          <Icons.MarkdownIcon size={16} stroke="currentColor" />
        )
      }
    >
      {onTheExplorePage ? "Home" : "Explore"}
    </UI.Button>
  );

  const SignUpInButton = () => (
    <UI.NavbarItem className="hidden md:flex">
      <UI.Button
        as={NextLink}
        className="font-sans text-sm font-medium"
        href={onTheSignupPage ? "/signin" : "/signup"}
        color="secondary"
        variant="flat"
      >
        {onTheSignupPage ? "Sign In" : "Sign Up"}
      </UI.Button>
    </UI.NavbarItem>
  );

  return (
    <UI.Navbar maxWidth="2xl" position="sticky">
      <UI.NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <UI.NavbarItem className="max-w-fit gap-3">
          <UI.Button
            type="button"
            as={NextLink}
            className="flex items-center justify-start gap-1 bg-transparent hover:bg-transparent"
            href="/"
            onContextMenu={(e) => e.preventDefault()}
            radius="full"
          >
            <p className="select-none font-randrake text-2xl font-medium">
              PeepUp
            </p>
          </UI.Button>
        </UI.NavbarItem>
      </UI.NavbarContent>

      <UI.NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="center"
      >
        <UI.NavbarItem>
          <SearchInput />
        </UI.NavbarItem>
      </UI.NavbarContent>

      <UI.NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <UI.NavbarItem className="hidden gap-4 sm:flex">
          <ThemeSwitch />
          <ExploreMenuButton />
        </UI.NavbarItem>

        {data && data.identity ? (
          <AvatarUser />
        ) : loading ? (
          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div>
              <UI.Skeleton className="flex h-8 w-8 rounded-full" />
            </div>
            <div className="flex w-full flex-col gap-2">
              <UI.Skeleton className="h-3 w-3/5 rounded-lg" />
              <UI.Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        ) : (
          <SignUpInButton />
        )}
      </UI.NavbarContent>

      <UI.NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <ThemeSwitch />
        <UI.NavbarMenuToggle />
      </UI.NavbarContent>

      <UI.NavbarMenu>
        <SearchInput />
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
                href={
                  index === 0 && data && data.identity
                    ? `/${data.identity.username}`
                    : item.href
                }
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
