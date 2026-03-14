import Image from "next/image";
import rough from "roughjs/bin/rough";
import { withBasePath } from "@/lib/withBasePath";

export type FlowStepData = {
  id: number;
  title: string;
  description: string[];
};

type FlowStepProps = {
  step: FlowStepData;
  index: number;
  isLast: boolean;
  frameSources: readonly string[];
};

const FLOW_STEP_FRAME_SIZES =
  "(max-width: 700px) 74vw, (max-width: 1100px) 38vw, 420px";

const roughGenerator = rough.generator();

function buildRoughArrowPaths(pathData: string, seed: number) {
  const drawable = roughGenerator.path(pathData, {
    stroke: "rgba(118, 145, 177, 0.88)",
    strokeWidth: 16,
    roughness: 1.95,
    bowing: 1.4,
    fill: "none",
    seed,
  });

  return drawable.sets
    .filter((set) => set.type === "path")
    .map((set) => roughGenerator.opsToPath(set));
}

function getArrowPathData(isLeft: boolean) {
  if (isLeft) {
    return {
      shaft: "M 28 26 C 112 32, 182 68, 244 126 C 286 164, 314 194, 336 212",
      headTop: "M 336 212 C 306 204, 276 186, 244 154",
      headBottom: "M 336 212 C 318 176, 298 144, 274 114",
    };
  }

  return {
    shaft: "M 332 26 C 248 32, 178 68, 116 126 C 74 164, 46 194, 24 212",
    headTop: "M 24 212 C 54 204, 84 186, 116 154",
    headBottom: "M 24 212 C 42 176, 62 144, 86 114",
  };
}

export function FlowStep({ step, index, isLast, frameSources }: FlowStepProps) {
  const isLeft = index % 2 === 0;
  const arrowPathData = getArrowPathData(isLeft);
  const roughArrowPaths = {
    shaft: buildRoughArrowPaths(arrowPathData.shaft, step.id * 10 + 1),
    headTop: buildRoughArrowPaths(arrowPathData.headTop, step.id * 10 + 2),
    headBottom: buildRoughArrowPaths(arrowPathData.headBottom, step.id * 10 + 3),
  };

  return (
    <article
      className={`js-flow-step wf-flow-step ${isLeft ? "wf-flow-step--left" : "wf-flow-step--right"} ${!isLast ? "wf-flow-step--with-arrow" : ""}`}
    >
      <div className="js-flow-step-visual wf-flow-step-card-shell">
        <div className="wf-flow-step-card">
          <div className="wf-flow-step-frame-layer" aria-hidden>
            {frameSources.map((frameSrc) => (
              <Image
                key={`${step.id}-${frameSrc}`}
                src={withBasePath(frameSrc)}
                alt=""
                fill
                quality={100}
                unoptimized
                sizes={FLOW_STEP_FRAME_SIZES}
                className="js-flow-frame wf-flow-step-frame"
              />
            ))}
          </div>

          <div className="js-flow-step-content wf-flow-step-content">
            <p className="wf-flow-step-index">STEP {String(index + 1).padStart(2, "0")}</p>
            <h2 className="wf-flow-step-title wf-maki-title">{step.title}</h2>
            <div className="wf-flow-step-copy">
              {step.description.map((line, lineIndex) => (
                <span key={`${step.id}-${lineIndex}`} className="wf-flow-step-line">
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!isLast ? (
        <svg
          className={`js-flow-arrow wf-flow-step-arrow ${isLeft ? "wf-flow-step-arrow--to-right" : "wf-flow-step-arrow--to-left"}`}
          viewBox="0 0 360 236"
          aria-hidden
        >
          {roughArrowPaths.shaft.map((path) => (
            <path key={`${step.id}-shaft-${path}`} className="js-flow-arrow-path wf-flow-step-arrow-path" d={path} />
          ))}
          {roughArrowPaths.headTop.map((path) => (
            <path
              key={`${step.id}-head-top-${path}`}
              className="js-flow-arrow-path wf-flow-step-arrow-path"
              d={path}
            />
          ))}
          {roughArrowPaths.headBottom.map((path) => (
            <path
              key={`${step.id}-head-bottom-${path}`}
              className="js-flow-arrow-path wf-flow-step-arrow-path"
              d={path}
            />
          ))}
        </svg>
      ) : null}
    </article>
  );
}
