import { ContentSection } from "@/components/layout/ContentSection";
import { PageHero } from "@/components/layout/PageHero";
import { RpgButton } from "@/components/layout/RpgButton";
import { storeCategories } from "@/lib/mock-data";

export const metadata = { title: "Tienda" };

export default function TiendaPage() {
  return (
    <>
      <PageHero title="Tienda del Reino" subtitle="Apoya el servidor y personaliza tu aventura" />
      <ContentSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {storeCategories.map((cat) => (
            <div
              key={cat.id}
              className="aether-panel-frame flex flex-col items-center rounded-xl p-8 text-center transition hover:scale-[1.02]"
            >
              <span className="text-5xl">{cat.icon}</span>
              <h3 className="font-display mt-4 text-xl font-bold text-[#f0c96a]">{cat.name}</h3>
              <p className="mt-2 text-sm text-[#9eb4d4]">{cat.desc}</p>
              <RpgButton variant="gold" className="mt-6">
                Ver catálogo
              </RpgButton>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-lg text-center text-sm text-[#6a7a94]">
          La tienda real se conectará a tu pasarela de pagos. Por ahora es una vista previa del diseño.
        </p>
      </ContentSection>
    </>
  );
}
