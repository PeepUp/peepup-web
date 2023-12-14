import * as UI from "@nextui-org/react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ForwardIcon } from "@/components/icons";

export function BlogOverviewCover() {
    const SmallCardPost = () => {
        return (
            <UI.Card className="col-span-12 sm:col-span-4 h-[300px]">
                <UI.CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                        What to read
                    </p>
                    <h4 className="text-white font-medium text-large">
                        Stream the Acme event
                    </h4>
                </UI.CardHeader>
                <UI.Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover hover:grayscale-0 grayscale-[80%]"
                    src="https://nextui.org/images/card-example-4.jpeg"
                />
            </UI.Card>
        );
    };

    const MediumCardPost = () => {
        return (
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
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover hover:grayscale-0 grayscale-[80%]"
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
        );
    };

    const ExtraLargeCardPost = () => {
        return (
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
                    className="z-0 w-full h-full object-cover hover:grayscale-0 grayscale-[80%]"
                    src="https://nextui.org/images/card-example-5.jpeg"
                />
                <UI.CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <UI.Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black hover:grayscale-0 grayscale-[80%]"
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
        );
    };

    return (
        <div
            className={cn([
                "flex flex-col my-12",
                "w-full h-full",
                "justify-start items-center",
            ])}
        >
            <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 my-12">
                {new Array(3).fill(0).map((_, i) => (
                    <SmallCardPost key={i} />
                ))}

                <MediumCardPost />
                <ExtraLargeCardPost />
                <ExtraLargeCardPost />
                <MediumCardPost />

                {new Array(3).fill(0).map((_, i) => (
                    <SmallCardPost key={i} />
                ))}
            </div>

            <UI.Card className="w-full bg-transparent border-none" shadow="none">
                <UI.Button
                    className="w-40 py-4 mx-auto font-medium"
                    endContent={<ForwardIcon className="dark:fill-white/60" />}
                    as={Link}
                    href="/explore"
                >
                    See more
                </UI.Button>
            </UI.Card>
        </div>
    );
}
