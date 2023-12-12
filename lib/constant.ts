export const API_ENDPOINT = process.env.NEXT_PUBLIC_IDENTITY_API_URL as string;
export const API_IDENTITY_ENDPOINT = process.env.NEXT_PUBLIC_IDENTITY_API_URL as string;
export const URL_ENDPOINT_ARTICLES = process.env.NEXT_PUBLIC_ARTICLES_API_URL + "/api";

export const fetchinit: RequestInit = {
    headers: {
        Accept: "application/json",
    },
    mode: "cors",
};
