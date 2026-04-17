import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";

export function TitleHpSection() {
  return (
    <section className="js-title-hp-stack wf-title-scroll-block">
      <a
        href="https://keppeki.github.io/html/stages/100yearstothesea.html"
        className="js-title-hp-button wf-title-hp-button"
        aria-label="新歓公演特設サイトはこちら"
      >
        <span className="wf-title-hp-button-stage" aria-hidden>
          <Image
            src={withBasePath("/images/umi100_title_g.PNG")}
            alt=""
            fill
            quality={100}
            unoptimized
            sizes="(max-width: 640px) 94vw, (max-width: 1024px) 92vw, 1260px"
            className="wf-title-hp-image wf-title-hp-image--base"
          />
          <Image
            src={withBasePath("/images/umi100_title.PNG")}
            alt=""
            fill
            quality={100}
            unoptimized
            sizes="(max-width: 640px) 94vw, (max-width: 1024px) 92vw, 1260px"
            className="wf-title-hp-image wf-title-hp-image--hover"
          />
        </span>
        <span className="wf-maki-title wf-title-hp-text">
          <span className="wf-title-hp-line">新歓公演</span>
          <span className="wf-title-hp-line">特設サイトはこちら</span>
        </span>
      </a>
    </section>
  );
}
