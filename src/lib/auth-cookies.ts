import { cookies } from "next/headers";

export const WEB_AUTH = {
  session: "cl_web_session",
  deviceId: "cl_web_device",
  fingerprint: "cl_web_fp",
  username: "cl_web_user",
} as const;

const MAX_AGE = 90 * 24 * 3600;

export function authCookieBase() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE,
  };
}

export async function readWebAuthCookies() {
  const jar = await cookies();
  return {
    sessionToken: jar.get(WEB_AUTH.session)?.value ?? null,
    deviceId: jar.get(WEB_AUTH.deviceId)?.value ?? null,
    fingerprint: jar.get(WEB_AUTH.fingerprint)?.value ?? null,
    username: jar.get(WEB_AUTH.username)?.value ?? null,
  };
}

export function clearAuthCookieHeaders(): [string, string][] {
  const expired = `${authCookieBase().path}; Max-Age=0`;
  return Object.values(WEB_AUTH).map((name) => [
    "Set-Cookie",
    `${name}=; Path=${expired}; HttpOnly; SameSite=Lax`,
  ]);
}
