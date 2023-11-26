import * as React from "react";
import * as UI from "@nextui-org/react";

import Link from "next/link";

import { useAuthFormContext } from "@/context/store/auth-form-store";

export function SuccessVerifyCodeApproved() {
    const { data } = useAuthFormContext();
    return (
        <section className="flex flex-col items-center justify-start h-full w-full overflow-x-hidden max-sm:pb-12 mt-40 max-md:mt-0">
            <div className="w-1/3 max-md:w-full flex flex-col gap-8 justify-center items-center mt-8 ">
                <div className="w-full flex justify-center items-center">
                    <h2 className="max-md:text-center text-2xl max-md:text-md">
                        Sign in with PeepUp account now
                    </h2>
                </div>
                <UI.Card
                    isFooterBlurred
                    radius="lg"
                    className="border-none w-full max-h-[400px] max-w-[600px]"
                    shadow="md"
                    draggable={false}
                >
                    <UI.Image
                        alt="Woman listing to music"
                        draggable={false}
                        className="object-cover w-full bg-center"
                        src="/assets/images/orang-profile-my.jpg"
                    />
                    <UI.CardFooter className="px-2 justify-evenly before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="max-md:text-center text-md text-white/50 font-semibold">
                            Sign in as
                        </p>
                        <UI.Button
                            as={Link}
                            variant="flat"
                            color="default"
                            href="/signin"
                            className="bg-black/60 font-semibold text-md text-white/50"
                        >
                            {data.email.split("@")[0]}
                        </UI.Button>
                    </UI.CardFooter>
                </UI.Card>
            </div>
        </section>
    );
}
