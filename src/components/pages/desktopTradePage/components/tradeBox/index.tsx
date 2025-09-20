import InputsBox from "../inputsBox";
import LongShortButtons from "../longShortButtons";

interface TradeBoxProps {
  symbol: string;
  quote: string;
}

function TradeBox({ symbol, quote }: TradeBoxProps) {
  return (
    <div className="bg-surface flex h-full w-full flex-col items-center justify-between rounded-xl p-2">
      <InputsBox symbol={symbol} quote={quote} />
      <LongShortButtons symbol={symbol} />
    </div>
  );
}

export default TradeBox;
