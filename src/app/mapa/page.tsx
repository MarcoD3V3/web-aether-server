import { ContentSection } from "@/components/layout/ContentSection";
import { PageHero } from "@/components/layout/PageHero";

export const metadata = { title: "Mapa" };

const regions = [
  { name: "Valle de Bruma", level: "1-15", danger: "Bajo" },
  { name: "Bosque Esmeralda", level: "15-30", danger: "Medio" },
  { name: "Picos de Ceniza", level: "30-50", danger: "Alto" },
  { name: "Ciudadela del Norte", level: "50+", danger: "Extremo" },
];

export default function MapaPage() {
  return (
    <>
      <PageHero title="Mapa del mundo" subtitle="Explora regiones, ciudades y mazmorras" />
      <ContentSection>
        <div className="aether-panel-frame relative aspect-[16/9] overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] via-[#2d5a3d] to-[#1e2433]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-fantasy text-4xl text-[#f0c96a]">Mapa interactivo</p>
              <p className="mt-2 text-[#9eb4d4]">Próximamente — integración con tu mundo custom</p>
            </div>
          </div>
          {regions.map((r, i) => (
            <div
              key={r.name}
              className="absolute h-4 w-4 animate-pulse rounded-full bg-[#3ecf8e] shadow-[0_0_12px_#3ecf8e]"
              style={{
                top: `${20 + i * 18}%`,
                left: `${15 + i * 20}%`,
              }}
              title={r.name}
            />
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((r) => (
            <div key={r.name} className="aether-panel-frame rounded-lg p-4 text-center">
              <h3 className="font-display font-bold text-[#f0c96a]">{r.name}</h3>
              <p className="text-sm text-[#9eb4d4]">Nivel {r.level}</p>
              <p className="text-xs text-[#6a7a94]">Peligro: {r.danger}</p>
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
