"use client";

import * as UI from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { BackIcon } from "./icons";

type Props = {
    message?: string;
};

export function BackwardButton({ ...props }: Props) {
    const router = useRouter();

    return (
        <UI.Button
            onPress={() => router.back()}
            size="sm"
            color="secondary"
            variant="light"
            className="font-medium"
            startContent={<BackIcon size={14} />}
        >
            {props.message ?? "Back"}
        </UI.Button>
    );
}
