"use client";
import { useGetHistoryOrders } from "@/core/services/hooks";
import { useState } from "react";
import OrdersListTab from "../ordersListTab";
import { orderStatusEnum } from "../orderTripleStatusItem";

function Orders() {
  const [orderStatus, setOrderStatus] = useState<orderStatusEnum>(
    orderStatusEnum.all,
  );

  const { data, isLoading } = useGetHistoryOrders({
    maxRowsPerPage: "10",
    page: "1",
    // from,
    // to,
    side: orderStatus, //Side=>long/short/all
    symbol: "USD",
    status: undefined, //StatusOrder=> pending/canceled/completed
  });

  return (
    <div className="flex flex-col gap-2">
      <OrdersListTab
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
      />
      {/* <OrdersList isLoading={isLoading} dataList={["data?.result"]} /> */}
    </div>
  );
}

export default Orders;
