import * as React from "react";
import * as UI from "@nextui-org/react";
import * as Icons from "@/components/icons";

import RandomIcon from "@/components/random-icon";

import { cn } from "@/lib/utils";
import { AuthForm } from "@/components/auth-form";
import { OAuthProvidersSupported } from "@/config/oauth-providers-supported";

export default function SignUp() {
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
                        <Icons.JoyFigureDoodleIcon className="w-24 h-24 dark:stroke-white/80 stroke-current fill-none opacity-50 rotate-12" />
                    }
                    duration={10000}
                />
            </div>

            <div className="justify-self-start">
                <h1>Sign up with PeepUp account</h1>
            </div>

            <div className="w-1/2 max-md:w-full">
                <AuthForm
                    email
                    phone_number
                    submitLabel="Sign up"
                    type="signup"
                    isValidatePassword
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
                          <div
                              className="flex w-full justify-center items-center mt-2"
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
                    <p className="text-center">
                        {"Already have an account? "}
                        <UI.Link
                            href={"/signin"}
                            as={UI.Link}
                            isExternal={false}
                            size="sm"
                            showAnchorIcon
                            color="secondary"
                            className={cn(["__link", "ml-1"])}
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            Sign in
                        </UI.Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
