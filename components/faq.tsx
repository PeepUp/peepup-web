import React from "react";
import * as UI from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export default function FrequentlyQA() {
    return (
        <div
            className={cn([
                "flex flex-col my-12",
                "w-3/4 h-full",
                "justify-center items-center",
            ])}
        >
            <UI.Accordion>
                {siteConfig.faqItems.map((content, index) => (
                    <UI.AccordionItem
                        key={index}
                        aria-label={"Accordion " + content.title}
                        title={content.title}
                    >
                        {content.content}
                    </UI.AccordionItem>
                ))}
            </UI.Accordion>
            <UI.Spacer y={20} />
        </div>
    );
}
