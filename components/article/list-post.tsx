"use client";

import * as UI from "@nextui-org/react";
import * as React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { TimerIcon } from "../icons";
import { useGlobalContext } from "@/context/store/global";
import { getAllArticles } from "@/lib/api/article";

export default function PreviewListPost() {
    const { data } = useGlobalContext();
    const [posts, setPosts] = React.useState<PreviewPostData[]>([]);
    const [isFollowed, setIsFollowed] = React.useState(false);

    React.useEffect(() => {
        async function fetch() {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await getAllArticles();
            if (response.ok) {
                const { data } = await response.json();
                setPosts(
                    data.map((post: any) => ({
                        ...post,
                        id: post.id,
                        createdAt: post.created_at,
                        categories: post.categories,
                    }))
                );
            }
        }

        if (posts.length === 0) {
            fetch();
        }
    }, [posts]);

    React.useEffect(() => {
        if (posts.length > 0) {
            console.log(posts);
        }
    }, [posts]);

    const userCard = (
        <UI.Card shadow="none" className="max-w-[300px] border-none bg-transparent">
            <UI.CardHeader className="justify-between">
                <div className="flex gap-3">
                    <UI.Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                    />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                            Zoey Lang
                        </h4>
                        <h5 className="text-small tracking-tight text-default-500">
                            @zoeylang
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
            {posts && posts.length > 0 ? (
                <UI.Card className="w-full max-w-2xl h-full self-center">
                    <div className="relative col-span-6 md:col-span-4 max-h-72">
                        <UI.Image
                            alt="Album cover"
                            className="object-cover h-72 w-full justify-self-center self-center"
                            width="100%"
                            radius="none"
                            height={0}
                            shadow="none"
                            isZoomed
                            isBlurred
                            draggable={false}
                            src="https://nextui.org/images/card-example-3.jpeg"
                        />
                    </div>
                    <UI.CardBody className="h-full min-h-max py-4">
                        <div className="flex flex-col items-stretch justify-center">
                            <div className="flex flex-col items-start justify-start col-span-6 md:col-span-8 space-y-2">
                                <div className="space-y-3">
                                    <h2>
                                        <UI.Link
                                            as={Link}
                                            href={`/posts/asdkjlfsdfasdf`}
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
                                            ])}
                                        >
                                            Lorem ipsum dolor sit amet consectetur
                                            adipisicing elit. Quisquam, voluptat Lorem
                                            ipsum dolor sit amet consectetur adipisicing
                                        </UI.Link>
                                    </h2>

                                    <h3 className="text-md font-normal">
                                        Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. Quisquam, voluptat Lorem ipsum dolor sit
                                        amet consectetur adipisicing
                                    </h3>
                                </div>
                                <div className="flex justify-between items-center w-full pt-2">
                                    <UI.Popover showArrow placement="top-start">
                                        <UI.PopoverTrigger>
                                            <UI.User
                                                name="Milad Alizadeh"
                                                description={new Date()
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
                                        <UI.PopoverContent>{userCard}</UI.PopoverContent>
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
                                {/*
                                <UI.Chip
                                    color="default"
                                    size="sm"
                                    radius="sm"
                                    className="bg-white/10 text-current font-medium"
                                >
                                    {post.category}
                                </UI.Chip>
                                */}
                            </div>
                        </div>
                    </UI.CardBody>
                </UI.Card>
            ) : (
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

                    <div className="space-y-3 py-8 w-3/4 mx-auto">
                        <UI.Skeleton className="rounded-lg">
                            <div className="h-12 w-3/5 rounded-lg bg-default-300"></div>
                        </UI.Skeleton>
                    </div>
                </UI.Card>
            )}

            {posts && posts.length > 0 ? (
                posts.map((post, i) => (
                    <UI.Card
                        key={i}
                        className="w-full max-w-2xl max-h-[400px] self-center flex flex-row max-md:flex-col hover:shadow-xl transition-shadow duration-300 ease-in-out shadow-none"
                    >
                        <UI.Image
                            alt="Album cover"
                            className="object-cover h-full max-w-[400px] w-full justify-self-center self-center max-md:hidden hover:grayscale-0 grayscale-[50%]"
                            width={300}
                            height="100%"
                            shadow="none"
                            radius="none"
                            isBlurred
                            draggable={false}
                            src={
                                "http://localhost:3000/assets/images/Abstract+Wallpapers+For+Desktop+2-355631041.jpeg" ??
                                post.image
                            }
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
                                                ])}
                                            >
                                                {post.title}
                                            </UI.Link>
                                        </h2>

                                        <p className="text-md font-light">
                                            {post.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <UI.Popover showArrow placement="top-start">
                                            <UI.PopoverTrigger>
                                                <UI.User
                                                    name="Milad Alizadeh"
                                                    description={new Date(post.createdAt)
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
                                                {userCard}
                                            </UI.PopoverContent>
                                        </UI.Popover>

                                        <UI.Popover placement="left" color="foreground">
                                            <UI.PopoverTrigger title="Time to read">
                                                <div className="cursor-pointer mr-4">
                                                    <TimerIcon size={24} />
                                                </div>
                                            </UI.PopoverTrigger>

                                            <UI.PopoverContent>
                                                <p>{post.timeToRead ?? 0} min read</p>
                                            </UI.PopoverContent>
                                        </UI.Popover>
                                    </div>
                                    <div className="space-x-2">
                                        <UI.Chip
                                            color="default"
                                            size="sm"
                                            radius="sm"
                                            className="bg-white/10 text-current font-medium"
                                        >
                                            Typescript
                                        </UI.Chip>
                                    </div>
                                </div>
                            </div>
                        </UI.CardBody>
                    </UI.Card>
                ))
            ) : (
                <>
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
            <UI.Spacer y={20} />
        </section>
    );
}

