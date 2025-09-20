import clsx from "clsx";
import { useTranslations } from "next-intl";

interface HighlightSectionMarketNewsProps {
  className?: string;
}

function HighlightSectionMarketNews({
  className,
}: HighlightSectionMarketNewsProps) {
  const t = useTranslations();
  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-y-[12px] bg-constantLight",
        className,
      )}
    >
      <span className="rounded-[64px] border border-newColor_borderNeutral10 bg-constantLight px-6 py-2 text-sm font-thin text-newColor_textNeutral40">
        {t("marketNews")}
      </span>
      <h2 className="w-full text-center text-5xl font-normal text-newColor_textNeutral100">
        {t("highlightSectionMarketNewsSubTitle-1")}{" "}
        <span className="text-newColor_textPrimary50 font-semibold">
          {t("highlightSectionMarketNewsSubTitle-2")}
        </span>{" "}
        {t("highlightSectionMarketNewsSubTitle-3")}
      </h2>
      <p className="text-xl font-normal text-newColor_textNeutral40">
        {t("highlightSectionMarketNewsSubText")}
      </p>
    </div>
  );
}

export default HighlightSectionMarketNews;
