"use client";

import { useEffect, useRef } from "react";

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function CrayonPanelTexture() {
  const rootRef = useRef<HTMLSpanElement>(null);
  const crayonRootRef = useRef<HTMLSpanElement>(null);
  const pencilCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let p5Instance: import("p5").default | null = null;
    let removeResizeListener: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let drawCrayonTexture: (() => void) | null = null;
    let rafId: number | null = null;
    let drawPencilTexture: (() => void) | null = null;

    const initializeTexture = async () => {
      const root = rootRef.current;
      const crayonRoot = crayonRootRef.current;
      const pencilCanvas = pencilCanvasRef.current;
      if (!root || !crayonRoot || !pencilCanvas) {
        return;
      }

      const safeRedraw = () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
        rafId = window.requestAnimationFrame(() => {
          if (disposed) {
            return;
          }
          const width = Math.max(1, root.clientWidth);
          const height = Math.max(1, root.clientHeight);
          if (p5Instance) {
            p5Instance.resizeCanvas(width, height);
            drawCrayonTexture?.();
          }
          drawPencilTexture?.();
        });
      };

      try {
        const [{ default: P5 }, { default: rough }] = await Promise.all([
          import("p5"),
          import("roughjs"),
        ]);

        if (disposed) {
          return;
        }

        drawPencilTexture = () => {
          const width = Math.max(1, root.clientWidth);
          const height = Math.max(1, root.clientHeight);
          const dpr = window.devicePixelRatio || 1;

          pencilCanvas.width = Math.floor(width * dpr);
          pencilCanvas.height = Math.floor(height * dpr);
          pencilCanvas.style.width = `${width}px`;
          pencilCanvas.style.height = `${height}px`;

          const context = pencilCanvas.getContext("2d");
          if (!context) {
            return;
          }

          context.setTransform(dpr, 0, 0, dpr, 0, 0);
          context.clearRect(0, 0, width, height);

          const roughCanvas = rough.canvas(pencilCanvas);

          const topY = randomBetween(4, 7);
          const bottomY = height - randomBetween(4, 7);

          roughCanvas.linearPath(
            [
              [randomBetween(4, 10), topY + randomBetween(-1.2, 1.2)],
              [width * 0.2, topY + randomBetween(-1.8, 1.8)],
              [width * 0.45, topY + randomBetween(-1.8, 1.8)],
              [width * 0.72, topY + randomBetween(-1.6, 1.6)],
              [width - randomBetween(4, 10), topY + randomBetween(-1.2, 1.2)],
            ],
            {
              stroke: "rgba(35, 43, 35, 0.5)",
              strokeWidth: randomBetween(1.1, 1.8),
              roughness: randomBetween(1.9, 2.8),
              bowing: randomBetween(1.8, 3),
            },
          );

          roughCanvas.linearPath(
            [
              [randomBetween(4, 10), bottomY + randomBetween(-1.3, 1.3)],
              [width * 0.26, bottomY + randomBetween(-1.8, 1.8)],
              [width * 0.56, bottomY + randomBetween(-1.8, 1.8)],
              [width * 0.8, bottomY + randomBetween(-1.7, 1.7)],
              [width - randomBetween(4, 10), bottomY + randomBetween(-1.3, 1.3)],
            ],
            {
              stroke: "rgba(35, 43, 35, 0.52)",
              strokeWidth: randomBetween(1.1, 1.7),
              roughness: randomBetween(1.8, 2.6),
              bowing: randomBetween(1.7, 2.8),
            },
          );

          const leftX = randomBetween(2, 4);
          const rightX = width - randomBetween(2, 4);

          roughCanvas.line(leftX, height * 0.08, leftX, height * 0.36, {
            stroke: "rgba(35, 43, 35, 0.44)",
            strokeWidth: randomBetween(0.8, 1.4),
            roughness: randomBetween(1.7, 2.4),
            bowing: randomBetween(1.1, 2.2),
          });

          roughCanvas.line(leftX, height * 0.58, leftX, height * 0.9, {
            stroke: "rgba(35, 43, 35, 0.42)",
            strokeWidth: randomBetween(0.8, 1.4),
            roughness: randomBetween(1.7, 2.4),
            bowing: randomBetween(1.1, 2.2),
          });

          roughCanvas.line(rightX, height * 0.12, rightX, height * 0.32, {
            stroke: "rgba(35, 43, 35, 0.44)",
            strokeWidth: randomBetween(0.8, 1.4),
            roughness: randomBetween(1.7, 2.4),
            bowing: randomBetween(1.1, 2.2),
          });

          roughCanvas.line(rightX, height * 0.54, rightX, height * 0.88, {
            stroke: "rgba(35, 43, 35, 0.44)",
            strokeWidth: randomBetween(0.8, 1.4),
            roughness: randomBetween(1.7, 2.4),
            bowing: randomBetween(1.1, 2.2),
          });
        };

        const sketch = (p: import("p5").default) => {
          drawCrayonTexture = () => {
            p.clear();
            p.noFill();

            for (let pass = 0; pass < 3; pass += 1) {
              for (let y = -20; y <= p.height + 20; y += 10) {
                p.stroke(
                  p.random(150, 180),
                  p.random(190, 220),
                  p.random(82, 112),
                  p.random(24, 44),
                );
                p.strokeWeight(p.random(7, 13));
                p.beginShape();
                for (let x = -20; x <= p.width + 20; x += 26) {
                  p.vertex(x, y + pass * 2 + p.random(-4, 4));
                }
                p.endShape();
              }
            }

            for (let i = 0; i < Math.max(14, Math.floor(p.width / 7)); i += 1) {
              const x = p.random(0, p.width);
              const y1 = p.random(-10, p.height * 0.72);
              const y2 = y1 + p.random(p.height * 0.12, p.height * 0.48);
              p.stroke(228, 244, 208, p.random(10, 28));
              p.strokeWeight(p.random(2, 5));
              p.line(x, y1, x + p.random(-3, 3), y2);
            }

            p.noStroke();
            const grainCount = Math.max(120, Math.floor((p.width * p.height) / 300));
            for (let i = 0; i < grainCount; i += 1) {
              const isLight = Math.random() > 0.5;
              if (isLight) {
                p.fill(239, 250, 232, p.random(9, 20));
              } else {
                p.fill(118, 154, 68, p.random(8, 20));
              }
              p.circle(p.random(0, p.width), p.random(0, p.height), p.random(0.8, 2.2));
            }
          };

          p.setup = () => {
            const width = Math.max(1, root.clientWidth);
            const height = Math.max(1, root.clientHeight);
            p.pixelDensity(1);
            const canvas = p.createCanvas(width, height);
            canvas.parent(crayonRoot);
            drawCrayonTexture?.();
            p.noLoop();
          };
        };

        p5Instance = new P5(sketch, crayonRoot);
        drawPencilTexture();

        const handleResize = () => {
          safeRedraw();
        };

        window.addEventListener("resize", handleResize);
        removeResizeListener = () => {
          window.removeEventListener("resize", handleResize);
        };

        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(() => {
            safeRedraw();
          });
          resizeObserver.observe(root);
        }
      } catch {
        // Keep the page interactive even if texture libs fail at runtime.
      }
    };

    void initializeTexture();

    return () => {
      disposed = true;
      removeResizeListener?.();
      resizeObserver?.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      p5Instance?.remove();
    };
  }, []);

  return (
    <span className="wf-panel-texture" aria-hidden ref={rootRef}>
      <span ref={crayonRootRef} className="wf-panel-texture-crayon" />
      <canvas ref={pencilCanvasRef} className="wf-panel-texture-pencil" />
    </span>
  );
}
