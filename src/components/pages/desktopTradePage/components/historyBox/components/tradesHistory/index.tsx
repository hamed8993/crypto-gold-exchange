"use client";

import EmptyView from "@/components/atoms/emptyView";
import LoadingView from "@/components/atoms/loadingView";
import { useTradeContext } from "@/components/pages/desktopTradePage/provider";
import { useAuth } from "@/core/providers/authProvider";
import { useGetHistoryPositions } from "@/core/services/hooks";
import { useMemo } from "react";
import Trade from "../trade";

interface TradesHistoryProps {
  symbol: string;
}

function TradesHistory({ symbol }: TradesHistoryProps) {
  const { isLoggedIn } = useAuth();

  const { data, isPending } = useGetHistoryPositions(
    {
      status: "closed",
      maxRowsPerPage: "10",
      page: "1",
    },
    { enabled: isLoggedIn },
  );

  const { watch } = useTradeContext();
  const isDisplayThisMarket = watch("isDisplayThisMarket");

  const tradesList = useMemo(() => data?.result || [], [data]);

  const TradesHistoryList = useMemo(
    () =>
      tradesList?.length > 0 &&
      tradesList?.map((item, index) => {
        return isDisplayThisMarket ? (
          item?.symbol === symbol ? (
            <Trade item={item} key={index} />
          ) : null
        ) : (
          <Trade item={item} key={index} />
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isDisplayThisMarket],
  );

  return (
    <>
      {isPending ? (
        <LoadingView />
      ) : Number(tradesList?.length) > 0 ? (
        TradesHistoryList
      ) : (
        <EmptyView />
      )}
    </>
  );
}

export default TradesHistory;
