import { useGlobalContext } from "@/context/store/global";
import { decodeToken } from "@/lib/api/token/decode";
import { getTokenSession } from "@/lib/session/token";
import React from "react";

export function useDecodeToken() {
    const [decode, setDecode] = React.useState<Record<string, unknown> | null>();
    const { data, setData } = useGlobalContext();

    async function getDecode() {
        const accessToken = getTokenSession("_access") as string;
        const response = await decodeToken(accessToken);

        if (response.ok) {
            const json = await response.json();
            console.log(json);
            setData({ ...data, uid: json.id });
            setDecode(json);
        }
    }

    return { decode, getDecode };
}
