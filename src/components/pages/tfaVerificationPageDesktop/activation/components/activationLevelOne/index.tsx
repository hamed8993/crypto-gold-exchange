import { useTranslations } from "next-intl";
import { RiNumber1 } from "react-icons/ri";

function ActivationLevelOne() {
  const t = useTranslations();

  return (
    <div className="mt-3 flex flex-col items-start justify-start">
      <div className="flex h-fit w-full items-start justify-start">
        <RiNumber1 className="text-positive min-h-4 min-w-4" />
        <p className="text-mainText mx-2 text-sm/6">{t("tfaLevel1")}</p>
      </div>
      <p className="text-accentText ps-6 text-xs">{` ${t("tfaLevel11")} `}</p>
    </div>
  );
}

export default ActivationLevelOne;
