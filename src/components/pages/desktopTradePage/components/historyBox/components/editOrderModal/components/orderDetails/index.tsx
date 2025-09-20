import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { GetHistoryOrders } from "@/core/services/types";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { useTranslations } from "next-intl";
import DetailRow from "../detailRow";

interface OrderDetailsProps {
  item: ArrayElement<GetHistoryOrders["result"]>;
}

function OrderDetails({ item }: OrderDetailsProps) {
  const t = useTranslations();
  const { getMarketName } = useMarketsNamesData();

  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  return (
    <div className="flex h-full w-full flex-col items-start justify-between gap-2">
      <DetailRow title={t("market")} value={getMarketName(item?.symbol).fa} />

      <DetailRow title={t("leverage")} isEnglish value={`${item?.leverage}X`} />

      <DetailRow title={t("orderType")} value={t(item?.type)} />
      <DetailRow
        title={t("createdAt")}
        isEnglish
        value={convertMillisecondToLocal(item?.created_at).dateTime}
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
