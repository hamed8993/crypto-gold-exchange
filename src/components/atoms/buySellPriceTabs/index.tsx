import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import Spread from "./components/spread";

interface BuySellPriceTabsProps {
  bgColor: string;
  onClick: (value: string) => void;
  quoteAsset: string;
  symbol: string;
}

function BuySellPriceTabs({
  bgColor,
  onClick,
  quoteAsset,
  symbol,
}: BuySellPriceTabsProps) {
  const { firstBidAsk } = useFirstBidAsk();
  const { getSpread, getHighlightedPrice } = usePriceDetail();

  const spread = getSpread(symbol, quoteAsset);

  const longPrice = getHighlightedPrice(symbol, true);
  const shortPrice = getHighlightedPrice(symbol, false);

  const darkBgColor =
    bgColor === "bg-positive" ? "bg-positive50" : "bg-negative50";

  return (
    <div className="relative flex h-16 w-full items-center justify-between gap-[2px]">
      <div
        className={clsx(
          "flex h-16 w-full flex-col items-start justify-center bg-positive px-4",
          bgColor === "bg-positive" ? bgColor : darkBgColor,
        )}
        onClick={() => {
          onClick(addCommaSeparator(firstBidAsk?.[symbol]?.flong));
        }}
      >
        <p className={"font-english text-[22px] text-white"}>
          <span>{longPrice?.mainPrice}</span>
          <span className="text-[22px] font-bold">
            {longPrice?.highlightPrice}
          </span>
        </p>
      </div>

      <Spread spreadValue={spread} />

      <div
        className={clsx(
          "flex h-16 w-full flex-col items-end justify-center bg-positive50 px-4",
          bgColor === "bg-positive" ? darkBgColor : bgColor,
        )}
        onClick={() => {
          onClick(addCommaSeparator(firstBidAsk?.[symbol]?.fshort));
        }}
      >
        <p className={"font-english text-[22px] text-white"}>
          <span>{shortPrice?.mainPrice}</span>
          <span className="text-[22px] font-bold">
            {shortPrice?.highlightPrice}
          </span>
        </p>
      </div>
    </div>
  );
}

export default BuySellPriceTabs;
