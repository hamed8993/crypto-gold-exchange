import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface CurrentPriceBoxProps {
  side: boolean;
  symbol: string;
  quote: string;
}

function CurrentPriceBox({ side, symbol, quote }: CurrentPriceBoxProps) {
  const t = useTranslations();

  const { firstBidAsk } = useFirstBidAsk();

  const currentPrice = side
    ? firstBidAsk?.[symbol].flong
    : firstBidAsk?.[symbol].fshort;

  const { getQuoteName } = useMarketsNamesData();

  return (
    <div
      className={clsx(
        "flex min-h-20 w-full flex-col items-center justify-center gap-2",
        side ? "bg-positive" : "bg-negative",
      )}
    >
      <p className="text-sm text-white">{t("currentPrice")}</p>
      <div className="flex items-center justify-start gap-1">
        <p className="font-english text-lg text-white">
          {addCommaSeparator(currentPrice)}
        </p>
        <p className={"text-mainText text-sm"}>
          {quote ? getQuoteName(quote) : ""}
        </p>
      </div>
    </div>
  );
}

export default CurrentPriceBox;
