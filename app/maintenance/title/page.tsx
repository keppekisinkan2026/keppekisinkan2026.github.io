"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoughSVG } from "roughjs/bin/svg";
import { socialLinks } from "@/components/maintenance/socialLinkData";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { withBasePath } from "@/lib/withBasePath";

const openingFrameSources = [
  "/images/title1.png",
  "/images/title2.png",
  "/images/title3.png",
  "/images/title4.png",
  "/images/title5.png",
] as const;

const snsFrameSources = ["/images/sns1.png", "/images/sns2.png", "/images/sns3.png", "/images/sns4.png"] as const;

const aboutImg1FrameSources = ["/images/i1_1.PNG", "/images/i1_2.PNG", "/images/i1_3.PNG", "/images/i1.PNG"] as const;
const aboutCommonAnimFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
] as const;
const aboutImg2FrameSources = [...aboutCommonAnimFrameSources, "/images/i2.PNG"] as const;
const aboutImg3FrameSources = [...aboutCommonAnimFrameSources, "/images/i3.PNG"] as const;
const aboutImg4FrameSources = [...aboutCommonAnimFrameSources, "/images/i4.PNG"] as const;
const aboutImg5FrameSources = [...aboutCommonAnimFrameSources, "/images/i5.PNG"] as const;
const aboutImgSinzinFrameSources = [...aboutCommonAnimFrameSources, "/images/sinzin.PNG"] as const;
const aboutImgFuneFrameSources = [...aboutCommonAnimFrameSources, "/images/fune.PNG"] as const;
const aboutImgPichiFrameSources = [...aboutCommonAnimFrameSources, "/images/pichi.PNG"] as const;

const titleNavigationLinks = [
  { label: "ホーム", href: "/title" },
  { label: "劇団紹介", href: "#about" },
  { label: "部署紹介", href: "/maintenance/departments" },
  { label: "企画の流れ", href: "/maintenance/flow" },
  { label: "新歓イベント", href: "/maintenance/events" },
  { label: "過去公演", href: "/maintenance/past" },
  { label: "Q&A", href: "/maintenance/qa" },
] as const;

const aboutSectionRows = [
  { key: "about-1", imageLeft: false },
  { key: "about-2", imageLeft: true },
  { key: "about-3", imageLeft: false },
  { key: "about-4", imageLeft: true },
] as const;

const aboutChunkStyle = { display: "inline-block" } as const;

const aboutCampusText = (
  <div className="js-about-text-container wf-about-text-container">
    <h3 className="wf-about-subheading">さまざまな大学の学生が集まる<wbr />インカレサークル</h3>
    <p className="js-about-text wf-about-text">
      <span style={aboutChunkStyle}>団員は現在80名ほど(2026年現在)。</span>
      <wbr />
      <span style={aboutChunkStyle}>京都大学だけでなく、</span>
      <wbr />
      <span style={aboutChunkStyle}>京都芸術大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>同志社大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>立命館大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>京都産業大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>京都工芸繊維大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>龍谷大学、</span>
      <wbr />
      <span style={aboutChunkStyle}>大谷大学など、</span>
      <wbr />
      <span style={aboutChunkStyle}>演劇を愛する学生が</span>
      <wbr />
      <span style={aboutChunkStyle}>さまざまな大学から</span>
      <wbr />
      <span style={aboutChunkStyle}>集まっています。</span>
    </p>
  </div>
);

