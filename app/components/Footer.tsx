"use client";

import { usePathname } from "next/navigation";

const hiddenPaths = new Set(["/maintenance"]);

export function Footer() {
  const pathname = usePathname();
  const normalizedPathname =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (hiddenPaths.has(normalizedPathname)) {
    return null;
  }

  return (
    <footer className="wf-global-footer" aria-label="共通フッター">
      <div className="wf-global-footer-bg" aria-hidden />
      <p className="wf-global-footer-text wf-maki-title">劇団ケッペキ</p>
    </footer>
  );
}
