import { join } from "path";
import axios, { AxiosResponse } from "axios";

import type {
    SignInData,
    SignInDataPayload,
    SignInDataTraits,
    SignUpData,
    SignUpDataTraits,
} from "@/types/identities";

const url = process.env.NEXT_PUBLIC_IDENTITY_API_URL as string;
const headers = {
    "Content-Type": "application/json; charset=utf-8",
};

export async function submitLocalSignUpForm(fields: SignUpData): Promise<Response> {
    const response = await fetch(new URL(join(url, "local", "registration")), {
        method: "post",
        headers: headers,
        credentials: "include",
        body: JSON.stringify({
            traits: fields.traits satisfies SignUpDataTraits,
            password: fields.password,
            method: "password",
        } satisfies SignUpData),
    });

    return response;
}

export async function checkEmailAvailability(email: string) {
    const response = await fetch(new URL(join(url, "local", "verify", "email")), {
        method: "post",
        headers: headers,
        body: JSON.stringify({ email }),
    });

    return response;
}

export async function submitLocalSignInForm(
    fields: SignInDataPayload
): Promise<Response> {
    // get the type of the identifier from the traits object keys with value is not undefined
    const typeIdentifier = Object.keys(fields.traits).find(
        (key) => fields.traits[key as keyof SignInDataTraits] !== undefined
    ) as keyof SignInDataTraits;

    const response = await fetch(new URL(join(url, "local", "login")), {
        method: "post",
        headers: headers,
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({
            traits: fields.traits satisfies SignInDataTraits,
            password: fields.password,
            method: fields.method,
            password_identifier: typeIdentifier,
        } satisfies SignInData),
    });

    return response;
}
