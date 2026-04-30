"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { withBasePath } from "@/lib/withBasePath";
import { normalizePathname } from "@/lib/normalizePathname";
import { headerHiddenPaths, headerLinks } from "@/lib/siteNavigation";

export function Header() {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);

  if (headerHiddenPaths.has(normalizedPathname)) {
    return null;
  }

  return (
    <>
      <header
        className="wf-global-header"
        style={{ backgroundImage: `url(${withBasePath("/images/menu.PNG")})` }}
      >
        <nav aria-label="グローバルナビゲーション">
          <ul className="wf-global-nav-list">
            {headerLinks.map((item) => {
              const itemPath = item.href.split("#")[0] || "/";
              const isCurrent =
                normalizedPathname === itemPath ||
                (item.href === "/#about" && normalizedPathname === "/");

              return (
                <li key={item.href} className={`wf-global-nav-item wf-global-nav-item--${item.id}`}>
                  <Link
                    href={item.href}
                    className={`wf-global-nav-link wf-global-nav-link--${item.id} wf-maki-title`}
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
