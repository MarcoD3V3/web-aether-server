import { NextResponse } from "next/server";
import { WEB_AUTH, authCookieBase } from "@/lib/auth-cookies";
import { getAdminApiUrl } from "@/lib/server-config";

export async function POST(request: Request) {
  let body: {
    username?: string;
    password?: string;
    deviceId?: string;
    fingerprint?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ success: false, error: "Petición inválida" }, { status: 400 });
  }

  const username = body.username?.trim();
  const password = body.password;
  const deviceId = body.deviceId?.trim();
  const fingerprint = body.fingerprint?.trim();

  if (!username || !password || !deviceId || !fingerprint) {
    return NextResponse.json({ success: false, error: "Datos incompletos" }, { status: 400 });
  }

  const adminUrl = getAdminApiUrl();
  let upstream: Response;
  try {
    upstream = await fetch(`${adminUrl}/api/launcher-auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, deviceId, fingerprint }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "No se pudo conectar al servidor de cuentas. ¿Está el admin en marcha?" },
      { status: 502 }
    );
  }

  const data = (await upstream.json()) as {
    success?: boolean;
    error?: string;
    sessionToken?: string;
    username?: string | null;
    tier?: string;
    premium?: boolean;
  };

  if (!upstream.ok || !data.success || !data.sessionToken) {
    return NextResponse.json(
      { success: false, error: data.error ?? "Usuario o contraseña incorrectos." },
      { status: upstream.status === 429 ? 429 : 401 }
    );
  }

  const cookieOpts = authCookieBase();
  const response = NextResponse.json({
    success: true,
    username: data.username ?? username,
    tier: data.tier ?? "free",
    premium: data.premium ?? false,
  });

  response.cookies.set(WEB_AUTH.session, data.sessionToken, cookieOpts);
  response.cookies.set(WEB_AUTH.deviceId, deviceId, cookieOpts);
  response.cookies.set(WEB_AUTH.fingerprint, fingerprint, cookieOpts);
  response.cookies.set(WEB_AUTH.username, data.username ?? username, {
    ...cookieOpts,
    httpOnly: false,
  });

  return response;
}
