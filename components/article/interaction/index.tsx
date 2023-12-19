"use client";

import * as UI from "@nextui-org/react";

import { join } from "path";
import { Repost, Star } from "../list-post";
import { useGlobalContext } from "@/context/store/global";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";

import { InsightIcon, RepostIcon, StarShineIcon } from "@/components/icons";

export function LikeButon({
    stars,
    uid,
    articleId,
}: {
    stars: Star[];
    uid?: string;
    articleId?: string;
}) {
    async function fetcherDislike() {
        try {
            const url = new URL(
                join(
                    URL_ENDPOINT_ARTICLES,
                    "posts",
                    "articles",
                    articleId ? articleId : "",
                    "unstars",
                    uid ? uid : ""
                )
            );

            const res = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                if (res.status === 400) {
                    console.log("already disliked");
                    return;
                }
            }

            if (res.status === 204) {
                console.log("success");
                return;
            }
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async function fetcher() {
        try {
            const url = new URL(
                join(
                    URL_ENDPOINT_ARTICLES,
                    "posts",
                    "articles",
                    articleId ? articleId : "",
                    "stars",
                    uid ? uid : ""
                )
            );

            const res = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                if (res.status === 400) {
                    return fetcherDislike();
                }
            }

            if (res.status === 204) {
                console.log("success");
                return;
            }
        } catch (error) {
            console.error(error);
            return;
        }
    }

    const handleLike = () => {
        fetcher();
    };

    return (
        <div className="flex space-y-2 items-start justify-center group">
            <UI.Button size="sm" as="button" variant="light" onPress={handleLike}>
                <p className="flex items-center justify-center group-hover:text-[#FBBC05] select-none cursor-pointer">
                    <StarShineIcon
                        size={20}
                        className="mr-1 group-hover:fill-[#FBBC05] group-hover:scale-125 text-current dark:stroke-[#FBBC05] fill-none"
                    />
                    {stars.length} star
                    {stars.length > 1 ? "s" : ""}
                </p>
            </UI.Button>
        </div>
    );
}

export function RepostButon({
    reposts,
    uid,
    articleId,
}: {
    reposts: Repost[];
    uid?: string;
    articleId?: string;
}) {
    const handleRepost = () => {
        console.log("repost");
    };

    return (
        <div className="flex space-y-2 items-start justify-center group select-none">
            <UI.Button size="sm" as="button" variant="light" onPress={handleRepost}>
                <p className="flex items-center justify-center group-hover:text-[#D2DE32] select-none cursor-pointer">
                    <RepostIcon
                        size={16}
                        fill="currentColor"
                        className="mr-1 group-hover:scale-105 group-hover:fill-[#D2DE32] text-current"
                    />
                    {reposts.length} repost
                    {reposts.length > 1 ? "s" : ""}
                </p>
            </UI.Button>
        </div>
    );
}

export function VisitButon({ visit_count }: { visit_count: number }) {
    return (
        <div className="flex space-y-2 items-start justify-center group">
            <p className="flex select-none items-center justify-center space-x-1 select-none cursor-pointer">
                <InsightIcon
                    size={12}
                    stroke="#D2DE32"
                    className="mr-1 group-hover:fill-[#D2DE32] text-current"
                />
                {visit_count} view
                {visit_count > 1 ? "s" : ""}
            </p>
        </div>
    );
}

type Props = {
    stars: Star[];
    reposts: Repost[];
    id: string;
    visit_count: number;
};

export function InteractionStatistic({ id, stars, reposts, visit_count }: Props) {
    const { data } = useGlobalContext();

    return (
        <div className="flex justify-between items-center max-md:w-max max-md:space-x-4 w-3/4">
            <LikeButon
                stars={stars}
                uid={data && data.identity ? data.identity.id : ""}
                articleId={id}
            />
            <RepostButon
                reposts={reposts}
                uid={data && data.identity ? data.identity.id : ""}
                articleId={id}
            />
            <VisitButon visit_count={visit_count} />
        </div>
    );
}
