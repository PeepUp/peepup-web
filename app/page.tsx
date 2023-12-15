"use client";

import * as UI from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { FrequentlyAskingQuestion } from "@/components/faq";
import { BlogOverviewCover } from "@/components/article/preview/trending";

export default function Home() {
    return (
        <section className={cn(["h-max w-full"])}>
            <div
                className={cn([
                    "flex flex-col gap-0",
                    "min-h-full h-full w-full my-auto",
                    "justify-center items-center",
                ])}
            >
                <UI.Spacer y={40} className="max-sm:hidden" />
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
                        loading="eager"
                        className={cn([
                            "flex-none object-cover",
                            "rounded-[100%]",
                            "-rotate-45",
                            "max-sm:-rotate-[240deg]",
                            "max-sm:max-w-[220px]",
                        ])}
                        isZoomed
                        isBlurred
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
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
                                "tracking-wide",
                                "font-medium",
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
                                "font-medium",
                                "text-center",
                                "text-sm",
                                "mt-16",
                                "tracking-wide",
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
                            "rounded-[100%]",
                            "rotate-[45deg]",
                            "max-sm:rotate-[420deg]",
                            "max-sm:-mt-6",
                            "max-sm:max-w-[220px]",
                        ])}
                        src="https://app.requestly.io/delay/1000/http://localhost:3000/assets/images/right-bg-peepup-home.png"
                        alt="PeepUp"
                        isZoomed
                        isBlurred
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        loading="eager"
                    />
                </div>
                <UI.Spacer y={40} className="max-sm:hidden" />
            </div>

            <div
                className={cn([
                    "flex flex-col",
                    "w-full h-full",
                    "justify-start items-center",
                ])}
            >
                <BlogOverviewCover />
                <UI.Spacer y={40} className="max-sm:hidden" />
                <FrequentlyAskingQuestion />
                <UI.Spacer y={40} className="max-sm:hidden" />
            </div>
        </section>
    );
}
