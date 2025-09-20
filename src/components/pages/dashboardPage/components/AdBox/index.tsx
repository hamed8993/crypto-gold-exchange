import { useTranslations } from "next-intl";
import Image from "next/image";
import { IoCheckboxOutline } from "react-icons/io5";

const AdBox = () => {
  const t = useTranslations();

  return (
    <div className="mb-4 flex min-h-24 w-full items-center justify-start gap-1 overflow-x-hidden bg-surface px-3 py-4 dark:bg-surfaceDark">
      <div className="flex items-center justify-center rounded-xl bg-secondBackground p-3 dark:bg-secondBackgroundDark">
        <Image
          alt="logo"
          height={50}
          src={"/assets/images/logo.png"}
          width={50}
        />
      </div>
      <div className="mx-2 flex flex-col items-start justify-start gap-1">
        <p className="text-bold text-sm text-mainText dark:text-mainTextDark">
          {t("marginTrades")}
        </p>
        <div className="mt-1 flex items-center justify-start gap-2">
          <IoCheckboxOutline className="h-4 w-4 text-accentText dark:text-accentTextDark" />
          <p className="text-start text-xs text-accentText dark:text-accentTextDark">
            {t("noLimitDepositWithdraw")}
          </p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <IoCheckboxOutline className="h-4 w-4 text-accentText dark:text-accentTextDark" />
          <p className="text-start text-xs text-accentText dark:text-accentTextDark">
            {t("fastSignupTrade")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdBox;
