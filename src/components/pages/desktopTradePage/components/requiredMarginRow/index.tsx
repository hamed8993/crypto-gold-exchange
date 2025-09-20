import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useTradeContext } from "../../provider";

function RequiredMarginRow() {
  const t = useTranslations();
  const { watch } = useTradeContext();
  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="flex w-full items-center justify-start gap-1 rounded-lg p-1">
      <p className="text-accentText text-xs">{t("requiredMargin")}:</p>
      <p className="font-english text-mainText text-xs">
        {`${addCommaSeparator(
          Number(
            new Decimal(Number(deleteCommas(watch("contractSize"))))
              .times(Number(deleteCommas(watch("entryPrice"))))
              .div(Number(watch("leverage")))
              .toFixed(0),
          ),
        )}` || "--"}
      </p>
      <p className="text-accentText text-xs">{getQuoteName("irt")}</p>
    </div>
  );
}

export default RequiredMarginRow;
