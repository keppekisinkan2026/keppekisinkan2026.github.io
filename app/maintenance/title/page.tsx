"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
const markerPasses = [0, 1, 2, 3];

function MarkerDrawOverlay() {
  return (
    <span className="wf-draw-overlay" aria-hidden>
      {markerPasses.map((pass) => (
        <span key={pass} className={`wf-draw-stroke wf-draw-stroke--${pass + 1} js-draw-stroke`} />
      ))}
    </span>
  );
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TitleWireframePage() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const header = rootRef.current?.querySelector<HTMLElement>(".js-draw-header");
      const sections = gsap.utils.toArray<HTMLElement>(".js-draw-section");

      const createMarkerDrawTimeline = (block: HTMLElement, withScrollTrigger: boolean) => {
        const strokes = Array.from(block.querySelectorAll<HTMLElement>(".js-draw-stroke"));
        if (strokes.length === 0) {
          return;
        }

        const timeline = gsap.timeline(
          withScrollTrigger
            ? {
                scrollTrigger: {
                  trigger: block,
                  start: "top 84%",
                  once: true,
                },
              }
            : undefined,
        );

        timeline.set(block, {
          clipPath: "inset(0% 100% 0% 0%)",
          opacity: 0.9,
          x: 0,
        });
        timeline.set(strokes, { autoAlpha: 0, xPercent: 0 });

        strokes.forEach((stroke, index) => {
          const from = index % 2 === 0 ? -122 : 122;
          const to = -from;
          const revealRight = Math.max(0, 100 - (index + 1) * 25);

          timeline.set(stroke, {
            xPercent: from,
            autoAlpha: 0.9,
            scaleX: 1.02,
            rotate: index % 2 === 0 ? -1 : 1,
          });
          timeline.to(
            stroke,
            {
              xPercent: to,
              autoAlpha: 0.98,
              duration: 0.24,
              ease: "power2.in",
            },
            ">",
          );
          timeline.to(
            block,
            {
              clipPath: `inset(0% ${revealRight}% 0% 0%)`,
              duration: 0.42,
              ease: "none",
            },
            "<",
          );
          timeline.to(
            stroke,
            {
              autoAlpha: 0.2,
              duration: 0.18,
              ease: "power1.out",
            },
            "<0.16",
          );
        });

        timeline.to(
          block,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.16,
            ease: "power1.out",
          },
          ">-0.06",
        );
        timeline.to(strokes, { autoAlpha: 0, duration: 0.12 }, "<");
      };

      if (header) {
        createMarkerDrawTimeline(header, false);
      }
      sections.forEach((section) => {
        createMarkerDrawTimeline(section, true);
      });
    },
    { scope: rootRef },
  );

  return (
    <WireframeShell
      rootRef={rootRef}
      screenClassName="wf-screen--title"
      frameClassName="wf-frame--title"
      innerClassName="wf-frame-inner--title"
    >
      <header className="wf-crayon-panel wf-title-header js-draw-block js-draw-header">
        <CrayonPanelTexture />
        <MarkerDrawOverlay />
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

      <section
        id="sns"
        className="wf-crayon-panel wf-title-section wf-title-sns-section js-draw-block js-draw-section"
      >
        <CrayonPanelTexture />
        <MarkerDrawOverlay />
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
        className="wf-crayon-panel wf-title-hp-button wf-maki-title js-draw-block js-draw-section"
        target="_blank"
        rel="noreferrer noopener"
      >
        <CrayonPanelTexture />
        <MarkerDrawOverlay />
        新歓公演のHPはこちら
      </a>

      <section
        id="about"
        className="wf-crayon-panel wf-title-section wf-title-about-section js-draw-block js-draw-section"
      >
        <CrayonPanelTexture />
        <MarkerDrawOverlay />
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

      <section className="wf-crayon-panel wf-title-section wf-title-join-section js-draw-block js-draw-section">
        <CrayonPanelTexture />
        <MarkerDrawOverlay />
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
