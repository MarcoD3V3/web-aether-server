import { NextResponse } from "next/server";
import { readWebAuthCookies } from "@/lib/auth-cookies";
import { getAdminApiUrl } from "@/lib/server-config";

export async function GET() {
  const auth = await readWebAuthCookies();

  if (!auth.sessionToken || !auth.deviceId || !auth.fingerprint) {
    return NextResponse.json({ loggedIn: false });
  }

  const adminUrl = getAdminApiUrl();
  try {
    const res = await fetch(`${adminUrl}/api/launcher-auth/verify`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.sessionToken}`,
        "X-Device-Id": auth.deviceId,
        "X-Device-Fingerprint": auth.fingerprint,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = (await res.json()) as {
      valid?: boolean;
      username?: string;
      tier?: string;
      premium?: boolean;
    };

    if (!res.ok || !data.valid) {
      return NextResponse.json({ loggedIn: false });
    }

    return NextResponse.json({
      loggedIn: true,
      username: data.username ?? auth.username,
      tier: data.tier ?? "free",
      premium: data.premium ?? false,
    });
  } catch {
    return NextResponse.json({ loggedIn: false, error: "offline" });
  }
}
