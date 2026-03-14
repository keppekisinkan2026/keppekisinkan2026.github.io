"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlowStep, type FlowStepData } from "@/components/maintenance/flow/FlowStep";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { appendFlipbookFrames, hideFlipbookFrames, showLastFlipbookFrame } from "@/lib/gsap/flipbook";

const flowSteps: FlowStepData[] = [
  {
    id: 1,
    title: "説明会に参加",
    description: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
  },
  {
    id: 2,
    title: "企画を知る",
    description: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
  },
  {
    id: 3,
    title: "見学してみる",
    description: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
  },
  {
    id: 4,
    title: "体験してみる",
    description: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
  },
  {
    id: 5,
    title: "相談してみる",
    description: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
  },
  {
    id: 6,
    title: "手続きを進める",
    description: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
  },
  {
    id: 7,
    title: "参加スタート",
    description: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
  },
];

const flowFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
  "/images/image5.PNG",
] as const;

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FlowWireframePage() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const steps = gsap.utils.toArray<HTMLElement>(".js-flow-step", rootRef.current);
      const refresh = () => ScrollTrigger.refresh();

      steps.forEach((step, index) => {
        const frames = gsap.utils.toArray<HTMLElement>(".js-flow-frame", step);
        const visual = step.querySelector<HTMLElement>(".js-flow-step-visual");
        const content = step.querySelector<HTMLElement>(".js-flow-step-content");
        const ownArrow = step.querySelector<HTMLElement>(".js-flow-arrow");
        const ownArrowPaths = gsap.utils.toArray<SVGPathElement>(".js-flow-arrow-path", step);

        if (frames.length === 0 || !content || !visual) {
          return;
        }

        hideFlipbookFrames(frames);
        gsap.set(visual, { autoAlpha: 0, y: 30 });
        gsap.set(content, { autoAlpha: 0, y: 22 });
        if (ownArrow) {
          gsap.set(ownArrow, { autoAlpha: 0 });
        }

        ownArrowPaths.forEach((path) => {
          const pathLength = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });
        });

        if (reduceMotion) {
          gsap.set(visual, { autoAlpha: 1, y: 0 });
          showLastFlipbookFrame(frames);
          gsap.set(content, { autoAlpha: 1, y: 0 });
          if (ownArrow) {
            gsap.set(ownArrow, { autoAlpha: 1 });
          }
          gsap.set(ownArrowPaths, { strokeDashoffset: 0 });
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 72%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        });

        const flipbookStart = 0.04;
        const flipbookStagger = 0.16;
        const flipbookDuration = 0.03;
        const flipbookEnd =
          flipbookStart + flipbookStagger * Math.max(0, frames.length - 1) + flipbookDuration;

        timeline.to(
          visual,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.38,
            ease: "power2.out",
          },
          0,
        );

        appendFlipbookFrames(timeline, frames, {
          startAt: flipbookStart,
          staggerDelay: flipbookStagger,
          frameDuration: flipbookDuration,
        });

        timeline.to(
          content,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            ease: "power2.out",
          },
          flipbookEnd + 0.08,
        );

        if (index < steps.length - 1 && ownArrow && ownArrowPaths.length > 0) {
          timeline.set(ownArrow, { autoAlpha: 1 }, ">");
          timeline.to(
            ownArrowPaths,
            {
              strokeDashoffset: 0,
              duration: 0.82,
              ease: "power1.out",
              stagger: 0.05,
            },
            ">",
          );
        }
      });

      window.addEventListener("load", refresh);
      requestAnimationFrame(refresh);

      return () => {
        window.removeEventListener("load", refresh);
      };
    },
    { scope: rootRef },
  );

  return (
    <WireframeShell
      rootRef={rootRef}
      frameClassName="wf-frame--flow"
      innerClassName="wf-frame-inner--flow"
    >
      <section className="wf-flow-page">
        <header className="wf-flow-page-header">
          <h1 className="wf-flow-page-title wf-maki-title">企画の流れ</h1>
        </header>

        <div className="wf-flow-step-list">
          {flowSteps.map((step, index) => (
            <FlowStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === flowSteps.length - 1}
              frameSources={flowFrameSources}
            />
          ))}
        </div>
      </section>
    </WireframeShell>
  );
}
