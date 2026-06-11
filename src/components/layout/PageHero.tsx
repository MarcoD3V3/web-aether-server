import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

export function PageHero({ title, subtitle, className, children }: Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-[#2a3144] px-4 py-16 text-center",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 aether-sky-bg opacity-60" />
      <div className="relative mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold tracking-wide text-[#f0c96a] drop-shadow-lg md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-3 text-lg text-[#c8d8ec]">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
