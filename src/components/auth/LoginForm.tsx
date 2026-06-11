"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Loader2 } from "lucide-react";
import { RpgButton } from "@/components/layout/RpgButton";
import { SecurePasswordField } from "@/components/auth/SecurePasswordField";
import { getWebDeviceCredentials } from "@/lib/device-auth";
import { site } from "@/lib/site-config";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { deviceId, fingerprint } = await getWebDeviceCredentials();
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: username.trim(),
          password,
          deviceId,
          fingerprint,
        }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        setError(data.error ?? "No se pudo iniciar sesión.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Error de red. Comprueba tu conexión e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="aether-panel-frame mx-auto max-w-md rounded-xl p-8">
      <h1 className="font-display text-center text-2xl font-bold text-[#f0c96a]">Iniciar sesión</h1>
      <p className="mt-2 text-center text-sm text-[#9eb4d4]">
        Usa la cuenta que te creó un admin en el panel de {site.launcherName}.
      </p>

      <label className="mt-6 block text-sm font-semibold text-[#c8d8ec]">
        Usuario
        <input
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 w-full rounded-md border-2 border-[#4a3f2a] bg-[#1a1610] px-3 py-2.5 text-[#e8dcc8] outline-none focus:border-[#d4a84b]"
          placeholder="tu_usuario"
        />
      </label>

      <SecurePasswordField
        label="Contraseña"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
        className="mt-4"
      />

      {error && (
        <p className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="mt-6">
        <RpgButton type="submit" variant="emerald" className="w-full" disabled={loading}>
          {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
          {loading ? "Entrando…" : "Entrar"}
        </RpgButton>
      </div>

      <p className="mt-6 text-center text-xs text-[#6a7a94]">
        ¿No tienes cuenta? Pide acceso a un administrador del servidor.
      </p>
    </form>
  );
}
