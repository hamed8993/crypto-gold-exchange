import { useState } from "react";
import OneTapTradeForm from "./components/oneTapTradeForm";
import ToggleButton from "./components/toggleButton";

interface OneTapTradeBoxProps {
  symbol: string;
}

function OneTapTradeBox({ symbol }: OneTapTradeBoxProps) {
  const [isChartReady, setIsChartReady] = useState(false);

  return (
    <div className="h-34 absolute right-32 top-0 flex w-48 flex-col items-center justify-between gap-1 rounded-lg p-1">
      <ToggleButton
        isChartReady={isChartReady}
        setIsChartReady={setIsChartReady}
      />
      {isChartReady && <OneTapTradeForm symbol={symbol} />}
    </div>
  );
}

export default OneTapTradeBox;
