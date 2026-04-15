"use client";

import { Fragment, type CSSProperties } from "react";
import {
  getWelcomeEventPhoneModalLayout,
  type WelcomeEvent,
  welcomeEventFrameSources,
} from "@/app/events/content";
import { NotebookModal } from "@/components/shared/NotebookModal";
import { wrapTextForMobile } from "@/lib/mobileTextWrap";
import { useVisualViewportTier } from "@/lib/useVisualViewportTier";

type WelcomeEventModalProps = {
  event: WelcomeEvent | null;
  onClose: () => void;
};

type EventModalRootStyle = CSSProperties & Record<`--${string}`, string>;

function getEventDetailLines(event: WelcomeEvent) {
  return [
    event.place ? `場所：${event.place}` : null,
    event.time ? `時間：${event.time}` : null,
  ].filter((line): line is string => Boolean(line));
}

function renderMobileParagraphs(paragraphs: string[][], keyPrefix: string) {
  return paragraphs.map((paragraph, paragraphIndex) => (
    <p
      key={`${keyPrefix}-${paragraphIndex}-${paragraph[0] ?? "paragraph"}`}
      className="wf-events-modal-mobile-paragraph"
    >
      {paragraph.map((line, lineIndex) => (
        <Fragment key={`${keyPrefix}-${paragraphIndex}-${lineIndex}`}>
          <span className="wf-events-modal-mobile-line">{line}</span>
        </Fragment>
      ))}
    </p>
  ));
}

function renderEventBody(
  event: WelcomeEvent,
  isMobileLayout: boolean,
  maxChars = 16,
  minChars = 5,
) {
  const detailLines = getEventDetailLines(event);

  if (!isMobileLayout) {
    return (
      <div className="wf-events-modal-body">
        {detailLines.length > 0 ? (
          <div className="wf-events-modal-meta">
            {detailLines.map((line) => (
              <p key={line} className="wf-events-modal-meta-line">
                {line}
              </p>
            ))}
          </div>
        ) : null}
        <p className="wf-events-modal-description">{event.description}</p>
      </div>
    );
  }

  const descriptionParagraphs = wrapTextForMobile(event.description, maxChars, minChars, true);
  const detailParagraphs = detailLines.map((line) => wrapTextForMobile(line, maxChars, minChars, true));

  return (
    <div className="wf-events-modal-mobile-body">
      {detailParagraphs.length > 0 ? (
        <div className="wf-events-modal-mobile-meta">
          {detailParagraphs.flatMap((paragraphs, detailIndex) =>
            renderMobileParagraphs(paragraphs, `${event.id}-detail-${detailIndex}`),
          )}
        </div>
      ) : null}
      {renderMobileParagraphs(descriptionParagraphs, `${event.id}-description`)}
    </div>
  );
}

export function WelcomeEventModal({ event, onClose }: WelcomeEventModalProps) {
  const viewportTier = useVisualViewportTier();
  const isMobileLayout = viewportTier !== "desktop";

  if (!event) {
    return null;
  }

  const compactTierClassName = isMobileLayout ? ` wf-events-modal-root--${viewportTier}` : "";
  const rootClassName = `wf-events-modal-root${isMobileLayout ? " wf-events-modal-root--mobile" : ""}${compactTierClassName} wf-events-modal-root--${event.id}`;
  const modalLayout = isMobileLayout ? getWelcomeEventPhoneModalLayout(event) : null;
  const textMaxChars =
    viewportTier === "phone"
      ? (modalLayout?.phoneTextMaxChars ?? modalLayout?.textMaxChars)
      : (modalLayout?.tabletTextMaxChars ?? modalLayout?.textMaxChars);
  const textMinChars =
    viewportTier === "phone"
      ? (modalLayout?.phoneTextMinChars ?? modalLayout?.textMinChars)
      : (modalLayout?.tabletTextMinChars ?? modalLayout?.textMinChars);
  const rootStyle: EventModalRootStyle | undefined = modalLayout
    ? {
        "--wf-event-modal-mobile-paper-top": modalLayout.paperTop ?? "39.5%",
        "--wf-event-modal-mobile-paper-right": modalLayout.paperRight ?? "8.2%",
        "--wf-event-modal-mobile-paper-bottom": modalLayout.paperBottom ?? "23.5%",
        "--wf-event-modal-mobile-paper-left": modalLayout.paperLeft ?? "8.2%",
        "--wf-event-modal-mobile-content-padding": modalLayout.contentPadding ?? "16px 16px 14px",
        "--wf-event-modal-mobile-content-gap": modalLayout.contentGap ?? "10px",
        "--wf-event-modal-mobile-title-font-size": modalLayout.titleFontSize ?? "clamp(20px, 5.8vw, 30px)",
        "--wf-event-modal-mobile-title-line-height": modalLayout.titleLineHeight ?? "1.25",
        "--wf-event-modal-mobile-title-margin-top": modalLayout.titleMarginTop ?? "0px",
        "--wf-event-modal-mobile-title-margin-left": modalLayout.titleMarginLeft ?? "0px",
        "--wf-event-modal-mobile-title-margin-bottom": modalLayout.titleMarginBottom ?? "0px",
        "--wf-event-modal-tablet-title-font-size":
          modalLayout.tabletTitleFontSize ?? modalLayout.titleFontSize ?? "30px",
        "--wf-event-modal-tablet-title-margin-top":
          modalLayout.tabletTitleMarginTop ?? modalLayout.titleMarginTop ?? "0px",
        "--wf-event-modal-tablet-title-margin-left":
          modalLayout.tabletTitleMarginLeft ?? modalLayout.titleMarginLeft ?? "0px",
        "--wf-event-modal-tablet-title-margin-bottom":
          modalLayout.tabletTitleMarginBottom ?? modalLayout.titleMarginBottom ?? "0px",
        "--wf-event-modal-tablet-title-offset-x": modalLayout.tabletTitleOffsetX ?? "0px",
        "--wf-event-modal-tablet-title-offset-y": modalLayout.tabletTitleOffsetY ?? "0px",
        "--wf-event-modal-mobile-text-padding": modalLayout.textPadding ?? "2px 6px 2px 2px",
        "--wf-event-modal-mobile-text-margin-top": modalLayout.textMarginTop ?? "0px",
        "--wf-event-modal-mobile-text-margin-left": modalLayout.textMarginLeft ?? "0px",
        "--wf-event-modal-tablet-text-margin-top":
          modalLayout.tabletTextMarginTop ?? modalLayout.textMarginTop ?? "0px",
        "--wf-event-modal-tablet-text-margin-left":
          modalLayout.tabletTextMarginLeft ?? modalLayout.textMarginLeft ?? "0px",
        "--wf-event-modal-tablet-text-offset-x": modalLayout.tabletTextOffsetX ?? "0px",
        "--wf-event-modal-tablet-text-offset-y": modalLayout.tabletTextOffsetY ?? "0px",
        "--wf-event-modal-mobile-text-font-size": modalLayout.textFontSize ?? "clamp(12px, 3.9vw, 16px)",
        "--wf-event-modal-mobile-text-line-height": modalLayout.textLineHeight ?? "1.82",
      }
    : undefined;

  return (
    <NotebookModal
      modalKey={event.id}
      title={event.title}
      body={renderEventBody(
        event,
        isMobileLayout,
        textMaxChars,
        textMinChars,
      )}
      titleId={`wf-events-modal-title-${event.id}`}
      onClose={onClose}
      frameSources={welcomeEventFrameSources}
      rootClassName={rootClassName}
      rootStyle={rootStyle}
    />
  );
}
