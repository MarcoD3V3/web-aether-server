import Link from "next/link";
import { site } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#2a3144] bg-[#0a0c12] px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold text-[#f0c96a]">{site.name}</p>
          <p className="mt-2 text-sm text-[#9eb4d4]">{site.tagline}</p>
        </div>
        <div className="text-sm text-[#9eb4d4]">
          <p className="font-bold text-[#e8dcc8]">Servidor</p>
          <p className="mt-1 font-mono">{site.serverIp}</p>
          <p className="mt-3 font-bold text-[#e8dcc8]">Launcher</p>
          <Link href="/launcher" className="hover:text-[#3ecf8e]">
            Descargar {site.launcherName}
          </Link>
        </div>
        <div className="text-sm text-[#9eb4d4]">
          <p className="font-bold text-[#e8dcc8]">Legal</p>
          <p className="mt-1">No afiliado a Mojang AB.</p>
          <p className="mt-1">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
