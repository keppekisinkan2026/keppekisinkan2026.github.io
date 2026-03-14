"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { WireframeShell } from "@/components/wireframe/WireframeShell";
import { PastItem, type PastPerformance } from "@/components/maintenance/past/PastItem";
import { PastModal } from "@/components/maintenance/past/PastModal";
import { withBasePath } from "@/lib/withBasePath";

const pastPerformances: PastPerformance[] = [
  {
    id: 1,
    title: "過去公演 01",
    subtitle: "春公演",
    summaryLines: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
    synopsis:
      "ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。",
  },
  {
    id: 2,
    title: "過去公演 02",
    subtitle: "初夏公演",
    summaryLines: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
    synopsis:
      "ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。",
  },
  {
    id: 3,
    title: "過去公演 03",
    subtitle: "夏公演",
    summaryLines: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
    synopsis:
      "ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。",
  },
  {
    id: 4,
    title: "過去公演 04",
    subtitle: "秋公演",
    summaryLines: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
    synopsis:
      "ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。",
  },
  {
    id: 5,
    title: "過去公演 05",
    subtitle: "冬公演",
    summaryLines: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
    synopsis:
      "ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。",
  },
  {
    id: 6,
    title: "過去公演 06",
    subtitle: "卒業公演",
    summaryLines: ["テキストが入ります", "テキストが入ります", "テキストが入ります"],
    synopsis:
      "ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。ここに公演のあらすじや紹介文が入ります。",
  },
];

export default function PastWireframePage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedPerformance = useMemo(
    () => pastPerformances.find((item) => item.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <WireframeShell frameClassName="wf-frame--past" innerClassName="wf-frame-inner--past">
      <section className="wf-past-page">
        <div className="wf-past-board-wrapper">
          <div className="wf-past-board-bg-layer" aria-hidden>
            <Image
              src={withBasePath("/images/block_large.PNG")}
              alt=""
              fill
              quality={100}
              unoptimized
              sizes="(max-width: 1240px) 100vw, 1200px"
              className="wf-past-board-bg"
            />
          </div>

          <div className="wf-past-board-content">
            <header className="wf-past-board-header">
              <h1 className="wf-past-board-title wf-maki-title">過去公演</h1>
            </header>

            <div className="wf-past-list">
              {pastPerformances.map((performance) => (
                <PastItem
                  key={performance.id}
                  performance={performance}
                  onOpen={() => setSelectedId(performance.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <PastModal performance={selectedPerformance} onClose={() => setSelectedId(null)} />
    </WireframeShell>
  );
}
