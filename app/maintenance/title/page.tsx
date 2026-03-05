import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "@/components/maintenance/socialLinkData";
import { CrayonPanelTexture } from "@/components/wireframe/CrayonPanelTexture";
import { WireframeShell } from "@/components/wireframe/WireframeShell";

const titleNavigationLinks = [
  { label: "劇団紹介", href: "#about" },
  { label: "部署紹介", href: "/maintenance/departments" },
  { label: "新歓イベント", href: "/maintenance/events" },
  { label: "企画の流れ", href: "/maintenance/flow" },
  { label: "Q&A", href: "/maintenance/qa" },
  { label: "リンク", href: "#sns" },
];

const aboutSectionRows = [0, 1, 2, 3];

export default function TitleWireframePage() {
  return (
    <WireframeShell
      screenClassName="wf-screen--title"
      frameClassName="wf-frame--title"
      innerClassName="wf-frame-inner--title"
    >
      <header className="wf-crayon-panel wf-title-header">
        <CrayonPanelTexture />
        <div className="wf-title-logo-wrap">
          <Image
            src="/images/logo.PNG"
            alt="劇団ケッペキ 2026年度新歓特設サイト ロゴ"
            width={3163}
            height={936}
            className="wf-title-logo"
            priority
          />
        </div>
        <div className="wf-title-divider" aria-hidden />
        <nav className="wf-title-nav" aria-label="ページリンク">
          {titleNavigationLinks.map((item) => (
            item.href.startsWith("#") ? (
              <a key={item.label} href={item.href} className="wf-title-nav-link">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} className="wf-title-nav-link">
                {item.label}
              </Link>
            )
          ))}
        </nav>
      </header>

      <section id="sns" className="wf-crayon-panel wf-title-section wf-title-sns-section">
        <CrayonPanelTexture />
        <h2 className="wf-maki-title wf-title-section-title">SNS</h2>
        <ul className="wf-title-sns-list">
          {socialLinks.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="wf-title-sns-link"
                aria-label={item.label}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="wf-title-sns-bubble">
                  <Image
                    src={item.iconPath}
                    alt=""
                    width={40}
                    height={40}
                    className={`wf-title-social-icon wf-title-social-icon--${item.id}`}
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <a
        href="https://keppeki.github.io/"
        className="wf-crayon-panel wf-title-hp-button wf-maki-title"
        target="_blank"
        rel="noreferrer noopener"
      >
        <CrayonPanelTexture />
        新歓公演のHPはこちら
      </a>

      <section id="about" className="wf-crayon-panel wf-title-section wf-title-about-section">
        <CrayonPanelTexture />
        <h2 className="wf-maki-title wf-title-section-title">劇団ケッペキとは</h2>
        <div className="wf-title-about-list">
          {aboutSectionRows.map((row) => (
            <article
              key={row}
              className={`wf-title-about-row ${row % 2 === 0 ? "wf-title-about-row--image-right" : "wf-title-about-row--image-left"}`}
            >
              <div className="wf-title-about-copy" aria-hidden>
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="wf-title-about-image">画像</div>
            </article>
          ))}
        </div>
      </section>

      <section className="wf-crayon-panel wf-title-section wf-title-join-section">
        <CrayonPanelTexture />
        <h2 className="wf-maki-title wf-title-section-title">入団希望の方へ</h2>
        <div className="wf-title-join-lines" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </WireframeShell>
  );
}
