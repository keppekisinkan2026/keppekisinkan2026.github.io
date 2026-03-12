"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const headerLinks = [
  { label: "ホーム", href: "/" },
  { label: "劇団紹介", href: "/#about" },
  { label: "部署紹介", href: "/maintenance/departments" },
  { label: "新歓イベント", href: "/maintenance/events" },
  { label: "過去公演", href: "/maintenance/past" },
  { label: "Q&A", href: "/maintenance/qa" },
] as const;

export function Header() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <header className="wf-global-header">
        <nav aria-label="グローバルナビゲーション">
          <ul className="wf-global-nav-list">
            {headerLinks.map((item) => {
              const isCurrent = pathname === item.href;

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
