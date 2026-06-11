import { ContentSection } from "@/components/layout/ContentSection";
import { PageHero } from "@/components/layout/PageHero";
import { itemCategories } from "@/lib/mock-data";

export const metadata = { title: "Objetos" };

export default function ObjetosPage() {
  return (
    <>
      <PageHero title="Base de datos de objetos" subtitle="Armas, armaduras y materiales del RPG" />
      <ContentSection>
        <div className="flex flex-wrap justify-center gap-3">
          {itemCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className="aether-stone-btn rounded-md px-5 py-2 text-sm font-bold uppercase"
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aether-panel-frame flex items-center gap-4 rounded-lg p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded bg-[#2a3144] text-2xl">
                ⚔️
              </div>
              <div>
                <p className="font-display font-bold text-[#f0c96a]">Objeto #{i + 1}</p>
                <p className="text-xs text-[#9eb4d4]">Rareza: épico · Nivel 40+</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
