import TableDefault from "@/components/molecules/tableDefault";
import { ArrayElement } from "@/core/constants/constants";
import { usePagination } from "@/core/hooks/usePagination";
import { useAuth } from "@/core/providers/authProvider";
import { useGetDepositHistory } from "@/core/services/hooks";
import { GetDepositHistory } from "@/core/services/types";
import { Fragment, useState } from "react";
import DetailsModal from "../depositDetailsModal";
import DepositFilterBox from "../depositFilterBox";
import useDepositsTableData from "./depositsTableData";
import {
  DepositHistoryProvider,
  useDepositHistoryFilterContext,
} from "./provider";

function Component() {
  const { cols, columnVisibility } = useDepositsTableData();
  const { isLoggedIn } = useAuth();
  const { maxRowsPerPage, page, setMaxRowsPerPage, setPage } = usePagination();

  const [selectedRow, setSelectedRow] =
    useState<ArrayElement<GetDepositHistory["result"]>>();

  const { watch } = useDepositHistoryFilterContext();
  const address = watch("address");
  const asset = watch("asset");
  const network = watch("network");
  const payment_currency = watch("payment_currency");
  const status = watch("status");
  const from = watch("from");
  const to = watch("to");

  const { data, isLoading } = useGetDepositHistory(
    {
      maxRowsPerPage,
      page,
      from,
      to,
      address,
      asset,
      network: !network || network === "all" ? undefined : network,
      payment_currency,
      // tx, ask if we need tx
      status,
    },
    { enabled: isLoggedIn },
  );
  const paginationData = data?.paginationData;
  const deposit = data?.result;

  return (
    <Fragment>
      <div className="mx-auto xl:min-w-[70%]">
        <DepositFilterBox />
        <TableDefault<ArrayElement<GetDepositHistory["result"]>>
          data={deposit}
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

const DepositHistoryTab = () => {
  return (
    <DepositHistoryProvider>
      <Component />
    </DepositHistoryProvider>
  );
};

export default DepositHistoryTab;
