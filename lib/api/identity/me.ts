import { API_ENDPOINT } from "@/lib/constant";
import { getTokenSession } from "@/lib/session/token";
import { join } from "path";

export type IdentityFetchArgs = {
    token: string;
};

export async function getMe(access: string): Promise<Response> {
    const url = new URL(join(API_ENDPOINT, "identities", "me"));

    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
            authorization: "Bearer " + access,
        },
    });

    return response;
}
