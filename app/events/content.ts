export type WelcomeEventPhoneModalLayout = {
  paperTop?: string;
  paperRight?: string;
  paperBottom?: string;
  paperLeft?: string;
  contentPadding?: string;
  contentGap?: string;
  titleFontSize?: string;
  titleLineHeight?: string;
  titleMarginTop?: string;
  titleMarginLeft?: string;
  titleMarginBottom?: string;
  tabletTitleFontSize?: string;
  tabletTitleMarginTop?: string;
  tabletTitleMarginLeft?: string;
  tabletTitleMarginBottom?: string;
  tabletTitleOffsetX?: string;
  tabletTitleOffsetY?: string;
  textPadding?: string;
  textMarginTop?: string;
  textMarginLeft?: string;
  tabletTextMarginTop?: string;
  tabletTextMarginLeft?: string;
  tabletTextOffsetX?: string;
  tabletTextOffsetY?: string;
  textFontSize?: string;
  textLineHeight?: string;
  textMaxChars?: number;
  textMinChars?: number;
  phoneTextMaxChars?: number;
  phoneTextMinChars?: number;
  tabletTextMaxChars?: number;
  tabletTextMinChars?: number;
};

export type WelcomeEvent = {
  id: string;
  date: string;
  dates: string[];
  title: string;
  description: string;
  place?: string;
  time?: string;
  meetingId?: string;
  passcode?: string;
  shape?: "circle" | "capsule";
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
};

type WelcomeEventInput = Omit<WelcomeEvent, "place" | "time"> & Partial<Pick<WelcomeEvent, "place" | "time">>;

const defaultWelcomeEventPhoneModalLayout: WelcomeEventPhoneModalLayout = {
  paperTop: "41%",
  paperRight: "8.2%",
  paperBottom: "23.5%",
  paperLeft: "8.2%",
  contentPadding: "16px 16px 14px",
  contentGap: "10px",
  titleFontSize: "clamp(20px, calc(5.8 * var(--wf-reference-phone-vw)), 30px)",
  titleLineHeight: "1.25",
  titleMarginTop: "0px",
  titleMarginLeft: "0px",
  titleMarginBottom: "0px",
  tabletTitleFontSize: "40px",
  tabletTitleMarginTop: "0px",
  tabletTitleMarginLeft: "0px",
  tabletTitleMarginBottom: "0px",
  tabletTitleOffsetX: "0px",
  tabletTitleOffsetY: "-20px",
  textPadding: "2px 6px 2px 2px",
  textMarginTop: "0px",
  textMarginLeft: "0px",
  tabletTextMarginTop: "30px",
  tabletTextMarginLeft: "0px",
  tabletTextOffsetX: "0px",
  tabletTextOffsetY: "-50px",
  textFontSize: "clamp(12px, calc(3.9 * var(--wf-reference-phone-vw)), 16px)",
  textLineHeight: "1.82",
  textMaxChars: 16,
  textMinChars: 5,
  phoneTextMaxChars: 13,
  phoneTextMinChars: 5,
  tabletTextMaxChars: 16,
  tabletTextMinChars: 5,
};

export const welcomeEventPhoneModalLayoutOverrides: Partial<Record<string, WelcomeEventPhoneModalLayout>> = {};

export function getWelcomeEventPhoneModalLayout(event: WelcomeEvent): WelcomeEventPhoneModalLayout {
  return {
    ...defaultWelcomeEventPhoneModalLayout,
    ...(welcomeEventPhoneModalLayoutOverrides[event.id] ?? {}),
  };
}

export const EVENT_CALENDAR_IMAGE = {
  src: "/images/calendar.JPG",
  width: 1034,
  height: 1582,
} as const;

export const welcomeEventFrameSources = [
  "/images/image1.PNG",
  "/images/image2.PNG",
  "/images/image3.PNG",
  "/images/image4.PNG",
  "/images/image5.PNG",
] as const;

const eventDates = (...dates: string[]) => dates;

