import { ArrayElement } from "@/core/constants/constants";
import { usePnl } from "@/core/hooks/usePnl";
import { GetHistoryPositions } from "@/core/services/types";
import TradePnlDateNameColumn from "../tradePnlDateNameColumn";
import TradePriceDateColumn from "../tradePriceDateColumn";

interface TradeBottomRowProps {
  item: ArrayElement<GetHistoryPositions["result"]>;
}

function TradeBottomRow({ item }: TradeBottomRowProps) {
  const { getTradePnl } = usePnl();

  const totalPnl = getTradePnl({
    side: item?.side,
    subPositions: item?.subPositions,
    symbol: item?.symbol,
  });

  return (
    <div className="flex h-full w-full items-end justify-start">
      <TradePriceDateColumn
        entryPrice={item?.entryPrice}
        quote={item?.quote}
        subPositions={item?.subPositions}
      />
      <TradePnlDateNameColumn
        symbol={item?.symbol}
        tradeLength={item?.subPositions?.length}
        base={item?.base}
        quote={item.quote}
        timeStamp={item?.subPositions?.[0]?.created_at}
        totalPnl={totalPnl}
      />
    </div>
  );
}

export default TradeBottomRow;
