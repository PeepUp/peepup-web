import Link from "next/link";
import * as UI from "@nextui-org/react";
import { siteConfig } from "@/config/site";

export function Footer() {
    return (
        <footer className="w-full flex flex-col items-start justify-center">
            <UI.Divider />
            <UI.Spacer y={8} className="max-sm:m-0" />
            <div className="flex max-md:flex-col justify-around items-center w-5/6">
                <div className="space-x-4 max-sm:contents hidden">
                    <Link
                        className="flex justify-start items-center gap-1"
                        href="/"
                        replace
                    >
                        <p className="font-randrake font-medium text-4xl select-none max-sm:text-2xl">
                            PeepUp
                        </p>
                    </Link>
                </div>

                <div className="w-full flex justify-center items-center">
                    <p className="text-md font-medium max-md:text-xs max-sm:text-center max-sm:mx-12">
                        © 2023 PeepUp &mdash;{" "}
                        <span className="text-md font-medium max-md:text-xs">
                            All rights reserved.
                        </span>
                    </p>
                </div>

                <div className="flex space-x-4 max-sm:hidden">
                    <Link
                        className="flex justify-start items-center gap-1"
                        href="/"
                        replace
                    >
                        <p className="font-randrake font-medium text-4xl select-none">
                            PeepUp
                        </p>
                    </Link>
                </div>

                <div className="flex space-x-4 max-sm:flex-col justify-center items-center mt-2 w-full max-sm:w-1/2 max-sm:space-x-0">
                    <UI.Link
                        as={Link}
                        href={siteConfig.links.privacyPolicy}
                        rel="noopener noreferrer"
                        target="_blank"
                        color="foreground"
                        size="sm"
                        className="w-full max-md:text-xs text-md max-sm:text-center flex justify-center items-center"
                    >
                        Privacy Policy
                    </UI.Link>
                    <UI.Link
                        as={Link}
                        href={siteConfig.links.termsOfService}
                        rel="noopener noreferrer"
                        target="_blank"
                        color="foreground"
                        size="sm"
                        className="w-full max-md:text-xs text-md max-sm:text-center flex justify-center items-center"
                    >
                        Terms of Service
                    </UI.Link>
                </div>
            </div>
            <UI.Spacer y={8} />
        </footer>
    );
}