let testData: PreviewPostData[] = [
    {
        id: "1",
        title: "Using TypeScript with React for type-safe components & prop validation",
        content: "This is content of post 1",
        description:
            "In the ever-evolving world of web development, React has established itself as a powerful library for building user interfaces.",
        category: "Nature",
        slug: "using-typescript-with-react-for-type-safe-components-prop-validation",
        createdAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/milad.jpg",
        updatedAt: "2021-09-01",
        timeToRead: 5,
    },

    {
        id: "2",
        title: "jQuery vs React: What’s the Difference?",
        content:
            "Jquery is a library for javascript and React is a library for javascript too. But React is a library for building user interfaces and Jquery is a library for manipulating the DOM.",
        description:
            "In the ever-evolving world of web development, React has established itself as a powerful library for building user interfaces.",
        category: "Development",
        slug: "jquery-vs-react",
        createdAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
        updatedAt: "2021-09-01",
        timeToRead: 5,
    },
    {
        //generate new dummy data for post preview
        id: "3",
        title: "What is the difference between a framework and a library?",
        content: "This is content of post 3",
        description:
            "In the ever-evolving world of web development, React has established itself as a powerful library for building user interfaces.",
        category: "Nature",
        slug: "post-3",
        createdAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/Abstract+Wallpapers+For+Desktop+2-355631041.jpeg",
        updatedAt: "2021-09-01",
        timeToRead: 5,
    },
];

export interface PreviewPostData {
    id: string;
    title: string;
    content: string;
    description: string;
    category: string;
    categories?: string;
    slug: string;
    createdAt: string;
    image: string;
    updatedAt: string;
    timeToRead?: number;
    click_count?: number;
    like_count?: number;
    repost_count?: number;
    read_count?: number;
    author_id?: string;
}

/*
 
->select('id', 'title', 'slug', 'description', 'image', 'author_id', 'created_at', "categories", "like_count", "click_count", "repost_count")
 */
