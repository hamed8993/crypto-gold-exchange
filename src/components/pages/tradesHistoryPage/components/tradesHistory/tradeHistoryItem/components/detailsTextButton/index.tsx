import { useTranslations } from "next-intl";
import { IoIosArrowBack } from "react-icons/io";

function DetailsTextButton() {
  const t = useTranslations();

  return (
    <div className="flex min-h-6 items-center">
      <p className="text-mainBrandAlternative text-xs">{t("details")}</p>
      <IoIosArrowBack className="text-mainBrandAlternative h-4 w-4 ltr:rotate-180" />
    </div>
  );
}

export default DetailsTextButton;
