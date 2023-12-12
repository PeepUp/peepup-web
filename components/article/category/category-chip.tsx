import * as UI from "@nextui-org/react";

import type { Category } from "../list-post";

export type Props = Category & {
    size?: "sm" | "md" | "lg";
    radius?: "sm" | "md" | "lg";
};

export function CategoryChip({ id, label, ...opt }: Props) {
    const path = `/posts/category/${label}`;

    return (
        <UI.Link key={id} href={path}>
            <UI.Chip
                size={opt.size ?? "sm"}
                radius={opt.radius ?? "sm"}
                className="dark:bg-sky-50/10 min-w-[54px] text-center font-bold"
                variant="flat"
            >
                # {label}
            </UI.Chip>
        </UI.Link>
    );
}
