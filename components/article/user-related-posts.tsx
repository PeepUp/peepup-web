"use client";

import * as UI from "@nextui-org/react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { PreviewArticle } from "./preview";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { Article } from "@/types/article";

export default function UserRelatedPosts({ author_id }: { author_id: string }) {
  const ref = React.useRef<any>();

  const fetchPostsPreview = async ({
    pageParam = 1,
  }: {
    pageParam: number;
  }) => {
    const url: string = `${URL_ENDPOINT_ARTICLES}/posts/${author_id}/articles`;

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

  React.useEffect(() => {
    console.log(response);
  }, [response]);

  if (
    response &&
    response.pages.length &&
    response.pages[0].data.length === 0
  ) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <UI.Spacer y={40} />
        <h5 className="text-current text-center">
          Upps, there are reposted records found!
        </h5>
      </div>
    );
  }

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
      {response && response.pages.length > 0 ? (
        response.pages.map(({ data }: { data: Article[] }) => {
          return (
            data &&
            data.length > 0 &&
            data.map((post: Article, i: number) => {
              return <PreviewArticle article={post} key={i} />;
            })
          );
        })
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <UI.Spacer y={40} />
          <h5 className="text-current text-center">
            Upps, there are reposted records found!
          </h5>
        </div>
      )}
      <span ref={ref}></span>
      <UI.Spacer y={4} />
      <UI.Spacer y={20} />
    </section>
  );
}
