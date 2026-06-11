import fs from "fs";
import { NextResponse } from "next/server";
import {
  installerDownloadName,
  resolveLauncherInstallerPath,
} from "@/lib/launcher-installer";

export const dynamic = "force-dynamic";

export async function GET() {
  const resolved = resolveLauncherInstallerPath();

  if (!resolved) {
    return NextResponse.json(
      {
        error:
          "Instalador no encontrado. Ejecuta npm run launcher:build o configura LAUNCHER_INSTALLER_PATH.",
      },
      { status: 404 }
    );
  }

  if (/^https?:\/\//i.test(resolved)) {
    return NextResponse.redirect(resolved, 302);
  }

  const stat = fs.statSync(resolved);
  const body = fs.readFileSync(resolved);
  const filename = installerDownloadName(resolved);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(stat.size),
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
