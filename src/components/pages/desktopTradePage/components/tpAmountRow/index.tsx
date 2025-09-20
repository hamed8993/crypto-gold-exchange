import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePnl } from "@/core/hooks/usePnl";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { useTradeContext } from "../../provider";

interface TpAmountRowProps {
  symbol: string;
  quote: string;
}

function TpAmountRow({ symbol, quote }: TpAmountRowProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  const { watch } = useTradeContext();
  const contractSize = watch("contractSize");
  const tp_price = watch("tp_price");
  const entryPrice = watch("entryPrice");
  const side = watch("side");
  const { calculateProfit } = usePnl();
  const probableProfit = calculateProfit({
    contractSize: contractSize,
    currentPrice: entryPrice,
    side: side === "long",
    symbol: symbol,
    tpPrice: tp_price,
  });

  const profitValue =
    probableProfit > 0
      ? probableProfit
      : side === "long"
        ? t("longTpErrorText")
        : t("shortTpErrorText");

  return (
    <div className="flex w-full items-center justify-start gap-1 rounded-lg p-1">
      <p className="text-accentText text-xs">{t("EstimatedProfit")}:</p>
      {probableProfit > 0 && tp_price ? (
        <p dir="ltr" className="font-english text-positive mx-1 text-xs">
          {addCommaSeparator(profitValue)}
        </p>
      ) : (
        <p dir="ltr" className="text-mainText mx-1 text-xs">
          {tp_price ? profitValue : "--"}
        </p>
      )}

      <p className="text-accentText text-xs">
        {probableProfit > 0 && tp_price ? getQuoteName(quote) : ""}
      </p>
    </div>
  );
}

export default TpAmountRow;
