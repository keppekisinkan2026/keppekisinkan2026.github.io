"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { withBasePath } from "@/lib/withBasePath";

export type PastPerformance = {
  id: number;
  title: string;
  subtitle: string;
  summaryLines: string[];
  synopsis: string;
};

type PastItemProps = {
  performance: PastPerformance;
  onOpen: () => void;
};

type ScatterTarget = {
  x: number;
  y: number;
  rotation: number;
};

const pastFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
  "/images/image5.PNG",
] as const;

const hiddenCardCount = 5;

gsap.registerPlugin(useGSAP, ScrollTrigger);

function createScatterTargets(seed: number): ScatterTarget[] {
  let state = seed * 97 + 13;
  const next = () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };

  const bases = [
    { x: -180, y: -130, rotation: -18 },
    { x: 145, y: -115, rotation: 11 },
    { x: 192, y: 98, rotation: 16 },
    { x: -172, y: 148, rotation: -10 },
    { x: 18, y: 190, rotation: 4 },
  ];

  return bases.map((base) => ({
    x: base.x + (next() - 0.5) * 36,
    y: base.y + (next() - 0.5) * 34,
    rotation: base.rotation + (next() - 0.5) * 8,
  }));
}

export function PastItem({ performance, onOpen }: PastItemProps) {
  const rootRef = useRef<HTMLElement>(null);
  const hiddenCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scatterTargets = useMemo(() => createScatterTargets(performance.id), [performance.id]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const frames = gsap.utils.toArray<HTMLElement>(".js-past-frame", root);
      const content = root.querySelector<HTMLElement>(".js-past-content");
      const hiddenCards = hiddenCardRefs.current.filter(Boolean) as HTMLDivElement[];

      if (frames.length === 0 || !content) {
        return;
      }

      hideFlipbookFrames(frames);
      gsap.set(content, { autoAlpha: 0, y: 18 });
      gsap.set(hiddenCards, {
        autoAlpha: 0,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.92,
      });

      if (reduceMotion) {
        showLastFlipbookFrame(frames);
        gsap.set(content, { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 76%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      appendFlipbookFrames(timeline, frames, {
        startAt: 0.04,
        staggerDelay: 0.14,
        frameDuration: 0.02,
      });

      timeline.to(
        content,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.48,
          ease: "power2.out",
        },
        ">",
      );
    },
    { scope: rootRef },
  );

  const animateScatterIn = () => {
    const hiddenCards = hiddenCardRefs.current.filter(Boolean) as HTMLDivElement[];
    hiddenCards.forEach((card, index) => {
      const target = scatterTargets[index];
      if (!target) {
        return;
      }

      gsap.to(card, {
        autoAlpha: 1,
        x: target.x,
        y: target.y,
        rotation: target.rotation,
        scale: 1,
        duration: 0.46,
        delay: index * 0.03,
        ease: "back.out(1.5)",
        overwrite: true,
      });
    });
  };

  const animateScatterOut = () => {
    const hiddenCards = hiddenCardRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.to(hiddenCards, {
      autoAlpha: 0,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 0.92,
      duration: 0.26,
      stagger: 0.02,
      ease: "power2.inOut",
      overwrite: true,
    });
  };

  return (
    <article ref={rootRef} className="wf-past-item">
      <div
        className="wf-past-item-stage"
        onMouseEnter={animateScatterIn}
        onMouseLeave={animateScatterOut}
        onFocus={animateScatterIn}
        onBlur={animateScatterOut}
      >
        <div className="wf-past-item-scatter-layer" aria-hidden>
          {Array.from({ length: hiddenCardCount }).map((_, index) => (
            <div
              key={`${performance.id}-hidden-${index}`}
              ref={(node) => {
                hiddenCardRefs.current[index] = node;
              }}
              className={`wf-past-hidden-card wf-past-hidden-card--${index + 1}`}
            >
              <Image
                src={withBasePath("/images/hakusi5.PNG")}
                alt=""
                fill
                quality={100}
                unoptimized
                sizes="(max-width: 720px) 28vw, 180px"
                className="wf-past-hidden-card-image"
              />
              <span className="wf-past-hidden-card-label wf-maki-title">画像</span>
            </div>
          ))}
        </div>

        <button type="button" className="wf-past-item-button" onClick={onOpen}>
          <div className="wf-past-item-main-shell">
            <div className="wf-past-item-main-stage">
              <div className="wf-past-item-main-frames" aria-hidden>
                {pastFrameSources.map((frameSrc) => (
                  <Image
                    key={`${performance.id}-${frameSrc}`}
                    src={withBasePath(frameSrc)}
                    alt=""
                    fill
                    quality={100}
                    unoptimized
                    sizes="(max-width: 720px) 72vw, 420px"
                    className="js-past-frame wf-past-item-main-image"
                  />
                ))}
              </div>

              <div className="js-past-content wf-past-item-main-content">
                <p className="wf-past-item-subtitle">{performance.subtitle}</p>
                <h2 className="wf-past-item-title wf-maki-title">{performance.title}</h2>
                <div className="wf-past-item-copy">
                  {performance.summaryLines.map((line, index) => (
                    <span key={`${performance.id}-summary-${index}`} className="wf-past-item-line">
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </article>
  );
}
