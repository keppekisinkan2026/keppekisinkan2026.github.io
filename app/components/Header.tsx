"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const headerLinks = [
  { label: "ホーム", href: "/title" },
  { label: "劇団紹介", href: "/title#about" },
  { label: "部署紹介", href: "/maintenance/departments" },
  { label: "企画の流れ", href: "/maintenance/flow" },
  { label: "新歓イベント", href: "/maintenance/events" },
  { label: "過去公演", href: "/maintenance/past" },
  { label: "Q&A", href: "/maintenance/qa" },
] as const;
const hiddenPaths = new Set(["/", "/title", "/maintenance", "/maintenance/title"]);

export function Header() {
  const pathname = usePathname();
  const normalizedPathname =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (hiddenPaths.has(normalizedPathname)) {
    return null;
  }

  return (
    <>
      <header className="wf-global-header">
        <nav aria-label="グローバルナビゲーション">
          <ul className="wf-global-nav-list">
            {headerLinks.map((item) => {
              const isCurrent =
                normalizedPathname === item.href ||
                (item.href === "/title#about" &&
                  (normalizedPathname === "/title" || normalizedPathname === "/maintenance/title"));

              return (
                <li key={item.href} className="wf-global-nav-item">
                  <Link
                    href={item.href}
                    className="wf-global-nav-link wf-maki-title"
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <div className="wf-global-header-spacer" aria-hidden />
    </>
  );
}
