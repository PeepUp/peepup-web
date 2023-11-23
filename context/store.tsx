"use client";
import * as React from "react";

type DataAuthForm = {
    email: string;
    signUpCompleted: boolean;
    verifyCodeRetrieved: boolean;
    verifyCodeApproved: boolean;
};

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