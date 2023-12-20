"use client";

import * as UI from "@nextui-org/react";
import * as React from "react";

import Link from "next/link";

import { PreviewArticle } from "./preview";
import { TimerIcon } from "@/components/icons";
import { InteractionStatistic } from "./interaction";
import { ImageCoverModal } from "./image/image-modal";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { cn, capitalizeFirstLetter } from "@/lib/utils";
import { CategoryChip } from "./category/category-chip";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useGlobalContext } from "@/context/store/global";

import type { PreviewArticleMeta } from "@/types/article";

export default function PreviewListPost() {
    const ref = React.useRef<any>();
    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onOpenChange: onOpenChangeModal,
    } = UI.useDisclosure();
    const { data } = useGlobalContext();
    const [isFollowed, setIsFollowed] = React.useState(false);

    const fetchPostsPreview = async ({ pageParam = 1 }: { pageParam: number }) => {
        const url = `${URL_ENDPOINT_ARTICLES}/admin/posts/articles/preview?page=${pageParam}&size=12`;
        const data = await fetch(url, {
            method: "GET",
            cache: "reload",
            mode: "cors",
            next: {
                revalidate: 1000,
            },
        });

        const json = await data.json();
        return json;
    };

    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(() => fetchNextPage());
        });

        if (ref.current) {
            observer.observe(ref.current);
        }
    }, [ref]);

    const {
        data: response,
        error: queryError,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["articles"],
        queryFn: fetchPostsPreview,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return pages.length + 1;
        },
    });

    const UserCard = () => (
        <UI.Card shadow="none" className="max-w-[300px] border-none bg-transparent">
            <UI.CardHeader className="justify-between">
                <div className="flex gap-3">
                    <UI.Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src={data && data.identity ? data.identity.avatar : ""}
                    />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                            {data && data.identity
                                ? data.identity.fullName
                                : "Milad Alizadeh"}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-500">
                            @{data && data.identity ? data.identity.username : "milad"}
                        </h5>
                    </div>
                </div>
                <UI.Button
                    className={
                        isFollowed
                            ? "bg-transparent text-foreground border-default-200"
                            : ""
                    }
                    color="default"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                >
                    {isFollowed ? "Unfollow" : "Follow"}
                </UI.Button>
            </UI.CardHeader>
            <UI.CardBody className="px-3 py-0">
                <p className="text-small pl-px text-default-500">
                    Full-stack developer, @getnextui lover she/her
                    <span aria-label="confetti" role="img">
                        🎉
                    </span>
                </p>
            </UI.CardBody>
            <UI.CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">4</p>
                    <p className=" text-default-500 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">97.1K</p>
                    <p className="text-default-500 text-small">Followers</p>
                </div>
            </UI.CardFooter>
        </UI.Card>
    );

    const FirstPostCard = ({ post }: { post: PreviewArticleMeta }) => {
        return (
            <UI.Card className="w-full max-w-2xl h-full self-center hover:shadow-xl transition-shadow duration-300 ease-in-out shadow-none">
                <div className="relative col-span-6 md:col-span-4 max-h-72">
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
                        onClick={() => onOpenModal()}
                        className="object-cover h-72 w-full justify-self-center self-center"
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
                        <div className="flex flex-col items-start justify-start col-span-6 md:col-span-8 space-y-2">
                            <div className="space-y-3">
                                <UI.Link
                                    as={Link}
                                    href={`/posts/${post.slug}`}
                                    referrerPolicy="no-referrer"
                                    target="_self"
                                    color="secondary"
                                    title={"Go to read " + "asdklflsdjfasd"}
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
                            <div className="flex justify-between items-center w-full pt-2">
                                <UI.Popover
                                    showArrow
                                    placement="top-start"
                                    triggerScaleOnOpen={false}
                                >
                                    <UI.PopoverTrigger>
                                        <UI.User
                                            name={
                                                data && data.identity
                                                    ? data.identity.fullName
                                                    : ""
                                            }
                                            description={new Date(post.created_at)
                                                .toLocaleString("en-US", {
                                                    month: "long",
                                                    year: "numeric",
                                                    day: "numeric",
                                                })
                                                .toString()}
                                            avatarProps={{
                                                src:
                                                    data && data.identity
                                                        ? data.identity.avatar
                                                        : "http://localhost:3000/assets/images/milad.jpg",
                                                alt: "Milad Alizadeh",
                                                color: "primary",
                                                className:
                                                    "cursor-pointer w-8 h-8 text-xs",
                                            }}
                                            classNames={{
                                                name: "text-xs font-medium",
                                            }}
                                        />
                                    </UI.PopoverTrigger>
                                    <UI.PopoverContent>
                                        <UserCard />
                                    </UI.PopoverContent>
                                </UI.Popover>

                                <UI.Popover placement="left" color="foreground">
                                    <UI.PopoverTrigger title="Time to read">
                                        <div className="cursor-pointer mr-4">
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
    };

    const SkeletonFirstCard = () => (
        <UI.Card className="w-3/4 space-y-3 min-h-[500px]" radius="lg">
            <UI.Skeleton className="rounded-lg">
                <div className="h-64 rounded-lg bg-default-300"></div>
            </UI.Skeleton>
            <div className="space-y-3 py-8">
                <UI.Skeleton className="mx-auto w-11/12 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </UI.Skeleton>
                <UI.Skeleton className="mx-auto w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </UI.Skeleton>
                <UI.Skeleton className="mx-auto w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </UI.Skeleton>
            </div>

            <div className="space-y-3 py-8 w-11/12 mx-auto">
                <UI.Skeleton className="rounded-lg">
                    <div className="h-4 w-3/5 rounded-lg bg-default-300"></div>
                </UI.Skeleton>
                <UI.Skeleton className="rounded-lg">
                    <div className="h-4 w-3/5 rounded-lg bg-default-300"></div>
                </UI.Skeleton>
                <UI.Skeleton className="rounded-lg">
                    <div className="h-6 w-3/5 rounded-lg bg-default-300"></div>
                </UI.Skeleton>
            </div>
        </UI.Card>
    );

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
            {response ? (
                response.pages.map((group, i) => {
                    if (i === 0) {
                        return (
                            <FirstPostCard
                                post={group.data[0] as PreviewArticleMeta}
                                key={i}
                            />
                        );
                    }

                    return group.data.map((post: PreviewArticleMeta, i: number) => {
                        return <PreviewArticle post={post} key={i} />;
                    });
                })
            ) : (
                <>
                    <SkeletonFirstCard />
                    {new Array(6).fill(0).map((_, i) => (
                        <UI.Card key={i} className="w-3/4 space-y-3" radius="lg">
                            <UI.Skeleton className="rounded-lg">
                                <div className="h-24 rounded-lg bg-default-300"></div>
                            </UI.Skeleton>
                            <div className="space-y-3">
                                <UI.Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </UI.Skeleton>
                                <UI.Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </UI.Skeleton>
                                <UI.Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                </UI.Skeleton>
                            </div>
                        </UI.Card>
                    ))}
                </>
            )}
            <span ref={ref}></span>
            <UI.Spacer y={4} />
            <UI.Spinner size="sm" hidden={isLoading ? false : true} color="secondary" />
            <UI.Spacer y={20} />
        </section>
    );
}

export interface PreviewPostData {
    id: string;
    title: string;
    content: string;
    description: string;
    category: string;
    categories: Category[];
    slug: string;
    created_at: string;
    image: string;
    updated_at: string;
    timeToRead?: string;
    visit_count?: number;
    stars: Star[];
    reposts: Repost[];
    read_count?: number;
    author_id?: string;
}

export type Star = {
    user_id: string;
    article_id: string;
    star_value: number;
    length?: number;
};

export type Repost = {
    id: number;
    user_id: string;
    article_id: string;
};

export type Category = {
    label: string;
    id: number;
};
