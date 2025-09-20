import { ArrayElement } from "@/core/constants/constants";
import { GetHistoryPositions } from "@/core/services/types";
import TradeBottomRow from "./components/tradeBottomRow";
import TradeTopRow from "./components/tradeTopRow";

interface TradeHistoryItemProps {
  item: ArrayElement<GetHistoryPositions["result"]>;
  onClick: () => void;
}

function TradeHistoryItem({ item, onClick }: TradeHistoryItemProps) {
  return (
    <div className="w-full px-2">
      <div
        className="border-b-accentText50 mt-1 flex min-h-28 w-full items-center justify-between border-b pt-2 pb-4"
        onClick={onClick}
      >
        <div className="flex h-full w-full items-center justify-between">
          <div className="flex h-full w-full flex-col items-center justify-start">
            <TradeTopRow
              base={item?.base}
              leverage={item?.leverage}
              quote={item?.quote}
              side={item?.side}
              symbol={item?.symbol}
              tradeLength={item?.subPositions?.length}
            />

            <TradeBottomRow item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeHistoryItem;
