export type SocialLink = {
  id: "hp" | "x" | "instagram" | "youtube" | "note";
  label: string;
  href: string;
  iconPath: string;
  external?: boolean;
};

export const socialLinks: SocialLink[] = [
  {
    id: "hp",
    label: "HP",
    href: "https://keppeki.github.io/",
    iconPath: "/images/HP_logo.png",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/g_keppeki",
    iconPath: "/images/x.svg",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/g_keppeki/?hl=ja",
    iconPath: "/images/instagram.svg",
    external: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com/channel/UCZ0WfTqsl7QF8pSRjz-1xOg?si=G7dY5bllxywdG-YT",
    iconPath: "/images/youtube.svg",
    external: true,
  },
  {
    id: "note",
    label: "note",
    href: "https://note.com/gekidan_keppeki",
    iconPath: "/images/note-icon.svg",
    external: true,
  },
];
