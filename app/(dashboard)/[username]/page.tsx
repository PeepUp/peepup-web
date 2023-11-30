"use client";
import * as React from "react";
import * as UI from "@nextui-org/react";

import { useGlobalContext } from "@/context/store/global";
import { cn } from "@/lib/utils";
import { LineDoodleIcon, VerifiedIcon } from "@/components/icons";
import PreviewListPost from "@/components/article/list-post";

export default function page({ params }: { params: { username: string } }) {
    const { data } = useGlobalContext();

    const NavigationTabs = () => (
        <div className="flex-0 w-full flex flex-col justify-center items-center">
            <UI.Tabs
                color="default"
                variant="underlined"
                aria-label="tabs_navigation_dashboard"
                radius="full"
            >
                <UI.Tab key="post_articles" title="Posts" className="w-full">
                    <PreviewListPost />
                </UI.Tab>
                <UI.Tab key="replies" title="Replies" />
                <UI.Tab key="repost" title="Repost" />
                <UI.Tab key="stars" title="Stars" />
            </UI.Tabs>
        </div>
    );

    const NavigationDashboard = () => (
        <div
            className={cn([
                "container",
                "flex",
                "justify-center",
                "items-center",
                "flex-shrink-0",
                "flex-0",
                "w-full",
                "h-max",
                "space-x-6",
                "space-y-3",
            ])}
        >
            <div>
                <p className="max-sm:text-xs">Good evening,</p>
                <div className="absolute z-0 -translate-y-5 translate-x-14">
                    <LineDoodleIcon
                        size={42}
                        className="stroke-current stroke-[0.5px] dark:stroke-[#717171] max-sm:hidden"
                    />
                </div>
                {data?.identity?.username ? (
                    <div className="flex justify-start items-center space-x-1 max-sm:justify-center">
                        <p className="max-sm:text-xs">{data?.identity?.username}</p>
                        <VerifiedIcon size={20} className="max-sm:w-3 h-3" />
                    </div>
                ) : (
                    <UI.Skeleton className="mt-1 h-3 w-10/12 max-sm:w-full rounded-lg" />
                )}
            </div>
            <div className={cn(["flex", "justify-center", "items-center"])}>
                {data?.identity?.avatar ? (
                    <UI.Avatar
                        size="md"
                        radius="sm"
                        color="default"
                        isBordered
                        src={
                            data?.identity?.avatar ??
                            "https://avatars.githubusercontent.com/u/58453383?v=4"
                        }
                    />
                ) : (
                    <UI.Skeleton className="mt-1 h-10 w-10 rounded-lg" />
                )}
            </div>
        </div>
    );

    return (
        <>
            <div
                className={cn([
                    "flex",
                    "flex-col",
                    "flex-grow",
                    "items-center",
                    "justify-start",
                    "w-full",
                    "gap-8",
                ])}
            >
                <NavigationDashboard />
                <NavigationTabs />
            </div>
        </>
    );
}
