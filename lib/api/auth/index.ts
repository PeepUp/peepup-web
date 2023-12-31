import { join } from "path";

import { API_IDENTITY_ENDPOINT } from "@/lib/constant";

import type {
  SignInData,
  SignInDataPayload,
  SignInDataTraits,
  SignUpData,
  SignUpDataTraits,
} from "@/types/identities";
import { clearTokenSession } from "@/lib/session/token";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

export async function getCSRFToken(): Promise<Response> {
  const response = await fetch(
    new URL(join(API_IDENTITY_ENDPOINT, "tokens", "csrf")),
    {
      method: "get",
      mode: "cors",
      credentials: "include",
      cache: "reload",
    },
  );

  return response;
}

export async function submitLocalSignUpForm(
  fields: SignUpData,
): Promise<Response> {
  const response = await fetch(
    new URL(join(API_IDENTITY_ENDPOINT, "local", "registration")),
    {
      method: "post",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({
        traits: fields.traits satisfies SignUpDataTraits,
        password: fields.password,
        method: "password",
      } satisfies SignUpData),
    },
  );

  return response;
}

export async function checkEmailAvailability(email: string) {
  const response = await fetch(
    new URL(join(API_IDENTITY_ENDPOINT, "local", "verify", "email")),
    {
      method: "post",
      headers: headers,
      body: JSON.stringify({ email }),
    },
  );

  return response;
}

export async function submitLocalSignInForm(
  fields: SignInDataPayload,
): Promise<Response> {
  // get the type of the identifier from the traits object keys with value is not undefined
  const typeIdentifier = Object.keys(fields.traits).find(
    (key) => fields.traits[key as keyof SignInDataTraits] !== undefined,
  ) as keyof SignInDataTraits;

  const response = await fetch(
    new URL(join(API_IDENTITY_ENDPOINT, "local", "login")),
    {
      method: "post",
      headers: {
        ...headers,
        "x-csrf-token": fields.csrf as string,
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        traits: fields.traits satisfies SignInDataTraits,
        password: fields.password,
        method: fields.method ? fields.method : "password",
        password_identifier: typeIdentifier,
      } satisfies SignInData),
    },
  );

  return response;
}

export async function logout(token: string): Promise<Response> {
  const response = await fetch(
    new URL(join(API_IDENTITY_ENDPOINT, "local", "logout", "api")),
    {
      method: "delete",
      credentials: "include",
      headers: {
        authorization: `Bearer ${token}`,
      },
      mode: "cors",
    },
  );

  clearTokenSession(["_access", "_refresh"]);

  return response;
}
