import clsx from "clsx";
import { useTranslations } from "next-intl";

interface HighlightSectionGoldFinoProps {
  className?: string;
}

function HighlightSectionGoldFino({
  className,
}: HighlightSectionGoldFinoProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-y-[14px] bg-transparent px-[88px] lg:px-[120px]",
        className,
      )}
    >
      <span className="border-newColor_borderNeutral10 bg-constantLight text-textSecondary rounded-[64px] border px-6 py-2 text-sm font-thin">
        {t("goldfino")}
      </span>
      <h2 className="text-newColor_bgPrimary50 w-full text-center text-[58px] font-light lg:w-[77%] lg:text-[68px]">
        {t("highlightSectionGoldFinoSubTitle-1")}{" "}
        <span className="font-bold">
          {t("highlightSectionGoldFinoSubTitle-2")}
        </span>{" "}
        {t("highlightSectionGoldFinoSubTitle-3")}
      </h2>
      <p className="text-newColor_textNeutral40 text-center text-xl font-normal">
        {t("highlightSectionGoldFinoSubText")}
      </p>
    </div>
  );
}

export default HighlightSectionGoldFino;
