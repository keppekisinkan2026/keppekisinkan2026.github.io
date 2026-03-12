import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";

export function WireframeTextureLayer() {
  return (
    <div className="wf-texture-layer" aria-hidden>
      <Image
        src={withBasePath("/images/back.jpeg")}
        alt=""
        fill
        priority
        quality={95}
        unoptimized
        sizes="100vw"
        className="wf-texture-image"
      />
      <div className="wf-texture-overlay" />
    </div>
  );
}
