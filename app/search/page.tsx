"use client";

import * as React from "react";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import * as UI from "@nextui-org/react";
import { PreviewArticle } from "@/components/article/preview";
import { PreviewArticleMeta } from "@/types/article";
import { cn } from "@/lib/utils";

type Props = {
    searchParams: {
        q: string;
    };
};

export default function Page({ searchParams }: Props) {
    const url = `${URL_ENDPOINT_ARTICLES}/posts/articles/search?status=published&title=${searchParams.q}`;
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
    }, [searchParams]);

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
                            label={`Searching for '${searchParams.q}' ...`}
                            color="secondary"
                        />
                    </>
                ) : !loading && data && data.length === 0 ? (
                    <>
                        <UI.Spacer y={40} />
                        <p>No records for '{searchParams.q}'</p>
                    </>
                ) : null}
            </div>
            <UI.Spacer y={20} />
        </section>
    );
}
