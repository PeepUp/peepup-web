import { AccessToken, RefreshToken } from "./token";

export interface LoginResponseData {
    readonly access_token: AccessToken;
    readonly refresh_token: RefreshToken;
}

export interface RegisterResponseData {
    readonly status: string;
    readonly code: number;
    readonly codeStatus: number;
    readonly message: string;
}
