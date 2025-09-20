import TradingViewBox from "@/components/pages/tradePage/components/tradeFirstScreen/components/tradingView";
import { useState } from "react";
import MarketsList from "../marketsList";
import OneTapTradeBox from "../oneTapTradeBox";

interface TradingViewChartBoxProps {
  symbol: string;
}

function TradingViewChartBox({ symbol }: TradingViewChartBoxProps) {
  const [isChartReady, setIsChartReady] = useState(false);
  return (
    <div className="flex w-full items-center justify-start gap-2 rounded-xl">
      <div className="bg-surface relative flex w-full items-center justify-center rounded-xl p-2">
        <TradingViewBox showToolBar setIsChartReady={setIsChartReady} />
        {isChartReady && <OneTapTradeBox symbol={symbol} />}
      </div>
      <MarketsList />
    </div>
  );
}

export default TradingViewChartBox;
