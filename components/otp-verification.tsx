"use client";

import * as React from "react";
import * as UI from "@nextui-org/react";
import * as Icons from "@/components/icons";

import LoadingSpinner from "@/components/spinner";

import { toast } from "sonner";
import { useAuthFormContext } from "@/context/store/auth-form-store";
import RandomIcon from "./random-icon";

export default function OTPVerification() {
    const [loading, setLoading] = React.useState(false);
    const { data, setData } = useAuthFormContext();
    const [inputVerifyCode, setInputVerifyCode] = React.useState("");

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

        await new Promise((resolve) => setTimeout(resolve, 4000));

        console.log("Submitting OTP...");

        toast.success("Account verified!", {
            position: "top-center",
            description: "Your account has been verified!",
        });

        setLoading(false);
        setInputVerifyCode("");
        setData({ ...data, verifyCodeApproved: true });
    }

    function SendVerificationButton() {
        return (
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
    }

    return (
        <section className="flex flex-col items-center justify-start h-full w-full overflow-x-hidden max-sm:pb-12 mt-40 max-md:mt-0">
            {/* Header */}
            {!data.verifyCodeApproved ? (
                <div>
                    <div className="flex flex-col items-center justify-self-start gap-2 mb-4">
                        <RandomIcon
                            duration={2500}
                            className="w-24 h-24 dark:stroke-white/80 dark:fill-transparent opacity-50 rotate-12"
                        />
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

            {data.signUpCompleted && data.verifyCodeRetrieved ? (
                <form
                    className="w-1/2 max-md:w-full flex flex-col gap-4 justify-center items-center mt-8"
                    onSubmit={handleSubmitOTPForm}
                >
                    <UI.Input
                        size="sm"
                        radius="sm"
                        variant="bordered"
                        isRequired
                        type="text"
                        placeholder="Enter your verification code"
                        className="max-w-xs text-center bg-transparent font-bold text-lg"
                        maxLength={6}
                        minLength={6}
                        value={inputVerifyCode}
                        onValueChange={setInputVerifyCode}
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
            ) : (
                <SendVerificationButton />
            )}
        </section>
    );
}
