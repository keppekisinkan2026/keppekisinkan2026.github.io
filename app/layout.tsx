import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "./components/Header";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import {
  createDefaultOpenGraph,
  createDefaultTwitter,
  DEFAULT_SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const makiCircle = localFont({
  src: "../public/fonts/makiirclehand.ttf",
  variable: "--font-maki-circle",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "2026年度新歓特設サイト | 劇団ケッペキ",
    template: "%s | 劇団ケッペキ",
  },
  verification: {
    google: "pNbcPoCmvDi7DzCyCnUANAjbCBhTIEymct2vvu6EYPg",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  description: DEFAULT_SITE_DESCRIPTION,
  openGraph: createDefaultOpenGraph(),
  twitter: createDefaultTwitter(),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={makiCircle.variable}>
        <Header />
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
