import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePnl } from "@/core/hooks/usePnl";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useTradeContext } from "../../provider";

interface LiquidPriceRowProps {
  symbol: string;
}

function LiquidPriceRow({ symbol }: LiquidPriceRowProps) {
  const t = useTranslations();
  const { watch } = useTradeContext();
  const { getQuoteName } = useMarketsNamesData();
  const { getLiquidPrice } = usePnl();
  const entryPrice = watch("entryPrice");
  const leverage = watch("leverage");
  const side = watch("side");

  const liqPriceStep = getLiquidPrice(entryPrice, Number(leverage), symbol);

  return (
    <div className="flex w-full items-center justify-start gap-1 rounded-lg p-1">
      <p className="text-accentText text-xs">{t("liquidPrice")}:</p>
      <p className="font-english text-mainText text-xs">
        {side === "long"
          ? `${addCommaSeparator(Number(new Decimal(Number(deleteCommas(watch("entryPrice")))).minus(liqPriceStep).toFixed(0)) || "0")}`
          : `${addCommaSeparator(Number(new Decimal(Number(deleteCommas(watch("entryPrice")))).plus(liqPriceStep).toFixed(0)) || "0")}` ||
            "--"}
      </p>
      <p className="text-accentText text-xs">{getQuoteName("irt")}</p>
    </div>
  );
}

export default LiquidPriceRow;
