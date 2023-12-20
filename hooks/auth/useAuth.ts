"use client";

import { GlobalDataStore, useGlobalContext } from "@/context/store/global";
import { logout } from "@/lib/api/auth";
import { getMe } from "@/lib/api/identity/me";
import { clearTokenSession } from "@/lib/session/token";
import React from "react";

export function useAuth() {
    const { data, setData } = useGlobalContext();
    const [loading, setLoading] = React.useState(false);

    async function signout(access: string) {
        const response = await logout(access);

        if (response.ok && response.status === 204) {
            setData({} as GlobalDataStore);
            clearTokenSession(["_access", "_refresh"]);
            return;
        }
    }

    async function verifyAuth(access: string) {
        setLoading(true);
        const response = await getMe(access);

        if (!response.ok) {
            if (response.status === 401) {
                setData({} as GlobalDataStore);
                clearTokenSession(["_access", "_refresh"]);
            }

            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { data: json } = await response.json();

        setData({
            ...data,
            identity: {
                id: json.id,
                username: json.username,
                email: json.email,
                avatar: json.avatar,
                firstName: json.firstName,
                lastName: json.lastName,
                fullName: json.firstName + " " + json.lastName,
                roles: json.roles,
                state: json.state,
            },
            isAuthenticated: true,
        });
        setLoading(false);
        return;

        setLoading(false);
    }

    return { verifyAuth, loading, setLoading, signout };
}
