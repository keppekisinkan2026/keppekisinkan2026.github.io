"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { WelcomeEventModal } from "@/components/events/WelcomeEventModal";
import { MAINTENANCE_MOBILE_MAX_WIDTH, REFERENCE_PHONE_WIDTH } from "@/lib/referenceMobile";
import { EVENT_CALENDAR_IMAGE, type WelcomeEvent, welcomeEvents } from "./content";
import { EventTodayBurst } from "./EventTodayBurst";
import {
  getTodayEventHighlightStates,
  getTokyoTodayIso,
  type TodayEventHighlightState,
} from "./todayHighlight";
import { withBasePath } from "@/lib/withBasePath";

const DEBUG_TODAY_ISO: string | null = null;

function getTodayBurstStyle(highlightState?: TodayEventHighlightState): CSSProperties | undefined {
  if (highlightState?.burstVariant !== "capsule-group") {
    return undefined;
  }

  return {
    "--wf-event-today-group-burst-auto-offset-x": highlightState.groupOffsetXPercent ?? "0%",
    "--wf-event-today-group-burst-auto-offset-y": highlightState.groupOffsetYPercent ?? "0%",
    "--wf-event-today-group-burst-auto-scale-x": highlightState.groupScaleX ?? "1",
    "--wf-event-today-group-burst-auto-scale-y": highlightState.groupScaleY ?? "1",
  } as CSSProperties;
}

export function EventsWireframePageClient() {
  const [selectedEvent, setSelectedEvent] = useState<WelcomeEvent | null>(null);
  const todayIso = useMemo(() => DEBUG_TODAY_ISO ?? getTokyoTodayIso(), []);
  const todayHighlightStates = useMemo(
    () => getTodayEventHighlightStates(welcomeEvents, todayIso),
    [todayIso],
  );

  return (
    <WireframeShell
      frameClassName="wf-frame--events"
      innerClassName="wf-frame-inner--events"
      mobileReferenceWidth={REFERENCE_PHONE_WIDTH}
      mobileMaxWidth={MAINTENANCE_MOBILE_MAX_WIDTH}
    >
      <div className="wf-event-page-container">
        <div className="wf-event-booking-shell">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSehMl9s9AeTiCgiPfmov2uHLuXhcZ9QFmLl5f0dtmgQT_BwwQ/viewform"
            className="wf-event-booking-link"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="新歓公演予約フォームを開く"
          >
            <Image
              src={withBasePath("/images/umi100_g.PNG")}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 900px) 96vw, 1080px"
              className="wf-event-booking-image wf-event-booking-image--default"
            />
            <Image
              src={withBasePath("/images/event.PNG")}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 900px) 96vw, 1080px"
              className="wf-event-booking-image wf-event-booking-image--active"
            />
            <span className="wf-event-booking-title wf-maki-title wf-title-hp-text">
              <span className="wf-title-hp-line">予約はこちら</span>
            </span>
          </a>
        </div>

        <div className="wf-event-map-shell">
          <Image
            src={withBasePath(EVENT_CALENDAR_IMAGE.src)}
            alt="新歓カレンダー"
            width={EVENT_CALENDAR_IMAGE.width}
            height={EVENT_CALENDAR_IMAGE.height}
            priority
            unoptimized
            sizes="(max-width: 1280px) 96vw, 1200px"
            className="wf-event-map-image"
          />

          <div className="wf-event-character wf-event-character--left" aria-hidden="true">
            <Image
              src={withBasePath("/images/chara_2.PNG")}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 640px) 120px, (max-width: 1280px) 18vw, 220px"
              className="wf-event-character-image"
            />
          </div>

          <div className="wf-event-speech-bubble wf-event-speech-bubble--left" aria-hidden="true">
            <Image
              src={withBasePath("/images/event_speech_bubble.svg")}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 640px) 210px, (max-width: 900px) 290px, 360px"
              className="wf-event-speech-bubble-image"
            />
            <span className="wf-event-speech-text wf-maki-title">
              <span className="wf-event-speech-line">気になるイベントを</span>
              <span className="wf-event-speech-line">クリック！タップ！</span>
            </span>
          </div>

          <div className="wf-event-character wf-event-character--right" aria-hidden="true">
            <Image
              src={withBasePath("/images/chara_1.PNG")}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 640px) 110px, (max-width: 1280px) 16vw, 200px"
              className="wf-event-character-image"
            />
          </div>

          {welcomeEvents.map((event) => {
            const highlightState = todayHighlightStates.get(event.id);
            const isToday = highlightState?.isToday ?? false;
            const showTodayBurst = highlightState?.renderBurst ?? isToday;

            return (
              <button
                key={event.id}
                type="button"
                className={`wf-event-hotspot${isToday ? " wf-event-hotspot--today" : ""}${
                  event.shape === "capsule" ? " wf-event-hotspot--capsule" : ""
                }`}
                style={{
                  top: event.position.top,
                  left: event.position.left,
                  width: event.position.width,
                  height: event.shape === "capsule" ? event.position.height : undefined,
                  aspectRatio: event.shape === "capsule" ? undefined : "1 / 1",
                  borderRadius: event.shape === "capsule" ? "999px" : "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: isToday ? 4 : 3,
                }}
                onClick={() => setSelectedEvent(event)}
                aria-label={`${event.date} ${event.title} の詳細を開く`}
              >
                {showTodayBurst ? (
                  <EventTodayBurst
                    hiddenSectors={highlightState?.hiddenSectors ?? []}
                    shape={event.shape}
                    variant={highlightState?.burstVariant}
                    style={getTodayBurstStyle(highlightState)}
                  />
                ) : null}
                <span className="sr-only">{`${event.date} ${event.title}`}</span>
              </button>
            );
          })}
        </div>
      </div>

      <WelcomeEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </WireframeShell>
  );
}
