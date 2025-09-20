import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import OrderTripleStatusItem, {
  orderStatusEnum,
} from "../orderTripleStatusItem";

interface OrdersListTabProps {
  orderStatus: orderStatusEnum;
  setOrderStatus: Dispatch<SetStateAction<orderStatusEnum>>;
}
function OrdersListTab({ setOrderStatus, orderStatus }: OrdersListTabProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between">
      <span className="text-textSecondary text-xs font-semibold">
        {t("sellBuyOrders")}
      </span>
      <div className="flex items-center gap-3">
        <OrderTripleStatusItem
          status={orderStatusEnum.sell}
          handleCick={(arg) => setOrderStatus(arg)}
          selectedStatus={orderStatus}
        />
        <OrderTripleStatusItem
          status={orderStatusEnum.buy}
          handleCick={(arg) => setOrderStatus(arg)}
          selectedStatus={orderStatus}
        />
        <OrderTripleStatusItem
          status={orderStatusEnum.all}
          handleCick={(arg) => setOrderStatus(arg)}
          selectedStatus={orderStatus}
        />
      </div>
    </div>
  );
}

export default OrdersListTab;
