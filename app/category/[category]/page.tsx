"use client";

import * as React from "react";
import * as UI from "@nextui-org/react";
import { PreviewArticle } from "@/components/article/preview";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { Article } from "@/types/article";
import { cn } from "@/lib/utils";
import { join } from "path";

export type Props = {
  params: {
    category: string;
  };
};

export default function Page({ params }: Props) {
  const url = new URL(
    join(
      URL_ENDPOINT_ARTICLES,
      "posts",
      `articles/search?status=published&categories=${params.category}`,
    ),
  );
  const [data, setData] = React.useState<Article[]>();
  const [loading, setLoading] = React.useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const { data } = await response.json();
      setData(data as Article[]);
      setLoading(false);
      return;
    }

    setLoading(false);
    return;
  }

  React.useEffect(() => {
    fetchData();
  }, [params]);

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
        "h-full",
        "my-2",
        "space-y-1",
      ])}
    >
      <div>
        <p>Search results for category '{params.category}'</p>
      </div>
      <UI.Spacer y={6} />
      <div>
        {data && data?.length > 0 ? (
          data.map((post: Article, i) => (
            <React.Fragment key={i}>
              <UI.Spacer y={2} />
              <PreviewArticle article={post} key={i} />
            </React.Fragment>
          ))
        ) : loading && !data ? (
          <>
            <UI.Spacer y={40} />
            <UI.Spinner size="sm" label="wait a moment ..." color="secondary" />
          </>
        ) : !loading && data ? (
          <>
            <UI.Spacer y={40} />
            <p>No records for '{params.category}'</p>
          </>
        ) : null}
      </div>
      <UI.Spacer y={20} />
    </section>
  );
}
