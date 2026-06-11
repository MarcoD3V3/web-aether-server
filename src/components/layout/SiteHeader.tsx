"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  Download,
  Home,
  Loader2,
  LogIn,
  LogOut,
  Map,
  MessageCircle,
  Scroll,
  ShoppingBag,
  Swords,
  User,
} from "lucide-react";
import { mainNav, site } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { CopyIpBadge } from "./CopyIpBadge";

const iconMap = {
  home: Home,
  news: Scroll,
  store: ShoppingBag,
  community: MessageCircle,
  stats: BarChart3,
  items: BookOpen,
  classes: Swords,
  map: Map,
  launcher: Download,
} as const;

type SessionState =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "user"; username: string };

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<SessionState>({ status: "loading" });

  const loadSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session", { credentials: "include", cache: "no-store" });
      const data = (await res.json()) as { loggedIn?: boolean; username?: string };
      if (data.loggedIn && data.username) {
        setSession({ status: "user", username: data.username });
      } else {
        setSession({ status: "guest" });
      }
    } catch {
      setSession({ status: "guest" });
    }
  }, []);

  useEffect(() => {
    void loadSession();
  }, [loadSession, pathname]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setSession({ status: "guest" });
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#3d4a5c]/80 bg-[#0a0c12ee] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center gap-3 text-[#9eb4d4]">
          <a
            href={site.social.discord}
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-wider hover:text-white"
          >
            Discord
          </a>
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-wider hover:text-white"
          >
            YouTube
          </a>
        </div>
        <CopyIpBadge />
        {session.status === "loading" ? (
          <span className="flex items-center gap-2 text-xs text-[#6a7a94]">
            <Loader2 size={14} className="animate-spin" />
          </span>
        ) : session.status === "user" ? (
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-[#9eb4d4] sm:inline">@{session.username}</span>
            <button
              type="button"
              onClick={() => void logout()}
              className="aether-stone-btn flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold uppercase"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="aether-stone-btn flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold uppercase"
          >
            <User size={14} />
            Entrar
          </Link>
        )}
      </div>

      <nav className="border-t border-[#2a3144]/80 bg-[#12151fcc]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-1 px-2 py-2">
          {mainNav.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Home;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "aether-stone-btn flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide",
                  item.highlight && "aether-stone-btn--gold",
                  active && "ring-2 ring-[#5eb3ff]/60"
                )}
              >
                <Icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

export function SiteHeaderMinimal() {
  return (
    <header className="border-b border-[#2a3144] bg-[#0a0c12] px-4 py-3">
      <div className="mx-auto flex max-w-lg items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold text-[#f0c96a]">
          {site.name}
        </Link>
        <Link href="/login" className="flex items-center gap-1 text-sm text-[#9eb4d4] hover:text-white">
          <LogIn size={16} />
          Entrar
        </Link>
      </div>
    </header>
  );
}
