import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { GetHistoryOrders } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { FiEdit } from "react-icons/fi";
import OrderItem from "../orderItem";

interface OrderPorps {
  item: ArrayElement<GetHistoryOrders["result"]>;
  setIsCloseOrderModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditOrderModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedOrder: Dispatch<
    SetStateAction<ArrayElement<GetHistoryOrders["result"]> | undefined>
  >;
}

function Order({
  item,
  setIsCloseOrderModalOpen,
  setIsEditOrderModalOpen,
  setSelectedOrder,
}: OrderPorps) {
  const t = useTranslations();
  const { getMarketName } = useMarketsNamesData();
  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  return (
    <div className="flex h-12 min-h-12 w-full items-center justify-between">
      <div className="flex min-h-10 w-full items-center justify-between">
        <OrderItem isEnglish title={getMarketName(item?.symbol).fa || ""} />
        <OrderItem
          textClassName={
            item?.side === "long" ? "!text-positive" : "!text-negative"
          }
          title={t(item?.side)}
        />
        <OrderItem isEnglish title={`${item?.leverage}X`} />
        <OrderItem isEnglish title={addCommaSeparator(item?.entryPrice)} />
        <OrderItem isEnglish title={addCommaSeparator(item?.tpPrice) || "--"} />
        <OrderItem isEnglish title={addCommaSeparator(item?.slPrice) || "--"} />
        <OrderItem
          isEnglish
          title={convertMillisecondToLocal(item?.created_at).dateTime || "--"}
        />
        <OrderItem title={"--"} />
        <OrderItem
          onClick={() => {
            setSelectedOrder(item);
            setTimeout(() => {
              setIsCloseOrderModalOpen(true);
            }, 400);
          }}
          isButton
          extraComponent={
            <div
              onClick={() => {
                setSelectedOrder(item);
                setTimeout(() => {
                  setIsEditOrderModalOpen(true);
                }, 400);
              }}
              className="flex cursor-pointer items-center justify-center"
            >
              <FiEdit className="text-lg text-mainBrandAlternative" />
            </div>
          }
          title={t("close")}
        />
      </div>
    </div>
  );
}

export default Order;
