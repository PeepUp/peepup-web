"use client";

import * as UI from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ForwardIcon } from "@/components/icons";

export default function Home() {
    return (
        <section className={cn(["h-max w-full"])}>
            <div
                className={cn([
                    "flex flex-col gap-0",
                    "min-h-screen h-full w-full my-auto",
                    "justify-center items-center",
                ])}
            >
                <div
                    className={cn([
                        "flex",
                        "w-full h-full",
                        "justify-center items-center",
                        "gap-4",
                        "max-sm:flex-col",
                        "max-sm:gap-0",
                        "max-sm:min-h-full",
                        "animate-transition",
                    ])}
                >
                    <UI.Image
                        src="https://app.requestly.io/delay/1000/http://localhost:3000/assets/images/left-bg-peepup-home.png"
                        alt="PeepUp"
                        loading="lazy"
                        className={cn([
                            "flex-none object-cover",
                            "rounded-[100%]",
                            "-rotate-45",
                            "max-sm:rotate-45",
                            "max-sm:max-w-[220px]",
                        ])}
                        isZoomed
                        isBlurred
                        draggable={false}
                    />
                    <div
                        className={cn([
                            "flex flex-col",
                            "grow-0",
                            "w-full min-h-max",
                            "justify-center items-center",
                        ])}
                    >
                        <h1
                            className={cn([
                                "shrink",
                                "font-randrake",
                                "text-center",
                                "select-none",
                                "text-[9rem]",
                                "min-xl:text-[9rem]",
                                "max-lg:text-[8rem]",
                                "max-sm:text-[5rem]",
                            ])}
                        >
                            {siteConfig.name}
                        </h1>
                        <UI.Spacer />
                        <p
                            className={cn([
                                "shrink",
                                "font-mono",
                                "text-center",
                                "text-sm",
                                "mt-16",
                                "max-md:mt-10",
                                "max-sm:text-xs",
                                "max-sm:max-w-[200px]",
                            ])}
                        >
                            <i>{"Inspiration starts here, words take flight."}</i>
                        </p>
                    </div>

                    <UI.Image
                        className={cn([
                            "flex-none object-cover",
                            "rotate-45",
                            "rounded-[100%]",
                            "max-sm:rotate-45",
                            "max-sm:-mt-6",
                            "max-sm:max-w-[220px]",
                        ])}
                        src="https://app.requestly.io/delay/1000/http://localhost:3000/assets/images/right-bg-peepup-home.png"
                        alt="PeepUp"
                        isZoomed
                        isBlurred
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        loading="lazy"
                    />
                </div>
            </div>

            <div
                className={cn([
                    "flex flex-col",
                    "w-full h-full",
                    "justify-start items-center",
                ])}
            >
                <BlogOverviewCover />
            </div>
        </section>
    );
}

