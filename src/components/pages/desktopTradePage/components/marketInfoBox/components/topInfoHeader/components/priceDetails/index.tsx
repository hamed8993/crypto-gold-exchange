import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";

interface PriceDetailsProps {
  symbol: string;
}

function PriceDetails({ symbol }: PriceDetailsProps) {
  const { getQuoteName } = useMarketsNamesData();
  const { getChevron, getFontColor, getMarketItem } = usePriceDetail();

  return (
    <div className="flex h-full flex-col items-end justify-around gap-2 p-2">
      <div className="flex items-end justify-end gap-1.5">
        <p dir="ltr" className="text-accentText text-xs">
          {getQuoteName(getMarketItem(symbol)?.quote || "")}
        </p>
        <p className="font-english text-mainText text-xl">
          {addCommaSeparator(getMarketItem(symbol)?.last_price || "0")}
        </p>
      </div>
      <div className="flex items-end justify-end gap-1.5">
        <p dir="ltr" className="text-accentText text-xs">
          {getQuoteName(getMarketItem(symbol)?.quote || "")}
        </p>
        <p
          dir="ltr"
          className={clsx(
            "font-english text-sm",
            getFontColor(getMarketItem(symbol)?.change_percentage || "0"),
          )}
        >
          {addCommaSeparator(getMarketItem(symbol)?.change_price) || "0"}
        </p>
        <p
          dir="ltr"
          className={clsx(
            "font-english text-sm",
            getFontColor(getMarketItem(symbol)?.change_percentage || "0"),
          )}
        >
          {`${getMarketItem(symbol)?.change_percentage || "0"}%`}
        </p>
        {getChevron(getMarketItem(symbol)?.change_percentage || "0")}
      </div>
    </div>
  );
}

export default PriceDetails;
