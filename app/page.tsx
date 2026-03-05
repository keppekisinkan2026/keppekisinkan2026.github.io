"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ページ読み込み時にふわっと浮かんで回転するアニメ
    gsap.to(".box", { 
      y: -50, 
      rotation: 360, 
      duration: 1.5, 
      repeat: -1, 
      yoyo: true,
      ease: "power2.inOut" 
    });
  }, { scope: container });

  return (
    <main ref={container} className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="box w-32 h-32 bg-teal-400 rounded-xl flex items-center justify-center font-bold text-gray-900">
        テスト
      </div>
    </main>
  );
}