const welcomeEventDefinitions = [
  { id: "ev1", date: "3/28", dates: eventDates("2026-03-28"), title: "立て看イベント", description: "京都大学といえば立て看板！入試会場に貼られているモノが有名ですが、サークルごとの宣伝物として作ることもあります。そんな宣伝立て看板を一緒に作ってみよう！という企画です。板にガッツリペンキでイラストを描くというのはなかなか無い体験です。一回生に体験しておくべき新歓イベントとしては、演劇関係なくかなりおすすめです。", position: { top: "24.5%", left: "76.4%", width: "12.0%", height: "12.0%" } },
  { id: "ev2", date: "3/29", dates: eventDates("2026-03-29"), title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "23.3%", left: "89%", width: "12.0%", height: "12.0%" } },
  { id: "ev3", date: "4/2~4/3", dates: eventDates("2026-04-02", "2026-04-03"), title: "お花見", description: "紅萌祭の裏で河川敷にてお花見をします！演劇興味あるけどいきなり役者体験はちょっと....という方！まずは団員とゆる〜く桜を愛でましょう。", shape: "capsule", position: { top: "35.6%", left: "56%", width: "26%", height: "8%" } },
  { id: "ev4", date: "4/4", dates: eventDates("2026-04-04"), title: "大規模上映会", description: "劇団ケッペキの過去公演を上演します！「劇団ケッペキってどんな舞台を作るんだろう.....?」「今までどんな演目を上演したんだろう」と気になっているそこのアナタ。タダで観劇できるチャンスです。", position: { top: "35.5%", left: "75%", width: "12.0%", height: "12.0%" } },
  { id: "ev5", date: "4/5", dates: eventDates("2026-04-05"), title: "衣装小道具イベント", description: "用意した衣装と過去の台本を使って、自分なりの『ソフトプラン』を立ててみよう！『このキャラならこんな服着そうじゃない？』なんてワイワイ言いながら、キャラクターを形にする楽しさを体験しに来てください！", position: { top: "33.5%", left: "87%", width: "12.0%", height: "12.0%" } },
  { id: "ev6", date: "4/5", dates: eventDates("2026-04-05"), title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "38%", left: "89.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev7", date: "4/6", dates: eventDates("2026-04-06"), title: "宣伝美術イベント", description: "京阪七条の周辺をぶらっと散策して写真をパシャリ。それを加工して、公演の顔となる宣伝美術を作ってみましょう。スマホ一台あればOK。貴方のセンスを爆発させましょう。", position: { top: "44%", left: "14%", width: "12.0%", height: "12.0%" } },
  { id: "ev8", date: "4/6", dates: eventDates("2026-04-06"), title: "舞台イベント", description: "実際の工具を使って、椅子作りに挑戦！インパクトドライバーとか触ったことない……って人でも大丈夫。先輩がサポートするので、舞台を支えるモノづくりの面白さを肌で感じてみてください！", position: { top: "48%", left: "12%", width: "12.0%", height: "12.0%" } },
  { id: "ev9", date: "4/7", dates: eventDates("2026-04-07"), title: "メイク実験見学", description: "メイク実験とは、衣装小道具班が役者の本番メイクをどのようにするか実験することです。どんな雰囲気でメイクが決められていくのか見てみよう！", position: { top: "46.6%", left: "25%", width: "12.0%", height: "12.0%" } },
  { id: "ev10", date: "4/8", dates: eventDates("2026-04-08"), title: "映像イベント", description: "自分で映像を作って、実際にスクリーンに流してみよう！編集から放映まで、舞台を彩る映像演出の裏側をまるっと体験できちゃいます。", position: { top: "46.4%", left: "37.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev11", date: "4/9", dates: eventDates("2026-04-09"), title: "照明イベント", description: "実際の台本を使って、一場面を演じる役者さんをライトで照らしてみよう！『このシーンなら、どんな色の光が合うかな？』なんて考えながら、舞台の空気をガラッと変える照明の魔法を体験しに来てください！", position: { top: "47.0%", left: "51.0%", width: "12.0%", height: "12.0%" } },
  { id: "ev12", date: "4/11", dates: eventDates("2026-04-11"), title: "流しそうめんイベント", description: "ただ流して食べるだけじゃない！一からそうめんを流す土台を作ります。達成感を味わいながらそうめんを流しましょう！", position: { top: "46.7%", left: "75.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev13", date: "4/12", dates: eventDates("2026-04-12"), title: "音響イベント", description: "台本を読んだり演出の話を聞きながら、シーンにぴったりの効果音や音楽を探してみよう。「ここで雨の音が聞こえたら……」「このタイミングで盛り上げたい！」なんて想像を膨らませて、音で舞台の世界観を彩る楽しさを体験しに来てください！", position: { top: "47%", left: "88%", width: "12.0%", height: "12.0%" } },
  { id: "ev14", date: "4/13", dates: eventDates("2026-04-13"), title: "上映会", description: "劇団ケッペキの過去公演を上演します！「劇団ケッペキってどんな舞台を作るんだろう.....?」「今までどんな演目を上演したんだろう」と気になっているそこのアナタ。タダで観劇できるチャンスです。", position: { top: "58.5%", left: "13%", width: "12.0%", height: "12.0%" } },
  { id: "ev15", date: "4/14", dates: eventDates("2026-04-14"), title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "58%", left: "25%", width: "12.0%", height: "12.0%" } },
  { id: "ev16", date: "4/16", dates: eventDates("2026-04-16"), title: "稽古場見学", description: "新歓公演「海まで100年」の稽古場を覗き見！『普段どんな雰囲気で練習してるの？』『役者さんってどうやって台詞を覚えるの？』なんて疑問を解消するチャンスです。真剣な眼差しも、休憩中の和気あいあいとした空気も、まるごと体感しに来ちゃってください！", position: { top: "58.8%", left: "50.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev17", date: "4/17", dates: eventDates("2026-04-17"), title: "女子会", description: "劇団ケッペキの過去公演を上演します！「劇団ケッペキってどんな舞台を作るんだろう.....?」「今までどんな演目を上演したんだろう」と気になっているそこのアナタ。タダで観劇できるチャンスです。", position: { top: "59%", left: "63%", width: "12.0%", height: "12.0%" } },
  { id: "ev18", date: "4/18", dates: eventDates("2026-04-18"), title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "58.5%", left: "75.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev19", date: "4/19", dates: eventDates("2026-04-19"), title: "1daylabソフト体験会", description: "役者体験会、部署イベントを全て一日にまとめた欲張りなイベントです。今年の新歓公演「海まで100年」の実際の制作スタッフが総動員し、皆さんと共に一つの作品を作り上げます。", position: { top: "57.5%", left: "88%", width: "12.0%", height: "12.0%" } },
  { id: "ev20", date: "4/21", dates: eventDates("2026-04-21"), title: "上映会", description: "劇団ケッペキの過去公演を上演します！「劇団ケッペキってどんな舞台を作るんだろう.....?」「今までどんな演目を上演したんだろう」と気になっているそこのアナタ。タダで観劇できるチャンスです。", position: { top: "70%", left: "25.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev21", date: "4/23", dates: eventDates("2026-04-23"), title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "69.5%", left: "50%", width: "12.0%", height: "12.0%" } },
  { id: "ev22", date: "4/25,26", dates: eventDates("2026-04-25", "2026-04-26"), title: "新歓公演", description: "関西最大級の学生劇団、劇団ケッペキによる、THEATRE E9 KYOTOでの五度目の公演。「『私の海』は、いったいどこのことだろう。」第69回岸田國士戯曲賞受賞作『海まで100年』にひとりひとりの切実さを重ね、演劇がたずさえる私的な体験を探る。", shape: "capsule", position: { top: "67.5%", left: "79.9%", width: "24%", height: "4%" } },
  { id: "ev23", date: "4/25,26", dates: eventDates("2026-04-25", "2026-04-26"), title: "感想戦ラジオ", description: "新入生歓迎公演『海まで100年』の感想を募るラジオを2日間かけて行います。観劇の感動をぜひラジオにぶつけてください！", shape: "capsule", position: { top: "71%", left: "81.0%", width: "24%", height: "5%" } },
  { id: "ev24", date: "4/27", dates: eventDates("2026-04-27"), title: "入団説明会", description: "入団方法や入団後の流れなどをケッペキ団員が説明し、質疑応答を行います。", position: { top: "81%", left: "13%", width: "12.0%", height: "12.0%" } },
  { id: "ev25", date: "4/28", dates: eventDates("2026-04-28"), title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "81%", left: "38%", width: "12.0%", height: "12.0%" } },
  { id: "ev26", date: "4/30", dates: eventDates("2026-04-30"), title: "入団説明会", description: "入団方法や入団後の流れなどをケッペキ団員が説明し、質疑応答を行います。", position: { top: "81%", left: "51%", width: "12.0%", height: "12.0%" } },
  { id: "ev27", date: "5/9", dates: eventDates("2026-05-09"), title: "役者体験会", description: "団員の指導のもと、短めの台本を用いて、読み合わせ、演出づけ、本番までを追体験できます。初めて演じてみるという方も、高校演劇に浸ってきたという子も、役に向かい合う一歩目として、是非皆さんに体験してほしいです！", position: { top: "92%", left: "75.5%", width: "12.0%", height: "12.0%" } },
  { id: "ev28", date: "5/10", dates: eventDates("2026-05-10"), title: "入団説明会", description: "入団方法や入団後の流れなどをケッペキ団員が説明し、質疑応答を行います。", position: { top: "91%", left: "89.5%", width: "12.0%", height: "12.0%" } },
] as const satisfies readonly WelcomeEventInput[];

