import { FrequentlyAskingQuestion } from "@/components/faq";
import { cn } from "@/lib/utils";

export default function Page() {
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
                "h-full",
                "space-y-8",
            ])}
        >
            <header>
                <h1>Frequently Asking Question</h1>
            </header>
            <FrequentlyAskingQuestion />
        </section>
    );
}
