import type { ReactNode } from "react";
import { WireframeTextureLayer } from "./WireframeTextureLayer";

type WireframeShellProps = {
  children: ReactNode;
  screenClassName?: string;
  frameClassName?: string;
  innerClassName?: string;
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function WireframeShell({
  children,
  screenClassName,
  frameClassName,
  innerClassName,
}: WireframeShellProps) {
  return (
    <main className={joinClassNames("wf-screen", screenClassName)}>
      <WireframeTextureLayer />
      <div className={joinClassNames("wf-frame", frameClassName)}>
        <div className={joinClassNames("wf-frame-inner", innerClassName)}>{children}</div>
      </div>
    </main>
  );
}