type WelcomeEventId = (typeof welcomeEventDefinitions)[number]["id"];

const welcomeEventDetailsById = {
  ev1: { place: "西部講堂/ルネ前集合", time: "13:55~" },
  ev2: { place: "東山青少年活動センター", time: "14:00~" },
  ev3: { place: "鴨川", time: "11:00~" },
  ev4: { place: "鴨川", time: "11:00~" },
  ev5: { place: "西部講堂", time: "10:00~" },
  ev6: { place: "東山青少年活動センター", time: "10:00~" },
  ev7: { place: "東山青少年活動センター", time: "14:00~" },
  ev8: { place: "京阪七条駅1番出口", time: "10:00~" },
  ev9: { place: "カフェテリアルネ前", time: "14:00~" },
  ev10: { place: "カフェテリアルネ前", time: "18:00~" },
  ev11: { place: "カフェテリアルネ前", time: "18:00~" },
  ev12: { place: "鴨川", time: "10:00~18:00" },
  ev13: { place: "カフェテリアルネ前", time: "14:00~" },
  ev14: { place: "東山青少年活動センター", time: "18:00~" },
  ev15: { place: "東山青少年活動センター", time: "18:00~" },
  ev16: { place: "東山青少年活動センター", time: "18:00~" },
  ev17: { place: "カフェテリアルネ前", time: "18:00~" },
  ev18: { place: "東山青少年活動センター", time: "14:00~" },
  ev19: { place: "人間座", time: "10:00~" },
  ev20: { place: "東山青少年活動センター", time: "18:00~" },
  ev21: { place: "東山青少年活動センター", time: "18:00~" },
  ev22: { place: "THEATRE E9 KYOTO", time: "公演サイトをご覧ください" },
  ev23: { place: "オンライン", time: "未定" },
  ev24: { place: "オンライン", time: "19:00~" },
  ev25: { place: "カフェテリアルネ前", time: "14:00~" },
  ev26: { place: "オンライン", time: "19:00~" },
  ev27: { place: "東山青少年活動センター", time: "14:00~" },
  ev28: { place: "オンライン", time: "19:00~" },
} satisfies Record<WelcomeEventId, Pick<WelcomeEvent, "place" | "time">>;

const welcomeEventMeetingInfoById: Partial<Record<WelcomeEventId, Pick<WelcomeEvent, "meetingId" | "passcode">>> = {
  ev24: { meetingId: "872 2006 6492", passcode: "b47uBm" },
  ev26: { meetingId: "864 1379 5829", passcode: "1iuwqA" },
  ev28: { meetingId: "893 0833 3212", passcode: "GB37c2" },
};

export const welcomeEvents: WelcomeEvent[] = welcomeEventDefinitions.map((event) => ({
  ...event,
  ...welcomeEventDetailsById[event.id],
  ...(welcomeEventMeetingInfoById[event.id] ?? {}),
}));
