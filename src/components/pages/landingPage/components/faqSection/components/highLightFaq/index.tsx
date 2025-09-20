import clsx from "clsx";
import { useTranslations } from "next-intl";

interface HighLightFaqProps {
  containerClassName?: string;
}

function HighLightFaq({ containerClassName }: HighLightFaqProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-y-[12px] bg-transparent lg:items-start",
        containerClassName,
      )}
    >
      <span className="border-newColor_borderNeutral10 bg-constantLight text-textSecondary w-fit rounded-[64px] border px-6 py-2 text-sm font-thin">
        {t("highlightSectionFaq")}
      </span>
      <h2 className="text-newColor_bgPrimary50 px-[117px] text-center text-4xl leading-[53px] font-normal lg:px-0 lg:text-start">
        {t("highlightSectionFaqTitle1")}{" "}
        <span className="text-newColor_textPrimary50 font-semibold">
          {t("highlightSectionFaqTitle2")}
        </span>{" "}
        {t("highlightSectionFaqTitle3")}
      </h2>
      <p className="text-newColor_textNeutral40 text-center text-[18px] font-normal lg:text-start">
        {t("highlightSectionFaqSubTitle")}
      </p>
    </div>
  );
}

export default HighLightFaq;
