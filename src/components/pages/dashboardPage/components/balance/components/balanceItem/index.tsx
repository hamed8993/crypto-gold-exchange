import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";

interface BalanceItemProps {
  title: string;
  value?: string;
  quote: string;
  titleClassName?: string;
  valueClassName?: string;
  quoteClassName?: string;
}

function BalanceItem({
  quote,
  title,
  value,
  quoteClassName,
  titleClassName,
  valueClassName,
}: BalanceItemProps) {
  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="flex w-[50%] flex-col items-start justify-start gap-1 rounded-lg p-2">
      <p
        className={clsx(
          "w-20 text-xs text-accentText dark:text-accentTextDark",
          titleClassName,
        )}
      >
        {title}
      </p>
      <div className="flex items-end justify-start gap-1">
        <p
          className={clsx(
            "text-left font-english text-[16px] text-mainText dark:text-mainTextDark",
            valueClassName,
          )}
        >
          {addCommaSeparator(value || 0)}
        </p>
        <p
          className={clsx(
            "text-xs text-accentText dark:text-accentTextDark",
            quoteClassName,
          )}
        >
          {getQuoteName(quote)}
        </p>
      </div>
    </div>
  );
}

export default BalanceItem;
