import { useTranslations } from "next-intl";
import { PiPasswordBold } from "react-icons/pi";

const Title = () => {
  const t = useTranslations();

  return (
    <div className="mx-2 flex items-center justify-start gap-3">
      <PiPasswordBold className="text-positive scale-150" />
      <p className="text-mainText text-lg">{t("forgetPassword")}</p>
    </div>
  );
};

export default Title;
