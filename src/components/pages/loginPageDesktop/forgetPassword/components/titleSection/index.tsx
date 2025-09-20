import { useTranslations } from "next-intl";

function TitleSection() {
  const t = useTranslations();
  return (
    <>
      <p className="text-mainText w-fit text-[40px] font-semibold">
        {t("forgetPasswordTitle")}
      </p>
      <p className="text-accentText mt-8 text-center text-[12px]">
        {t("enterYourEmailToSendCode")}
      </p>
      <div className="bg-borderDefault mt-11 mb-8 flex h-px w-[380px]"></div>
    </>
  );
}

export default TitleSection;
