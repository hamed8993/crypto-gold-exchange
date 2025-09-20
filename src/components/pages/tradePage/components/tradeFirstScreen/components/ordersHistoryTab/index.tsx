import { useAuth } from "@/core/providers/authProvider";
import { useGetHistoryOrders } from "@/core/services/hooks";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoChevronDownOutline, IoHelpCircleOutline } from "react-icons/io5";
import OrderHelpDrawer from "../orderHelpDrawer";

interface OrdersHistoryTabProps {
  isOrdersHistoryOpen: boolean;
  setIsOrdersHistoryOpen: (value: boolean) => void;
}

function OrdersHistoryTab({
  isOrdersHistoryOpen,
  setIsOrdersHistoryOpen,
}: OrdersHistoryTabProps) {
  const { isLoggedIn } = useAuth();
  const { data: ordersHistory } = useGetHistoryOrders(
    {
      status: "pending",
    },
    { enabled: isLoggedIn },
  );

  const ordersHistoryList = ordersHistory?.result;
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => {
        if (Number(ordersHistoryList?.length) > 0) {
          setIsOrdersHistoryOpen(!isOrdersHistoryOpen);
        }
      }}
      className="border-b-accentText50 flex min-h-14 w-full items-center justify-between border-b px-2"
    >
      <div className="flex items-center justify-start gap-1">
        <p
          className={clsx(
            "text-sm",
            Number(ordersHistoryList?.length) > 0
              ? "text-mainText"
              : "text-accentText",
          )}
        >
          {t("pendingOrders")}
        </p>
        <IoHelpCircleOutline
          onClick={() => {
            setIsOpen(true);
          }}
          className="text-accentText mb-3 h-5 w-5"
        />
      </div>

      <IoChevronDownOutline
        className={clsx(
          "h-4 w-4",
          isOrdersHistoryOpen ? "rotate-180" : "",
          Number(ordersHistoryList?.length) > 0
            ? "text-mainText"
            : "text-accentText rotate-0",
        )}
      />
      <OrderHelpDrawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export default OrdersHistoryTab;
