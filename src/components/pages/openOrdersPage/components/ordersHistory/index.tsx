/* eslint-disable @typescript-eslint/ban-ts-comment */
import ConfirmationDrawer from "@/components/atoms/confirmationDrawer";
import LoadingView from "@/components/atoms/loadingView";
import OrderItem from "@/components/atoms/orderItem";
import type { orderDetail } from "@/components/pages/tradePage/components/tradeFirstScreen/components/OrdersHistoryList";
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
import EditOrderDrawer from "../editOrder";
import EmptyList from "../emptyList";

function OrdersHistoryList() {
  const { isLoggedIn } = useAuth();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const [isOpen, setIsOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState<orderDetail>();
  const [isConfirmationDrawerOpen, setIsConfirmationDrawerOpen] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState<ArrayElement<
    GetHistoryOrders["result"]
  > | null>(null);

  const {
    data: ordersHistory,
    refetch: refetchOrders,
    isPending,
  } = useGetHistoryOrders(
    {
      status: "pending",
    },
    { enabled: isLoggedIn },
  );
  const { refetch: refetchBalance } = useGetUser_dataBalance({
    enabled: isLoggedIn,
  });
  const ordersHistoryList = ordersHistory?.result;

  const { mutate: closePositionMutate, isPending: isOrderCancelIsPending } =
    usePostOrderCancel({
      onSuccess: (data) => {
        refetchBalance();
        refetchOrders();
        setIsConfirmationDrawerOpen(false);
        showSuccess(getSuccessMessages(data.result));
      },
      onError: (error) => {
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
    <div className="flex w-full flex-col items-center justify-start py-4 px-4">
      {isPending ? (
        <LoadingView />
      ) : Number(ordersHistoryList?.length) > 0 ? (
        ordersHistoryList?.map((item, index) => {
          return (
            <OrderItem
              base={item?.base}
              created_at={item?.created_at}
              entryPrice={item?.entryPrice}
              key={index}
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
            />
          );
        })
      ) : (
        <EmptyList />
      )}
      {isConfirmationDrawerOpen && (
        <ConfirmationDrawer
          isOpen={isConfirmationDrawerOpen}
          isPending={isOrderCancelIsPending}
          onClose={() => {
            setIsConfirmationDrawerOpen(false);
          }}
          onConfirm={() => {
            closeOrder();
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
  );
}

export default OrdersHistoryList;
