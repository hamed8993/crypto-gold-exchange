import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import sandClock from "@/components/atoms/Lottie/sandClock.json";

interface ProcessingBoxProps {
  confirmations?: string;
  min_confirmation?: string;
}

function ProcessingBox({
  confirmations,
  min_confirmation,
}: ProcessingBoxProps) {
  const t = useTranslations();

  return (
    <div className="mt-3 flex w-full flex-col items-center justify-center rounded-lg bg-surface pb-10 dark:bg-surfaceDark">
      <Lottie animationData={sandClock} autoPlay={true} loop={true} />
      <p className="text-sm text-mainText dark:text-mainTextDark">
        {t("depositIsProcessing")}
      </p>
      <div className="flex items-center justify-center gap-1">
        <p className="mt-2 text-sm text-accentText dark:text-accentTextDark">
          {`${t("networkConfirmation")}:`}
        </p>
        <p className="mb-1 mt-2 font-english text-sm text-mainText dark:text-mainTextDark">
          {`${confirmations || 0}/${min_confirmation}`}
        </p>
      </div>
    </div>
  );
}

export default ProcessingBox;
