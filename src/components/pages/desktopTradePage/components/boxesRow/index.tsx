import GaugeBox from "../gaugeBox";
import MarketInfoBox from "../marketInfoBox";
import TradeBox from "../tradeBox";

interface BoxesRowProps {
  symbol: string;
  quote: string;
}

function BoxesRow({ symbol, quote }: BoxesRowProps) {
  return (
    <div className="flex h-fit min-h-[350px] w-full items-center justify-between gap-2 py-2">
      <TradeBox symbol={symbol} quote={quote} />
      <GaugeBox symbol={symbol} />
      <MarketInfoBox symbol={symbol} quote={quote} />
    </div>
  );
}

export default BoxesRow;
