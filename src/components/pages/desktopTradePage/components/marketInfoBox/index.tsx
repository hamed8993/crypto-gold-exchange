import DailyDetails from "./components/dailyDetails";
import TopInfoHeader from "./components/topInfoHeader";

interface MarketInfoBoxProps {
  symbol: string;
  quote: string;
}

function MarketInfoBox({ symbol, quote }: MarketInfoBoxProps) {
  return (
    <div className="bg-surface hidden h-full w-[40%] min-w-[40%] flex-col items-center justify-between rounded-xl p-2 lg:flex xl:w-[30%] xl:min-w-[30%]">
      <TopInfoHeader symbol={symbol} />
      <DailyDetails symbol={symbol} quote={quote} />
    </div>
  );
}

export default MarketInfoBox;
