"use client";

import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import clsx from "clsx";
// import { usePathname } from "next/navigation";
import MarketsAndOrderbookSection from "./components/marketsAndOrderbookSection";
import { TradeContextProvider } from "./provider";

interface DesktopTradePageProps {
  className?: string;
}

function Component({ className }: DesktopTradePageProps) {
  // const pathname = usePathname();
  // const pathnameSplitted = pathname?.split("/");
  // const marketArray =
  //   pathnameSplitted?.[pathnameSplitted.length - 1]?.split("-");

  // const baseAsset = marketArray?.[0]?.toLowerCase() || "xau";
  // const quoteAsset = marketArray?.[1]?.toLowerCase() || "usd";

  // const symbol = baseAsset + quoteAsset;

  return (
    <DesktopPageLayout
      hasFooter={false}
      hasHeader={false}
      className={clsx(className, "!p-0 !pt-0")}
    >
      <div className="mx-auto grid min-h-screen w-screen max-w-[1440px] grid-cols-4 justify-start gap-[3px] bg-slate-600 !pt-0">
        <div className="col-span-4 h-16 !min-h-16 bg-gray-500">
          website header section
        </div>
        <div className="col-span-4 h-20 !min-h-16 bg-gray-500">
          market detail header section
        </div>

        <div className="col-span-1 flex h-full flex-col gap-[3px]">
          <div className="flex min-h-[735px] w-full bg-gray-500">
            trade form section
          </div>
          <div className="flex h-full min-h-[355px] w-full bg-gray-500">
            balance transfer section
          </div>
        </div>

        <div className="col-span-3 grid min-h-[561px] grid-cols-3 gap-[3px]">
          <div className="col-span-2 !h-16 min-h-[561px] bg-gray-500">
            tradingview chart section
          </div>
          <div className="col-span-1 !h-16 min-h-[561px] bg-gray-500">
            <MarketsAndOrderbookSection />
          </div>
          <div className="col-span-3 !h-16 min-h-[561px] bg-gray-500">
            history section
          </div>
        </div>
      </div>
    </DesktopPageLayout>
  );
}

const DesktopTradePage = ({ className }: DesktopTradePageProps) => {
  return (
    <TradeContextProvider>
      <Component className={className} />
    </TradeContextProvider>
  );
};

export default DesktopTradePage;
