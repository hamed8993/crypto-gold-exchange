import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import success from "@/components/atoms/Lottie/success.json";

function DepositPending() {
  const t = useTranslations();

  return (
    <div className="mt-3 flex w-full flex-col items-center justify-center rounded-lg bg-surface pb-10 dark:bg-surfaceDark">
      <Lottie loop={false} autoPlay={true} animationData={success} />
      <p className="text-sm text-mainText dark:text-mainTextDark">
        {t("depositCompletedSuccessfully")}
      </p>
    </div>
  );
}

export default DepositPending;
