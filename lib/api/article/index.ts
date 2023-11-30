import { join } from "path";
const URL_ENDPOINT_ARTICLES = "http://127.0.0.1:8000/api/admin";

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
