import { useTranslations } from "next-intl";
import Image from "next/image";
import FooterLinks from "../footerLinks";

function FooterContent() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-9 lg:flex-row lg:gap-[120px]">
      <div className="flex w-full flex-col gap-[22px] lg:w-[31%]">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/images/logo.png"
            width={64}
            height={64}
            alt={t("goldfinoLogoAlt")}
            className="size-16"
          />
          <span className="text-newColor_bgPrimary50 text-5xl font-semibold">
            {t("goldfino")}
          </span>
        </div>
        <p className="text-textSecondary text-[16px] font-normal">
          {t("footerContentText")}
        </p>
      </div>
      <FooterLinks />
    </div>
  );
}

export default FooterContent;
