import { ContentSection } from "@/components/layout/ContentSection";
import { PageHero } from "@/components/layout/PageHero";
import { RpgButton } from "@/components/layout/RpgButton";
import { site } from "@/lib/site-config";

export const metadata = { title: "Comunidad" };

const links = [
  { title: "Discord", desc: "Chat, soporte y eventos en vivo", href: site.social.discord },
  { title: "YouTube", desc: "Tráilers, guías y streams", href: site.social.youtube },
  { title: "Foro", desc: "Sugerencias y reportes (próximamente)", href: "#" },
  { title: "Guilds", desc: "Ranking de clanes del servidor", href: "/estadisticas" },
];

export default function ComunidadPage() {
  return (
    <>
      <PageHero title="Comunidad" subtitle="Únete a miles de aventureros" />
      <ContentSection>
        <div className="grid gap-6 md:grid-cols-2">
          {links.map((link) => (
            <div key={link.title} className="aether-panel-frame rounded-lg p-6">
              <h3 className="font-display text-xl font-bold text-[#f0c96a]">{link.title}</h3>
              <p className="mt-2 text-[#9eb4d4]">{link.desc}</p>
              <RpgButton href={link.href} className="mt-4">
                Visitar
              </RpgButton>
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
