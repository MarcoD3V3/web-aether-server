import { Download, Monitor, Shield, Zap } from "lucide-react";
import { ContentSection } from "@/components/layout/ContentSection";
import { PageHero } from "@/components/layout/PageHero";
import { RpgButton } from "@/components/layout/RpgButton";
import { site } from "@/lib/site-config";

export const metadata = { title: "Launcher" };

const features = [
  {
    icon: Zap,
    title: "Actualizaciones automáticas",
    desc: "Mods, texturas y parches del servidor sin tocar carpetas.",
  },
  {
    icon: Shield,
    title: "Cuenta segura",
    desc: "Misma cuenta que creas en el panel admin del servidor.",
  },
  {
    icon: Monitor,
    title: "Solo Windows",
    desc: "Instalador .exe para PC. Java incluido en el flujo de juego.",
  },
];

const steps = [
  "Descarga el instalador de CraftLauncher.",
  "Instálalo y abre la aplicación.",
  "Inicia sesión con tu usuario del servidor (o activa tu token).",
  `Pulsa Jugar — se conectará a ${site.serverIp}.`,
];

export default function LauncherPage() {
  return (
    <>
      <PageHero title={site.launcherName} subtitle="La forma oficial de entrar a Aetherfall">
        <RpgButton href={site.launcherDownloadUrl} variant="emerald" download>
          <Download size={20} />
          Descargar para Windows
        </RpgButton>
      </PageHero>

      <ContentSection title="¿Por qué usar el launcher?">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="aether-panel-frame rounded-lg p-6 text-center">
              <f.icon className="mx-auto text-[#3ecf8e]" size={36} />
              <h3 className="font-display mt-4 text-lg font-bold text-[#f0c96a]">{f.title}</h3>
              <p className="mt-2 text-sm text-[#9eb4d4]">{f.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Cómo empezar" className="bg-[#0d1018]">
        <ol className="mx-auto max-w-xl space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d4a84b] font-bold text-[#1a1610]">
                {i + 1}
              </span>
              <span className="pt-1 text-[#c8d8ec]">{step}</span>
            </li>
          ))}
        </ol>
      </ContentSection>

      <ContentSection>
        <div className="aether-panel-frame mx-auto max-w-2xl rounded-xl p-8">
          <h3 className="font-display text-center text-xl font-bold text-[#f0c96a]">
            Requisitos mínimos
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[#9eb4d4]">
            <li>· Windows 10/11 (64 bits)</li>
            <li>· 4 GB RAM (8 GB recomendado)</li>
            <li>· Conexión a internet estable</li>
            <li>· Cuenta creada por un administrador</li>
          </ul>
          <p className="mt-6 text-center text-xs text-[#6a7a94]">
            El instalador se descarga desde esta web. Si no existe, ejecuta{" "}
            <code className="text-[#f0c96a]">npm run launcher:build</code> en el proyecto.
          </p>
        </div>
      </ContentSection>
    </>
  );
}
