"use client";

import * as React from "react";
import * as UI from "@nextui-org/react";

import { AuthForm } from "@/components/auth-form";
import { useAuthFormContext } from "@/context/store";
import { OAuthProvidersSupported } from "@/config/oauth-providers-supported";

export default function Page() {
    const { data: dataAuthForm } = useAuthFormContext();

    React.useEffect(() => {
        if (dataAuthForm) {
            console.log(dataAuthForm);
        }
    }, [dataAuthForm]);

    return (
        <>
            <section className="flex flex-col items-center justify-start gap-4 py-8 md:py-10 h-full w-full overflow-x-hidden">
                {/* Title */}
                <div className="justify-self-start mt-12 text-xl">
                    <h2 className="max-md:text-center">Sign In with PeepUp account</h2>
                </div>

                {/* UI.Input Form */}
                <div className="w-1/2 max-md:w-full">
                    <AuthForm email phone_number username />
                </div>

                <div className="w-1/2 max-md:w-full">
                    <div className="mt-4 flex w-full justify-center">
                        <p className="text-center text-sm font-medium dark:text-[#7a7a7a]">
                            or you can use your social account
                        </p>
                    </div>
                </div>

                {/* OAuth Providers Supported */}
                <div className="w-1/2 max-md:w-full">
                    {OAuthProvidersSupported.length > 0
                        ? OAuthProvidersSupported.map((provider, i) => (
                              <div
                                  className="mt-4 flex w-full justify-center items-center"
                                  key={provider.name}
                              >
                                  <UI.Button
                                      type="button"
                                      fullWidth
                                      startContent={provider.icon}
                                      radius="sm"
                                      color="default"
                                  >
                                      <p className="justify-self-start max-w-min max-md:text-xs">
                                          {`Sign up with ${provider.name}`}
                                      </p>
                                  </UI.Button>
                              </div>
                          ))
                        : null}

                    <div className="mt-4 flex w-full justify-center">
                        <p className="text-center text-xs font-medium dark:text-[#7a7a7a]">
                            {"Already have an account? "}
                            <UI.Link
                                href={"/signin"}
                                as={UI.Link}
                                isExternal={false}
                                size="sm"
                                showAnchorIcon
                                color="secondary"
                                className="select-none ml-1 text-xs"
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                Sign in
                            </UI.Link>
                        </p>
                    </div>
                </div>
            </section>
            );
        </>
    );
}
