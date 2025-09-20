import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

function Content() {
  const t = useTranslations();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pt-[45px] pb-[38px]">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-newColor_bgPrimary50 flex items-center gap-1 text-[32px] font-normal">
          <>{t("registerNavigationSectionTitle1")}</>
          <span className="text-newColor_textPrimary50">
            {t("registerNavigationSectionTitle2")}
          </span>
          <>{t("registerNavigationSectionTitle3")}</>
        </h2>
        <p className="text-textSecondary w-[75%] text-center text-sm font-normal">
          {t("registerNavigationSectionText")}
        </p>
      </div>

      <ButtonDefault
        icon={
          <>
            <HiArrowNarrowLeft className="ltr:hidden" />{" "}
            <HiArrowNarrowRight className="rtl:hidden" />
          </>
        }
        className="flex h-[48px] w-fit items-center justify-center rounded-lg px-6"
        href="/authentication/register"
      >
        <p className="text-mainTextDark text-sm font-normal">
          {t("registerJustNow")}
        </p>
      </ButtonDefault>

      <div className="text-newColor_bgPrimary50 flex max-w-[416px] flex-wrap items-center gap-1 text-sm font-normal">
        <span className="whitespace-nowrap">
          {t("registerNavigationSectionSubText1")}
        </span>
        <span className="font-semibold whitespace-nowrap">
          {t("registerNavigationSectionSubText2")}
        </span>
        <span className="whitespace-nowrap">
          {t("registerNavigationSectionSubText3")}
        </span>
      </div>
    </div>
  );
}

export default Content;
