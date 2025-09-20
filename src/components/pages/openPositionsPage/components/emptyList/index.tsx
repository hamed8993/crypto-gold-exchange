import { useTranslations } from "next-intl";
import { PiPlus } from "react-icons/pi";

function EmptyList() {
  const t = useTranslations();
  return (
    <div className="mt-10 flex min-h-96 w-full flex-col items-center justify-center gap-4 py-10">
      <div className="bg-accentText flex h-[2px] w-20"></div>
      <div className="bg-accentText flex h-[2px] w-28"></div>
      <div className="border-accentText flex h-40 w-48 items-center justify-center border-2 border-b-0">
        <PiPlus className="text-accentText h-16 w-16" />
      </div>
      <p className="text-accentText mt-4 text-lg">
        {t("youHaveNoOrdersPositions")}
      </p>
    </div>
  );
}

export default EmptyList;
