"use client";

import * as React from "react";
import * as UI from "@nextui-org/react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { join } from "path";
import { ForwardIcon } from "@/components/icons";
import { useFetch } from "@/hooks/useFetch";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { Article } from "@/types/article";

export function BlogOverviewCover() {
  const url = new URL(
    join(URL_ENDPOINT_ARTICLES, "posts", "articles", "popular")
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

  const SmallCardPost = ({ post }: { post: Article }) => {
    return (
      <UI.Card className="col-span-12 h-[300px] sm:col-span-4">
        <UI.CardHeader className="absolute top-1 z-10 flex-col !items-start">
          <p className="text-tiny font-bold uppercase text-white/60">
            Tranding article of the day
          </p>
          <UI.Link href={`/posts/${post.slug}`} as={Link}>
            <h4 className="text-large font-medium capitalize text-white">
              {post.title}
            </h4>
          </UI.Link>
        </UI.CardHeader>
        <UI.Image
          removeWrapper
          alt="Card background"
          className="z-0 h-full w-full object-cover grayscale-[80%] hover:grayscale-0"
          src={
            post && post.image_cover
              ? `https://app.requestly.io/delay/1000/${post.image_cover}`
              : "https://app.requestly.io/delay/1000"
          }
        />
      </UI.Card>
    );
  };

  const MediumCardPost = ({ post }: { post: Article }) => {
    return (
      <UI.Card
        isFooterBlurred
        className="col-span-12 h-[300px] w-full sm:col-span-5"
      >
        <UI.CardHeader className="absolute top-1 z-10 flex-col items-start">
          <UI.Chip color="success">
            <p className="text-tiny font-bold uppercase text-current">New</p>
          </UI.Chip>
          <h4 className="text-xl font-medium capitalize text-white">
            {post.title}
          </h4>
        </UI.CardHeader>
        <UI.Image
          removeWrapper
          alt="Card example background"
          className="z-0 h-full w-full -translate-y-6 scale-125 object-cover grayscale-[80%] hover:grayscale-0"
          src={
            post && post.image_cover
              ? `https://app.requestly.io/delay/1000/${post.image_cover}`
              : "https://app.requestly.io/delay/1000"
          }
        />
        <UI.CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-100/50 bg-white/30">
          <div>
            <p className="text-tiny text-black">Read now.</p>
            <p className="text-tiny text-black">Get notified.</p>
          </div>
          <UI.Button
            className="text-tiny"
            color="primary"
            radius="full"
            size="sm"
            as={Link}
            href={`/posts/${post.slug}`}
          >
            Read now
          </UI.Button>
        </UI.CardFooter>
      </UI.Card>
    );
  };

  const ExtraLargeCardPost = ({ post }: { post: Article }) => {
    return (
      <UI.Card
        isFooterBlurred
        className="col-span-12 h-[300px] w-full sm:col-span-7"
      >
        <UI.CardHeader className="absolute top-1 z-10 flex-col items-start">
          <UI.Chip color="secondary">
            <p className="text-tiny font-bold uppercase text-current">
              For you
            </p>
          </UI.Chip>
          <h4 className="text-xl font-medium capitalize text-white/90">
            {post.title}
          </h4>
        </UI.CardHeader>
        <UI.Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 h-full w-full object-cover grayscale-[80%] hover:grayscale-0"
          src="https://nextui.org/images/card-example-5.jpeg"
        />
        <UI.CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 bg-black/40 dark:border-default-100">
          <div className="flex flex-grow items-center gap-2">
            <UI.Image
              alt="Breathing app icon"
              className="h-11 w-10 rounded-full bg-black grayscale-[80%] hover:grayscale-0"
              src="https://nextui.org/images/breathing-app-icon.jpeg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Mindfulness</p>
              <p className="text-tiny text-white/60">
                {post.description.split(" ").slice(0, 7).join(" ")}...
              </p>
            </div>
          </div>
          <UI.Button
            radius="full"
            size="sm"
            className="px-4 py-1 text-tiny"
            as={Link}
            href={`/posts/${post.slug}`}
          >
            See more
          </UI.Button>
        </UI.CardFooter>
      </UI.Card>
    );
  };

  return (
    <div
      className={cn([
        "my-12 flex flex-col",
        "h-full w-full",
        "items-center justify-start",
      ])}
    >
      <UI.Card className="w-full border-none bg-transparent" shadow="none">
        <div className="mx-auto my-12 grid max-w-[900px] grid-cols-12 grid-rows-2 gap-2 px-8">
          {data
            ? data.map((article, i) => {
                if (i >= 0 && i <= 2)
                  return <SmallCardPost key={i} post={article} />;
                if (i === 3) return <MediumCardPost key={i} post={article} />;
                if (i === 4)
                  return <ExtraLargeCardPost key={i} post={article} />;
                if (i === 5)
                  return <ExtraLargeCardPost key={i} post={article} />;
                if (i === 6) return <MediumCardPost key={i} post={article} />;
                if (i > 6 && i <= 9)
                  return <SmallCardPost key={i} post={article} />;
              })
            : null}
        </div>
        {!loading && (
          <UI.Button
            type="button"
            target="_self"
            className="mx-auto w-40 py-4 font-medium"
            endContent={<ForwardIcon className="dark:fill-white/60" />}
            as={Link}
            href="/explore"
            variant="light"
          >
            See more
          </UI.Button>
        )}
      </UI.Card>
    </div>
  );
}
