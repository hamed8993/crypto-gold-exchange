import { localeType } from "@/app/[locale]/layout";
import { SubPositionsItem } from "@/components/pages/openPositionsPage/components/editPosition";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useGetExchange_dataMarkets } from "@/core/services/hooks";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";

interface PositionDetailRowProps {
  data?: {
    base: string;
    entryPrice: string;
    leverage: string;
    orderId: string;
    quote: string;
    side: string;
    slPrice: string;
    subPositions: [];
    symbol: string;
    tpPrice: string;
  };
}

function PositionDetailRow({ data }: PositionDetailRowProps) {
  const t = useTranslations();
  const { locale } = useUrl();
  const { getMarketName } = useMarketsNamesData();

  const symbolName = getMarketName(data?.symbol || "")[locale as localeType];

  const { data: dataMarkets } = useGetExchange_dataMarkets();

  const getPriceStep = (symbol: string) => {
    const markets = dataMarkets?.result || [];

    const symbolData = markets.filter((item) => {
      return item.symbol === symbol;
    });
    const priceStep = Number(symbolData?.[0]?.price_step);
    return priceStep;
  };

  const getPlMultiplier = (symbol: string) => {
    const markets = dataMarkets?.result || [];

    const symbolData = markets.filter((item) => {
      return item.symbol === symbol;
    });
    const plMultiplier = Number(symbolData?.[0]?.pl_multiplier);
    return plMultiplier;
  };

  const pnlArray = data?.subPositions?.map((trade: SubPositionsItem) => {
    const priceStep = getPriceStep(data.symbol);
    const pl_multiplier = getPlMultiplier(data.symbol);
    const pnl_ =
      data?.side === "long"
        ? Number(
            new Decimal(trade?.exitPrice)
              .minus(trade?.entryPrice)
              .times(pl_multiplier)
              .div(priceStep)
              .toFixed(0),
          )
        : Number(
            new Decimal(trade?.entryPrice)
              .minus(trade?.exitPrice)
              .times(pl_multiplier)
              .div(priceStep)
              .toFixed(0),
          );

    return pnl_;
  });

  const totalPnl =
    pnlArray && pnlArray?.reduce((sum: number, pnl: number) => sum + pnl, 0);

  return (
    <div className="border-b-accentText50 bg-surface flex min-h-20 w-full items-center justify-between border-b-2">
      <div className="flex w-full flex-col items-start justify-center px-2">
        <div className="flex h-full w-full items-center justify-start gap-3">
          <p className="text-mainText text-xs">{symbolName}</p>
          <div className="flex min-h-6 items-center justify-start gap-1">
            <p className="font-english text-accentText text-xs">
              {data?.subPositions?.length}
            </p>
            <p className="text-accentText text-xs">{t("unit")}</p>
          </div>
        </div>
        <p className="text-accentText text-xs">{data?.symbol.toUpperCase()}</p>
      </div>
      <div className="bg-accentText50 flex h-full w-[2px]" />
      <div className="flex h-full w-full flex-col items-end justify-center gap-3 px-2">
        <p className="text-accentText text-xs">{t("pnl")}</p>

        <p
          dir="ltr"
          className={clsx(
            "font-english text-xs",
            Number(totalPnl) > 0 ? "text-positive" : "text-negative",
          )}
        >
          {totalPnl}
        </p>
      </div>
    </div>
  );
}

export default PositionDetailRow;
