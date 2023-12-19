"use client";

import * as UI from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function FrequentlyAskingQuestion() {
    return (
        <div
            className={cn([
                "flex flex-col my-12",
                "w-3/4 h-full",
                "justify-center items-center",
            ])}
        >
            <UI.Spacer y={20} />
            <UI.Accordion>
                {siteConfig.faqItems.map((faq, i) => (
                    <UI.AccordionItem
                        key={i}
                        aria-label={"Accordion " + faq.title}
                        title={faq.title}
                    >
                        {faq.content()}
                    </UI.AccordionItem>
                ))}
            </UI.Accordion>
            <UI.Spacer y={44} />
        </div>
    );
}
