"use client";

import * as React from "react";
import * as Icons from "@/components/icons";
import * as UI from "@nextui-org/react";

import Link from "next/link";
import LoadingSpinner from "@/components/spinner";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AuthForm } from "@/components/auth-form";
import { useAuthFormContext } from "@/context/store";
import { OAuthProvidersSupported } from "@/config/oauth-providers-supported";

export default function Page() {
    const { data } = useAuthFormContext();

    React.useEffect(() => {
        if (data.signUpCompleted) {
            toast.success("Account created successfully!", { position: "top-center" });
        }
    }, [data?.signUpCompleted]);

    return !data.signUpCompleted ? SignUp() : OTPVerification();
}

function SignUp() {
    return (
        <section className={cn(["ctr", "gap-8 py-8 max-md:py-18 overflow-x-hidden"])}>
            <div className="justify-self-start">
                <h1>Sign up with PeepUp account</h1>
            </div>

            <div className="w-1/2 max-md:w-full">
                <AuthForm email phone_number />
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
                    ? OAuthProvidersSupported.map((provider, i) => (
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

function OTPVerification() {
    const [inputOTP, setInputOTP] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { data, setData } = useAuthFormContext();

    async function handleSendVerification(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Sending verification...");
        setData({ ...data, verifyCodeRetrieved: true });
        toast.success("Verification code sent!", {
            position: "top-center",
            description: "Please check your email for the verification code!",
        });
        setLoading(false);
    }

    async function handleSubmitOTPForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Submitting OTP...");
        toast.success("Account verified!", {
            position: "top-center",
            description: "Your account has been verified!",
        });

        setLoading(false);
        setInputOTP("");
        setData({ ...data, verifyCodeApproved: true });
    }

    function FormVerifyCode() {
        return (
            <form
                className="w-1/2 max-md:w-full flex flex-col gap-4 justify-center items-center mt-8"
                onSubmit={handleSubmitOTPForm}
            >
                <UI.Input
                    size="sm"
                    radius="sm"
                    variant="bordered"
                    name="otp_code"
                    isRequired
                    type="text"
                    placeholder="Enter your verification code"
                    className="max-w-xs text-center bg-transparent font-bold text-lg"
                    minLength={6}
                    maxLength={6}
                    value={inputOTP}
                    onValueChange={setInputOTP}
                />

                <UI.Button
                    size="md"
                    radius="sm"
                    className="max-w-xs"
                    fullWidth
                    disabled={loading}
                    type="submit"
                >
                    {loading ? (
                        <LoadingSpinner
                            size="sm"
                            color="current"
                            className="flex justify-between items-center"
                        />
                    ) : (
                        "Submit"
                    )}
                </UI.Button>
            </form>
        );
    }

    const SendVerificationButton = () => (
        <div className="w-1/2 max-md:w-full flex flex-col gap-4 justify-center items-center mt-8">
            <UI.Button
                size="md"
                radius="sm"
                className="text-sm font-medium max-w-sm"
                disabled={loading}
                fullWidth
                onClick={handleSendVerification}
                onKeyUp={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        handleSendVerification(e);
                    }
                }}
            >
                {loading ? (
                    <LoadingSpinner
                        size="sm"
                        color="current"
                        className="flex justify-between items-center"
                    />
                ) : (
                    "Send verification"
                )}
            </UI.Button>
        </div>
    );

    const VerifyCodeApproved = () => (
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
    );

    return (
        <section className="flex flex-col items-center justify-start h-full w-full overflow-x-hidden max-sm:pb-12 mt-40 max-md:mt-0">
            {/* Header */}
            {!data.verifyCodeApproved ? (
                <div>
                    <div className="flex flex-col items-center justify-self-start gap-2">
                        <Icons.VerificationIdentityIcon size={128} />
                    </div>

                    <div className="flex flex-col items-center justify-self-start gap-2">
                        <h2 className="max-md:text-center text-2xl">
                            Verify your account
                        </h2>
                        <p className="max-md:text-center text-sm">
                            {!data.verifyCodeRetrieved
                                ? "Send verification to your email address"
                                : "Please check your email for the verification code"}
                        </p>
                    </div>
                </div>
            ) : null}

            {!data.verifyCodeRetrieved ? (
                <SendVerificationButton />
            ) : data.verifyCodeRetrieved && !data.verifyCodeApproved ? (
                <FormVerifyCode />
            ) : (
                <VerifyCodeApproved />
            )}
        </section>
    );
}

/* const inputStyles = {
    label: "dark:text-[#7A7A7A] text-sm",
    input: [
        "bg-transparent",
        "font-medium",
        "placeholder:text-sm",
        "dark:placeholder:text-[#7A7A7A]",
        "dark:text-[#7A7A7A]",
    ],
    base: ["dark:text-[#7A7A7A]", "text-sm"],
    innerWrapper: "",
    inputWrapper: [
        "text-sm",
        "font-medium",
        "dark:bg-[#202020]",
        "backdrop-blur-none",
        "backdrop-saturate-0",
        "focus-within:border-2",
        "focus-within:border-[#303030]",
        "dark:hover:bg-[#212121]",
        "dark:focus-within:!bg-[#202020]",
        "!cursor-text",
    ],
}; */

/* export type OTPInputProps = {
    id: string;
    previous: string;
    next: string;
    value: string;
    onValueChange: (inputId: string, v: string) => void;
};

function OTPInput(props: OTPInputProps) {
    console.log({ props });
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if (e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft") {
            const previous = document.querySelector(
                `input[name="${props.previous}"]`
            ) as HTMLInputElement;
            console.log({ previous });

            if (previous) {
                previous.focus();
            }
        } else if (
            //check if key is numeric keys 0 to 9
            e.key === "ArrowRight" ||
            (e.keyCode >= 48 && e.keyCode <= 57) ||
            (e.keyCode >= 96 && e.keyCode <= 105)
        ) {
            const next = document.querySelector(
                `input[name="${props.next}"]`
            ) as HTMLInputElement;
            console.log({ next });

            if (next) {
                next.focus();
                next.select();
                next.autofocus = true;
            } else {
                console.log("submit");
            }
        }
    };

    return (
        <UI.Input
            name={props.id}
            autoFocus={props.id === "otp-0"}
            key={props.id}
            maxLength={1}
            type="text"
            size="sm"
            color="default"
            className={cn(["max-w-[40px]", "m-2", "font-bold", "text-lg"])}
            onKeyUp={handleKeyUp}
            onValueChange={(value) => {
                props.onValueChange(props.id, value);
            }}
        />
    );
} */
