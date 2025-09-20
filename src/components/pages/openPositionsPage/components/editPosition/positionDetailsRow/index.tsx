import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { GetHistoryPositions } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface PositionDetailsRowProps {
  item: ArrayElement<GetHistoryPositions["result"]>;
  pnl: string;
}

function PositionDetailsRow({ item, pnl }: PositionDetailsRowProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  const { firstBidAsk } = useFirstBidAsk();

  const currentPrice = item?.side
    ? firstBidAsk[item?.symbol].flong
    : firstBidAsk[item?.symbol].fshort;

  return (
    <div className="bg-secondBackground flex h-20 min-h-20 w-full items-center justify-between">
      <div className="flex h-full w-[33%] flex-col items-center justify-center gap-2">
        <p className="text-accentText text-xs">{t("entryPrice")}</p>
        <div className="flex items-center justify-start gap-1">
          <p dir="ltr" className={"font-english text-sm text-white"}>
            {addCommaSeparator(item?.entryPrice)}
          </p>
          <p className={"text-accentText text-sm"}>
            {item?.entryPrice ? getQuoteName(item?.quote) : ""}
          </p>
        </div>
      </div>

      <div
        className={clsx(
          "flex h-full w-[33%] flex-col items-center justify-center gap-2",
          Number(deleteCommas(pnl)) > 0 ? "bg-positive" : "bg-negative",
        )}
      >
        <p className="text-xs text-white">{t("pnl")}</p>
        <div className="flex items-center justify-start gap-1">
          <p dir="ltr" className={"font-english text-sm text-white"}>
            {addCommaSeparator(pnl)}
          </p>
          <p className={"text-accentText text-sm"}>
            {pnl ? getQuoteName(item?.quote) : ""}
          </p>
        </div>
      </div>

      <div className="flex h-full w-[33%] flex-col items-center justify-center gap-2">
        <p className="text-accentText text-xs">{t("currentPrice")}</p>
        <div className="flex items-center justify-start gap-1">
          <p className="font-english text-mainText text-sm">
            {addCommaSeparator(currentPrice)}
          </p>
          <p className={"text-accentText text-sm"}>
            {item?.quote ? getQuoteName(item?.quote) : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PositionDetailsRow;
