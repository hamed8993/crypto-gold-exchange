import ConfirmationDrawer from "@/components/atoms/confirmationDrawer";
import EmptyView from "@/components/atoms/emptyView";
import OrderItem from "@/components/atoms/orderItem";

import EditOrderDrawer from "@/components/pages/openOrdersPage/components/editOrder";
import { useTradeContext } from "@/components/pages/tradePage/provider";
import { ArrayElement } from "@/core/constants/constants";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetHistoryOrders,
  useGetUser_dataBalance,
  usePostOrderCancel,
} from "@/core/services/hooks";
import { GetHistoryOrders } from "@/core/services/types";
import { useState } from "react";

export type orderDetail = {
  orderId: string;
  symbol: string;
};

interface OrdersHistoryListProps {
  isOrdersHistoryOpen: boolean;
}

function OrdersHistoryList({ isOrdersHistoryOpen }: OrdersHistoryListProps) {
  const { isLoggedIn } = useAuth();
  const { reset } = useTradeContext();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const [isConfirmationDrawerOpen, setIsConfirmationDrawerOpen] =
    useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState<orderDetail>();
  const [selectedItem, setSelectedItem] = useState<ArrayElement<
    GetHistoryOrders["result"]
  > | null>(null);

  const { refetch: refetchBalance } = useGetUser_dataBalance({
    enabled: isLoggedIn,
  });

  const { data: ordersHistory, refetch: refetchOrders } = useGetHistoryOrders(
    {
      status: "pending",
    },
    { enabled: isLoggedIn },
  );
  const ordersHistoryList = ordersHistory?.result;

  const { mutate: closePositionMutate, isPending } = usePostOrderCancel({
    onSuccess: (data) => {
      reset();
      refetchBalance();
      refetchOrders();
      setIsConfirmationDrawerOpen(false);
      showSuccess(getSuccessMessages(data.result));
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const closeOrder = () => {
    closePositionMutate({
      requestBody: {
        orderId: orderDetail?.orderId,
        symbol: orderDetail?.symbol,
      },
    });
  };

  const selectItem = (item: ArrayElement<GetHistoryOrders["result"]>) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  return (
    <>
      {isOrdersHistoryOpen ? (
        <div className="flex w-full flex-col items-center justify-start px-2">
          {Number(ordersHistoryList?.length) > 0 ? (
            ordersHistoryList?.map((item, index) => {
              return (
                <OrderItem
                  base={item?.base}
                  created_at={item?.created_at}
                  entryPrice={item?.entryPrice}
                  leverage={item?.leverage}
                  onCancel={() => {
                    setOrderDetail({
                      orderId: item.orderId,
                      symbol: item.symbol,
                    });
                    setIsConfirmationDrawerOpen(true);
                  }}
                  onEdit={() => {
                    selectItem(item);
                  }}
                  quote={item?.quote}
                  side={item?.side}
                  symbol={item?.symbol}
                  totalMargin={item?.totalMargin}
                  totalSize={item?.totalSize}
                  key={index}
                />
              );
            })
          ) : (
            <EmptyView />
          )}
          {isConfirmationDrawerOpen && (
            <ConfirmationDrawer
              onConfirm={() => {
                closeOrder();
              }}
              isPending={isPending}
              isOpen={isConfirmationDrawerOpen}
              onClose={() => {
                setIsConfirmationDrawerOpen(false);
              }}
            />
          )}
          {isOpen && selectedItem && (
            <EditOrderDrawer
              isOpen={isOpen}
              item={selectedItem}
              onClose={() => {
                setIsOpen(false);
              }}
            />
          )}
        </div>
      ) : null}
    </>
  );
}

export default OrdersHistoryList;
