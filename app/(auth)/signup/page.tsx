"use client";
import * as React from "react";

import OTPVerification from "@/components/otp-verification";
import SignUp from "@/components/signup";

import { toast } from "sonner";
import { useAuthFormContext } from "@/context/store/auth-form-store";
import { SuccessVerifyCodeApproved } from "@/components/verification-succeed";

export default function Page() {
    const { data } = useAuthFormContext();

    React.useEffect(() => {
        if (data && data.signUpCompleted) {
            toast.success("Account created successfully!", {
                position: "top-center",
            });
            return;
        } else return;
    }, [data.signUpCompleted]);

    return data.signUpCompleted && data.verifyCodeApproved && data.verifyCodeRetrieved ? (
        <SuccessVerifyCodeApproved />
    ) : !data.signUpCompleted ? (
        <SignUp />
    ) : (
        <OTPVerification />
    );
}
