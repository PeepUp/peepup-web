import { join } from "path";

import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";

export async function getAllArticles(): Promise<Response> {
    const response = await fetch(
        new URL(join(URL_ENDPOINT_ARTICLES, "posts", "articles", "preview")),
        {
            method: "get",
            headers: {
                Accept: "application/json",
            },
            mode: "cors",
        }
    );

    return response;
}
