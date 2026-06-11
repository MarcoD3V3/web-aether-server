/** Config solo servidor (API routes). */
export function getAdminApiUrl(): string {
  return (
    process.env.ADMIN_API_URL ??
    process.env.NEXT_PUBLIC_ADMIN_API_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");
}
