"use client";

import * as React from "react";
import * as UI from "@nextui-org/react";

import { useFetch } from "@/hooks/useFetch";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";

import type { Article } from "@/types/article";
import { join } from "path";
import { cn } from "@/lib/utils";
import { LikeButon, VisitButon } from "../interaction";

export function SimplePopulars() {
  const url = new URL(
    join(URL_ENDPOINT_ARTICLES, "posts", "articles", "popular"),
  );

  const { data, error, loading } = useFetch<Article[]>({
    url,
    config: {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    },
  });

  React.useEffect(() => {}, [data]);

  return (
    <>
      <div className="h-4/5 w-full overflow-y-auto rounded-md">
        <div>
          <h1 className="mb-4 text-2xl font-bold">Populars</h1>
        </div>
        <div>
          <ul className="w-full">
            {data && data.length > 0 ? (
              data.map(
                (post, index) =>
                  index < 5 && (
                    <li
                      key={index}
                      className="flex flex-col items-start text-md mb-2 w-full rounded-md p-2 font-medium"
                    >
                      <UI.Link
                        href={`/posts/${post.slug}`}
                        className={cn([
                          "__link",
                          "text-medium",
                          "text-current",
                          "text-start",
                          "leading-6",
                          "tracking-normal",
                          "capitalize",
                          "hover:text-secondary",
                        ])}
                      >
                        {post.title}
                      </UI.Link>
                      <VisitButon visit_count={post.visit_count} disabled />
                    </li>
                  ),
              )
            ) : (
              <Skeleton />
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

const Skeleton = () => {
  return new Array(5).fill(0).map((_, index) => (
    <li key={index} className="text-md mb-2 w-full rounded-md p-2 font-medium">
      <UI.Skeleton className="rounded-md">
        <div className="h-6 w-full rounded-full"></div>
      </UI.Skeleton>

      <UI.Spacer y={2} />

      <UI.Skeleton className="max-w-16 rounded-md">
        <div className="h-2 w-2/6"></div>
      </UI.Skeleton>
    </li>
  ));
};
