import React from "react";

import { useGlobalContext } from "@/context/store/global";
import { getMe } from "@/lib/api/identity/me";
import { getTokenSession } from "@/lib/session/token";

export function useIdentity() {
    const [identity, setIdentity] = React.useState<Record<string, unknown> | null>(null);
    const { data, setData } = useGlobalContext();
    const access = getTokenSession("_access") as string;

    React.useEffect(() => {
        async function getIdentity() {
            const response = await getMe(access);

            if (response.ok) {
                const { data } = await response.json();
                setData({
                    ...data,
                    identity: {
                        email: data.email,
                        username: data.username,
                        traits: data.traits,
                    },
                });
                setIdentity(data);
            }
        }

        if (!identity && !data.identity) {
            getIdentity();
        }
    }, [identity]);

    return { identity };
}
