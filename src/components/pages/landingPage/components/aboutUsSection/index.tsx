"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import BottomSectionBox from "./components/bottomSectionBox";
import HighlightSectionAboutUs from "./components/highlightSectionAboutUs";
import TopSEction from "./components/topSection";

interface AboutUsSectionProps {
  containerClassName?: string;
}

function AboutUsSection({ containerClassName }: AboutUsSectionProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "bg-newColor_bgNeutral flex w-full flex-col gap-9",
        containerClassName,
      )}
    >
      <HighlightSectionAboutUs className="bg-transparent" />
      <div className="border-newColor_borderNeutral10 bg-newColor_bgNeutral5 mx-auto flex w-fit flex-col gap-[10px] rounded-xl border p-[10px]">
        <TopSEction />

        <div className="flex w-fit gap-[10px]">
          <BottomSectionBox
            title={t("preciousMetalsTradingTitle")}
            text={t("preciousMetalsTradingText")}
            imageName={"silver-bars.png"}
          />

          <BottomSectionBox
            title={t("goldSilverTradingTitle")}
            text={t("goldSilverTradingText")}
            imageName={"gold-silver.png"}
            imageClassName="w-[212px]! h-[188px]! !lg:h-[146px] !lg:w-[247px]"
          />

          <BottomSectionBox
            title={
              <span className="flex items-center gap-1 text-nowrap">
                <>{t("leverageUntil")}</>{" "}
                <span className="font-english">20</span>{" "}
                <>{t("leverageUp20Title")}</>
              </span>
            }
            text={t("leverageUp20Text")}
            imageName={"20x2.png"}
            imageClassName="rtl:transform rtl:rotate-[23.396deg] ltr:rotate-[-18.213deg] scale-x-100! ltr:bottom-[-6px] ltr:right-[-32px] rtl:left-[-30px] rtl:bottom-[-10px]"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUsSection;
