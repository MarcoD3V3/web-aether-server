import { ContentSection } from "@/components/layout/ContentSection";
import { PageHero } from "@/components/layout/PageHero";
import { leaderboard } from "@/lib/mock-data";

export const metadata = { title: "Estadísticas" };

export default function EstadisticasPage() {
  return (
    <>
      <PageHero title="Estadísticas" subtitle="Ranking de jugadores y métricas del servidor" />
      <ContentSection>
        <div className="aether-panel-frame overflow-hidden rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1a1610] text-xs uppercase text-[#9eb4d4]">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Jugador</th>
                <th className="px-4 py-3">Nivel</th>
                <th className="px-4 py-3">Clase</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row) => (
                <tr key={row.rank} className="border-t border-[#3d3528] hover:bg-[#2a241c]/50">
                  <td className="px-4 py-3 font-bold text-[#f0c96a]">{row.rank}</td>
                  <td className="px-4 py-3 font-mono">{row.player}</td>
                  <td className="px-4 py-3">{row.level}</td>
                  <td className="px-4 py-3 text-[#9eb4d4]">{row.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-center text-sm text-[#6a7a94]">
          Datos de ejemplo. Se sincronizarán con tu backend cuando el servidor esté en producción.
        </p>
      </ContentSection>
    </>
  );
}
