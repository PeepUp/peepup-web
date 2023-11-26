export type PasswordIdentifier = "email" | "phone_number" | "username";
export type MethodOption = "password" | "google" | "twitter" | "facebook";

export interface SignUpData {
    traits: SignUpDataTraits;
    password: string;
    method?: MethodOption;
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
