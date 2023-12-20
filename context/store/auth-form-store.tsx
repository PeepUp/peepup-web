"use client";

import * as React from "react";

import type { Identity, MethodOption } from "@/types/identities";
import { CSRFToken } from "@/types/token";

type DataAuthForm = Readonly<
    {
        csrf: CSRFToken;
        method: MethodOption;
        inputVerifyCode: string;
        signUpCompleted: boolean;
        verifyCodeApproved: boolean;
        verifyCodeRetrieved: boolean;
    } & Pick<Identity, "email">
>;

interface AuthFormContextProps {
    data: DataAuthForm;
    setData: React.Dispatch<React.SetStateAction<DataAuthForm>>;
}

const AuthFormContext = React.createContext<AuthFormContextProps>({
    data: {} as DataAuthForm,
    setData: (): DataAuthForm => ({}) as DataAuthForm,
});

export function useAuthFormContext() {
    return React.useContext(AuthFormContext);
}

export function AuthFormProvider(props: { children: React.ReactNode }) {
    const [data, setData] = React.useState<DataAuthForm>({} as DataAuthForm);

    return (
        <AuthFormContext.Provider value={{ data, setData }}>
            {props.children}
        </AuthFormContext.Provider>
    );
}
