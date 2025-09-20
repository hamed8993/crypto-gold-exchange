import { useTranslations } from "next-intl";
import { FiUserPlus } from "react-icons/fi";

const Title = () => {
  const t = useTranslations();

  return (
    <div className="mx-2 flex items-center justify-start gap-3">
      <FiUserPlus className="text-positive scale-150" />
      <p className="text-mainText text-lg">{t("register")}</p>
    </div>
  );
};

export default Title;
