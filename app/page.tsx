import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { TitleWireframePageClient } from "./title/TitleWireframePageClient";

export const metadata: Metadata = createPageMetadata({
  title: "2026年度新歓特設サイト",
  description:
    "劇団ケッペキ2026年度新歓特設サイト。劇団紹介、部署紹介、新歓イベント、公演ができるまで、過去公演、Q&Aを掲載しています。",
  path: "/",
});

export default function Home() {
  return <TitleWireframePageClient />;
}
