"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";
import { withBasePath } from "@/lib/withBasePath";
import type { PastPerformance } from "./PastItem";

type PastModalProps = {
  performance: PastPerformance | null;
  onClose: () => void;
};

const modalFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
  "/images/image5.PNG",
] as const;

export function PastModal({ performance, onClose }: PastModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!performance) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [performance, onClose]);

  useGSAP(
    () => {
      if (!performance || !rootRef.current) {
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const overlay = rootRef.current.querySelector<HTMLElement>(".js-past-modal-overlay");
      const panel = rootRef.current.querySelector<HTMLElement>(".js-past-modal-panel");
      const frames = gsap.utils.toArray<HTMLElement>(".js-past-modal-frame", rootRef.current);
      const content = rootRef.current.querySelector<HTMLElement>(".js-past-modal-content");

      if (!overlay || !panel || frames.length === 0 || !content) {
        return;
      }

      hideFlipbookFrames(frames);
      gsap.set(content, { autoAlpha: 0, y: 18 });

      if (reduceMotion) {
        gsap.set([overlay, panel], { autoAlpha: 1 });
        showLastFlipbookFrame(frames);
        gsap.set(content, { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline();

      timeline.fromTo(
        overlay,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.22,
          ease: "power1.out",
        },
      );

      timeline.fromTo(
        panel,
        { autoAlpha: 0, y: 24, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        0,
      );

      appendFlipbookFrames(timeline, frames, {
        startAt: 0.08,
        staggerDelay: 0.14,
        frameDuration: 0.02,
      });

      timeline.to(
        content,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        ">",
      );
    },
    { dependencies: [performance], scope: rootRef, revertOnUpdate: true },
  );

  if (!performance) {
    return null;
  }

  return (
    <div ref={rootRef} className="wf-past-modal-root">
      <button
        type="button"
        className="js-past-modal-overlay wf-past-modal-overlay"
        onClick={onClose}
        aria-label="モーダルを閉じる"
      />

      <div className="js-past-modal-panel wf-past-modal-panel" role="dialog" aria-modal="true">
        <button type="button" className="wf-past-modal-close wf-maki-title" onClick={onClose} aria-label="閉じる">
          ×
        </button>

        <div className="wf-past-modal-stage">
          <div className="wf-past-modal-frames" aria-hidden>
            {modalFrameSources.map((frameSrc) => (
              <Image
                key={`${performance.id}-${frameSrc}`}
                src={withBasePath(frameSrc)}
                alt=""
                fill
                quality={100}
                unoptimized
                sizes="(max-width: 820px) 82vw, 620px"
                className="js-past-modal-frame wf-past-modal-image"
              />
            ))}
          </div>

          <div className="js-past-modal-content wf-past-modal-content">
            <p className="wf-past-modal-subtitle">{performance.subtitle}</p>
            <h2 className="wf-past-modal-title wf-maki-title">{performance.title}</h2>
            <p className="wf-past-modal-text">{performance.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
