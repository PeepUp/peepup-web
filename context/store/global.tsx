"use client";

import * as React from "react";

import type { Identity } from "@/types/identities";
import { AuthToken } from "@/types/token";

export type GlobalDataStore = {
    identity: Identity;
    uid: string;
    accessToken: string;
    refreshToken: string;
    isAuthorized: boolean;
    isAuthenticated: boolean;
    authToken: AuthToken;
};

export interface GlobalDataContextProps {
    data: GlobalDataStore;
    setData: React.Dispatch<React.SetStateAction<GlobalDataStore>>;
}

const GlobalDataContext = React.createContext<GlobalDataContextProps>({
    data: {} as GlobalDataStore,
    setData: (): GlobalDataStore => ({}) as GlobalDataStore,
});

export function useGlobalContext() {
    return React.useContext(GlobalDataContext);
}

export function GlobalDataProvider(props: { children: React.ReactNode }) {
    const [data, setData] = React.useState<GlobalDataStore>({} as GlobalDataStore);

    return (
        <GlobalDataContext.Provider value={{ data, setData }}>
            {props.children}
        </GlobalDataContext.Provider>
    );
}
