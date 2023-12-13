import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";

export async function getArticles(): Promise<Response> {
    const response = await fetch(URL_ENDPOINT_ARTICLES, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
    });

    return response;
}
