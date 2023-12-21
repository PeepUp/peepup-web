import * as React from "react";
import * as UI from "@nextui-org/react";
import * as Icons from "@/components/icons";

import RandomIcon from "@/components/random-icon";

import { cn } from "@/lib/utils";
import { AuthForm } from "@/components/auth-form";
import { OAuthProvidersSupported } from "@/config/oauth-providers-supported";
import { Unimplemented } from "./modal-unimplemented";

export default function SignUp() {
  const { isOpen, onOpen, onOpenChange } = UI.useDisclosure();
  return (
    <section
      className={cn([
        "ctr",
        "gap-8 py-8",
        "max-md:py-18 ",
        "overflow-x-hidden",
      ])}
    >
      <div
        className="justify-self-center max-sm:hidden"
        onContextMenu={(e) => e.preventDefault()}
      >
        <RandomIcon
          icon={
            <Icons.JoyFigureDoodleIcon className="h-24 w-24 rotate-12 fill-none stroke-current opacity-50 dark:stroke-white/80" />
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
          <p className="text-center max-md:hidden">
            or you can use your social account
          </p>
          <p className="hidden text-center max-md:contents">
            or use your social account
          </p>
        </div>
      </div>

      <UI.Modal onOpenChange={onOpenChange} isOpen={isOpen} hideCloseButton>
        <Unimplemented />
      </UI.Modal>

      <div className="w-1/2 max-md:w-full">
        {OAuthProvidersSupported.length > 0
          ? OAuthProvidersSupported.map((provider) => (
              <div
                className="mt-2 flex w-full items-center justify-center"
                key={provider.name}
              >
                <UI.Button
                  type="button"
                  fullWidth
                  startContent={provider.icon}
                  radius="sm"
                  color="default"
                  onPress={onOpen}
                >
                  <p className="max-w-min justify-self-start max-md:text-xs">
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
      <UI.Spacer y={20} />
    </section>
  );
}
