import GroupIcon from "@/components/atoms/svg/groupIcon";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ReactNode } from "react";
import SpanBadge from "../spanBadge";

type BadgeItemType = {
  id: number;
  text: string | ReactNode;
};

function TopSEction() {
  const { theme } = useTheme();
  const t = useTranslations();

  const badgesList: BadgeItemType[] = [
    {
      id: 1,
      text: t("realTimePricing"),
    },
    {
      id: 2,
      text: (
        <>
          {t("leverageUntil")} <span className="font-english">10x</span>
        </>
      ),
    },
    {
      id: 3,
      text: t("fastOrderExecution"),
    },
    {
      id: 4,
      text: t("chartAnalysis"),
    },
    {
      id: 5,
      text: (
        <>
          {t("forHours")} <span className="font-english">10x</span>
        </>
      ),
    },
  ];

  return (
    <div className="flex gap-[10px]">
      <div className="border-newColor_borderNeutral10 bg-constantLight w-1/2 max-w-[563px] rounded-xl border p-6 py-[43px] lg:px-8">
        <div className="border-newColor_borderNeutral10 bg-newColor_bgNeutral flex size-10 w-fit items-center justify-center rounded-lg border p-[9px]">
          <GroupIcon color={theme === "dark" ? "white" : "black"} />
        </div>
        <h2 className="text-newColor_bgPrimary50 max-w-full pt-1 text-[28px] leading-[150%] font-semibold lg:max-w-[72%] lg:text-[32px]">
          {t("aboutUsSectionRightBoxTitle")}
        </h2>
        <p className="text-newColor_textNeutral40 mt-2 mb-6 max-w-[99%] text-sm font-semibold lg:text-base">
          {t("aboutUsSectionRightBoxText")}
        </p>
        <div className="flex w-[75%] flex-wrap items-center gap-1">
          {badgesList?.map((item: BadgeItemType) => (
            <SpanBadge key={item?.id}>{item?.text}</SpanBadge>
          ))}
        </div>
      </div>
      <div className="relative flex w-1/2 max-w-[563px] flex-wrap items-end bg-transparent">
        <span className="bg-newColor_bgNeutral15 block h-[250px] w-full rounded-lg"></span>
        <Image
          width={457}
          height={401}
          className="absolute bottom-0 left-1/2 h-[317px] w-[360px] -translate-x-1/2 transform lg:h-[401px] lg:w-[457px]"
          alt="oil and gold image"
          src="/assets/images/landing/oil-gold.png"
        />
      </div>
    </div>
  );
}
export default TopSEction;