function BlogOverviewCover() {
    return (
        <div
            className={cn([
                "flex flex-col my-12",
                "w-full h-full",
                "justify-start items-center",
            ])}
        >
            <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 my-12">
                <UI.Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <UI.CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                            What to watch
                        </p>
                        <h4 className="text-white font-medium text-large">
                            Stream the Acme event
                        </h4>
                    </UI.CardHeader>
                    <UI.Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-4.jpeg"
                    />
                </UI.Card>
                <UI.Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <UI.CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                            Plant a tree
                        </p>
                        <h4 className="text-white font-medium text-large">
                            Contribute to the planet
                        </h4>
                    </UI.CardHeader>
                    <UI.Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-3.jpeg"
                    />
                </UI.Card>
                <UI.Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <UI.CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                            Supercharged
                        </p>
                        <h4 className="text-white font-medium text-large">
                            Creates beauty like a beast
                        </h4>
                    </UI.CardHeader>
                    <UI.Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-2.jpeg"
                    />
                </UI.Card>
                <UI.Card
                    isFooterBlurred
                    className="w-full h-[300px] col-span-12 sm:col-span-5"
                >
                    <UI.CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
                        <h4 className="text-black font-medium text-2xl">Acme camera</h4>
                    </UI.CardHeader>
                    <UI.Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                        src="https://nextui.org/images/card-example-6.jpeg"
                    />
                    <UI.CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <p className="text-black text-tiny">Available soon.</p>
                            <p className="text-black text-tiny">Get notified.</p>
                        </div>
                        <UI.Button
                            className="text-tiny"
                            color="primary"
                            radius="full"
                            size="sm"
                        >
                            Notify Me
                        </UI.Button>
                    </UI.CardFooter>
                </UI.Card>

                <UI.Card
                    isFooterBlurred
                    className="w-full h-[300px] col-span-12 sm:col-span-7"
                >
                    <UI.CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                            Your day your way
                        </p>
                        <h4 className="text-white/90 font-medium text-xl">
                            Your checklist for better sleep
                        </h4>
                    </UI.CardHeader>
                    <UI.Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-5.jpeg"
                    />
                    <UI.CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <UI.Image
                                alt="Breathing app icon"
                                className="rounded-full w-10 h-11 bg-black grayscale"
                                src="https://nextui.org/images/breathing-app-icon.jpeg"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Breathing App</p>
                                <p className="text-tiny text-white/60">
                                    Get a good night's sleep.
                                </p>
                            </div>
                        </div>
                        <UI.Button radius="full" size="sm">
                            Get App
                        </UI.Button>
                    </UI.CardFooter>
                </UI.Card>

                <UI.Card
                    isFooterBlurred
                    className="w-full h-[300px] col-span-12 sm:col-span-7"
                >
                    <UI.CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                            Your day your way
                        </p>
                        <h4 className="text-white/90 font-medium text-xl">
                            Your checklist for better sleep
                        </h4>
                    </UI.CardHeader>
                    <UI.Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="/assets/images/milad.jpg"
                    />
                    <UI.CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <UI.Image
                                alt="Breathing app icon"
                                className="rounded-full w-10 h-11 bg-black grayscale"
                                src="https://nextui.org/images/breathing-app-icon.jpeg"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Breathing App</p>
                                <p className="text-tiny text-white/60">
                                    Get a good night's sleep.
                                </p>
                            </div>
                        </div>
                        <UI.Button radius="full" size="sm">
                            Get App
                        </UI.Button>
                    </UI.CardFooter>
                </UI.Card>

                <UI.Card
                    isFooterBlurred
                    className="w-full h-[300px] col-span-12 sm:col-span-5"
                >
                    <UI.CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
                        <h4 className="text-black font-medium text-2xl">Acme camera</h4>
                    </UI.CardHeader>
                    <UI.Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                        src="/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg"
                    />
                    <UI.CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <p className="text-black text-tiny">Available soon.</p>
                            <p className="text-black text-tiny">Get notified.</p>
                        </div>
                        <UI.Button
                            className="text-tiny"
                            color="primary"
                            radius="full"
                            size="sm"
                        >
                            Notify Me
                        </UI.Button>
                    </UI.CardFooter>
                </UI.Card>

                <UI.Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <UI.CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                            Supercharged
                        </p>
                        <h4 className="text-white font-medium text-large">
                            Creates beauty like a beast
                        </h4>
                    </UI.CardHeader>
                    <UI.Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="/assets/images/Abstract+Wallpapers+For+Desktop+2-355631041.jpeg"
                    />
                </UI.Card>

                <UI.Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <UI.CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                            Supercharged
                        </p>
                        <h4 className="text-white font-medium text-large">
                            Creates beauty like a beast
                        </h4>
                    </UI.CardHeader>
                    <UI.Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="/assets/images/0231de96df2e7e9a84da5f127381f750.jpg"
                    />
                </UI.Card>

                <UI.Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <UI.CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                            Supercharged
                        </p>
                        <h4 className="text-white font-medium text-large">
                            Creates beauty like a beast
                        </h4>
                    </UI.CardHeader>
                    <UI.Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="/assets/images/23774-12-4280744934.jpeg"
                    />
                </UI.Card>
            </div>

            <UI.Card className="w-full bg-transparent border-none" shadow="none">
                <UI.Button
                    className="w-40 py-4 mx-auto"
                    endContent={<ForwardIcon className="dark:fill-white/60" />}
                >
                    See more
                </UI.Button>
            </UI.Card>
        </div>
    );
}
