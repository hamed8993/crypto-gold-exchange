import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import clsx from "clsx";

interface PricePartProps {
  change_percentage: string;
  symbol: string;
  side: boolean;
}

function PricePart({ change_percentage, symbol, side }: PricePartProps) {
  const { getHighlightedPrice, getFontColor } = usePriceDetail();
  return (
    <div className="flex h-6 w-[30%] items-center justify-center">
      <p
        className={clsx(
          "font-english text-[16px]",
          getFontColor(change_percentage),
        )}
      >
        <span>{getHighlightedPrice(symbol, side).mainPrice}</span>
        <span className="text-[18px] font-bold">
          {getHighlightedPrice(symbol, side).highlightPrice}
        </span>
      </p>
    </div>
  );
}

export default PricePart;
