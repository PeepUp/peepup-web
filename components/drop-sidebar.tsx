"use client";

import * as UI from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function DropDownSideComponent() {
    return (
        <>
            <UI.Dropdown>
                <UI.DropdownTrigger>
                    <UI.Button variant="bordered">Open Menu</UI.Button>
                </UI.DropdownTrigger>
                <UI.DropdownMenu
                    aria-label="Static Actions"
                    items={siteConfig.navItemsProfile}
                >
                    {(item) => (
                        <UI.DropdownItem
                            key={item.key}
                            color={item.key === "delete" ? "danger" : "default"}
                            className={item.key === "delete" ? "text-danger" : ""}
                        >
                            <UI.Link
                                as={Link}
                                href={item.href}
                                referrerPolicy="no-referrer"
                                color="secondary"
                            >
                                {item.label}
                            </UI.Link>
                        </UI.DropdownItem>
                    )}
                </UI.DropdownMenu>
            </UI.Dropdown>
        </>
    );
}
