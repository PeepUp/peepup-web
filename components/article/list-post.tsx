"use client";

import * as UI from "@nextui-org/react";
import * as React from "react";

import { PreviewArticle } from "./preview";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { useInfiniteQuery } from "@tanstack/react-query";

import { TrandingPostCard } from "./preview/TrandingPostCard";

import type { Article } from "@/types/article";
import { cn } from "@/lib/utils";

export default function PreviewListPost() {
  const ref = React.useRef<any>();

  const fetchPostsPreview = async ({
    pageParam = 1,
  }: {
    pageParam: number;
  }) => {
    const url: string = `${URL_ENDPOINT_ARTICLES}/admin/posts/articles/preview?pageParam=${pageParam}&size=8`;

    const data = await fetch(url, {
      method: "GET",
      cache: "reload",
      mode: "cors",
    });

    return data.json();
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(() => {
        fetchNextPage();
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

  const {
    data: response,
    error: queryError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: fetchPostsPreview,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });

  const SkeletonFirstCard = () => (
    <UI.Card className="min-h-[500px] w-3/4 space-y-3" radius="lg">
      <UI.Skeleton className="rounded-lg">
        <div className="h-64 rounded-lg bg-default-300"></div>
      </UI.Skeleton>
      <div className="space-y-3 py-8">
        <UI.Skeleton className="mx-auto w-11/12 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </UI.Skeleton>
        <UI.Skeleton className="mx-auto w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </UI.Skeleton>
        <UI.Skeleton className="mx-auto w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </UI.Skeleton>
      </div>

      <div className="mx-auto w-11/12 space-y-3 py-8">
        <UI.Skeleton className="rounded-lg">
          <div className="h-4 w-3/5 rounded-lg bg-default-300"></div>
        </UI.Skeleton>
        <UI.Skeleton className="rounded-lg">
          <div className="h-4 w-3/5 rounded-lg bg-default-300"></div>
        </UI.Skeleton>
        <UI.Skeleton className="rounded-lg">
          <div className="h-6 w-3/5 rounded-lg bg-default-300"></div>
        </UI.Skeleton>
      </div>
    </UI.Card>
  );

  return (
    <section
      className={cn([
        "container",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "flex-shrink-0",
        "w-full",
        "h-max",
        "my-2",
        "space-y-3",
      ])}
    >
      {response ? (
        response.pages.map(({ data }: { data: Article[] }, i) => {
          if (i === 0) {
            return <TrandingPostCard post={data[0] as Article} key={i} />;
          }

          return data.map((post: Article, i: number) => {
            return i > 0 && <PreviewArticle article={post} key={i} />;
          });
        })
      ) : (
        <>
          <SkeletonFirstCard />
          {new Array(6).fill(0).map((_, i) => (
            <UI.Card key={i} className="w-3/4 space-y-3" radius="lg">
              <UI.Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </UI.Skeleton>
              <div className="space-y-3">
                <UI.Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </UI.Skeleton>
                <UI.Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </UI.Skeleton>
                <UI.Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </UI.Skeleton>
              </div>
            </UI.Card>
          ))}
        </>
      )}
      <span ref={ref}></span>
      <UI.Spacer y={4} />
      <UI.Spinner
        size="sm"
        hidden={isLoading ? false : true}
        color="secondary"
      />
      <UI.Spacer y={20} />
    </section>
  );
}
