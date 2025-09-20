import { useTranslations } from "next-intl";
import { useLoginContext } from "../../../provider";

function TitleBox() {
  const t = useTranslations();
  const { watch } = useLoginContext();
  const email = watch("forgetPasswordEmail");
  return (
    <>
      <p className="text-mainText w-fit text-[40px] font-semibold">
        {t("confirmForgetPasswordEmailCodeTitle")}
      </p>
      <p className="text-accentText mt-8 text-[12px]">
        {t("weSentYouAnEmail", { email: email })}
      </p>
    </>
  );
}

export default TitleBox;
