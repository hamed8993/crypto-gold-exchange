import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { useLoginContext } from "../../../provider";

function ContinueButton() {
  const t = useTranslations();
  const { setValue } = useLoginContext();

  return (
    <ButtonDefault
      onClick={() => {
        setValue("loginStep", "forgetPasswordFinalStep");
      }}
      className="flex h-12! items-center justify-center px-6"
    >
      <p className="text-sm text-white">{t("continue")}</p>
    </ButtonDefault>
  );
}

export default ContinueButton;
