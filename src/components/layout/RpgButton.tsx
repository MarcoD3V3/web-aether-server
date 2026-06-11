import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "stone" | "gold" | "emerald";

const variants: Record<Variant, string> = {
  stone: "aether-stone-btn",
  gold: "aether-stone-btn aether-stone-btn--gold",
  emerald: "aether-stone-btn aether-stone-btn--emerald",
};

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  download?: boolean | string;
};

function isExternalOrDownload(href: string, download?: boolean | string) {
  return (
    download !== undefined ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("/api/")
  );
}

export function RpgButton({
  href,
  onClick,
  variant = "stone",
  className,
  children,
  type = "button",
  disabled,
  download,
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold uppercase tracking-wide",
    variants[variant],
    disabled && "pointer-events-none opacity-50",
    className
  );

  if (href) {
    if (isExternalOrDownload(href, download)) {
      return (
        <a
          href={href}
          className={classes}
          download={download === true ? "" : download}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
