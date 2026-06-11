import { ContentSection } from "@/components/layout/ContentSection";
import { PageHero } from "@/components/layout/PageHero";
import { newsPosts } from "@/lib/mock-data";

export const metadata = { title: "Noticias" };

export default function NoticiasPage() {
  return (
    <>
      <PageHero title="Noticias" subtitle="Parches, eventos y novedades del reino" />
      <ContentSection>
        <div className="space-y-6">
          {newsPosts.map((post) => (
            <article key={post.id} className="aether-panel-frame rounded-lg p-6 md:flex md:gap-6">
              <div className="flex h-24 w-full shrink-0 items-center justify-center rounded-md bg-[#1a3a5c]/60 md:w-40">
                <span className="font-fantasy text-3xl text-[#5eb3ff]">📜</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-[#3ecf8e]">{post.tag}</span>
                <h2 className="font-display mt-1 text-xl font-bold text-[#f0c96a]">{post.title}</h2>
                <p className="mt-2 text-[#9eb4d4]">{post.excerpt}</p>
                <time className="mt-3 block text-xs text-[#6a7a94]">{post.date}</time>
              </div>
            </article>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
