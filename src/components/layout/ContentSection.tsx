import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function ContentSection({ title, children, className }: Props) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-12", className)}>
      {title && (
        <h2 className="font-display mb-8 text-center text-2xl font-bold text-[#f0c96a]">{title}</h2>
      )}
      {children}
    </section>
  );
}
