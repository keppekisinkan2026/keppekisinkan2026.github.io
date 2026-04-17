import type { Metadata } from "next";

export const SITE_URL = "https://keppekisinkan2026.github.io";
export const SITE_NAME = "劇団ケッペキ";
export const DEFAULT_SITE_DESCRIPTION =
  "京都大学公認学生劇団「劇団ケッペキ」2026年度新歓特設サイト。劇団紹介、部署紹介、新歓イベント、公演ができるまで、過去公演、Q&Aを掲載しています。";

const SEO_IMAGE = {
  url: "/icon.png",
  width: 400,
  height: 400,
  alt: "劇団ケッペキ 2026年度新歓特設サイト",
} as const;

function buildSeoTitle(title: string) {
  return `${title} | ${SITE_NAME}`;
}

export function normalizeSitePath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath.endsWith("/") ? normalizedPath : `${normalizedPath}/`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  const seoTitle = buildSeoTitle(title);
  const canonicalPath = normalizeSitePath(path);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: canonicalPath,
      siteName: SITE_NAME,
      title: seoTitle,
      description,
      images: [SEO_IMAGE],
    },
    twitter: {
      card: "summary",
      title: seoTitle,
      description,
      images: [SEO_IMAGE.url],
    },
  };
}

export function createDefaultOpenGraph() {
  return {
    type: "website" as const,
    locale: "ja_JP",
    siteName: SITE_NAME,
    url: normalizeSitePath("/title"),
    title: buildSeoTitle("2026年度新歓特設サイト"),
    description: DEFAULT_SITE_DESCRIPTION,
    images: [SEO_IMAGE],
  };
}

export function createDefaultTwitter() {
  return {
    card: "summary" as const,
    title: buildSeoTitle("2026年度新歓特設サイト"),
    description: DEFAULT_SITE_DESCRIPTION,
    images: [SEO_IMAGE.url],
  };
}