const aboutProduceText = (
  <div className="js-about-text-container wf-about-text-container">
    <h3 className="wf-about-subheading">プロデュース制</h3>
    <p className="js-about-text wf-about-text">
      <span style={aboutChunkStyle}>劇団ケッペキの最大の特徴は、</span>
      <wbr />
      <span style={aboutChunkStyle}>定期公演制ではなく、</span>
      <wbr />
      <span style={aboutChunkStyle}>全ての団員が公演を企画することができる</span>
      <wbr />
      <span style={aboutChunkStyle}>プロデュース制を採用していることです。</span>
      <wbr />
      <span style={aboutChunkStyle}>座長をおかないことで、</span>
      <wbr />
      <span style={aboutChunkStyle}>団員一人一人の</span>
      <wbr />
      <span style={aboutChunkStyle}>「芝居を創りたい」という想いを</span>
      <wbr />
      <span style={aboutChunkStyle}>最大限に尊重しています。</span>
      <wbr />
      <span style={aboutChunkStyle}>これは様々な劇団が存在する</span>
      <wbr />
      <span style={aboutChunkStyle}>京都の学生演劇界においても</span>
      <wbr />
      <span style={aboutChunkStyle}>珍しい制度です。</span>
      <wbr />
      <span style={aboutChunkStyle}>また団全体としてではなく、</span>
      <wbr />
      <span style={aboutChunkStyle}>団員が集まり結成したユニットによる</span>
      <wbr />
      <span style={aboutChunkStyle}>「ユニット公演」も年に数回あり、</span>
      <wbr />
      <span style={aboutChunkStyle}>かなり自由度の高い演劇活動が</span>
      <wbr />
      <span style={aboutChunkStyle}>可能となっています。</span>
    </p>
  </div>
);

const aboutYearRoundText = (
  <div className="js-about-text-container wf-about-text-container">
    <h3 className="wf-about-subheading">年間を通して活動</h3>
    <p className="js-about-text wf-about-text">
      <span style={aboutChunkStyle}>ケッペキでは</span>
      <wbr />
      <span style={aboutChunkStyle}>規模も形態も多様な公演を</span>
      <wbr />
      <span style={aboutChunkStyle}>例年5～10本行ってきました。</span>
      <wbr />
      <span style={aboutChunkStyle}>新型コロナウイルス感染症の</span>
      <wbr />
      <span style={aboutChunkStyle}>流行を受け</span>
      <wbr />
      <span style={aboutChunkStyle}>2020年、2021年と</span>
      <wbr />
      <span style={aboutChunkStyle}>対面形式の公演を</span>
      <wbr />
      <span style={aboutChunkStyle}>打てずにいましたが、</span>
      <wbr />
      <span style={aboutChunkStyle}>2022年12月</span>
      <wbr />
      <span style={aboutChunkStyle}>「来るもの拒まずおかえり公演　『無差別』」の</span>
      <wbr />
      <span style={aboutChunkStyle}>上演を皮切りに</span>
      <wbr />
      <span style={aboutChunkStyle}>対面での活動を解禁し、</span>
      <wbr />
      <span style={aboutChunkStyle}>2025年も</span>
      <wbr />
      <span style={aboutChunkStyle}>新人公演、</span>
      <wbr />
      <span style={aboutChunkStyle}>卒業公演、</span>
      <wbr />
      <span style={aboutChunkStyle}>新歓公演や夏公演など、</span>
      <wbr />
      <span style={aboutChunkStyle}>活発に公演しています。</span>
    </p>
  </div>
);

const aboutRowParagraphs: ReadonlyArray<ReadonlyArray<ReactNode>> = [
  [
    <>
      <span style={aboutChunkStyle}>劇団鞠小路、</span>
      <wbr />
      <span style={aboutChunkStyle}>VOL.0を経て、</span>
      <wbr />
      <span style={aboutChunkStyle}>1993年に</span>
      <wbr />
      <span style={aboutChunkStyle}>京都大学学生部公認サークルとして</span>
      <wbr />
      <span style={aboutChunkStyle}>総合芸術集団潔癖青年文化団が</span>
      <wbr />
      <span style={aboutChunkStyle}>結成されました。</span>
    </>,
    <>
      <span style={aboutChunkStyle}>1995年には</span>
      <wbr />
      <span style={aboutChunkStyle}>劇団ケッペキと改称し、</span>
      <wbr />
      <span style={aboutChunkStyle}>京都大学公認の</span>
      <wbr />
      <span style={aboutChunkStyle}>演劇サークルとして</span>
      <wbr />
      <span style={aboutChunkStyle}>現在で</span>
      <wbr />
      <span style={aboutChunkStyle}>結成34年目となります。</span>
    </>,
  ],
  ["テキストが入ります", "テキストが入ります", "テキストが入ります", "テキストが入ります"],
  ["テキストが入ります", "テキストが入ります", "テキストが入ります", "テキストが入ります"],
  ["テキストが入ります", "テキストが入ります", "テキストが入ります", "テキストが入ります"],
];

