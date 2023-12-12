"use client";

import * as UI from "@nextui-org/react";
import * as React from "react";

import { notFound } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { PreviewArticleMeta } from "@/types/article";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { getTokenSession, setTokenSession } from "@/lib/session/token";
import { CategoryChip } from "@/components/article/category/category-chip";
import { InsightIcon, RepostIcon, StarShineIcon } from "@/components/icons";

export type Props = { params: { slug: string } };

export type PostMetadata = PreviewArticleMeta;

export default function Page({ params }: Props) {
    const url = `${URL_ENDPOINT_ARTICLES}/posts/articles/${params.slug}/content`;
    const [visitorId, setVisitorId] = React.useState<string>("");
    const postMetaUrl = `${URL_ENDPOINT_ARTICLES}/posts/articles/${params.slug}`;

    const { data, error } = useFetch<string>({
        url,
        config: {
            cache: "force-cache",
            method: "GET",
        },
    });

    const { data: metadata } = useFetch<PostMetadata>({
        url: postMetaUrl,
        config: {
            cache: "no-store",
            method: "GET",
        },
    });

    React.useEffect(() => {
        if (getTokenSession("visitor_id")) {
            const visitorToken = getTokenSession("visitor_id");
            if (visitorToken) {
                setVisitorId(visitorToken);
            }
        } else {
            const randomStr = crypto.randomUUID();
            setTokenSession({
                name: "visitor_id",
                value: randomStr,
            });
        }
    }, [visitorId, metadata]);

    React.useEffect(() => {
        if (params.slug) {
            const url = `${URL_ENDPOINT_ARTICLES}/posts/articles/${params.slug}/visit`;
            fetch(url, {
                method: "POST",
                mode: "cors",
            }).catch((err) => {
                console.log(err);
            });
        }
    }, []);

    React.useEffect(() => {
        if (error) {
            if (error === 404) {
                return notFound();
            }

            console.log(error);
            throw new Error(error.toString());
        }
    }, [error]);

    const TitleArticle = ({ title }: { title: string }) => (
        <div className="w-11/12 self-center">
            <h1 className="mx-auto font-bold dark:text-gray-100 max-md:text-4xl text-6xl text-center leading-snug capitalize">
                {title}
            </h1>
        </div>
    );

    const SkeletonTitleArticle = () => (
        <div className="w-11/12 rounded-lg">
            <div className="space-y-3">
                <UI.Skeleton className="w-11/12 rounded-lg">
                    <div className="h-8 w-2/5 rounded-lg bg-default-300"></div>
                </UI.Skeleton>

                <UI.Skeleton className="w-11/12 rounded-lg">
                    <div className="h-8 w-2/5 rounded-lg bg-default-300"></div>
                </UI.Skeleton>
            </div>
        </div>
    );

    return (
        <section className="flex flex-col max-lg:space-x-5 space-x-3 min-w-full min-h-full justify-start items-center">
            <UI.Spacer y={4} />

            <header className="self-center flex flex-col justify-center items-center">
                {metadata && metadata.title ? (
                    <TitleArticle title={metadata ? metadata.title : ""} />
                ) : (
                    <SkeletonTitleArticle />
                )}

                <UI.Spacer y={10} />

                <div className="w-11/12 self-center">
                    {metadata && metadata.image_cover ? (
                        <UI.Image
                            isBlurred
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            alt={metadata.title}
                            src={
                                metadata && metadata.image_cover
                                    ? `https://app.requestly.io/delay/3000/${metadata.image_cover}`
                                    : `https://app.requestly.io/delay/3000/`
                            }
                            className="object-cover w-[90vw] h-[400px] max-sm:h-[250px] rounded-lg]"
                            isZoomed
                        />
                    ) : null}
                </div>
                <UI.Spacer y={10} />
                <div className="space-x-2">
                    {metadata && metadata.categories.length > 0
                        ? metadata.categories.map((category) => (
                              <CategoryChip
                                  {...{ ...category, size: "lg", radius: "md" }}
                                  key={category.id}
                              />
                          ))
                        : null}
                </div>

                <UI.Spacer y={5} />

                <div className="flex justify-center items-center max-md:w-10/12 w-2/5 space-x-6">
                    <div className="flex space-y-2 items-center justify-center group">
                        <UI.Button size="sm" radius="md" className="bg-transparent">
                            <p className="flex select-none items-center justify-center">
                                <StarShineIcon
                                    size={20}
                                    stroke="#FBBC05"
                                    className="mr-1 group-hover:fill-[#FBBC05] group-hover:scale-125 text-current"
                                />
                                {metadata && metadata.stars.length} star
                                {metadata && metadata.stars.length > 1 ? "s" : ""}
                            </p>
                        </UI.Button>
                    </div>

                    <div className="flex space-y-2 items-start justify-center group select-none">
                        <UI.Button size="sm" radius="md" className="bg-transparent">
                            <p className="flex items-center justify-center select-none">
                                <RepostIcon
                                    size={14}
                                    fill="currentColor"
                                    className="mr-1 group-hover:fill-[#48cae4] text-current"
                                />
                                {metadata && metadata.reposts.length} repost
                                {metadata && metadata.reposts.length > 1 ? "s" : ""}
                            </p>
                        </UI.Button>
                    </div>

                    <div className="flex space-y-2 items-start justify-center group">
                        <p className="flex select-none items-center justify-center space-x-1">
                            <InsightIcon
                                size={12}
                                stroke="#D2DE32"
                                className="mr-1 group-hover:fill-[#D2DE32] text-current"
                            />
                            {metadata && metadata.visit_count} view
                            {metadata && metadata.visit_count > 1 ? "s" : ""}
                        </p>
                    </div>
                </div>
            </header>

            <UI.Spacer y={20} />
            {data ? (
                <div
                    className="max-w-none w-8/12 prose dark:prose-dark"
                    dangerouslySetInnerHTML={{ __html: atob(data) }}
                />
            ) : null}
            <UI.Spacer y={40} />
        </section>
    );
}
