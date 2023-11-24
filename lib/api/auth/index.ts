import { SignUpDataPayload } from "@/types/identities";

const API_URL = "http://127.0.0.1:4334";

export async function submitSignUpForm(fields: SignUpDataPayload): Promise<Response> {
    console.log({ fields });
    const response = await fetch(new URL(`${API_URL}/local/registration`), {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            traits: {
                email: fields.traits.email || "",
                phone_number: fields.traits.phone || null,
            },
            password: fields.password,
            method: "password",
        }),
    });

    return response;
}

export async function checkEmailAvailability(email: string) {
    const response = await fetch(new URL(`${API_URL}/local/verify/email`), {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ email }),
    });

    return response;
}
