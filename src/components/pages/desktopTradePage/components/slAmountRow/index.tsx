import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePnl } from "@/core/hooks/usePnl";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { useTradeContext } from "../../provider";

interface SlAmountRowProps {
  symbol: string;
  quote: string;
}

function SlAmountRow({ quote, symbol }: SlAmountRowProps) {
  const { calculateLoss } = usePnl();

  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  const { watch } = useTradeContext();
  const contractSize = watch("contractSize");
  const sl_price = watch("sl_price");
  const entryPrice = watch("entryPrice");
  const side = watch("side");

  const probableLoss = calculateLoss({
    contractSize: contractSize,
    currentPrice: entryPrice,
    side: side === "long",
    slPrice: sl_price,
    symbol: symbol,
  });

  const lossValue =
    probableLoss < 0
      ? probableLoss
      : side === "long"
        ? t("longSlErrorText")
        : t("shortSlErrorText");

  return (
    <div className="flex w-full items-center justify-start gap-1 rounded-lg p-1">
      <p className="text-accentText text-xs">{t("EstimatedLoss")}:</p>

      {probableLoss < 0 && sl_price ? (
        <div className="flex items-center justify-start gap-1">
          <p dir="ltr" className="font-english text-negative mx-1 text-xs">
            {addCommaSeparator(lossValue)}
          </p>
          <p className="text-accentText text-xs">{getQuoteName(quote)}</p>
        </div>
      ) : (
        <p dir="ltr" className="text-mainText mx-1 text-xs">
          {sl_price ? lossValue : "--"}
        </p>
      )}
    </div>
  );
}

export default SlAmountRow;
