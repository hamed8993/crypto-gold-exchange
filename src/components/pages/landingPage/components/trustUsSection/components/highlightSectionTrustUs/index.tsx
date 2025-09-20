import clsx from "clsx";
import { useTranslations } from "next-intl";

interface HighlightSectionTrustUsProps {
  className?: string;
}

function HighlightSectionTrustUs({ className }: HighlightSectionTrustUsProps) {
  const t = useTranslations();
  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-y-[12px] bg-transparent",
        className,
      )}
    >
      <span className="border-newColor_borderNeutral10 bg-constantLight text-textSecondary rounded-[64px] border px-6 py-2 text-sm font-thin">
        {t("trustAtOneGlance")}
      </span>
      <h2 className="text-mainTextDark w-full text-center text-5xl leading-[150%] font-normal">
        <span className="text-newColor_textPrimary50 font-bold">
          {t("highlightSectionTrustUsSubTitle-1")}
        </span>{" "}
        <span>{t("highlightSectionTrustUsSubTitle-2")}</span>{" "}
        {t("highlightSectionTrustUsSubTitle-3")}
      </h2>
      <p className="text-newColor_textNeutral40 text-xl font-normal">
        {t("highlightSectionTrustUsSubText")}
      </p>
    </div>
  );
}

export default HighlightSectionTrustUs;
