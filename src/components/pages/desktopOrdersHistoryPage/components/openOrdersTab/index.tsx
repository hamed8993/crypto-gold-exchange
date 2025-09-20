"use client";

import TableDefault from "@/components/molecules/tableDefault";
import { ArrayElement } from "@/core/constants/constants";
import { usePagination } from "@/core/hooks/usePagination";
import { useAuth } from "@/core/providers/authProvider";
import { useGetHistoryOrders } from "@/core/services/hooks";
import { GetHistoryOrders, Side, StatusOrder } from "@/core/services/types";
import { Fragment, useState } from "react";
import CloseOrderModal from "../closeOrderModal";
import EditOrderModal from "@/components/pages/desktopTradePage/components/historyBox/components/editOrderModal";
import DetailsModal from "../ordersDetailsModal";
import OrdersFilterBox from "../ordersFilterBox";
import useOrdersTableData from "./ordersTableData";
import {
  OrdersHistoryProvider,
  useOrdersHistoryFilterContext,
} from "./provider";

function Component() {
  const { isLoggedIn } = useAuth();
  const { maxRowsPerPage, page, setMaxRowsPerPage, setPage } = usePagination();

  const [selectedRow, setSelectedRow] =
    useState<ArrayElement<GetHistoryOrders["result"]>>();

  const {
    cols,
    columnVisibility,
    selectedOrderRow,
    isCloseOrderModalOpen,
    isEditOrderModalOpen,
    setIsEditOrderModalOpen,
    setIsCloseOrderModalOpen,
  } = useOrdersTableData();

  const { watch } = useOrdersHistoryFilterContext();
  const side = watch("side") as Side | "all";
  const status = watch("status") as StatusOrder | "all";
  const symbol = watch("symbol");
  const from = watch("from");
  const to = watch("to");

  const statusValue = status === "all" || !status ? undefined : status;
  const sideValue = side === "all" || !side ? undefined : side;

  const { data, isLoading, refetch } = useGetHistoryOrders(
    {
      maxRowsPerPage,
      page,
      from,
      to,
      side: sideValue,
    symbol,
      status: statusValue,
    },
    { enabled: isLoggedIn },
  );
  const paginationData = data?.paginationData;
  const orders = data?.result;

  return (
    <Fragment>
      <div className="mx-auto xl:min-w-[70%]">
        <OrdersFilterBox />
        <TableDefault<ArrayElement<GetHistoryOrders["result"]>>
          data={orders}
          cols={cols}
          columnVisibility={columnVisibility}
          hasDetails
          isLoading={isLoading}
          onDetailsClicked={(rowData) => setSelectedRow(rowData)}
          lastPage={paginationData?.lastPage}
          pagination={{ maxRowsPerPage, page, setMaxRowsPerPage, setPage }}
        />
      </div>
      <DetailsModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(undefined)}
        values={selectedRow}
      />

      {!!selectedOrderRow && isCloseOrderModalOpen && (
        <CloseOrderModal
          refetchOrdersList={refetch}
          activeModal={isCloseOrderModalOpen}
          setActiveModal={setIsCloseOrderModalOpen}
          item={{ ...selectedOrderRow }}
        />
      )}

      {!!selectedOrderRow && isEditOrderModalOpen && (
        <EditOrderModal
          refetchOrdersList={refetch}
          activeModal={isEditOrderModalOpen}
          item={{ ...selectedOrderRow }}
          setActiveModal={setIsEditOrderModalOpen}
        />
      )}
    </Fragment>
  );
}

const OrdersHistoryTab = () => {
  return (
    <OrdersHistoryProvider>
      <Component />
    </OrdersHistoryProvider>
  );
};

export default OrdersHistoryTab;
