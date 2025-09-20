import { ArrayElement } from "@/core/constants/constants";
import { usePnl } from "@/core/hooks/usePnl";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { GetHistoryPositions } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { useTranslations } from "next-intl";
import OrderItem from "../orderItem";

interface TradeProps {
  item: ArrayElement<GetHistoryPositions["result"]>;
}

function Trade({ item }: TradeProps) {
  const t = useTranslations();
  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();
  const { getTradePnl } = usePnl();
  const { getFontColor } = usePriceDetail();

  const totalPnl = getTradePnl({
    side: item?.side,
    subPositions: item?.subPositions,
    symbol: item?.symbol,
  });

  return (
    <div className="flex h-12 min-h-12 w-full items-center justify-between">
      <div className="flex min-h-10 w-full items-center justify-between">
        <OrderItem isEnglish title={item?.symbol?.toUpperCase()} />
        <OrderItem title={t(item?.side)} />
        <OrderItem isEnglish title={item?.leverage} />
        <OrderItem isEnglish title={addCommaSeparator(item?.entryPrice)} />
        <OrderItem isEnglish title={addCommaSeparator(item?.tpPrice) || "--"} />
        <OrderItem isEnglish title={addCommaSeparator(item?.slPrice) || "--"} />
        <OrderItem
          isEnglish
          title={
            convertMillisecondToLocal(item?.subPositions?.[0]?.created_at)
              .dateTime || "--"
          }
        />
        <OrderItem
          isEnglish
          textClassName={getFontColor(Number(totalPnl))}
          title={addCommaSeparator(totalPnl)}
        />
      </div>
    </div>
  );
}

export default Trade;
