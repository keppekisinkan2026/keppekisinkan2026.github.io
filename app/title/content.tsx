import type { ReactNode } from "react";
import { socialLinks } from "@/lib/socialLinkData";

export const openingFrameSources = [
  "/images/title1.png",
  "/images/title2.png",
  "/images/title3.png",
  "/images/title4.png",
  "/images/title5.png",
] as const;

export const snsFrameSources = ["/images/sns1.PNG", "/images/sns2.PNG", "/images/sns3.PNG", "/images/sns4.png"] as const;
export const specialSnsFrameSources = [
  "/images/sns1.PNG",
  "/images/sns2.PNG",
  "/images/sns3.PNG",
  "/images/sns4.png",
  "/images/sns5.PNG",
] as const;

export const aboutImg1FrameSources = ["/images/i1_1.PNG", "/images/i1_2.PNG", "/images/i1_3.PNG", "/images/i1.PNG"] as const;
export const aboutCommonAnimFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
] as const;
export const aboutImg2FrameSources = [...aboutCommonAnimFrameSources, "/images/i2.PNG"] as const;
export const aboutImg3FrameSources = [...aboutCommonAnimFrameSources, "/images/i3.PNG"] as const;
export const aboutImg4FrameSources = [...aboutCommonAnimFrameSources, "/images/i4.PNG"] as const;
export const aboutImg5FrameSources = [...aboutCommonAnimFrameSources, "/images/i5.PNG"] as const;
export const aboutImgSinzinFrameSources = [...aboutCommonAnimFrameSources, "/images/sinzin.PNG"] as const;
export const aboutImgFuneFrameSources = [...aboutCommonAnimFrameSources, "/images/fune.PNG"] as const;
export const aboutImgPichiFrameSources = [...aboutCommonAnimFrameSources, "/images/pichi.PNG"] as const;

function renderAboutMobileLines(...lines: string[]) {
  return lines.map((line, index) => (
    <span key={`${line}-${index}`} className="wf-about-mobile-line">
      {line}
    </span>
  ));
}

export const aboutCampusText = (
  <div className="js-about-text-container wf-about-text-container">
    <h3 className="wf-about-subheading">
      {renderAboutMobileLines("さまざまな大学の学生が集まる", "インカレサークル")}
    </h3>
    <p className="js-about-text wf-about-text">
      {renderAboutMobileLines(
        "団員は現在80名ほど(2026年現在)。",
        "京都大学だけでなく、京都芸術大学、",
        "同志社大学、立命館大学、京都産業大学、",
        "京都工芸繊維大学、龍谷大学、大谷大学など、",
        "演劇を愛する学生が",
        "さまざまな大学から集まっています。",
      )}
    </p>
  </div>
);

export const aboutProduceText = (
  <div className="js-about-text-container wf-about-text-container">
    <h3 className="wf-about-subheading">プロデュース制</h3>
    <p className="js-about-text wf-about-text">
      {renderAboutMobileLines(
        "劇団ケッペキの最大の特徴は、",
        "定期公演制ではなく、全ての団員が",
        "公演を企画することができる",
        "プロデュース制を採用していることです。",
        "座長をおかないことで、団員一人一人の",
        "「芝居を創りたい」という想いを",
        "最大限に尊重しています。",
        "これは様々な劇団が存在する",
        "京都の学生演劇界においても",
        "珍しい制度です。",
        "また団全体としてではなく、",
        "団員が集まり結成したユニットによる",
        "「ユニット公演」も年に数回あり、",
        "かなり自由度の高い演劇活動が",
        "可能となっています。",
      )}
    </p>
  </div>
);

export const aboutYearRoundText = (
  <div className="js-about-text-container wf-about-text-container">
    <h3 className="wf-about-subheading">年間を通して活動</h3>
    <p className="js-about-text wf-about-text">
      {renderAboutMobileLines(
        "ケッペキでは規模も形態も多様な公演を",
        "例年5～10本行ってきました。",
        "新型コロナウイルス感染症の流行を受け、",
        "2020年、2021年と",
        "対面形式の公演を打てずにいましたが、",
        "2022年12月",
        "「来るもの拒まずおかえり公演『無差別』」の",
        "上演を皮切りに対面での活動を解禁し、",
        "2025年も新人公演、卒業公演、",
        "新歓公演や夏公演など、",
        "活発に公演しています。",
      )}
    </p>
  </div>
);

export const aboutHistoryParagraphs: readonly ReactNode[] = [
  <>
    {renderAboutMobileLines(
      "劇団鞠小路、VOL.0を経て、",
      "1993年に京都大学学生部公認サークルとして",
      "総合芸術集団潔癖青年文化団が",
      "結成されました。",
    )}
  </>,
  <>
    {renderAboutMobileLines(
      "1995年には劇団ケッペキと改称し、",
      "京都大学公認の演劇サークルとして",
      "現在で結成34年目となります。",
    )}
  </>,
];

const snsBlockOrder = ["hp", "x", "instagram", "note", "youtube"] as const;
const specialSnsBlockOrder = ["x", "instagram", "note"] as const;

export const snsBlockLinks = snsBlockOrder
  .map((id) => socialLinks.find((item) => item.id === id))
  .filter((item): item is (typeof socialLinks)[number] => Boolean(item));

const specialSnsBlockHrefMap = {
  x: "https://x.com/keppeki_2026",
  instagram: "https://www.instagram.com/g.keppeki.2026shinkan",
  note: "https://note.com/keppeki_shinkan",
} as const;

export const specialSnsBlockLinks = specialSnsBlockOrder
  .map((id) => socialLinks.find((item) => item.id === id))
  .filter((item): item is (typeof socialLinks)[number] => Boolean(item))
  .map((item) => ({
    ...item,
    href: specialSnsBlockHrefMap[item.id as keyof typeof specialSnsBlockHrefMap] ?? item.href,
  }));
