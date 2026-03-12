import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";

export function MaintenanceLogo() {
  return (
    <div className="logo-block js-enter">
      <Image
        className="maintenance-logo"
        src={withBasePath("/images/logo.png")}
        alt="劇団ケッペキ 2026年度新歓特設サイト ロゴ"
        width={3163}
        height={936}
        priority
      />
    </div>
  );
}
