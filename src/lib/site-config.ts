export const site = {
  name: "Aetherfall",
  tagline: "El RPG de Minecraft que estabas esperando",
  serverIp: "play.aetherfall.gg",
  launcherName: "CraftLauncher",
  /** URL del instalador — por defecto sirve el .exe local vía /api/download/launcher */
  launcherDownloadUrl:
    process.env.NEXT_PUBLIC_LAUNCHER_DOWNLOAD_URL ?? "/api/download/launcher",
  adminApiUrl: process.env.NEXT_PUBLIC_ADMIN_API_URL ?? "http://localhost:3000",
  social: {
    discord: "https://discord.gg/",
    youtube: "https://youtube.com/",
    twitter: "https://x.com/",
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
  icon: string;
  highlight?: boolean;
};

export const mainNav: NavItem[] = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/noticias", label: "Noticias", icon: "news" },
  { href: "/tienda", label: "Tienda", icon: "store", highlight: true },
  { href: "/comunidad", label: "Comunidad", icon: "community" },
  { href: "/estadisticas", label: "Estadísticas", icon: "stats" },
  { href: "/objetos", label: "Objetos", icon: "items" },
  { href: "/clases", label: "Clases", icon: "classes" },
  { href: "/mapa", label: "Mapa", icon: "map" },
  { href: "/launcher", label: "Launcher", icon: "launcher" },
];
