import { CSRFToken } from "./token";

export type PasswordIdentifier = "email" | "phone_number" | "username";
export type MethodOption = "password" | "google" | "twitter" | "facebook";

export type ID = string;
export type Password = string;

export type Identity = {
    readonly id: ID;
    readonly username: string;
    readonly email: string;
    readonly avatar: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly fullName: string;
    readonly roles: string;
    readonly state: string;
};

export interface SignUpData {
    traits: SignUpDataTraits;
    password: Readonly<Password>;
    method?: MethodOption;
    csrf?: Readonly<CSRFToken>;
}

export interface SignUpDataTraits {
    email?: string;
    phone_number?: string;
}

export interface SignInDataTraits extends SignUpDataTraits {
    username?: string;
}

export interface SignInDataPayload extends SignUpData {
    traits: SignInDataTraits;
}

export interface SignInData extends SignInDataPayload {
    password_identifier: PasswordIdentifier;
}

export interface AuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
    email?: boolean;
    username?: boolean;
    phone_number?: boolean;
    submitLabel?: string;
    type?: AuthFormFor;
    isValidatePassword?: boolean;
    method?: MethodOption;
}

export type AuthFormFor = "signin" | "signup";

export type AuthInputForm = {
    traitsValue: string;
    traitsType?: string;
    password: string;
};
