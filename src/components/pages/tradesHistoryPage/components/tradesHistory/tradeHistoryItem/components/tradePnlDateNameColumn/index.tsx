import CustomDateTime from "@/components/atoms/customDateTime";
import DetailsTextButton from "../detailsTextButton";
import MarketSymbol from "../marketSymbol";
import TradePnl from "../tradePnl";

interface TradePnlDateNameColumnProps {
  base: string;
  quote: string;
  totalPnl: number;
  timeStamp: string | number;
  tradeLength: number;
  symbol: string;
}

function TradePnlDateNameColumn({
  base,
  quote,
  timeStamp,
  totalPnl,
  tradeLength,
  symbol,
}: TradePnlDateNameColumnProps) {
  return (
    <div className="flex h-full w-full flex-col items-end">
      <MarketSymbol base={base} quote={quote} />

      <TradePnl
        symbol={symbol}
        quote={quote}
        totalPnl={totalPnl}
        tradeLength={tradeLength}
      />

      <DetailsTextButton />

      <CustomDateTime timeStamp={timeStamp} />
    </div>
  );
}

export default TradePnlDateNameColumn;
