import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { GetHistoryPositions } from "@/core/services/types";
import { useTranslations } from "next-intl";
import DetailRow from "../detailRow";

interface OrderDetailsProps {
  item: ArrayElement<GetHistoryPositions["result"]>;
}

function OrderDetails({ item }: OrderDetailsProps) {
  const t = useTranslations();
  const { getMarketName } = useMarketsNamesData();

  return (
    <div className="flex h-full w-full flex-col items-start justify-between gap-2">
      <DetailRow title={t("market")} value={getMarketName(item?.symbol).fa} />

      <DetailRow title={t("leverage")} isEnglish value={`${item?.leverage}X`} />

      <DetailRow
        title={t("volume")}
        isEnglish
        value={item?.subPositions?.length}
      />
      <DetailRow
        title={t("orderId")}
        isEnglish
        value={`${item?.orderId?.slice(0, 7)}...${item?.orderId?.slice(-7)}`}
      />
    </div>
  );
}

export default OrderDetails;
