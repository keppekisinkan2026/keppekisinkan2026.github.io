"use client";

import { useEffect, useRef } from "react";
import { RoughSVG } from "roughjs/bin/svg";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { withBasePath } from "@/lib/withBasePath";

const departments = ["企画責任", "宣伝部", "演出", "役者", "舞台", "音響", "照明", "小道具", "制作", "宣伝美術"];

export default function DepartmentsWireframePage() {
  const vineSvgRef = useRef<SVGSVGElement>(null);
  const vinePathGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const vineSvg = vineSvgRef.current;
    const vinePathGroup = vinePathGroupRef.current;

    if (!vineSvg || !vinePathGroup) {
      return;
    }

    const renderVine = () => {
      const treeHeight = Math.max(1200, Math.round(vineSvg.getBoundingClientRect().height || 1200));
      const controlY1 = Math.round(treeHeight * 0.25);
      const controlY2 = Math.round(treeHeight * 0.5);
      const controlY3 = Math.round(treeHeight * 0.76);
      const midY = Math.round(treeHeight * 0.72);

      vinePathGroup.innerHTML = "";
      vineSvg.setAttribute("viewBox", `0 0 100 ${treeHeight}`);

      const roughFactory = new RoughSVG(vineSvg);
      const vinePath = roughFactory.path(
        `M 50 0 C 80 ${controlY1}, 20 ${controlY2}, 50 ${midY} S 20 ${controlY3}, 50 ${treeHeight}`,
        {
          stroke: "url(#vineTexture)",
          strokeWidth: 12,
          roughness: 1.5,
          bowing: 1.2,
          fill: "none",
          seed: 2026,
        },
      );

      vinePathGroup.appendChild(vinePath);

      const paths = Array.from(vinePathGroup.querySelectorAll<SVGPathElement>("path"));
      paths.forEach((path) => {
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
      });
    };

    renderVine();
    window.addEventListener("resize", renderVine);

    return () => {
      window.removeEventListener("resize", renderVine);
      vinePathGroup.innerHTML = "";
    };
  }, []);

  return (
    <WireframeShell>
      <section className="wf-departments-stage">
        <div className="wf-department-tree">
          <svg ref={vineSvgRef} className="wf-department-vine-svg" aria-hidden preserveAspectRatio="none">
            <defs>
              <pattern id="vineTexture" patternUnits="userSpaceOnUse" width="200" height="200">
                <image
                  href={withBasePath("/images/tuta.png")}
                  x="0"
                  y="0"
                  width="200"
                  height="200"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
            <g ref={vinePathGroupRef} />
          </svg>
          <ul className="wf-department-list">
            {departments.map((department, index) => (
              <li key={department} className={`wf-department-item ${index % 2 === 0 ? "left" : "right"}`} />
            ))}
          </ul>
        </div>
      </section>
    </WireframeShell>
  );
}
