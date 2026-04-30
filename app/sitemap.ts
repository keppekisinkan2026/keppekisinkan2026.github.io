import type { MetadataRoute } from "next";
import { normalizeSitePath, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const sitemapPaths = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/departments", priority: 0.9, changeFrequency: "monthly" },
  { path: "/events", priority: 0.9, changeFrequency: "weekly" },
  { path: "/flow", priority: 0.8, changeFrequency: "monthly" },
  { path: "/past", priority: 0.8, changeFrequency: "monthly" },
  { path: "/qa", priority: 0.8, changeFrequency: "monthly" },
] as const satisfies ReadonlyArray<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().slice(0, 10);

  return sitemapPaths.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${normalizeSitePath(path)}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
