import clsx from "clsx";
import { useTranslations } from "next-intl";

interface HighlightSectionAboutUsProps {
  className?: string;
}

function HighlightSectionAboutUs({ className }: HighlightSectionAboutUsProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "bg-constantLight flex flex-col items-center gap-y-[12px]",
        className,
      )}
    >
      <span className="border-newColor_borderNeutral10 bg-constantLight text-textSecondary rounded-[64px] border px-6 py-2 text-sm font-thin">
        {t("aboutUs")}
      </span>
      <h2 className="2xl::w-[34%] text-newColor_bgPrimary50 w-[80%] text-center text-5xl leading-[53px] font-normal lg:w-[50%]">
        {t("highlightSectionAboutUsSubTitle-1")}{" "}
        <span className="text-newColor_textPrimary50 font-semibold">
          {t("highlightSectionAboutUsSubTitle-2")}
        </span>{" "}
        {t("highlightSectionAboutUsSubTitle-3")}
      </h2>
      <p className="text-newColor_textNeutral40 text-xl font-normal">
        {t("highlightSectionAboutUsSubText")}
      </p>
    </div>
  );
}

export default HighlightSectionAboutUs;
