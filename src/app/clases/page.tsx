import { ContentSection } from "@/components/layout/ContentSection";
import { PageHero } from "@/components/layout/PageHero";
import { RpgButton } from "@/components/layout/RpgButton";
import { playerClasses } from "@/lib/mock-data";

export const metadata = { title: "Clases" };

export default function ClasesPage() {
  return (
    <>
      <PageHero title="Clases" subtitle="Elige tu camino en Aetherfall" />
      <ContentSection>
        <div className="grid gap-8 md:grid-cols-2">
          {playerClasses.map((cls) => (
            <div key={cls.id} className="aether-panel-frame overflow-hidden rounded-xl">
              <div className="h-3" style={{ background: cls.color }} />
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold" style={{ color: cls.color }}>
                  {cls.name}
                </h2>
                <p className="text-sm font-semibold text-[#9eb4d4]">{cls.role}</p>
                <p className="mt-4 text-[#c8d8ec]">{cls.desc}</p>
                <ul className="mt-4 space-y-1 text-sm text-[#9eb4d4]">
                  <li>· Habilidad básica desbloqueada al nivel 1</li>
                  <li>· Especialización al nivel 25</li>
                  <li>· Ultimate al nivel 50</li>
                </ul>
                <RpgButton variant="gold" className="mt-6">
                  Ver habilidades
                </RpgButton>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
