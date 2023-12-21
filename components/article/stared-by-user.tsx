"use client";

import * as React from "react";

import { PreviewArticle } from "./preview";

import { join } from "path";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { Article } from "@/types/article";
import { cn } from "@/lib/utils";

type Props = {
  author_id: string;
};

export function StaredByUser({ author_id }: Props) {
  const [data, setData] = React.useState<any>({});

  const url = new URL(
    join(URL_ENDPOINT_ARTICLES, "posts", "stars", `${author_id}`)
  );

  const fetchArticlesRepostedByUser = async (): Promise<void> => {
    const response = await fetch(url);

    if (response.ok) {
      const { data } = await response.json();
      console.log(data);
      setData(data);
    }
  };

  React.useEffect(() => {
    if (author_id) {
      fetchArticlesRepostedByUser();
    }
  }, []);

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
      {data && data.length > 0
        ? data.map((star: any, i: string) => (
            <PreviewArticle
              article={star && star.article ? star.article : ({} as Article)}
              key={i}
            />
          ))
        : null}
    </section>
  );
}
