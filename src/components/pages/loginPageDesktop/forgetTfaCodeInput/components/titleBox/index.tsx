import { useTranslations } from "next-intl";

function TitleBox() {
  const t = useTranslations();

  return (
    <>
      <p className="text-mainText w-fit text-[40px] font-semibold">
        {t("forgetTfaConfirmationCode")}
      </p>
      <p className="text-accentText mt-8 text-[12px]">
        {t("forgetTfaConfirmationCodeDescription")}
      </p>
    </>
  );
}

export default TitleBox;
