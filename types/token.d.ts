export type AccessToken = string;
export type RefreshToken = string;
export type CSRFToken = string;

export type AuthToken = Readonly<{
  csrf: CSRFToken;
}>;
