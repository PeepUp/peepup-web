"use client";

import { BackwardButton } from "@/components/backward-button";
import { BackIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import * as UI from "@nextui-org/react";
import { useRouter } from "next/navigation";

const text = cn(["text-center", "mt-1", "mb-2", "text-xl", "font-mono", "font-medium"]);
const header = cn(["text-center", "mt-5", "mb-2", "text-8xl", "font-mono", "font-bold"]);

export default function NotFound() {
    const router = useRouter();
    return (
        <div className={cn("w-full", "h-full", "flex", "flex-col", "justify-center")}>
            <UI.Spacer y={20} />
            <div>
                <h2 className={header}>404</h2>
                <div className="flex justify-center">
                    <h2 className={text}>Could not find the resource!</h2>
                </div>
            </div>
            <div className="flex justify-center m-4">
                <BackwardButton />
            </div>
            <UI.Spacer y={20} />
        </div>
    );
}
