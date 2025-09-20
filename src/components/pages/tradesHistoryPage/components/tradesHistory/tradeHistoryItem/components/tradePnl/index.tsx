import { useGetMarketFee } from "@/core/hooks/useGetMarketFee";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";

interface TradePnlProps {
  totalPnl: string | number;
  quote: string;
  tradeLength: number;
  symbol: string;
}

function TradePnl({ quote, totalPnl, tradeLength, symbol }: TradePnlProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  const getMarketFee = useGetMarketFee();

  return (
    <div className="flex min-h-6 items-center gap-1 pe-1">
      <p className="text-accentText text-[10px]">{`${t("pnl")}: `}</p>
      <p
        className={clsx(
          "font-english text-xs",
          Number(totalPnl) > 0 ? "text-positive" : "text-negative",
        )}
        dir="ltr"
      >
        {addCommaSeparator(
          new Decimal(Number(totalPnl))
            .minus(
              new Decimal(Number(tradeLength)).times(
                Number(getMarketFee(symbol)),
              ),
            )
            .toNumber(),
        )}
      </p>
      <p className={"text-accentText mt-[2px] text-xs"}>
        {getQuoteName(quote)}
      </p>
    </div>
  );
}

export default TradePnl;
