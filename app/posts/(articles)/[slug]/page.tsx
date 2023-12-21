"use client";

import * as UI from "@nextui-org/react";
import * as React from "react";

import { notFound } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { Article } from "@/types/article";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { getTokenSession, setTokenSession } from "@/lib/session/token";
import { CategoryChip } from "@/components/article/category/category-chip";
import { InsightIcon, RepostIcon, StarShineIcon } from "@/components/icons";
import { ImageCoverModal } from "@/components/article/image/image-modal";
import { InteractionStatistic } from "@/components/article/interaction";

export type Props = { params: { slug: string } };

export type PostMetadata = Article;

export default function Page({ params }: Props) {
  const url = `${URL_ENDPOINT_ARTICLES}/posts/articles/${params.slug}/content`;
  const [visitorId, setVisitorId] = React.useState<string>("");
  const postMetaUrl = `${URL_ENDPOINT_ARTICLES}/posts/articles/${params.slug}`;

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onOpenChange: onOpenChangeModal,
  } = UI.useDisclosure();

  const { data, error } = useFetch<string>({
    url,
    config: {
      cache: "no-store",
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
      <h1 className="mx-auto text-center text-6xl font-bold capitalize leading-snug max-md:text-4xl dark:text-gray-100">
        {title}
      </h1>
    </div>
  );

  const SkeletonTitleArticle = () => (
    <div className="w-4/5 rounded-lg">
      <div className="flex flex-col items-center justify-center space-y-5">
        <UI.Skeleton className="w-full rounded-lg">
          <div className="h-12 w-full rounded-lg bg-default-300"></div>
        </UI.Skeleton>

        <UI.Skeleton className="w-full rounded-lg">
          <div className="h-12 w-full rounded-lg bg-default-300"></div>
        </UI.Skeleton>

        <UI.Spacer y={2} />

        <UI.Skeleton className="w-full rounded-lg">
          <div className="h-52 w-full rounded-lg bg-default-300"></div>
        </UI.Skeleton>

        <div className="flex w-full items-center justify-center gap-4">
          <UI.Skeleton className="w-16 rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-300"></div>
          </UI.Skeleton>

          <UI.Skeleton className="w-16 rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-300"></div>
          </UI.Skeleton>
        </div>

        <div className="flex w-full items-center justify-center gap-4">
          <UI.Skeleton className="w-1/6 rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-300"></div>
          </UI.Skeleton>

          <UI.Skeleton className="w-1/6 rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-300"></div>
          </UI.Skeleton>

          <UI.Skeleton className="w-1/6 rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-300"></div>
          </UI.Skeleton>
        </div>
      </div>
    </div>
  );

  return (
    <section className="flex min-h-full min-w-full flex-col items-center justify-start space-x-3 max-lg:space-x-5">
      <UI.Spacer y={4} />

      <header className="flex w-full flex-col items-center justify-center self-center">
        {metadata && metadata.title ? (
          <TitleArticle title={metadata ? metadata.title : ""} />
        ) : (
          <SkeletonTitleArticle />
        )}

        <UI.Spacer y={10} />

        <UI.Modal
          isOpen={isOpenModal}
          onOpenChange={onOpenChangeModal}
          radius="lg"
          size="5xl"
          draggable={false}
          placement="center"
          backdrop="blur"
        >
          <ImageCoverModal
            src={metadata && metadata.image_cover ? metadata.image_cover : ""}
          />
        </UI.Modal>

        <div className="w-11/12 self-center">
          {metadata && metadata.image_cover ? (
            <UI.Image
              isBlurred
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              alt={metadata.title}
              onClick={onOpenModal}
              src={
                metadata && metadata.image_cover
                  ? `https://app.requestly.io/delay/3000/${metadata.image_cover}`
                  : `https://app.requestly.io/delay/3000/`
              }
              className="rounded-lg] h-[400px] w-[90vw] object-cover max-sm:h-[250px]"
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

        {metadata && (
          <InteractionStatistic
            {...{
              id: metadata?.id ?? "",
              stars: metadata?.stars ?? [],
              reposts: metadata?.reposts ?? [],
              visit_count: metadata?.visit_count ?? 0,
            }}
          />
        )}
      </header>

      <UI.Spacer y={20} />
      {data ? (
        <div
          className="prose w-8/12 max-w-none dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: atob(data) }}
        />
      ) : null}
      <UI.Spacer y={40} />
    </section>
  );
}
