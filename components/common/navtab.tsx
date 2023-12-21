"use client";

import * as React from "react";

import { Tab, Tabs } from "@nextui-org/react";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
};

export function NavTab({ children }: Props) {
  return (
    <div className="flex w-full flex-col items-start">
      <div
        className={cn([
          "flex",
          "flex-col",
          "items-center",
          "justify-start",
          "w-full",
          "h-full",
          "gap-8",
        ])}
      >
        <Tabs
          color="default"
          variant="underlined"
          aria-label="tabs_navigation_dashboard"
          radius="full"
          className="mx-auto self-center"
          defaultSelectedKey="post_articles"
        >
          <Tab>{children}</Tab>
        </Tabs>
      </div>
    </div>
  );
}
