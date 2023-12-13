import * as UI from "@nextui-org/react";
import Link from "next/link";

import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { PreviewArticleMeta } from "@/types/article";
import { AuthorAvatarPopover } from "../author/AuthorAvatarPopover";
import { InsightIcon, RepostIcon, StarShineIcon, TimerIcon } from "@/components/icons";
import { CategoryChip } from "../category/category-chip";
import { ImageCoverModal } from "../image/image-modal";

export type Props = {
    post: PreviewArticleMeta;
};

export function PreviewArticle({ post }: Props) {
    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onOpenChange: onOpenChangeModal,
    } = UI.useDisclosure();

    return (
        <UI.Card
            key={post.id}
            className="w-full max-w-2xl h-[276px] self-center flex flex-row max-md:flex-col hover:shadow-xl transition-shadow duration-300 ease-in-out shadow-none"
        >
            <UI.Modal
                isOpen={isOpenModal}
                onOpenChange={onOpenChangeModal}
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
                className="object-cover h-full max-w-[500px] w-full justify-self-center self-center max-md:hidden hover:grayscale-0 grayscale-[50%]"
                width={300}
                onClick={onOpenModal}
                height="100%"
                shadow="none"
                radius="none"
                isBlurred
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                src={post.image_cover ?? "https://app.requestly.io/delay/8000"}
            />
            <UI.CardBody className="h-full min-h-[200px] w-full">
                <div className="grid gap-6 md:gap-4 items-stretch justify-center w-full">
                    <div className="flex flex-col items-start justify-start col-span-6 md:col-span-8 space-y-2 w-full">
                        <div className="space-y-1 w-full">
                            <h2 className="text-xl font-medium">
                                <UI.Link
                                    as={Link}
                                    href={`/posts/${post.slug}`}
                                    referrerPolicy="no-referrer"
                                    target="_self"
                                    color="secondary"
                                    title={"Go to read " + post.title}
                                    className={cn([
                                        "__link",
                                        "text-current",
                                        "font-bold",
                                        "text-start",
                                        "text-xl",
                                        "capitalize",
                                    ])}
                                >
                                    {post.title}
                                </UI.Link>
                            </h2>

                            <p className="text-md font-light">
                                {capitalizeFirstLetter(post.description)}
                            </p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <AuthorAvatarPopover
                                {...{
                                    avatar: "http://localhost:3000/assets/images/milad.jpg",
                                    isFollowed: false,
                                    description:
                                        "Full-stack developer, @getnextui lover she/her 🎉",
                                    name: "Milad Alizadeh",
                                    username: "milad",
                                }}
                            />

                            <UI.Popover placement="left" color="foreground">
                                <UI.PopoverTrigger title="Time to read">
                                    <div className="cursor-pointer mr-4">
                                        <TimerIcon size={24} />
                                    </div>
                                </UI.PopoverTrigger>

                                <UI.PopoverContent className="">
                                    <p>{post.timeToRead ?? 0} min read</p>
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

                        <div className="flex justify-between items-center max-md:w-3/5 w-3/4">
                            <div className="flex space-y-2 items-start justify-center group">
                                <p className="flex items-center justify-center group-hover:text-[#FBBC05]">
                                    <StarShineIcon
                                        size={20}
                                        className="mr-1 group-hover:fill-[#FBBC05] group-hover:scale-125 text-current dark:stroke-[#FBBC05] fill-none"
                                    />
                                    {post.stars.length} star
                                    {post.stars.length > 1 ? "s" : ""}
                                </p>
                            </div>

                            <div className="flex space-y-2 items-start justify-center group select-none">
                                <p className="flex items-center justify-center group-hover:text-[#D2DE32]">
                                    <RepostIcon
                                        size={16}
                                        fill="currentColor"
                                        className="mr-1 group-hover:scale-105 group-hover:fill-[#D2DE32] text-current"
                                    />
                                    {post.reposts.length} repost
                                    {post.reposts.length > 1 ? "s" : ""}
                                </p>
                            </div>

                            <div className="flex space-y-2 items-start justify-center group">
                                <p className="flex select-none items-center justify-center space-x-1">
                                    <InsightIcon
                                        size={12}
                                        stroke="#D2DE32"
                                        className="mr-1 group-hover:fill-[#D2DE32] text-current"
                                    />
                                    {post.visit_count} view
                                    {post.visit_count > 1 ? "s" : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </UI.CardBody>
        </UI.Card>
    );
}
