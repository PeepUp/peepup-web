import { useState, useEffect } from "react";

export type UseFetchArgs = {
    url: string | URL;
    config?: RequestInit;
};

export function useFetch<T = Response>(payload: UseFetchArgs) {
    const { config, url } = payload;
    const [data, setData] = useState<Awaited<T>>();
    const [error, setError] = useState<number>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData(): Promise<void> {
            const response = await fetch(url, config);

            if (!response.ok) {
                setLoading(false);
                setError(response.status);
                console.clear();
                return;
            }

            const json = await response.json();

            if (
                json &&
                json.data &&
                (Array.isArray(json.data) || Object.keys(json.data).length > 0)
            ) {
                setData(json.data);
                setLoading(false);
                return;
            }

            setData(json);
            setLoading(false);
        }

        fetchData();
    }, []);

    return { data, loading, error };
}
