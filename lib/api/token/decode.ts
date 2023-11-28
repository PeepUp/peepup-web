import { API_ENDPOINT } from "@/lib/constant";

export async function decodeToken(token: string): Promise<Response> {
    const url = `${API_ENDPOINT}/tokens/decode?token=${token}`;

    const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        mode: "cors",
    });

    return response;
}
