import clsx from "clsx";
import { useTranslations } from "next-intl";

interface HighlightSectionMarketTrendsProps {
  className?: string;
}

function HighlightSectionMarketTrends({
  className,
}: HighlightSectionMarketTrendsProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "bg-constantLight flex flex-col items-center gap-y-[12px]",
        className,
      )}
    >
      <span className="border-newColor_borderNeutral10 bg-constantLight text-newColor_textNeutral40 rounded-[64px] border px-6 py-2 text-sm font-thin">
        {t("marketTrends")}
      </span>
      <h2 className="text-newColor_bgPrimary50 w-full px-[70px] text-center text-5xl font-normal lg:w-[45%] lg:px-0 2xl:w-[38%]">
        <span className="text-newColor_textPrimary50 font-bold">
          {t("highlightSectionMarketTrendsSubTitle-1")}
        </span>{" "}
        <span>{t("highlightSectionMarketTrendsSubTitle-2")}</span>{" "}
        {t("highlightSectionMarketTrendsSubTitle-3")}
      </h2>
      <p className="text-newColor_textNeutral40 text-xl font-normal">
        {t("highlightSectionMarketTrendsSubText")}
      </p>
    </div>
  );
}

export default HighlightSectionMarketTrends;
