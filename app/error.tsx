"use client";

import { cn } from "@/lib/utils";
import React from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    const [message, setMessage] = React.useState<string>();
    React.useEffect(() => {
        if (error) {
            if (error instanceof Error) {
                console.log(error.message);
                setMessage(error.message);
            }

            if (error.message === "500") {
                setMessage(
                    "We're sorry, but something went wrong on our end server. Our team is aware of the issue and is working to resolve it. Please try again later."
                );
            }

            return;
        }
    }, [error]);

    return (
        <div
            className={cn(
                "w-full",
                "h-full",
                "flex",
                "flex-col",
                "justify-center",
                "space-y-12"
            )}
        >
            <div className="self-center w-9/12">
                <h2 className="text-center">{message ?? "Something went wrong!"}</h2>
            </div>
            <div className="self-center">
                <button onClick={() => reset()}>Try again</button>
            </div>
        </div>
    );
}
