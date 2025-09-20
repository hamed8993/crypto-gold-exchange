import ContractSizeBox from "../contractSizeBox";
import LeverageSelectBox from "../leverageSelect";
import TradeButtons from "../tradeButtons";

interface OneTapTradeFormProps {
  symbol: string;
}

function OneTapTradeForm({ symbol }: OneTapTradeFormProps) {
  return (
    <div className="bg-surface flex h-20! flex-col items-center justify-between p-2">
      <TradeButtons symbol={symbol} />
      <div className="flex w-full items-center justify-between gap-2">
        <ContractSizeBox symbol={symbol} />
        <LeverageSelectBox symbol={symbol} />
      </div>
    </div>
  );
}

export default OneTapTradeForm;
