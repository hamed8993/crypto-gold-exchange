import TableDefault from "@/components/molecules/tableDefault";
import { ArrayElement } from "@/core/constants/constants";
import { usePagination } from "@/core/hooks/usePagination";
import { useAuth } from "@/core/providers/authProvider";
import { useGetWithdrawHistory } from "@/core/services/hooks";
import { GetWithdrawHistory } from "@/core/services/types";
import { Fragment, useState } from "react";
import DetailsModal from "../withdrawDetailsModal";
import WithdrawFilterBox from "../withdrawFilterBox";
import {
  useWithdrawHistoryFilterContext,
  WithdrawHistoryProvider,
} from "./provider";
import useWithdrawsTableData from "./withdrawsTableData";

function Component() {
  const { cols, columnVisibility } = useWithdrawsTableData();
  const { isLoggedIn } = useAuth();
  const { maxRowsPerPage, page, setMaxRowsPerPage, setPage } = usePagination();

  const [selectedRow, setSelectedRow] =
    useState<ArrayElement<GetWithdrawHistory["result"]>>();

  const { watch } = useWithdrawHistoryFilterContext();
  const address = watch("address");
  const asset = watch("asset");
  const network = watch("network");
  const payment_currency = watch("payment_currency");
  const status = watch("status");
  const from = watch("from");
  const to = watch("to");

  const { data, isLoading } = useGetWithdrawHistory(
    {
      maxRowsPerPage,
      page,
      from,
      to,
      address,
      asset,
      network,
      payment_currency:
        !payment_currency || payment_currency === "all"
          ? undefined
          : payment_currency,
      // tx, ask if we need tx
      status,
    },
    { enabled: isLoggedIn },
  );
  const paginationData = data?.paginationData;

  const Positions = data?.result;

  return (
    <Fragment>
      <div className="mx-auto xl:min-w-[70%]">
        <WithdrawFilterBox />

        <TableDefault<ArrayElement<GetWithdrawHistory["result"]>>
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
    </Fragment>
  );
}

const WithdrawHistoryTab = () => {
  return (
    <WithdrawHistoryProvider>
      <Component />
    </WithdrawHistoryProvider>
  );
};

export default WithdrawHistoryTab;
