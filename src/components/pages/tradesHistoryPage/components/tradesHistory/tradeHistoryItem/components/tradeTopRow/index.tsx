import MarketName from "../marketName";
import TradeLeverage from "../tradeLeverage";
import TradeSide from "../tradeSide";
import Volume from "../volume";

interface TradeTopRowProps {
  base: string;
  leverage: string;
  quote: string;
  side: string;
  symbol: string;
  tradeLength: string | number;
}

function TradeTopRow({
  base,
  leverage,
  quote,
  side,
  symbol,
  tradeLength,
}: TradeTopRowProps) {
  return (
    <div className="flex min-h-6 w-full items-center justify-start gap-1">
      <TradeSide side={side} />
      <TradeLeverage leverage={leverage} />
      <MarketName base={base} quote={quote} symbol={symbol} />
      <Volume tradeLength={tradeLength} />
    </div>
  );
}

export default TradeTopRow;