const snsBlockOrder = ["hp", "x", "instagram", "note", "youtube"] as const;

const snsBlockLinks = snsBlockOrder
  .map((id) => socialLinks.find((item) => item.id === id))
  .filter((item): item is (typeof socialLinks)[number] => Boolean(item));

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TitleWireframePage() {
  const rootRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lineSvgRef = useRef<SVGSVGElement>(null);
  const aboutStageRef = useRef<HTMLElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const resetScroll = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      window.cancelAnimationFrame(resetScroll);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    if (!isIntroComplete) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isIntroComplete]);

  useEffect(() => {
    const refreshScrollTriggers = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshScrollTriggers);

    return () => {
      window.removeEventListener("load", refreshScrollTriggers);
    };
  }, []);

  useGSAP(
    () => {
      const header = headerRef.current;
      const lineSvg = lineSvgRef.current;

      if (!header || !lineSvg) {
        return;
      }

      const paperFrames = gsap.utils.toArray<HTMLElement>(".js-opening-frame", header);
      const logo = header.querySelector<HTMLElement>(".js-opening-logo");
      const menuItems = gsap.utils.toArray<HTMLElement>(".js-opening-menu-item", header);

      if (!logo || paperFrames.length === 0) {
        return;
      }

      lineSvg.innerHTML = "";
      lineSvg.setAttribute("viewBox", "0 0 1000 56");

      const roughFactory = new RoughSVG(lineSvg);
      const roughLines = [
        roughFactory.line(12, 18, 988, 18, {
          stroke: "#ffffff",
          strokeWidth: 8,
          roughness: 2.4,
          bowing: 0.8,
          seed: 2026,
        }),
        roughFactory.line(18, 27, 982, 29, {
          stroke: "#ffffff",
          strokeWidth: 6,
          roughness: 2.8,
          bowing: 0.6,
          seed: 2027,
        }),
        roughFactory.line(14, 36, 986, 34, {
          stroke: "#ffffff",
          strokeWidth: 5,
          roughness: 3,
          bowing: 0.75,
          seed: 2028,
        }),
      ];

      roughLines.forEach((line) => {
        lineSvg.appendChild(line);
      });

      const linePaths = Array.from(lineSvg.querySelectorAll<SVGPathElement>("path"));
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      linePaths.forEach((path) => {
        path.setAttribute("fill", "none");
        // path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        const totalLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
          opacity: 0
        });
      });

      gsap.set(paperFrames, { autoAlpha: 0 });
      gsap.set(paperFrames[0], { autoAlpha: 1 });
      gsap.set(logo, {
        autoAlpha: 0,
        y: 18,
        scale: 0.94,
        transformOrigin: "50% 50%",
      });
      gsap.set(menuItems, {
        autoAlpha: 0,
        y: 18,
        filter: "blur(8px)",
        clipPath: "inset(0 100% 0 0)",
      });
      gsap.set(lineSvg, { autoAlpha: 1 });

      if (reduceMotion) {
        gsap.set(paperFrames[paperFrames.length - 1], { autoAlpha: 1 });
        gsap.set(logo, { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(linePaths, { strokeDashoffset: 0 });
        gsap.set(menuItems, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0 0)",
        });
        setIsIntroComplete(true);
        requestAnimationFrame(() => ScrollTrigger.refresh());
        return;
      }

      const introTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          setIsIntroComplete(true);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      });

      paperFrames.slice(1).forEach((frame) => {
        introTimeline.set(paperFrames, { autoAlpha: 0 }, "+=0.15");
        introTimeline.set(frame, { autoAlpha: 1 });
      });

      introTimeline.to(
        logo,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.48,
          ease: "power3.out",
        },
        "-=0.04",
      );

      introTimeline.to(
        linePaths,
        {
          opacity: (index) => (index % 2 === 0 ? 0.96 : 0.82),
          duration: 0.01,
          stagger: 0.04,
        },
        "-=0.08"
      )
      .to(
        linePaths,
        {
          strokeDashoffset: 0,
          duration: 0.72,
          stagger: 0.04,
          ease: "power1.out",
        },
        "<"
      );

      introTimeline.to(
        menuItems,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0 0)",
          duration: 0.56,
          stagger: 0.07,
          ease: "power3.out",
        },
        "-=0.18",
      );
    },
    { scope: rootRef },
  );

  useGSAP(
    () => {
      if (!isIntroComplete) {
        return;
      }

      const aboutStage = aboutStageRef.current;
      const aboutPanel = aboutPanelRef.current;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const snsSection = rootRef.current?.querySelector<HTMLElement>("#sns");
      const hpSection = rootRef.current?.querySelector<HTMLElement>(".js-title-hp-stack");
      const hpButton = hpSection?.querySelector<HTMLElement>(".js-title-hp-button") ?? null;
      const snsFrames = snsSection ? gsap.utils.toArray<HTMLElement>(".js-sns-frame", snsSection) : [];
      const snsTitle = snsSection?.querySelector<HTMLElement>(".js-sns-title") ?? null;
      const snsIcons = snsSection ? gsap.utils.toArray<HTMLElement>(".js-sns-icon", snsSection) : [];
      const revealBlocks = gsap.utils.toArray<HTMLElement>(".js-title-reveal", rootRef.current);

      if (reduceMotion) {
        if (snsFrames.length > 0) {
          gsap.set(snsFrames, { autoAlpha: 0 });
          gsap.set(snsFrames[snsFrames.length - 1], { autoAlpha: 1 });
        }
        if (snsTitle) {
          gsap.set(snsTitle, { autoAlpha: 1, y: 0 });
        }
        if (snsIcons.length > 0) {
          gsap.set(snsIcons, { autoAlpha: 1, rotationX: 0, y: 0 });
        }

        revealBlocks.forEach((block) => {
          gsap.set(block, { clearProps: "all", autoAlpha: 1, y: 0 });
        });

        if (aboutPanel) {
          gsap.set(aboutPanel, { clearProps: "all", autoAlpha: 1, y: 0 });
        }

        if (aboutPanel) {
          gsap.set(".js-about-title", { autoAlpha: 1, y: 0 });
          gsap.set(".js-about-text", { autoAlpha: 1, y: 0 });
          gsap.set(".js-about-image", { autoAlpha: 1, y: 0 });
          showLastFlipbookFrame(gsap.utils.toArray<HTMLElement>(".js-about-img1-frame", aboutPanel));
          showLastFlipbookFrame(gsap.utils.toArray<HTMLElement>(".js-about-img2-frame", aboutPanel));
          showLastFlipbookFrame(gsap.utils.toArray<HTMLElement>(".js-about-img3-frame", aboutPanel));
          showLastFlipbookFrame(gsap.utils.toArray<HTMLElement>(".js-about-img4-frame", aboutPanel));
          showLastFlipbookFrame(gsap.utils.toArray<HTMLElement>(".js-about-img5-frame", aboutPanel));
          showLastFlipbookFrame(gsap.utils.toArray<HTMLElement>(".js-about-img-sinzin-frame", aboutPanel));
          showLastFlipbookFrame(gsap.utils.toArray<HTMLElement>(".js-about-img-fune-frame", aboutPanel));
          showLastFlipbookFrame(gsap.utils.toArray<HTMLElement>(".js-about-img-pichi-frame", aboutPanel));
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return;
      }

      if (snsSection && snsFrames.length > 0) {
        hideFlipbookFrames(snsFrames);
        gsap.set(snsTitle, { autoAlpha: 0, y: 10 });
        gsap.set(snsIcons, {
          autoAlpha: 0,
          rotationX: -70,
          y: -10,
          transformOrigin: "top center",
        });

        const snsTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: snsSection,
            start: "top 75%",
            invalidateOnRefresh: true,
            toggleActions: "play none none none",
          },
        });

        appendFlipbookFrames(snsTimeline, snsFrames);

        if (snsTitle) {
          snsTimeline.to(
            snsTitle,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "+=0.04",
          );
        }

        snsTimeline.to(
          snsIcons,
          {
            autoAlpha: 1,
            rotationX: 0,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "<+=0.02",
        );
      }

      if (hpSection && hpButton && aboutPanel) {
        ScrollTrigger.create({
          trigger: hpButton,
          start: "center center",
          endTrigger: aboutStage ?? aboutPanel,
          end: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }

      revealBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          {
            y: 100,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 86%",
              invalidateOnRefresh: true,
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      if (aboutStage && aboutPanel) {
        const aboutTitle = aboutPanel.querySelector<HTMLElement>(".js-about-title");
        const aboutRows = gsap.utils.toArray<HTMLElement>(".js-about-row", aboutPanel);
        const aboutImg1Frames = gsap.utils.toArray<HTMLElement>(".js-about-img1-frame", aboutPanel);
        const aboutImg2Frames = gsap.utils.toArray<HTMLElement>(".js-about-img2-frame", aboutPanel);
        const aboutImg3Frames = gsap.utils.toArray<HTMLElement>(".js-about-img3-frame", aboutPanel);
        const aboutImg4Frames = gsap.utils.toArray<HTMLElement>(".js-about-img4-frame", aboutPanel);
        const aboutImg5Frames = gsap.utils.toArray<HTMLElement>(".js-about-img5-frame", aboutPanel);
        const aboutImgSinzinFrames = gsap.utils.toArray<HTMLElement>(".js-about-img-sinzin-frame", aboutPanel);
        const aboutImgFuneFrames = gsap.utils.toArray<HTMLElement>(".js-about-img-fune-frame", aboutPanel);
        const aboutImgPichiFrames = gsap.utils.toArray<HTMLElement>(".js-about-img-pichi-frame", aboutPanel);
        let hasPlayedAboutImg1 = false;
        let hasPlayedAboutImg2And3 = false;
        let hasPlayedAboutImg4And5 = false;
        let hasPlayedAboutProduceFrames = false;

        const playAboutImg1Frames = () => {
          if (hasPlayedAboutImg1 || aboutImg1Frames.length === 0) {
            return;
          }

          hasPlayedAboutImg1 = true;

          const aboutImg1Timeline = gsap.timeline({ defaults: { ease: "none" } });
          appendFlipbookFrames(aboutImg1Timeline, aboutImg1Frames);
        };

        const playAboutImg2And3Frames = () => {
          if (hasPlayedAboutImg2And3 || (aboutImg2Frames.length === 0 && aboutImg3Frames.length === 0)) {
            return;
          }

          hasPlayedAboutImg2And3 = true;

          const aboutImg2And3Timeline = gsap.timeline({ defaults: { ease: "none" } });
          appendFlipbookFrames(aboutImg2And3Timeline, aboutImg2Frames, { startAt: 0, staggerDelay: 0.2 });
          appendFlipbookFrames(aboutImg2And3Timeline, aboutImg3Frames, { startAt: 0.7, staggerDelay: 0.2 });
        };

        const playAboutImg4And5Frames = () => {
          if (hasPlayedAboutImg4And5 || (aboutImg4Frames.length === 0 && aboutImg5Frames.length === 0)) {
            return;
          }

          hasPlayedAboutImg4And5 = true;

          const aboutImg4And5Timeline = gsap.timeline({ defaults: { ease: "none" } });
          appendFlipbookFrames(aboutImg4And5Timeline, aboutImg4Frames, { startAt: 0, staggerDelay: 0.2 });
          appendFlipbookFrames(aboutImg4And5Timeline, aboutImg5Frames, { startAt: 0.7, staggerDelay: 0.2 });
        };

        const playAboutProduceFrames = () => {
          if (
            hasPlayedAboutProduceFrames ||
            (aboutImgSinzinFrames.length === 0 && aboutImgFuneFrames.length === 0 && aboutImgPichiFrames.length === 0)
          ) {
            return;
          }

          hasPlayedAboutProduceFrames = true;

          const aboutProduceTimeline = gsap.timeline({ defaults: { ease: "none" } });
          appendFlipbookFrames(aboutProduceTimeline, aboutImgSinzinFrames, { startAt: 0, staggerDelay: 0.15 });
          appendFlipbookFrames(aboutProduceTimeline, aboutImgFuneFrames, { startAt: 0.7, staggerDelay: 0.15 });
          appendFlipbookFrames(aboutProduceTimeline, aboutImgPichiFrames, { startAt: 1.2, staggerDelay: 0.15 });
        };

        if (aboutTitle) {
          gsap.set(aboutTitle, { autoAlpha: 0, y: 30 });
        }
        gsap.set(aboutRows, { autoAlpha: 0, y: 28 });
        hideFlipbookFrames(aboutImg1Frames);
        hideFlipbookFrames(aboutImg2Frames);
        hideFlipbookFrames(aboutImg3Frames);
        hideFlipbookFrames(aboutImg4Frames);
        hideFlipbookFrames(aboutImg5Frames);
        hideFlipbookFrames(aboutImgSinzinFrames);
        hideFlipbookFrames(aboutImgFuneFrames);
        hideFlipbookFrames(aboutImgPichiFrames);

        const aboutTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: aboutStage,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 9, 4800)}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        if (aboutTitle) {
          aboutTimeline.to(
            aboutTitle,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.2,
              ease: "power2.out",
            },
            "+=0.2",
          );
        }

        aboutRows.forEach((row, index) => {
          aboutTimeline.to(
            row,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.34,
              ease: "power2.out",
              onStart:
                index === 0
                  ? playAboutImg1Frames
                  : index === 1
                    ? playAboutImg2And3Frames
                    : index === 2
                      ? playAboutProduceFrames
                      : index === 3
                        ? playAboutImg4And5Frames
                      : undefined,
            },
            "+=0.55",
          );

          aboutTimeline.to({}, { duration: 0.5 });

          if (index < aboutRows.length - 1) {
            aboutTimeline.to(
              row,
              {
                autoAlpha: 0,
                y: -20,
                duration: 0.28,
                ease: "power2.inOut",
              },
              "+=0.2",
            );
          }
        });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    {
      scope: rootRef,
      dependencies: [isIntroComplete],
      revertOnUpdate: true,
    },
  );

  return (
    <WireframeShell
      rootRef={rootRef}
      screenClassName="wf-screen--title"
      frameClassName="wf-frame--title"
      innerClassName="wf-frame-inner--title"
    >
      <div className="relative w-full">
        <header ref={headerRef} className="wf-title-sticky-header" aria-label="タイトルオープニング">
          <div className="wf-title-sticky-stage">
            <div className="wf-title-opening-header">
              <div className="wf-title-opening-paper-layer" aria-hidden>
                <div className="wf-title-opening-paper-stage">
                  {openingFrameSources.map((frameSrc, index) => (
                    <Image
                      key={frameSrc}
                      src={withBasePath(frameSrc)}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 640px) 94vw, (max-width: 1024px) 92vw, 1360px"
                      className="js-opening-frame wf-title-opening-frame"
                      style={{ opacity: index === 0 ? 1 : 0 }}
                    />
                  ))}
                </div>
              </div>

              <div className="wf-title-opening-foreground">
                <div className="wf-title-opening-stack">
                  <div className="wf-title-opening-logo-stage">
                    <Image
                      src={withBasePath("/images/logo.PNG")}
                      alt="劇団ケッペキ 2026年度新歓特設サイト ロゴ"
                      fill
                      priority
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 60vw, 780px"
                      className="js-opening-logo wf-title-opening-logo"
                      style={{ opacity: 0 }}
                    />
                  </div>

                  <svg ref={lineSvgRef} className="js-opening-line wf-title-opening-line" aria-hidden />

                  <nav
                    className={`wf-title-opening-menu ${isIntroComplete ? "pointer-events-auto" : "pointer-events-none"}`}
                    aria-label="ページリンク"
                  >
                    {titleNavigationLinks.map((item) =>
                      item.href.startsWith("#") ? (
                        <a key={item.label} href={item.href} className="js-opening-menu-item wf-title-opening-menu-link">
                          <span className="wf-title-opening-menu-text">{item.label}</span>
                        </a>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="js-opening-menu-item wf-title-opening-menu-link"
                        >
                          <span className="wf-title-opening-menu-text">{item.label}</span>
                        </Link>
                      ),
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main
          className={`wf-title-main transition-opacity duration-500 ${isIntroComplete ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={!isIntroComplete}
        >
          <section id="sns" className="wf-title-scroll-block wf-title-sns-stage wf-title-sns-section">
            <div className="js-title-reveal wf-title-sns-panel">
              <div className="wf-title-sns-frame-layer" aria-hidden>
                {snsFrameSources.map((frameSrc, index) => (
                  <Image
                    key={frameSrc}
                    src={withBasePath(frameSrc)}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 94vw, (max-width: 1024px) 92vw, 1320px"
                    className="js-sns-frame wf-title-sns-frame"
                    style={{ opacity: index === 0 ? 1 : 0 }}
                  />
                ))}
              </div>

              <div className="wf-title-sns-content">
                <h2 className="js-sns-title wf-maki-title wf-title-section-title">SNS</h2>

                <ul className="wf-title-sns-list">
                  {snsBlockLinks.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className="js-sns-icon wf-title-sns-link"
                        aria-label={item.label}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <span className="wf-title-sns-bubble">
                          <Image
                            src={withBasePath(item.iconPath)}
                            alt=""
                            width={60}
                            height={60}
                            className={`wf-title-social-icon wf-title-social-icon--${item.id}`}
                          />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="js-title-hp-stack wf-title-scroll-block">
            <a
              href="https://keppeki.github.io/html/stages/100yearstothesea.html"
              className="js-title-hp-button wf-title-hp-button"
              aria-label="新歓公演特設サイトはこちら"
            >
              <span className="wf-title-hp-button-stage" aria-hidden>
                <Image
                  src={withBasePath("/images/umi100_g.PNG")}
                  alt=""
                  fill
                  quality={100}
                  unoptimized
                  sizes="(max-width: 640px) 94vw, (max-width: 1024px) 92vw, 1260px"
                  className="wf-title-hp-image wf-title-hp-image--base"
                />
                <Image
                  src={withBasePath("/images/umi100.PNG")}
                  alt=""
                  fill
                  quality={100}
                  unoptimized
                  sizes="(max-width: 640px) 94vw, (max-width: 1024px) 92vw, 1260px"
                  className="wf-title-hp-image wf-title-hp-image--hover"
                />
              </span>
              <span className="wf-maki-title wf-title-hp-text">新歓公演特設サイトはこちら</span>
            </a>
          </section>

          <section ref={aboutStageRef} className="wf-title-scroll-block wf-title-about-stage">
            <div
              ref={aboutPanelRef}
              id="about"
              className="wf-analog-about-panel wf-title-section wf-title-about-section"
            >
              <h2 className="js-about-title wf-maki-title wf-title-section-title">劇団ケッペキとは</h2>

              <div className="wf-title-about-list">
                {aboutSectionRows.map((row, rowIndex) => (
                  <article
                    key={row.key}
                    className={`wf-title-about-row js-about-row ${row.imageLeft ? "wf-title-about-row--image-left" : "wf-title-about-row--image-right"} ${rowIndex === 2 ? "wf-title-about-row--produce" : ""}`}
                  >
                    {rowIndex === 1 ? (
                      <>
                        <div className="js-about-images-left wf-about-images-left wf-about-images-left--year-round" aria-hidden>
                          <div className="wf-about-anim-container">
                            {aboutImg2FrameSources.map((frameSrc) => (
                              <Image
                                key={frameSrc}
                                src={withBasePath(frameSrc)}
                                alt=""
                                fill
                                quality={100}
                                unoptimized
                                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 300px"
                                className="js-about-img2-frame"
                              />
                            ))}
                          </div>
                          <div className="wf-about-anim-container">
                            {aboutImg3FrameSources.map((frameSrc) => (
                              <Image
                                key={frameSrc}
                                src={withBasePath(frameSrc)}
                                alt=""
                                fill
                                quality={100}
                                unoptimized
                                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 300px"
                                className="js-about-img3-frame"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="js-about-copy wf-title-about-copy">{aboutCampusText}</div>
                      </>
                    ) : rowIndex === 2 ? (
                      <>
                        <div className="js-about-copy wf-title-about-copy">{aboutProduceText}</div>

                        <div className="js-about-images-right wf-about-images-right" aria-hidden>
                          <div className="wf-about-anim-container">
                            {aboutImgSinzinFrameSources.map((frameSrc, frameIndex) => (
                              <Image
                                key={frameSrc}
                                src={withBasePath(frameSrc)}
                                alt=""
                                fill
                                quality={100}
                                unoptimized
                                sizes="(max-width: 640px) 34vw, (max-width: 1024px) 20vw, 220px"
                                className={`js-about-img-sinzin-frame ${frameIndex < aboutCommonAnimFrameSources.length ? "wf-rotate-minus-90" : ""}`}
                              />
                            ))}
                          </div>
                          <div className="wf-about-anim-container">
                            {aboutImgFuneFrameSources.map((frameSrc, frameIndex) => (
                              <Image
                                key={frameSrc}
                                src={withBasePath(frameSrc)}
                                alt=""
                                fill
                                quality={100}
                                unoptimized
                                sizes="(max-width: 640px) 34vw, (max-width: 1024px) 20vw, 220px"
                                className={`js-about-img-fune-frame ${frameIndex < aboutCommonAnimFrameSources.length ? "wf-rotate-minus-90" : ""}`}
                              />
                            ))}
                          </div>
                          <div className="wf-about-anim-container">
                            {aboutImgPichiFrameSources.map((frameSrc, frameIndex) => (
                              <Image
                                key={frameSrc}
                                src={withBasePath(frameSrc)}
                                alt=""
                                fill
                                quality={100}
                                unoptimized
                                sizes="(max-width: 640px) 34vw, (max-width: 1024px) 20vw, 220px"
                                className={`js-about-img-pichi-frame ${frameIndex < aboutCommonAnimFrameSources.length ? "wf-rotate-minus-90" : ""}`}
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    ) : rowIndex === 3 ? (
                      <>
                        <div className="js-about-images-left wf-about-images-left" aria-hidden>
                          <div className="wf-about-anim-container">
                            {aboutImg4FrameSources.map((frameSrc) => (
                              <Image
                                key={frameSrc}
                                src={withBasePath(frameSrc)}
                                alt=""
                                fill
                                quality={100}
                                unoptimized
                                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 300px"
                                className="js-about-img4-frame"
                              />
                            ))}
                          </div>
                          <div className="wf-about-anim-container">
                            {aboutImg5FrameSources.map((frameSrc) => (
                              <Image
                                key={frameSrc}
                                src={withBasePath(frameSrc)}
                                alt=""
                                fill
                                quality={100}
                                unoptimized
                                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 300px"
                                className="js-about-img5-frame"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="js-about-copy wf-title-about-copy">{aboutYearRoundText}</div>
                      </>
                    ) : (
                      <>
                        <div className="js-about-copy wf-title-about-copy">
                          <>
                            {rowIndex === 0 ? (
                              <p className="wf-about-kicker wf-maki-title">京都大学公認演劇サークル</p>
                            ) : null}
                            {aboutRowParagraphs[rowIndex].map((paragraph, index) => (
                              <p key={`${row.key}-${index}`} className="js-about-text wf-about-text">
                                {paragraph}
                              </p>
                            ))}
                          </>
                        </div>

                        {rowIndex === 0 ? (
                          <div className="js-about-image-container wf-about-anim-container" aria-hidden>
                            {aboutImg1FrameSources.map((frameSrc) => (
                              <Image
                                key={frameSrc}
                                src={withBasePath(frameSrc)}
                                alt=""
                                fill
                                quality={100}
                                unoptimized
                                sizes="(max-width: 640px) 42vw, (max-width: 1024px) 34vw, 420px"
                                className="js-about-img1-frame"
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="js-about-image wf-title-about-image">画像</div>
                        )}
                      </>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="wf-title-scroll-block">
            <div className="js-title-reveal wf-title-section wf-title-join-section wf-analog-join-panel">
              <div className="wf-join-tape-text wf-maki-title">入団希望の方へ</div>
            </div>
          </section>
        </main>
      </div>
    </WireframeShell>
  );
}
