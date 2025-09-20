import RequiredMarginRow from "../requiredMarginRow";
import TpAmountRow from "../tpAmountRow";

interface MarginAndTpAmountProps {
  symbol: string;
  quote: string;
}

function MarginAndTpAmount({ quote, symbol }: MarginAndTpAmountProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full items-center justify-start">
        <RequiredMarginRow />
      </div>
      <div className="flex w-full items-center justify-start">
        <TpAmountRow quote={quote} symbol={symbol} />
      </div>
    </div>
  );
}

export default MarginAndTpAmount;
