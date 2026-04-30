import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  description: "お探しのページは見つかりませんでした。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center px-6 py-24 text-center">
      <div className="flex max-w-[520px] flex-col items-center gap-5 text-[#2b3824]">
        <p className="wf-maki-title text-[56px] leading-none text-[#f9fcf6] drop-shadow-[0_2px_6px_rgba(42,62,36,0.18)]">
          404
        </p>
        <h1 className="wf-maki-title text-[34px] leading-[1.35] text-[#f9fcf6] drop-shadow-[0_2px_6px_rgba(42,62,36,0.18)]">
          ページが見つかりません
        </h1>
        <p className="text-[18px] leading-[1.9] text-[#2b3824]">
          URL が変わったか、ページが移動した可能性があります。
        </p>
        <Link
          href="/"
          className="wf-maki-title inline-flex items-center justify-center rounded-full bg-[#96c44b] px-6 py-3 text-[18px] leading-none text-[#f9fcf6] no-underline shadow-[0_6px_18px_rgba(49,66,35,0.16)] transition-opacity hover:opacity-80"
        >
          タイトルへ戻る
        </Link>
      </div>
    </main>
  );
}
