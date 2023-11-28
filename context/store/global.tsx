"use client";

import * as React from "react";

export type GlobalDataStore = {
    identity: {
        username: string;
        email: string;
        avatar: string;
        firstName: string;
        lastName: string;
        fullName: string;
        roles: string;
        state: string;
    };
    uid: string;
    accessToken: string;
    refreshToken: string;
    isAuthorized: boolean;
    isAuthenticated: boolean;
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
