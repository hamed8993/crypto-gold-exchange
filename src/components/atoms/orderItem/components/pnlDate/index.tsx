import CustomDateTime from "@/components/atoms/customDateTime";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface PnlDateProps {
  pnl?: string;
  quote: string;
  totalMargin?: string;
  created_at: string;
}

function PnlDate({ created_at, pnl, quote, totalMargin }: PnlDateProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="mt-1 flex w-full items-center justify-between">
      {pnl ? (
        <div className="flex items-center justify-start gap-1">
          <p
            dir="rtl"
            className={"text-xs text-accentText dark:text-accentTextDark"}
          >
            {t("pnl")}:
          </p>
          <p
            dir="ltr"
            className={clsx(
              "font-english text-sm",
              Number(pnl) > 0 ? "text-positive" : "text-negative",
            )}
          >
            {addCommaSeparator(pnl)}
          </p>
          <p
            dir="ltr"
            className={clsx(
              "text-xs",
              Number(pnl) > 0 ? "text-positive" : "text-negative",
            )}
          >
            {getQuoteName(quote)}
          </p>
        </div>
      ) : (
        <CustomDateTime timeStamp={created_at} />
      )}
      {totalMargin ? (
        <div className="flex items-center justify-start gap-1">
          <p className="text-xs text-accentText dark:text-accentTextDark">
            {t("inOrder")}:
          </p>
          <p className="font-english text-xs text-mainText dark:text-mainTextDark">
            {addCommaSeparator(totalMargin || "")}
          </p>

          <p className="mt-1 text-xs text-accentText dark:text-accentTextDark">
            {getQuoteName(quote)}
          </p>
        </div>
      ) : (
        <CustomDateTime timeStamp={created_at} />
      )}
    </div>
  );
}

export default PnlDate;
