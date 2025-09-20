import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import Link from "next/link";
import AnimatedBox from "../animatedBox";
import MarketName from "../marketName";
import Percentage from "../percentage";
import StrengthPercentage from "../strengthPercentage";

type MarketData = {
  base: string;
  orderbook: {
    longs: [];
    shorts: [];
  };
  quote: string;
  quote_precision: number;
};

interface DepthItemProps {
  symbol: string;
  base: string;
  quote: string;
  orderbookList: Record<string, MarketData>;
}

function DepthItem({ symbol, base, quote, orderbookList }: DepthItemProps) {
  const { locale } = useUrl();
  return (
    <Link
      className="flex w-full"
      key={symbol}
      href={`/${locale}${RoutesName.trade}/${base}-${quote}`}
    >
      <div className="flex w-full flex-col items-center justify-start">
        <div className="mt-4 flex w-full min-w-full items-center justify-between gap-10 px-3">
          <MarketName symbol={symbol} />

          <Percentage symbol={symbol} />

          <div className="flex w-full items-center justify-between">
            <StrengthPercentage
              side
              orderbookList={orderbookList}
              symbol={symbol}
            />
            <AnimatedBox orderbookList={orderbookList} symbol={symbol} />

            <StrengthPercentage
              side={false}
              orderbookList={orderbookList}
              symbol={symbol}
            />
          </div>
        </div>
        <div className="mt-3 flex h-px w-[94%] bg-accentText50 dark:bg-accentTextDark50" />
      </div>
    </Link>
  );
}

export default DepthItem;
