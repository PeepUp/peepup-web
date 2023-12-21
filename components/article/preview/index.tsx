"use client";

import * as UI from "@nextui-org/react";

import Link from "next/link";

import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Article, ArticleAuthor } from "@/types/article";
import { AuthorAvatarPopover } from "../author/AuthorAvatarPopover";
import { TimerIcon } from "@/components/icons";
import { CategoryChip } from "../category/category-chip";
import { ImageCoverModal } from "../image/image-modal";
import { InteractionStatistic } from "../interaction";

export type Props = {
  article: Article;
};

export function PreviewArticle({ article }: Props) {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onOpenChange: onOpenChangeModal,
  } = UI.useDisclosure();

  return (
    <UI.Card
      key={article.id}
      className="flex h-[274px] w-full max-w-2xl flex-row self-center justify-self-center shadow-none transition-shadow duration-300 ease-in-out hover:shadow-xl max-md:h-max max-md:flex-col"
    >
      <UI.Modal
        isOpen={isOpenModal}
        onOpenChange={onOpenChangeModal}
        radius="lg"
        size="4xl"
        draggable={false}
        placement="center"
        backdrop="blur"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        {article && article.image_cover && (
          <ImageCoverModal src={article.image_cover} />
        )}
      </UI.Modal>

      <UI.Image
        alt="Album cover"
        className="h-full w-full max-w-[500px] self-center justify-self-center object-cover grayscale-[50%] hover:grayscale-0 max-md:hidden"
        width={300}
        onClick={onOpenModal}
        height="100%"
        shadow="none"
        radius="none"
        isBlurred
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        src={
          article && article.image_cover
            ? article.image_cover
            : "https://app.requestly.io/delay/8000"
        }
      />

      <UI.CardBody className="h-full min-h-[200px] w-full">
        <div className="grid w-full items-stretch justify-center gap-6 md:gap-4">
          <div className="col-span-6 flex h-full w-full flex-col items-start space-y-2 md:col-span-8">
            <div className="space-x-2">
              {article.categories.length > 0
                ? article.categories.map((category) => (
                    <CategoryChip {...category} key={category.id} />
                  ))
                : null}
            </div>
            <div className="w-full space-y-1">
              <h2 className="text-xl font-medium">
                <UI.Link
                  as={Link}
                  href={`/posts/${article.slug}`}
                  referrerPolicy="no-referrer"
                  target="_self"
                  color="secondary"
                  title={"Go to read " + article.title}
                  className={cn([
                    "__link",
                    "text-current",
                    "font-bold",
                    "text-start",
                    "text-xl",
                    "capitalize",
                  ])}
                >
                  {article && article.title && article.title.length > 64
                    ? article.title.slice(0, 64).concat("...")
                    : article.title}
                </UI.Link>
              </h2>

              <p className="text-md font-light">
                {capitalizeFirstLetter(
                  article && article.description
                    ? article.description.slice(0, 100).concat("...")
                    : "",
                )}
              </p>
            </div>

            <div className="flex w-full items-center justify-between">
              {article && article.author_id ? (
                <AuthorAvatarPopover
                  id={article ? article.author_id : ""}
                  created_at={new Date(article.created_at)
                    .toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                    })
                    .toString()}
                />
              ) : null}

              <UI.Popover placement="left" color="foreground">
                <UI.PopoverTrigger title="Time to read">
                  <div className="mr-4 cursor-pointer">
                    <TimerIcon size={24} />
                  </div>
                </UI.PopoverTrigger>

                <UI.PopoverContent className="">
                  <p>{article.timeToRead ?? 0} min read</p>
                </UI.PopoverContent>
              </UI.Popover>
            </div>

            <InteractionStatistic {...article} />
          </div>
        </div>
      </UI.CardBody>
    </UI.Card>
  );
}
