import Image from "next/image";
import type { SocialLink } from "./socialLinkData";
import { withBasePath } from "@/lib/withBasePath";

type SocialLinksProps = {
  links: SocialLink[];
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <ul className="social-list js-enter">
      {links.map((link) => {
        const linkProps = link.external
          ? {
              target: "_blank",
              rel: "noreferrer noopener",
            }
          : undefined;

        return (
          <li className="social-item js-social-bubble" key={link.id}>
            <a
              className="social-link"
              href={link.href}
              aria-label={link.label}
              {...linkProps}
            >
              <span className="social-bubble" aria-hidden>
                <Image
                  className={`social-icon social-icon--${link.id}`}
                  src={withBasePath(link.iconPath)}
                  alt=""
                  width={52}
                  height={52}
                />
              </span>
              <span className="sr-only">{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
