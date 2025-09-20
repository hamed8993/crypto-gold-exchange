import { useTradeContext } from "@/components/pages/tradePage/provider";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";

interface BuySellPriceTabsProps {
  symbol: string;
  isLongOrShort: string;
}

function BuySellPriceTabs({ symbol, isLongOrShort }: BuySellPriceTabsProps) {
  const { setValue } = useTradeContext();

  const { firstBidAsk } = useFirstBidAsk();

  return (
    <div className="mt-[2px] flex h-24 w-full items-center justify-between">
      <div
        onClick={() => {
          setValue(
            "entryPrice",
            addCommaSeparator(firstBidAsk?.[symbol]?.flong),
          );
        }}
        className={clsx(
          "flex h-24 w-full flex-col items-start justify-center gap-2 px-2",
          isLongOrShort == "long" ? "bg-positive" : "bg-negative50",
        )}
      >
        <p className="font-english text-3xl text-white">
          {addCommaSeparator(firstBidAsk?.[symbol]?.flong)}
        </p>
        <p className="text-sm text-white">Buy</p>
      </div>
      <div
        onClick={() => {
          setValue(
            "entryPrice",
            addCommaSeparator(firstBidAsk?.[symbol]?.fshort),
          );
        }}
        className={clsx(
          "flex h-24 w-full flex-col items-end justify-center gap-2 px-2",
          isLongOrShort === "long" ? "bg-positive50" : "bg-negative",
        )}
      >
        <p className="font-english text-3xl text-white">
          {addCommaSeparator(firstBidAsk?.[symbol]?.fshort)}
        </p>
        <p className="text-sm text-white">Sell</p>
      </div>
    </div>
  );
}

export default BuySellPriceTabs;
