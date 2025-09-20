import { useNotification } from "@/core/providers/notificationProvider";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useTranslations } from "next-intl";
import { MdContentCopy } from "react-icons/md";

interface DepositAmountProps {
  coin?: string;
  amount?: string;
}

function DepositAmount({ amount, coin }: DepositAmountProps) {
  const t = useTranslations();
  const { showSuccess } = useNotification();
  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };

  return (
    <div className="mt-3 flex w-full items-center justify-between px-3">
      <p className="text-xs text-accentText dark:text-accentTextDark">
        {t("depositAmount")}
      </p>
      <div className="flex justify-start items-center gap-1">
        <MdContentCopy
          onClick={() => {
            handleCopy(deleteCommas(amount));
          }}
          className="w-5 mr-1 h-5 text-mainBrandAlternative"
        />
        <p className="font-english text-xs text-accentText dark:text-accentTextDark">
          {coin?.toUpperCase()}
        </p>
        <p className="font-english text-lg text-mainText dark:text-mainTextDark">
          {addCommaSeparator(amount || "")}
        </p>
      </div>
    </div>
  );
}

export default DepositAmount;
