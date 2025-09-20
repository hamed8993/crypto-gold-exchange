import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { BsArrowLeft } from "react-icons/bs";

function SupportBox() {
  const t = useTranslations();

  return (
    <div className="border-newColor_borderNeutral10 bg-newColor_bgNeutral5 w-full rounded-xl border p-3 lg:w-[370px]">
      <div className="border-newColor_borderNeutral10 bg-constantLight flex flex-col gap-6 rounded-lg border p-3">
        <div className="flex flex-col">
          <h2 className="text-newColor_textPrimary50 text-base font-normal">
            {t("faqSupportBoxTitle")}
          </h2>
          <p className="text-textSecondary text-base font-normal">
            {t("faqSupportBoxText")}
          </p>
        </div>
        <ButtonDefault
          className="w-full"
          icon={<BsArrowLeft className="ltr:rotate-180" />}
        >
          <p>{t("faqSupportBoxButton")}</p>
        </ButtonDefault>
      </div>
    </div>
  );
}

export default SupportBox;
