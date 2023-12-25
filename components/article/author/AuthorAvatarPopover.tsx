"use client";

import * as UI from "@nextui-org/react";
import React from "react";

import type { ArticleAuthor } from "@/types/article";

import Link from "next/link";
import { getIdentityPreview } from "@/lib/api/identity/me";

interface IdentityPreviewData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
}

const cache: IdentityPreviewData[] = [];

export function AuthorAvatarPopover({ id, created_at }: ArticleAuthor) {
  const [data, setData] = React.useState<any>();

  const fetch = React.useMemo(() => {
    async function fetchData(): Promise<IdentityPreviewData | undefined> {
      const cachedData = cache.find((item) => item.id === id);
      if (cachedData) return cachedData;

      try {
        cache.splice(0, cache.length);
        const response = await getIdentityPreview(id);

        if (!response.ok) throw new Error("Network response was not ok.");

        const { data } = await response.json();

        cache.push(data);

        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return undefined;
      }
    }

    return fetchData;
  }, [id]);

  React.useEffect(() => {
    if (id) {
      fetch().then(setData);
    }
  }, [id, fetch]);

  const fullName =
    data && data.firstName && data.lastName
      ? data.firstName + " " + data.lastName
      : "";

  const avatarPopoverCard = (
    <UI.Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <UI.CardHeader className="justify-between">
        <div className="flex gap-3">
          <UI.Avatar
            size="md"
            src={data && data.avatar ? data.avatar : ""}
            color="default"
            isBordered
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-current">
              {fullName}
            </h4>
            <h5 className="text-small tracking-tight text-default-500">
              @{data && data.username ? data.username : ""}
            </h5>
          </div>
        </div>
        <UI.Spacer x={8} />
        <UI.Button
          as={Link}
          href={`/${data && data.username ? data.username : ""}`}
          color="default"
          radius="full"
          size="sm"
        >
          View
        </UI.Button>
      </UI.CardHeader>
    </UI.Card>
  );

  return (
    <UI.Popover triggerScaleOnOpen={false}>
      <UI.PopoverTrigger>
        <UI.User
          name={fullName}
          description={created_at}
          avatarProps={{
            src:
              data && data.avatar
                ? data.avatar
                : "http://localhost:3000/assets/images/milad.jpg",
            alt: "avatar",
            color: "primary",
            className: "w-8 h-8 text-xs",
          }}
          className="cursor-pointer"
          classNames={{
            name: "text-xs font-semibold",
          }}
        />
      </UI.PopoverTrigger>
      <UI.PopoverContent>{avatarPopoverCard}</UI.PopoverContent>
    </UI.Popover>
  );
}
