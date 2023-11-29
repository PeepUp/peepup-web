import React from "react";
import * as UI from "@nextui-org/react";
import { cn } from "@/lib/utils";

export default function FrequentlyQA() {
    const content1 =
        "Yes, while we encourage creativity and freedom of expression, there are certain content guidelines and community standards in place to ensure a safe and respectful environment for all users. These standards may vary by platform but commonly include restrictions on hate speech, explicit adult content, harassment, and anything that violates copyright or privacy laws. Always review and adhere to the platform's content policies to avoid potential issues or content removal.";
    const content2 =
        "Yes, while we encourage creativity and freedom of expression, there are certain content guidelines and community standards in place to ensure a safe and respectful environment for all users. These standards may vary by platform but commonly include restrictions on hate speech, explicit adult content, harassment, and anything that violates copyright or privacy laws. Always review and adhere to the platform's content policies to avoid potential issues or content removal.";
    const content3 =
        "Yes, while we encourage creativity and freedom of expression, there are certain content guidelines and community standards in place to ensure a safe and respectful environment for all users. These standards may vary by platform but commonly include restrictions on hate speech, explicit adult content, harassment, and anything that violates copyright or privacy laws. Always review and adhere to the platform's content policies to avoid potential issues or content removal.";
    const content4 =
        "Yes, while we encourage creativity and freedom of expression, there are certain content guidelines and community standards in place to ensure a safe and respectful environment for all users. These standards may vary by platform but commonly include restrictions on hate speech, explicit adult content, harassment, and anything that violates copyright or privacy laws. Always review and adhere to the platform's content policies to avoid potential issues or content removal.";
    const content5 =
        "Yes, while we encourage creativity and freedom of expression, there are certain content guidelines and community standards in place to ensure a safe and respectful environment for all users. These standards may vary by platform but commonly include restrictions on hate speech, explicit adult content, harassment, and anything that violates copyright or privacy laws. Always review and adhere to the platform's content policies to avoid potential issues or content removal.";

    return (
        <div
            className={cn([
                "flex flex-col my-12",
                "w-3/4 h-full",
                "justify-center items-center",
            ])}
        >
            <UI.Accordion
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            height: "auto",
                            transition: {
                                height: {
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                    duration: 1,
                                },
                                opacity: {
                                    easings: "ease",
                                    duration: 1,
                                },
                            },
                        },
                        exit: {
                            y: -10,
                            opacity: 0,
                            height: 0,
                            transition: {
                                height: {
                                    easings: "ease",
                                    duration: 0.25,
                                },
                                opacity: {
                                    easings: "ease",
                                    duration: 0.3,
                                },
                            },
                        },
                    },
                }}
            >
                <UI.AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="How do I start a blog using this app?"
                >
                    {content1}
                </UI.AccordionItem>
                <UI.AccordionItem
                    key="2"
                    aria-label="Accordion 2"
                    title="Can I save my favorite posts to read later?"
                >
                    {content2}
                </UI.AccordionItem>
                <UI.AccordionItem
                    key="3"
                    aria-label="Accordion 3"
                    title="What features does the app offer for content creation?"
                >
                    {content3}
                </UI.AccordionItem>
                <UI.AccordionItem
                    key="4"
                    aria-label="Accordion 4"
                    title="Are there any limitations on the type of content I can publish?"
                >
                    {content4}
                </UI.AccordionItem>
                <UI.AccordionItem
                    key="5"
                    aria-label="Accordion 5"
                    title="What's the process for becoming a featured blogger on this platform?"
                >
                    {content5}
                </UI.AccordionItem>
            </UI.Accordion>
        </div>
    );
}
