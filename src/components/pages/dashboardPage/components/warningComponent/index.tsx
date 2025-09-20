import { useTranslations } from "next-intl";
import { LuShieldAlert } from "react-icons/lu";

const WarningComponent = () => {
  const t = useTranslations();

  return (
    <div className="mb-6 mt-3 w-[94%] self-center bg-surface flex flex-col justify-start items-start gap-1.5 rounded-lg p-3 text-sm text-gray-800 shadow-sm dark:bg-surfaceDark dark:text-gray-200">
      <div className="flex justify-start items-stretch gap-2">
        <LuShieldAlert className="h-4 w-4 text-negative" />
        <span className="text-justify text-sm text-negative">
          {`${t("riskWarningTitle")}: `}
        </span>
      </div>
      <p className="text-[11px]/6 text-mainText dark:text-mainTextDark text-justify">
        {t("riskWarningDesc")}
      </p>
    </div>
  );
};

export default WarningComponent;
