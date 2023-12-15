"use client";

import * as React from "react";
import * as UI from "@nextui-org/react";
import { PreviewArticle } from "@/components/article/preview";
import PreviewListPost from "@/components/article/list-post";
import { CategoryGroupCheckbox } from "@/components/article/category/category-group-checkbox";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { PreviewArticleMeta } from "@/types/article";
import { cn } from "@/lib/utils";

export type Props = {
    params: {
        category: string;
    };
};

export default function Page({ params }: Props) {
    const url = `${URL_ENDPOINT_ARTICLES}/posts/articles/search?status=published&categories=${params.category}`;
    const [data, setData] = React.useState<PreviewArticleMeta[]>();
    const [loading, setLoading] = React.useState<boolean>(false);

    async function fetchData() {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch(url, {
            method: "GET",
        });

        if (response.ok) {
            const { data } = await response.json();
            setData(data as PreviewArticleMeta[]);
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
                <p>Search results for '{params.category}'</p>
            </div>
            <UI.Spacer y={6} />
            <div
                className={cn([
                    "container",
                    "h-max",
                    "mx-auto",
                    "max-w-3xl",
                    "self-start",
                    "px-4",
                    "flex",
                    "flex-col",
                ])}
            >
                <CategoryGroupCheckbox
                    options={{
                        showTitle: false,
                        defaultSelected: [params.category],
                    }}
                />
            </div>

            <UI.Spacer y={20} />
            <div>
                {data && data?.length > 0 ? (
                    data.map((post: PreviewArticleMeta, i) => (
                        <React.Fragment key={i}>
                            <UI.Spacer y={2} />
                            <PreviewArticle post={post} key={i} />
                        </React.Fragment>
                    ))
                ) : loading && data && data.length === 0 ? (
                    <>
                        <UI.Spacer y={40} />
                        <UI.Spinner
                            size="md"
                            label={`Searching for '${params.category}' ...`}
                            color="secondary"
                        />
                    </>
                ) : !loading && data && data.length === 0 ? (
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
