import LoadingView from "@/components/atoms/loadingView";
import TableDefaultFoot from "@/components/molecules/tableDefault/tableParts/tableDefaultFoot";
import { ArrayElement } from "@/core/constants/constants";
import { usePagination } from "@/core/hooks/usePagination";
import { usePnl } from "@/core/hooks/usePnl";
import { useAuth } from "@/core/providers/authProvider";
import { useGetHistoryPositions } from "@/core/services/hooks";
import { GetHistoryPositions } from "@/core/services/types";
import { useEffect, useState } from "react";
import DateTabs from "./dateTabs";
import PnlDetailRow from "./pnlDetailRow";
import TradeDetailDrawer from "./tradeDetailDrawer";
import TradeHistoryItem from "./tradeHistoryItem";

function TradesHistory() {
  const { isLoggedIn } = useAuth();

  const [toDate, setToDate] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [nowDate, setNowDate] = useState<string | undefined>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [lastMonthDate, setLastMonthDate] = useState<string | undefined>("");
  const [selectedItem, setSelectedItem] = useState<
    ArrayElement<GetHistoryPositions["result"]> | undefined
  >(undefined);
  const { maxRowsPerPage, page, setMaxRowsPerPage, setPage } = usePagination();

  const now = new Date();
  const nowMs = now.getTime();

  const lastMonth = new Date(now);
  lastMonth.setMonth(now.getMonth() - 1);
  const lastMonthMs = lastMonth.getTime() || undefined;

  useEffect(() => {
    setNowDate(nowMs?.toString());
    setLastMonthDate(lastMonthMs?.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const { getIrtPnlData, getUsdPnlData } = usePnl();

  const { data, isPending } = useGetHistoryPositions(
    {
      maxRowsPerPage,
      page,
      from: fromDate ? fromDate : lastMonthDate?.toString(),
      status: "closed",
      to: toDate ? toDate : nowDate?.toString(),
    },
    { enabled: isLoggedIn },
  );
  const tradeList = data?.result;

  const { data: tradesData } = useGetHistoryPositions(
    {
      maxRowsPerPage: "10000000",
      page,
      from: fromDate ? fromDate : lastMonthDate?.toString(),
      status: "closed",
      to: toDate ? toDate : nowDate?.toString(),
    },
    { enabled: isLoggedIn },
  );
  const tradeListForTotalProfitLoss = tradesData?.result;

  const irtPnlArray = getIrtPnlData({ tradeList: tradeListForTotalProfitLoss });
  const usdPnlArray = getUsdPnlData({ tradeList: tradeListForTotalProfitLoss });

  const totalIrtPnl = irtPnlArray?.reduce((sum, item) => sum + item.pnl, 0);
  const totalUsdPnl = usdPnlArray?.reduce((sum, item) => sum + item.pnl, 0);

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start">
      <div className="mb-2 flex w-full flex-col items-center justify-start">
        <DateTabs
          lastMonthDate={lastMonthDate}
          nowDate={nowDate}
          passDateToParent={(type: string, value: string) => {
            if (type === "from") {
              setFromDate(value);
            } else {
              setToDate(value);
            }
          }}
        />
        <PnlDetailRow totalIRTPnl={totalIrtPnl} totalUSDPnl={totalUsdPnl} />
      </div>

      {isPending ? (
        <LoadingView />
      ) : (
        <>
          {tradeList?.map((item, index) => {
            return (
              <TradeHistoryItem
                item={item}
                key={index}
                onClick={() => {
                  setSelectedItem(item);
                  setIsDrawerOpen(true);
                }}
              />
            );
          })}
          <div className="flex w-full items-center justify-center">
            <TableDefaultFoot
              lastPage={data?.paginationData?.lastPage}
              pagination={{
                maxRowsPerPage,
                page,
                setMaxRowsPerPage,
                setPage,
              }}
            />
          </div>
        </>
      )}

      {isDrawerOpen && (
        <TradeDetailDrawer
          isOpen={isDrawerOpen}
          item={selectedItem}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default TradesHistory;
