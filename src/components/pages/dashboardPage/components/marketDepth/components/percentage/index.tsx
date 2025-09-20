import { useMarketsNamesData } from "@/core/hooks/useGetName";
import clsx from "clsx";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

interface PercentageProps {
  symbol: string;
}

function Percentage({ symbol }: PercentageProps) {
  const { getMarketChangePercentage } = useMarketsNamesData();

  return (
    <div className="flex items-center justify-start gap-1">
      <p
        className={clsx(
          "font-english text-xs",
          Number(getMarketChangePercentage(symbol)) > 0
            ? "text-positive"
            : Number(getMarketChangePercentage(symbol)) === 0
              ? "text-accentText dark:text-accentTextDark"
              : "text-negative",
        )}
        dir="ltr"
      >
        {getMarketChangePercentage(symbol)}%
      </p>

      {Number(getMarketChangePercentage(symbol)) > 0 ? (
        <TiArrowSortedUp className="h-5 w-5 text-positive" />
      ) : Number(getMarketChangePercentage(symbol)) === 0 ? (
        <TiArrowUnsorted className="h-5 w-5 text-accentText dark:text-accentTextDark" />
      ) : (
        <TiArrowSortedDown className="h-5 w-5 text-negative" />
      )}
    </div>
  );
}

export default Percentage;
