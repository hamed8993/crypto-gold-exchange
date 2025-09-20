"use client";

import TableDefault from "@/components/molecules/tableDefault";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import FilterBox from "@/components/pages/desktopTradesHistoryPage/components/tradesFilterBox";
import { ArrayElement } from "@/core/constants/constants";
import { usePagination } from "@/core/hooks/usePagination";
import { useAuth } from "@/core/providers/authProvider";
import { useGetHistoryPositions } from "@/core/services/hooks";
import { GetHistoryPositions } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import DetailsModal from "./components/detailsModal";
import { TradeHistoryProvider, useTradeHistoryFilterContext } from "./provider";
import useTradesTableData from "./tradesTableData";

interface DesktopTradesHistoryPageProps {
  className?: string;
}

function Component({ className }: DesktopTradesHistoryPageProps) {
  const { isLoggedIn } = useAuth();
  const t = useTranslations();

  const { cols, columnVisibility } = useTradesTableData();
  const [selectedRow, setSelectedRow] =
    useState<ArrayElement<GetHistoryPositions["result"]>>();

  const { maxRowsPerPage, page, setMaxRowsPerPage, setPage } = usePagination();

  const { watch } = useTradeHistoryFilterContext();
  const side = watch("side");
  const type = watch("type");
  const symbol = watch("symbol");
  const from = watch("from");
  const to = watch("to");

  const { data, isLoading } = useGetHistoryPositions(
    {
      status: "closed",
      page,
      from,
      to,
      side: !side || side === "all" ? undefined : side,
      symbol,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: !type || type === "all" ? undefined : type,
    },
    { enabled: isLoggedIn, maxRowsPerPage },
  );
  const trades = data?.result;
  const paginationData = data?.paginationData;

  return (
    <Fragment>
      <DesktopPageLayout hasFooter hasHeader hasSideMenu className={className}>
        <div className="bg-mainBackground flex min-h-dvh w-full p-6">
          <div className="bg-mainBackground flex min-h-dvh w-full flex-col gap-6">
            <h2 className="text-mainText text-lg font-bold">
              {t("tradeHistoryTitle")}
            </h2>

            <div className="mx-auto w-full xl:min-w-[70%]">
              <FilterBox />
              <TableDefault<ArrayElement<GetHistoryPositions["result"]>>
                data={trades}
                cols={cols}
                isLoading={isLoading}
                columnVisibility={columnVisibility}
                hasDetails
                onDetailsClicked={(rowData) => setSelectedRow(rowData)}
                lastPage={paginationData?.lastPage}
                pagination={{
                  maxRowsPerPage,
                  page,
                  setMaxRowsPerPage,
                  setPage,
                }}
              />
            </div>
          </div>
        </div>
      </DesktopPageLayout>
      <DetailsModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(undefined)}
        values={selectedRow}
      />
    </Fragment>
  );
}

const DesktopTradesHistoryPage = ({
  ...rest
}: DesktopTradesHistoryPageProps) => {
  return (
    <TradeHistoryProvider>
      <Component {...rest} />
    </TradeHistoryProvider>
  );
};

export default DesktopTradesHistoryPage;
