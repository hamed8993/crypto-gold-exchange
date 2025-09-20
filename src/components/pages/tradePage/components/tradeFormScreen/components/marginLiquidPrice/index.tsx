import { useTradeContext } from "@/components/pages/tradePage/provider";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";

interface MarginLiquidPriceProps {
  quote: string;
  longOrShort: string;
  liqPriceStep: string | number;
}

function MarginLiquidPrice({
  longOrShort,
  quote,
  liqPriceStep,
}: MarginLiquidPriceProps) {
  const t = useTranslations();

  const { watch } = useTradeContext();

  const { getQuoteName } = useMarketsNamesData();

  return (
    <>
      <div className="mt-4 flex w-full items-center justify-start gap-1 px-3">
        <p className="text-accentText text-xs">{t("requiredMargin")}:</p>
        <p className="font-english text-mainText text-xs">
          {`${addCommaSeparator(
            Number(
              new Decimal(Number(deleteCommas(watch("contractSize"))))
                .times(Number(deleteCommas(watch("entryPrice"))))
                .div(Number(watch("leverage")))
                .toFixed(0),
            ),
          )}`}
        </p>
        <p className="text-accentText text-xs">{`${getQuoteName(quote)}`}</p>
      </div>
      <div className="mt-2 flex w-full items-center justify-start gap-1 px-3">
        <p className="text-accentText text-xs">{t("liquidPrice")}:</p>
        <p className="font-english text-mainText text-xs">
          {longOrShort === "long"
            ? `${addCommaSeparator(Number(new Decimal(Number(deleteCommas(watch("entryPrice")))).minus(liqPriceStep).toFixed(0)) || "0")}`
            : `${addCommaSeparator(Number(new Decimal(Number(deleteCommas(watch("entryPrice")))).plus(liqPriceStep).toFixed(0)) || "0")}`}
        </p>
        <p className="text-accentText text-xs">{`${getQuoteName(quote)}`}</p>
      </div>
    </>
  );
}

export default MarginLiquidPrice;
