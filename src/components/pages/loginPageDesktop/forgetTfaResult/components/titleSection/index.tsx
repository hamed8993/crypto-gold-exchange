import { useTranslations } from "next-intl";

function TitleSection() {
  const t = useTranslations();

  return (
    <>
      <p className="text-mainText w-fit text-[40px] font-semibold">
        {t("removedTfa")}
      </p>
      <p className="text-accentText mt-8 text-center text-[12px]">
        {t("removedTfaDescription")}
      </p>
    </>
  );
}

export default TitleSection;
