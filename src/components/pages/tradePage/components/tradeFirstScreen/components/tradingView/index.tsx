import { useGetExchange_dataMarkets } from "@/core/services/hooks";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Dispatch, SetStateAction } from "react";

const TradeChart = dynamic(
  () => import("@/components/pages/tradePage/components/tradeChart"),
  {
    ssr: false,
  },
);

interface TradingViewBoxProps{
  setIsChartReady?:Dispatch<SetStateAction<boolean>>;
  showToolBar:boolean
}

function TradingViewBox({setIsChartReady,showToolBar}:TradingViewBoxProps) {
  const { data } = useGetExchange_dataMarkets();
  const marketsData = data?.result || [];

  return (
    <>
      <Script
        strategy="lazyOnload"
        src="/static/datafeeds/udf/dist/bundle.js"
      />
      <div
         
        className="flex h-[475px] min-h-96 w-full"
      >
        {marketsData ? <TradeChart showToolBar={showToolBar} setIsChartReady={setIsChartReady} data={marketsData} /> : null}
      </div>
    </>
  );
}

export default TradingViewBox;
