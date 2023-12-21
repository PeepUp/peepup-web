"use client";

import * as UI from "@nextui-org/react";

import { join } from "path";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { useGlobalContext } from "@/context/store/global";

import { ModalAuth } from "@/components/tabs-auth";
import { InsightIcon, RepostIcon, StarShineIcon } from "@/components/icons";

import type { Repost, Star } from "@/types/article";

type Props = {
  stars: Star[];
  reposts: Repost[];
  id: string;
  visit_count: number;
};

const ShowPromptAuth = () => {
  return <ModalAuth />;
};

export function InteractionStatistic({
  id,
  stars,
  reposts,
  visit_count,
}: Props) {
  const { data } = useGlobalContext();

  return (
    <div className="flex w-max items-center justify-between max-md:w-max max-md:space-x-4">
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

export function LikeButon({
  stars,
  uid,
  articleId,
}: {
  stars: Star[];
  uid?: string;
  articleId?: string;
}) {
  const { isOpen, onOpen, onOpenChange } = UI.useDisclosure();

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
        return;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  const handleLike = () => {
    if (!uid) {
      return onOpen();
    }

    fetcher();
  };

  return (
    <div className="group flex items-start justify-center space-y-2">
      <UI.Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ShowPromptAuth />
      </UI.Modal>
      <UI.Button size="sm" as="button" variant="light" onPress={handleLike}>
        <p className="flex cursor-pointer select-none items-center justify-center group-hover:text-[#FBBC05]">
          <StarShineIcon
            size={20}
            className="mr-1 fill-none stroke-current text-current group-hover:scale-125 group-hover:fill-current dark:stroke-[#FBBC05] group-hover:dark:fill-[#FBBC05]"
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
  const { isOpen, onOpen, onOpenChange } = UI.useDisclosure();

  async function fetcherUnrepost() {
    try {
      const url = new URL(
        join(
          URL_ENDPOINT_ARTICLES,
          "posts",
          "articles",
          articleId ? articleId : "",
          "unreposts",
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
          "reposts",
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
          return fetcherUnrepost();
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

  const handleRepost = () => {
    if (!uid) {
      return onOpen();
    }

    fetcher();
  };

  return (
    <div className="group flex select-none items-start justify-center space-y-2">
      <UI.Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ShowPromptAuth />
      </UI.Modal>
      <UI.Button size="sm" as="button" variant="light" onPress={handleRepost}>
        <p className="flex cursor-pointer select-none items-center justify-center group-hover:text-[#D2DE32]">
          <RepostIcon
            size={16}
            fill="currentColor"
            className="mr-1 text-current group-hover:scale-105 group-hover:fill-[#D2DE32]"
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
    <div className="group flex items-start justify-center space-y-2">
      <UI.Button size="sm" as="button" variant="light">
        <p className="flex cursor-pointer select-none items-center justify-center space-x-1">
          <InsightIcon
            size={12}
            stroke="#D2DE32"
            className="mr-1 text-current group-hover:fill-[#D2DE32]"
          />
          {visit_count} view
          {visit_count > 1 ? "s" : ""}
        </p>
      </UI.Button>
    </div>
  );
}
