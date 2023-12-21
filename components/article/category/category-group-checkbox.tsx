"use client";

import React from "react";
import * as UI from "@nextui-org/react";

import { join } from "path";
import { Button, CheckboxGroup, Pagination } from "@nextui-org/react";
import { CustomCheckbox } from "./category-checkbox";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { Category } from "@/types/category";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BackIcon } from "@/components/icons";

type Props = {
  options?: {
    showTitle?: boolean;
    defaultSelected?: string[];
  };
};

export function CategoryGroupCheckbox({ options }: Props) {
  const [groupSelected, setGroupSelected] = React.useState<string[]>(
    options?.defaultSelected ?? []
  );

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

  const {
    isPending,
    isError,
    error,
    data,
    isFetching,
    isPlaceholderData,
    isLoading,
  } = useQuery({
    queryKey: ["categories", page],
    queryFn: () => fetchProjects(),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-1 max-sm:w-full">
      <CheckboxGroup
        label={
          <UI.Tooltip
            className="font-sans"
            size="sm"
            showArrow
            placement="top-start"
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Custom Content</div>
                <div className="text-tiny">
                  This is a custom tooltip content
                </div>
              </div>
            }
          >
            {options && options.showTitle ? (
              <h4 className="font-semibold text-current">Select categories</h4>
            ) : (
              <> </>
            )}
          </UI.Tooltip>
        }
        orientation="horizontal"
        value={groupSelected}
        onValueChange={(value: string[]) => setGroupSelected(value)}
        className="gap-1 rounded-md font-semibold text-current"
      >
        <div className="flex h-max scroll-m-0 scroll-p-0 flex-nowrap items-center gap-1 overflow-x-auto px-2 scrollbar-hide max-sm:px-0">
          {data && data.data ? (
            data.data?.map((category: Category, i: number) => (
              <CustomCheckbox
                key={i}
                value={category.label}
                aria-label={category.label}
                className="my-1"
              >
                {category.label}
              </CustomCheckbox>
            ))
          ) : (
            <UI.Spinner
              content="wait a moment ..."
              size="sm"
              color="secondary"
            />
          )}
        </div>
      </CheckboxGroup>

      {!isLoading && (
        <div className="w-max-sm flex h-max justify-center gap-2">
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
            total={data ? data.last_page : 1}
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
            <BackIcon size={20} className="rotate-180 transform" />
          </Button>
        </div>
      )}
    </div>
  );
}
