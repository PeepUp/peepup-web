"use client";

import * as UI from "@nextui-org/react";

import { useState } from "react";
import { SearchIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

export function SearchInput() {
    const [isOnSearch, setIsOnSearch] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const router = useRouter();

    function onSearchQuery(event: React.FormEvent) {
        event.preventDefault();
        const encodedSearchQuery = encodeURI(query);
        router.push("/search?q=" + encodedSearchQuery);
    }

    return (
        <form onSubmit={onSearchQuery}>
            <UI.Input
                aria-label="Search"
                lang="en"
                size="md"
                name="search"
                classNames={{
                    inputWrapper: "bg-default-50",
                    input: "text-sm font-semibold",
                }}
                endContent={
                    <UI.Kbd className="hidden lg:inline-block" keys={["command"]}>
                        + K
                    </UI.Kbd>
                }
                labelPlacement="outside"
                placeholder="Search..."
                color="default"
                startContent={
                    !isOnSearch ? (
                        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                    ) : null
                }
                onValueChange={setQuery}
                onInput={(e) => {
                    if ((e.target as HTMLInputElement).value !== "") {
                        setIsOnSearch(true);
                    } else {
                        setIsOnSearch(false);
                    }
                }}
                type="search"
            />
        </form>
    );
}
