import LiquidPriceRow from "../liqPriceRow";
import SlAmountRow from "../slAmountRow";

interface LiquidAndSlProps {
  symbol: string;
  quote: string;
}

function LiquidAndSl({ quote, symbol }: LiquidAndSlProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full items-center justify-start">
        <LiquidPriceRow symbol={symbol} />
      </div>
      <div className="flex w-full items-center justify-start">
        <SlAmountRow quote={quote} symbol={symbol} />
      </div>
    </div>
  );
}

export default LiquidAndSl;
