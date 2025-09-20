import { useTranslations } from "next-intl";
import { TbAuth2Fa } from "react-icons/tb";

const Title = () => {
  const t = useTranslations();

  return (
    <div className="mx-2 flex items-center justify-start gap-3">
      <TbAuth2Fa className="scale-150 text-positive dark:text-positiveDark" />
      <p className="text-lg text-mainText dark:text-mainTextDark">
        {t("forgetTfa")}
      </p>
    </div>
  );
};

export default Title;
