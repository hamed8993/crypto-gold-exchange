import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { useLoginContext } from "../../../provider";

function BackToLoginButton() {
  const t = useTranslations();
  const { setValue } = useLoginContext();

  const backToLogin = () => {
    setValue("loginStep", "login");
  };

  return (
    <ButtonDefault onClick={backToLogin} className="mt-8 h-12 w-[380px]!">
      <p className="self-center text-sm text-white">{t("backToLogin")}</p>
    </ButtonDefault>
  );
}

export default BackToLoginButton;
