import { ArrayElement } from "@/core/constants/constants";
import { usePnl } from "@/core/hooks/usePnl";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { GetHistoryPositions } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useEditPositionContext } from "../../provider";
import DetailItem from "../detailItem";

interface PositionDetailsRowProps {
  item: ArrayElement<GetHistoryPositions["result"]>;
}

function PositionDetailsRow({ item }: PositionDetailsRowProps) {
  const t = useTranslations();
  const { setValue, watch } = useEditPositionContext();
  const entryPrice = watch("entryPrice");
  const { firstBidAsk } = useFirstBidAsk();
  const { calculatePositionPnl } = usePnl();

  const currentPrice = firstBidAsk
    ? item?.side === "long"
      ? firstBidAsk?.[item?.symbol]?.flong
      : firstBidAsk?.[item?.symbol]?.fshort
    : "0";

  useEffect(() => {
    if (item && !entryPrice) {
      setValue("contractSize", item?.subPositions?.length);
      setValue("entryPrice", item?.entryPrice);
      setValue("sl_price", item?.slPrice !== "not_set" ? item?.slPrice : "");
      setValue("tp_price", item?.tpPrice !== "not_set" ? item?.tpPrice : "");
      setValue("leverage", item?.leverage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const totalPnl = calculatePositionPnl(item)?.toString();

  return (
    <div className="border-accentText50 flex h-28 w-full rounded-xl border">
      <DetailItem
        quote={item?.quote}
        title={t("entryPrice")}
        value={entryPrice}
      />

      <DetailItem
        quote={item?.quote}
        title={t("pnl")}
        value={totalPnl}
        titleClassName="text-white "
        valueClassName="text-white "
        wrapperClassName={
          Number(totalPnl) > 0
            ? "bg-positive"
            : Number(totalPnl) === 0
              ? "bg-surface"
              : "bg-negative"
        }
      />

      <DetailItem
        quote={item?.quote}
        title={t("currentPrice")}
        value={currentPrice}
      />
    </div>
  );
}

export default PositionDetailsRow;
