import fs from "fs";
import path from "path";

function repoRoot(): string {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, "packages", "launcher"))) return cwd;
  if (fs.existsSync(path.join(cwd, "..", "launcher"))) return path.join(cwd, "..");
  return cwd;
}

function findExeInDir(dir: string): string | null {
  if (!fs.existsSync(dir)) return null;
  const exe = fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".exe"))
    .sort((a, b) => b.localeCompare(a))[0];
  return exe ? path.join(dir, exe) : null;
}

/** Ruta local del instalador .exe (null si no existe). */
export function resolveLauncherInstallerPath(): string | null {
  const envPath = process.env.LAUNCHER_INSTALLER_PATH?.trim();
  if (envPath) {
    if (/^https?:\/\//i.test(envPath)) return envPath;
    if (fs.existsSync(envPath)) return path.resolve(envPath);
  }

  const root = repoRoot();
  const releaseOut = path.join(root, "packages", "launcher", "release-out");
  return findExeInDir(releaseOut);
}

export function installerDownloadName(filePath: string): string {
  const base = path.basename(filePath);
  return base.toLowerCase().endsWith(".exe") ? base : "CraftLauncher-Setup.exe";
}
