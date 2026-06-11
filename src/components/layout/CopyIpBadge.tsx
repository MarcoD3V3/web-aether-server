"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { site } from "@/lib/site-config";

export function CopyIpBadge() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.serverIp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="aether-parchment inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-bold text-[#2a241c] transition hover:brightness-110"
    >
      <span className="font-mono">{site.serverIp}</span>
      {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
    </button>
  );
}
