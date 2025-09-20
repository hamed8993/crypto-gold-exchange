"use client";

import OrderItem from "@/components/pages/desktopTradePage/components/historyBox/components/orderItem";
import { ArrayElement } from "@/core/constants/constants";
import { GetHistoryOrders, GetHistoryPositions } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { FiEdit } from "react-icons/fi";

interface OrderOPerationsProps {
  orderItem?: ArrayElement<GetHistoryOrders["result"]>;
  positionItem?: ArrayElement<GetHistoryPositions["result"]>;
  setSelectedOrder?: (arg: ArrayElement<GetHistoryOrders["result"]>) => void;
  setSelectedPosition?: (
    arg: ArrayElement<GetHistoryPositions["result"]>,
  ) => void;
  setIsEditOrderModalOpen: (arg: boolean) => void;
  setIsCloseOrderModalOpen: (arg: boolean) => void;
}

function OrderOPerations({
  orderItem,
  positionItem,
  setSelectedOrder,
  setSelectedPosition,
  setIsEditOrderModalOpen,
  setIsCloseOrderModalOpen,
}: OrderOPerationsProps) {
  const t = useTranslations();

  return (
    <OrderItem
      extraComponent={
        <div
          onClick={() => {
            if (!!setSelectedOrder && !!orderItem) {
              setSelectedOrder(orderItem);
            }

            if (!!setSelectedPosition && !!positionItem) {
              setSelectedPosition(positionItem);
            }

            setTimeout(() => {
              setIsEditOrderModalOpen(true);
            }, 400);
          }}
          className="flex cursor-pointer items-center justify-center"
        >
          <FiEdit className="text-lg text-mainBrandAlternative" />
        </div>
      }
      onClick={() => {
        if (!!setSelectedOrder && !!orderItem) {
          setSelectedOrder(orderItem);
        }

        if (!!setSelectedPosition && !!positionItem) {
          setSelectedPosition(positionItem);
        }
        setTimeout(() => {
          setIsCloseOrderModalOpen(true);
        }, 400);
      }}
      isButton
      title={t("close")}
    />
  );
}

export default OrderOPerations;
