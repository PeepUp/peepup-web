import * as React from "react";
import * as UI from "@nextui-org/react";

import { Article } from "@/types/article";
import { ImageCoverModal } from "../image/image-modal";
import Link from "next/link";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { AuthorAvatarPopover } from "../author/AuthorAvatarPopover";
import { TimerIcon } from "@/components/icons";
import { CategoryChip } from "../category/category-chip";
import { InteractionStatistic } from "../interaction";

export function TrandingPostCard({ post }: { post: Article }) {
  const { isOpen, onOpen, onOpenChange } = UI.useDisclosure();

  return (
    <UI.Card className="h-full w-full max-w-2xl self-center shadow-none transition-shadow duration-300 ease-in-out hover:shadow-xl">
      <div className="relative col-span-6 max-h-72 md:col-span-4">
        <UI.Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          radius="lg"
          size="4xl"
          draggable={false}
          placement="center"
          backdrop="blur"
        >
          <ImageCoverModal src={post.image_cover} />
        </UI.Modal>

        <UI.Image
          alt="Album cover"
          onClick={() => onOpen()}
          className="h-72 w-full self-center justify-self-center object-cover"
          width="100%"
          radius="none"
          height={0}
          shadow="none"
          isZoomed
          isBlurred
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          src={
            `https://app.requestly.io/delay/1000/${post.image_cover}` ??
            "https://nextui.org/images/card-example-3.jpeg"
          }
        />
      </div>
      <UI.CardBody className="h-full min-h-max py-4">
        <div className="flex flex-col items-stretch justify-center">
          <div className="col-span-6 flex flex-col items-start justify-start space-y-2 md:col-span-8">
            <UI.Chip
              content="Tranding"
              color="secondary"
              variant="flat"
              size="sm"
              title="Tranding"
              className="font-bold"
            >
              Tranding
            </UI.Chip>
            <div className="space-y-3">
              <UI.Link
                as={Link}
                href={`/posts/${post.slug}`}
                referrerPolicy="no-referrer"
                target="_self"
                color="secondary"
                title={"Go to read " + post.title}
                className={cn([
                  "__link",
                  "text-xl",
                  "font-bold",
                  "text-current",
                  "text-start",
                  "leading-6",
                  "tracking-normal",
                  "capitalize",
                ])}
              >
                <h2 className="max-md:text-1xl">{post.title}</h2>
              </UI.Link>

              <h3 className="text-md font-normal">
                {capitalizeFirstLetter(
                  post.description.slice(0, 120).concat("...")
                )}
              </h3>
            </div>
            <div className="flex w-full items-center justify-between pt-2">
              <AuthorAvatarPopover
                id={post.author_id}
                created_at={new Date(post.created_at)
                  .toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                  })
                  .toString()}
              />

              <UI.Popover placement="left" color="foreground">
                <UI.PopoverTrigger title="Time to read">
                  <div className="mr-4 cursor-pointer">
                    <TimerIcon size={24} />
                  </div>
                </UI.PopoverTrigger>

                <UI.PopoverContent>
                  <p>{10} min read</p>
                </UI.PopoverContent>
              </UI.Popover>
            </div>

            <div className="space-x-2">
              {post.categories.length > 0
                ? post.categories.map((category) => (
                    <CategoryChip {...category} key={category.id} />
                  ))
                : null}
            </div>

            <InteractionStatistic {...post} />
          </div>
        </div>
      </UI.CardBody>
    </UI.Card>
  );
}
