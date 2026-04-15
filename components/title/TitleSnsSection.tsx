import Image from "next/image";
import { snsBlockLinks, snsFrameSources, specialSnsBlockLinks, specialSnsFrameSources } from "@/app/title/content";
import { withBasePath } from "@/lib/withBasePath";
import { TitleFrameSequence } from "./TitleFrameSequence";

export function TitleSnsSection() {
  const renderSnsBlock = ({
    title,
    links,
    panelClassName,
    contentClassName,
    listClassName,
    bubbleClassName,
    frameSources,
    frameClassName,
    getFrameClassName,
  }: {
    title: string;
    links: typeof snsBlockLinks;
    panelClassName?: string;
    contentClassName?: string;
    listClassName?: string;
    bubbleClassName?: string;
    frameSources?: readonly string[];
    frameClassName?: string;
    getFrameClassName?: (index: number, frameCount: number) => string | undefined;
  }) => (
    <div className={`js-title-sns-block wf-title-sns-panel-shell${panelClassName ? ` ${panelClassName}` : ""}`}>
      <div className="js-title-reveal wf-title-sns-panel">
        <div className="wf-title-sns-frame-layer" aria-hidden>
          <TitleFrameSequence
            frameSources={frameSources ?? snsFrameSources}
            sizes="(max-width: 640px) 94vw, (max-width: 1024px) 92vw, 1320px"
            className="js-sns-frame wf-title-sns-frame"
            getClassName={(index) => getFrameClassName?.(index, (frameSources ?? snsFrameSources).length) ?? frameClassName}
            getStyle={(index) => ({ opacity: index === 0 ? 1 : 0 })}
          />
        </div>

        <div className={`wf-title-sns-content${contentClassName ? ` ${contentClassName}` : ""}`}>
          <h2 className="js-sns-title wf-maki-title wf-title-section-title">{title}</h2>

          <ul className={`wf-title-sns-list${listClassName ? ` ${listClassName}` : ""}`}>
            {links.map((item) => (
              <li key={`${title}-${item.id}`}>
                <a
                  href={item.href}
                  className="js-sns-icon wf-title-sns-link"
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className={`wf-title-sns-bubble${bubbleClassName ? ` ${bubbleClassName}` : ""}`}>
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
    </div>
  );

  return (
    <section id="sns" className="wf-title-scroll-block wf-title-sns-stage wf-title-sns-section">
      <div className="wf-title-sns-stack">
        {renderSnsBlock({
          title: "SNS",
          links: snsBlockLinks,
          frameSources: snsFrameSources,
        })}

        {renderSnsBlock({
          title: "新歓イベント特設SNSはこちら！",
          links: specialSnsBlockLinks,
          panelClassName: "wf-title-sns-panel-shell--special",
          contentClassName: "wf-title-sns-content--special",
          listClassName: "wf-title-sns-list--special",
          bubbleClassName: "wf-title-sns-bubble--special",
          frameSources: specialSnsFrameSources,
          getFrameClassName: (index, frameCount) =>
            index === frameCount - 1 ? undefined : "wf-title-sns-frame--special",
        })}
      </div>
    </section>
  );
}
