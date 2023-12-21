"use client";

import * as React from "react";
import * as UI from "@nextui-org/react";
import * as Icons from "@/components/icons";

import PreviewListPost from "@/components/article/list-post";

import { cn, getGreeting } from "@/lib/utils";
import { Editor } from "@/components/article/editor";
import { useGlobalContext } from "@/context/store/global";
import UserRelatedPosts from "@/components/article/user-related-posts";
import { RepostedByUser } from "@/components/article/reposted-by-user";
import { StaredByUser } from "@/components/article/stared-by-user";

export default function page() {
  const greeting = getGreeting();
  const { data } = useGlobalContext();
  const [activeTab, setActiveTab] = React.useState<React.Key>("post_articles");

  const NavigationTabs = () => (
    <div className="flex w-full flex-col">
      <UI.Tabs
        color="default"
        variant="underlined"
        aria-label="tabs_navigation_dashboard"
        radius="full"
        className="mx-auto self-center"
        selectedKey={activeTab.toString()}
        onSelectionChange={(key: React.Key) => setActiveTab(key)}
      >
        {data && data.isAuthenticated ? (
          <UI.Tab
            key="new_posts"
            aria-label="create new post"
            className="w-full"
            title={
              <div className="flex items-center space-x-2">
                <Icons.PlusSquareIcon
                  size={14}
                  className="fill-current stroke-current"
                />
                <span>New</span>
              </div>
            }
          >
            <Editor />
          </UI.Tab>
        ) : null}

        <UI.Tab key="post_articles" title="Posts" className="w-full">
          {data && data.isAuthenticated ? (
            <UserRelatedPosts author_id={data.identity.id} />
          ) : (
            <SpinnerLoading />
          )}
        </UI.Tab>
        <UI.Tab key="repost" title="Repost">
          {data && data.isAuthenticated ? (
            <RepostedByUser author_id={data.identity.id} />
          ) : (
            <SpinnerLoading />
          )}
        </UI.Tab>
        <UI.Tab key="stars" title="Stars">
          {data && data.isAuthenticated ? (
            <StaredByUser author_id={data.identity.id} />
          ) : (
            <SpinnerLoading />
          )}
        </UI.Tab>
      </UI.Tabs>
      <UI.Spacer y={20} />
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
        <p className="max-sm:text-xs">{greeting},</p>
        <div className="absolute z-0 -translate-y-5 translate-x-14">
          <Icons.LineDoodleIcon
            size={42}
            className="stroke-current stroke-[0.5px] max-sm:hidden dark:stroke-[#717171]"
          />
        </div>
        {data?.identity?.username ? (
          <div className="flex items-center justify-start space-x-1 max-sm:justify-center">
            <p className="max-sm:text-xs">@{data?.identity?.username}</p>
            <Icons.VerifiedIcon size={20} className="h-3 max-sm:w-3" />
          </div>
        ) : (
          <UI.Skeleton className="mt-1 h-3 w-10/12 rounded-lg max-sm:w-full" />
        )}
      </div>
      <div className={cn(["flex", "justify-start", "items-center"])}>
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
    <section
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
      {data?.isAuthenticated && <NavigationDashboard />}
      <NavigationTabs />
    </section>
  );
}

function SpinnerLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <UI.Spacer y={80} />
      <UI.Spinner size="sm" color="secondary" label="Wait a moment..." />
      <UI.Spacer y={80} />
    </div>
  );
}
