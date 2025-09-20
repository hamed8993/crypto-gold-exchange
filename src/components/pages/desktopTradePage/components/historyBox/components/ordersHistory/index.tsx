"use client";

import EmptyView from "@/components/atoms/emptyView";
import LoadingView from "@/components/atoms/loadingView";
import { useTradeContext } from "@/components/pages/desktopTradePage/provider";
import { ArrayElement } from "@/core/constants/constants";
import { useAuth } from "@/core/providers/authProvider";
import { useGetHistoryOrders } from "@/core/services/hooks";
import { GetHistoryOrders } from "@/core/services/types";
import { useMemo, useState } from "react";
import CloseOrderModal from "../closeOrderModal";
import EditOrderModal from "../editOrderModal";
import Order from "../order";

interface OrdersHistoryProps {
  symbol: string;
}

function OrdersHistory({ symbol }: OrdersHistoryProps) {
  const { isLoggedIn } = useAuth();

  const { data, isPending } = useGetHistoryOrders(
    {
      status: "pending",
    },
    { enabled: isLoggedIn },
  );

  const { watch } = useTradeContext();
  const isDisplayThisMarket = watch("isDisplayThisMarket");

  const [selectedOrder, setSelectedOrder] =
    useState<ArrayElement<GetHistoryOrders["result"] | undefined>>();

  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [isCloseOrderModalOpen, setIsCloseOrderModalOpen] = useState(false);

  const orders = useMemo(() => data?.result || [], [data]);

  const opneOrders = useMemo(
    () =>
      orders?.length > 0 &&
      orders?.map((item, index) => {
        return isDisplayThisMarket ? (
          item?.symbol === symbol ? (
            <Order
              item={item}
              setSelectedOrder={setSelectedOrder}
              setIsEditOrderModalOpen={setIsEditOrderModalOpen}
              key={index}
              setIsCloseOrderModalOpen={setIsCloseOrderModalOpen}
            />
          ) : null
        ) : (
          <Order
            item={item}
            setSelectedOrder={setSelectedOrder}
            setIsEditOrderModalOpen={setIsEditOrderModalOpen}
            key={index}
            setIsCloseOrderModalOpen={setIsCloseOrderModalOpen}
          />
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isDisplayThisMarket],
  );

  return (
    <>
      {isPending ? (
        <LoadingView />
      ) : orders?.length > 0 ? (
        opneOrders
      ) : (
        <EmptyView />
      )}

      {selectedOrder && (
        <CloseOrderModal
          item={selectedOrder}
          activeModal={isCloseOrderModalOpen}
          setActiveModal={setIsCloseOrderModalOpen}
        />
      )}
      {selectedOrder && (
        <EditOrderModal
          item={selectedOrder}
          activeModal={isEditOrderModalOpen}
          setActiveModal={setIsEditOrderModalOpen}
        />
      )}
    </>
  );
}

export default OrdersHistory;
