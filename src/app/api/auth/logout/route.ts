import { NextResponse } from "next/server";
import { WEB_AUTH } from "@/lib/auth-cookies";

export async function POST() {
  const response = NextResponse.json({ success: true });
  const expired = { path: "/", maxAge: 0 };

  for (const name of Object.values(WEB_AUTH)) {
    response.cookies.set(name, "", expired);
  }

  return response;
}
