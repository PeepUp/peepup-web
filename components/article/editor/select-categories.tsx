import * as UI from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { CategoryGroupCheckbox } from "../category/category-group-checkbox";

export function SelectCategories() {
    return (
        <div
            className={cn([
                "container",
                "h-max",
                "mx-auto",
                "max-w-3xl",
                "self-start",
                "px-4",
                "flex",
                "flex-col",
            ])}
        >
            <CategoryGroupCheckbox />
            <UI.Spacer y={2} />
        </div>
    );
}
