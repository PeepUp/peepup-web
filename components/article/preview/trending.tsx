"use client";

import * as React from "react";
import * as UI from "@nextui-org/react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { join } from "path";
import { ForwardIcon } from "@/components/icons";
import { useFetch } from "@/hooks/useFetch";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { PreviewArticleMeta } from "@/types/article";

export function BlogOverviewCover() {
    const url = new URL(join(URL_ENDPOINT_ARTICLES, "posts", "articles", "popular"));
    const { data } = useFetch<PreviewArticleMeta[]>({
        url,
        config: {
            method: "GET",
            mode: "cors",
            headers: {
                Accept: "application/json",
            },
        },
    });

    React.useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    const SmallCardPost = ({ post }: { post: PreviewArticleMeta }) => {
        return (
            <UI.Card className="col-span-12 sm:col-span-4 h-[300px]">
                <UI.CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                        Tranding article of the day
                    </p>
                    <UI.Link href={`/posts/${post.slug}`} as={Link}>
                        <h4 className="text-white font-medium text-large capitalize">
                            {post.title}
                        </h4>
                    </UI.Link>
                </UI.CardHeader>
                <UI.Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover hover:grayscale-0 grayscale-[80%]"
                    src={
                        post && post.image_cover
                            ? `https://app.requestly.io/delay/1000/${post.image_cover}`
                            : "https://app.requestly.io/delay/1000"
                    }
                />
            </UI.Card>
        );
    };

    const MediumCardPost = ({ post }: { post: PreviewArticleMeta }) => {
        return (
            <UI.Card
                isFooterBlurred
                className="w-full h-[300px] col-span-12 sm:col-span-5"
            >
                <UI.CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <UI.Chip color="success">
                        <p className="text-tiny text-current uppercase font-bold">New</p>
                    </UI.Chip>
                    <h4 className="font-medium text-xl text-white capitalize">
                        {post.title}
                    </h4>
                </UI.CardHeader>
                <UI.Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover hover:grayscale-0 grayscale-[80%]"
                    src={
                        post && post.image_cover
                            ? `https://app.requestly.io/delay/1000/${post.image_cover}`
                            : "https://app.requestly.io/delay/1000"
                    }
                />
                <UI.CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-tiny">Read now.</p>
                        <p className="text-black text-tiny">Get notified.</p>
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

    const ExtraLargeCardPost = ({ post }: { post: PreviewArticleMeta }) => {
        return (
            <UI.Card
                isFooterBlurred
                className="w-full h-[300px] col-span-12 sm:col-span-7"
            >
                <UI.CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <UI.Chip color="secondary">
                        <p className="text-tiny text-current uppercase font-bold">
                            For you
                        </p>
                    </UI.Chip>
                    <h4 className="capitalize text-white/90 font-medium text-xl">
                        {post.title}
                    </h4>
                </UI.CardHeader>
                <UI.Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover hover:grayscale-0 grayscale-[80%]"
                    src="https://nextui.org/images/card-example-5.jpeg"
                />
                <UI.CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <UI.Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black hover:grayscale-0 grayscale-[80%]"
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
                        className="text-tiny py-1 px-4"
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
                "flex flex-col my-12",
                "w-full h-full",
                "justify-start items-center",
            ])}
        >
            <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 my-12">
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

            <UI.Card className="w-full bg-transparent border-none" shadow="none">
                <UI.Button
                    className="w-40 py-4 mx-auto"
                    endContent={<ForwardIcon className="dark:fill-white/60" />}
                    as={Link}
                    href="/explore"
                >
                    See more
                </UI.Button>
            </UI.Card>
        </div>
    );
}
