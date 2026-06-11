import { Download, Play, Sparkles } from "lucide-react";
import { ContentSection } from "@/components/layout/ContentSection";
import { CopyIpBadge } from "@/components/layout/CopyIpBadge";
import { RpgButton } from "@/components/layout/RpgButton";
import { newsPosts, playerClasses } from "@/lib/mock-data";
import { site } from "@/lib/site-config";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0 aether-sky-bg" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, #3ecf8e44 0%, transparent 40%), radial-gradient(circle at 80% 60%, #f0c96a33 0%, transparent 35%)",
          }}
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center">
          <p className="font-fantasy text-lg text-[#3ecf8e]">Bienvenido aventurero</p>
          <h1 className="font-display mt-2 text-5xl font-extrabold tracking-wider text-[#f0c96a] drop-shadow-[0_4px_12px_#0008] md:text-7xl">
            {site.name.toUpperCase()}
          </h1>
          <p className="mt-4 max-w-xl text-xl text-[#d8e8f8]">{site.tagline}</p>
          <p className="mt-6 flex items-center gap-2 text-sm text-[#9eb4d4]">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#3ecf8e]" />
            128 jugadores en línea · Java 1.20+
          </p>
          <div className="mt-6">
            <CopyIpBadge />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <RpgButton href="/launcher" variant="emerald">
              <Download size={18} />
              Descargar launcher
            </RpgButton>
            <RpgButton href="/clases" variant="gold">
              <Sparkles size={18} />
              Elige tu clase
            </RpgButton>
          </div>
          <p className="mt-8 max-w-md text-xs text-[#7a8fa8]">
            «Un mundo persistente con dungeons, guilds y economía real» — Comunidad Aetherfall
          </p>
        </div>
      </section>

      <ContentSection title="Últimas noticias">
        <div className="grid gap-6 md:grid-cols-3">
          {newsPosts.map((post) => (
            <article key={post.id} className="aether-panel-frame rounded-lg p-5">
              <span className="text-xs font-bold uppercase text-[#3ecf8e]">{post.tag}</span>
              <h3 className="font-display mt-2 text-lg font-bold text-[#f0c96a]">{post.title}</h3>
              <p className="mt-2 text-sm text-[#9eb4d4]">{post.excerpt}</p>
              <p className="mt-3 text-xs text-[#6a7a94]">{post.date}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <RpgButton href="/noticias">Ver todas las noticias</RpgButton>
        </div>
      </ContentSection>

      <ContentSection title="Clases" className="bg-[#0d1018]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {playerClasses.map((cls) => (
            <Link
              key={cls.id}
              href="/clases"
              className="aether-panel-frame group rounded-lg p-5 transition hover:scale-[1.02]"
            >
              <div
                className="mx-auto mb-3 h-14 w-14 rounded-full border-2 border-[#5c4d32]"
                style={{ background: `linear-gradient(135deg, ${cls.color}88, ${cls.color}22)` }}
              />
              <h3 className="font-display text-center text-lg font-bold" style={{ color: cls.color }}>
                {cls.name}
              </h3>
              <p className="text-center text-xs text-[#9eb4d4]">{cls.role}</p>
            </Link>
          ))}
        </div>
      </ContentSection>

      <section className="border-y border-[#2a3144] bg-gradient-to-r from-[#1a3a5c] to-[#1e3d28] px-4 py-16 text-center">
        <Play className="mx-auto text-[#3ecf8e]" size={40} />
        <h2 className="font-display mt-4 text-3xl font-bold text-white">¿Listo para jugar?</h2>
        <p className="mx-auto mt-2 max-w-lg text-[#c8d8ec]">
          Instala {site.launcherName}, crea tu cuenta en el panel y únete con{" "}
          <span className="font-mono text-[#f0c96a]">{site.serverIp}</span>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <RpgButton href="/launcher" variant="emerald">
            Instalar launcher
          </RpgButton>
          <RpgButton href="/login">Iniciar sesión</RpgButton>
        </div>
      </section>
    </>
  );
}
