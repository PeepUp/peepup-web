export interface SignUpDataPayload {
    traits: SignUpDataTraits;
    password: string;
    method?: "password" | "google" | "twitter" | "facebook";
}

export interface SignUpDataTraits {
    email?: string;
    username?: string;
    phone?: string;
}
