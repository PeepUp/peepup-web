import { SignUpDataPayload } from "@/types/identities";

export async function submitSignUpForm(fields: SignUpDataPayload) {
    const response = await fetch("http://127.0.0.1:4334/local/registration", {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            traits: {
                email: fields.traits.email || "",
                phone_number: fields.traits.phone || "",
            },
            password: fields.password,
            method: "password",
        }),
    });
    return await response.json();
}
