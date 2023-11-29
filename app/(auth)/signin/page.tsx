"use client";

import * as React from "react";
import * as UI from "@nextui-org/react";
import * as Icons from "@/components/icons";

import { AuthForm } from "@/components/auth-form";
import { OAuthProvidersSupported } from "@/config/oauth-providers-supported";
import { cn } from "@/lib/utils";
import RandomIcon from "@/components/random-icon";

export default function Page() {
    return (
        <section
            className={cn(["ctr", "gap-8 py-8", "max-md:py-18 ", "overflow-x-hidden"])}
        >
            <div
                className="justify-self-center max-sm:hidden"
                onContextMenu={(e) => e.preventDefault()}
            >
                <RandomIcon
                    icon={
                        <Icons.JoyFigureDoodleIcon className="w-24 h-24 dark:stroke-white/80 dark:fill-transparent opacity-50 rotate-12" />
                    }
                    duration={10000}
                />
            </div>

            <div className="justify-self-start">
                <h1>Sign in with PeepUp account</h1>
            </div>

            <div className="w-1/2 max-md:w-full">
                <AuthForm
                    email
                    username
                    phone_number
                    submitLabel="Sign in"
                    type="signin"
                    isValidatePassword={false}
                />
            </div>

            <div className="w-1/2 max-md:w-full">
                <div className="flex w-full justify-center">
                    <p className="max-md:hidden text-center">
                        or you can use your social account
                    </p>
                    <p className="hidden max-md:contents text-center">
                        or use your social account
                    </p>
                </div>
            </div>

            <div className="w-1/2 max-md:w-full">
                {OAuthProvidersSupported.length > 0
                    ? OAuthProvidersSupported.map((provider) => (
                          <div className="w-full mt-2" key={provider.name}>
                              <UI.Button
                                  type="button"
                                  fullWidth
                                  startContent={provider.icon}
                                  radius="sm"
                                  color="default"
                                  className="justify-start gap-4 w-full"
                              >
                                  <div className="flex w-full justify-start">
                                      <p className="w-min max-md:text-xs">
                                          {`Sign in with ${provider.name}`}
                                      </p>
                                  </div>
                                  <Icons.ForwardIcon className="max-sm:hidden dark:fill-current" />
                              </UI.Button>
                          </div>
                      ))
                    : null}

                <div className="mt-4 flex w-full justify-center">
                    <p className="text-center">
                        {"Don't have an account? "}
                        <UI.Link
                            href={"/signup"}
                            as={UI.Link}
                            isExternal={false}
                            size="sm"
                            showAnchorIcon
                            color="secondary"
                            className={cn(["__link", "ml-1"])}
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            Sign up
                        </UI.Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
