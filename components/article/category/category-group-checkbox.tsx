"use client";

import React from "react";

import { join } from "path";
import { useFetch } from "@/hooks/useFetch";
import { Button, CheckboxGroup, Pagination } from "@nextui-org/react";
import { CustomCheckbox } from "./category-checkbox";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { Category } from "@/types/category";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BackIcon } from "@/components/icons";

export function CategoryGroupCheckbox() {
    const [groupSelected, setGroupSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);

    const url = new URL(join(URL_ENDPOINT_ARTICLES, "posts", "categories"));
    url.searchParams.append("page", page.toString());
    url.searchParams.append("size", "8");

    const fetchProjects = () =>
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "force-cache",
            next: {
                revalidate: 3600,
            },
        }).then((res) => res.json());

    const { isPending, isError, error, data, isFetching, isPlaceholderData } = useQuery({
        queryKey: ["categories", page],
        queryFn: () => fetchProjects(),
        placeholderData: keepPreviousData,
    });

    return (
        <div className="flex flex-col gap-1 max-w-3xl w-full">
            <CheckboxGroup
                label="Select categories"
                orientation="horizontal"
                value={groupSelected}
                onValueChange={(value: string[]) => setGroupSelected(value)}
                className="font-sfmono font-semibold text-current gap-1 rounded-md"
            >
                <div className="flex-nowrap flex gap-1 overflow-x-auto px-2 scroll-p-0 scroll-m-0 scrollbar-hide h-max items-center">
                    {data &&
                        data.data &&
                        data.data?.map((category: Category, i: number) => (
                            <CustomCheckbox
                                key={i}
                                value={category.label}
                                aria-label={category.label}
                                className="my-1"
                            >
                                {category.label}
                            </CustomCheckbox>
                        ))}
                </div>
            </CheckboxGroup>

            <div className="flex h-max w-max-sm gap-2 justify-center">
                <Button
                    size="sm"
                    color="secondary"
                    variant="light"
                    disabled={isPending || isError || isFetching}
                    onPress={() =>
                        setPage((prev) => {
                            if (prev === 1) {
                                return data.last_page;
                            }

                            return prev - 1;
                        })
                    }
                >
                    <BackIcon size={20} />
                </Button>

                <Pagination
                    total={data ? data.last_page : 0}
                    initialPage={page}
                    page={page}
                    loop
                    onChange={setPage}
                    size="sm"
                    aria-label="pagination"
                    hidden
                />
                <Button
                    size="sm"
                    variant="light"
                    color="secondary"
                    disabled={isPending || isError || isFetching}
                    onPress={() =>
                        setPage((prev) => (prev === data.last_page ? 1 : prev + 1))
                    }
                >
                    <BackIcon size={20} className="transform rotate-180" />
                </Button>
            </div>
            <p className="mt-4 ml-1 text-default-500 capitalize">
                Selected: {groupSelected.join(", ")}
            </p>
        </div>
    );
}
