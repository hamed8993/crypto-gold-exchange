"use client";

import TableDefault from "@/components/molecules/tableDefault";
import { orderTypeType } from "@/components/molecules/typeSelect";
import { ArrayElement } from "@/core/constants/constants";
import { usePagination } from "@/core/hooks/usePagination";
import { useAuth } from "@/core/providers/authProvider";
import { useGetHistoryPositions } from "@/core/services/hooks";
import { GetHistoryPositions } from "@/core/services/types";
import { Fragment, useState } from "react";
import ClosePositionModal from "../closePositionModal";
import { OrdersHistoryProvider } from "../openOrdersTab/provider";
import DetailsModal from "../positionsDetailsModal";
import PositionsFilterBox from "../positionsFilterBox";
import usePositionsTableData from "./positionsTableData";
import {
  PositionsHistoryProvider,
  usePositionsHistoryFilterContext,
} from "./provider";
import EditPositionModal from "@/components/pages/desktopTradePage/components/historyBox/components/editPositionModal";

function Component() {
  const {
    cols,
    columnVisibility,

    selectedPositionRow,
    isClosePositionModalOpen,
    isEditPositionModalOpen,
    setIsEditPositionModalOpen,
    setIsClosePositionModalOpen,
  } = usePositionsTableData();
  const { isLoggedIn } = useAuth();
  const { maxRowsPerPage, page, setMaxRowsPerPage, setPage } = usePagination();

  const [selectedRow, setSelectedRow] =
    useState<ArrayElement<GetHistoryPositions["result"]>>();

  const { watch } = usePositionsHistoryFilterContext();
  const side = watch("side");
  const type = watch("type") as orderTypeType | "all";
  const symbol = watch("symbol");
  const from = watch("from");
  const to = watch("to");

  const typeValue = type === "all" || !type ? undefined : type;

  const { data, isLoading, refetch } = useGetHistoryPositions(
    {
      status: "open",
      maxRowsPerPage,
      page,
      from,
      to,
      side: side === "all" || !side ? undefined : side,
      symbol,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: typeValue,
    },
    { enabled: isLoggedIn },
  );
  const paginationData = data?.paginationData;

  const Positions = data?.result;

  return (
    <Fragment>
      <div className="mx-auto xl:min-w-[70%]">
        <PositionsFilterBox />
        <TableDefault<ArrayElement<GetHistoryPositions["result"]>>
          data={Positions}
          cols={cols}
          isLoading={isLoading}
          onDetailsClicked={(rowData) => setSelectedRow(rowData)}
          hasDetails
          columnVisibility={columnVisibility}
          lastPage={paginationData?.lastPage}
          pagination={{ maxRowsPerPage, page, setMaxRowsPerPage, setPage }}
        />
      </div>
      <DetailsModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(undefined)}
        values={selectedRow}
      />

      {!!selectedPositionRow && isClosePositionModalOpen && (
        <ClosePositionModal
          refetchOrdersList={refetch}
          activeModal={isClosePositionModalOpen}
          setActiveModal={setIsClosePositionModalOpen}
          item={{ ...selectedPositionRow }}
        />
      )}

      {!!selectedPositionRow && isEditPositionModalOpen && (
        <EditPositionModal
          refetchPositionsList={refetch}
          activeModal={isEditPositionModalOpen}
          item={{ ...selectedPositionRow }}
          setActiveModal={setIsEditPositionModalOpen}
        />
      )}
    </Fragment>
  );
}

const PositionsHistoryTab = () => {
  return (
    <OrdersHistoryProvider>
      <PositionsHistoryProvider>
        <Component />
      </PositionsHistoryProvider>
    </OrdersHistoryProvider>
  );
};

export default PositionsHistoryTab;
