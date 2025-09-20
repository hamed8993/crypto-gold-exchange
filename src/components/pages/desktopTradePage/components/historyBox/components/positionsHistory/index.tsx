"use client";

import EmptyView from "@/components/atoms/emptyView";
import LoadingView from "@/components/atoms/loadingView";
import { useTradeContext } from "@/components/pages/desktopTradePage/provider";
import { ArrayElement } from "@/core/constants/constants";
import { useAuth } from "@/core/providers/authProvider";
import { useGetHistoryPositions } from "@/core/services/hooks";
import { GetHistoryPositions } from "@/core/services/types";
import { useMemo, useState } from "react";
import ClosePositionModal from "../closePositionModal";
import EditPositionModal from "../editPositionModal";
import Position from "../position";

interface PositionsHistoryProps {
  symbol: string;
}

function PositionsHistory({ symbol }: PositionsHistoryProps) {
  const { isLoggedIn } = useAuth();

  const { data, isPending } = useGetHistoryPositions(
    {
      status: "open",
    },
    { enabled: isLoggedIn },
  );

  const [isClosePositionModalOpen, setIsClosePositionModalOpen] =
    useState(false);
  const { watch } = useTradeContext();
  const isDisplayThisMarket = watch("isDisplayThisMarket");

  const positionsList = useMemo(() => data?.result || [], [data]);

  const [selectedPosition, setSelectedPosition] =
    useState<ArrayElement<GetHistoryPositions["result"] | undefined>>();

  const [isEditPositionModalOpen, setIsEditPositionModalOpen] = useState(false);

  const openPositions = useMemo(
    () =>
      positionsList?.length > 0 &&
      positionsList?.map((item, index) => {
        return isDisplayThisMarket ? (
          item?.symbol === symbol ? (
            <Position
              setIsEditPositionModalOpen={setIsEditPositionModalOpen}
              setSelectedPosition={setSelectedPosition}
              setIsClosePositionModalOpen={setIsClosePositionModalOpen}
              item={item}
              key={index}
            />
          ) : null
        ) : (
          <Position
            setIsEditPositionModalOpen={setIsEditPositionModalOpen}
            setSelectedPosition={setSelectedPosition}
            setIsClosePositionModalOpen={setIsClosePositionModalOpen}
            item={item}
            key={index}
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
      ) : positionsList?.length > 0 ? (
        openPositions
      ) : (
        <EmptyView />
      )}

      {selectedPosition && (
        <EditPositionModal
          activeModal={isEditPositionModalOpen}
          item={selectedPosition}
          setActiveModal={setIsEditPositionModalOpen}
        />
      )}

      {selectedPosition && (
        <ClosePositionModal
          activeModal={isClosePositionModalOpen}
          setActiveModal={setIsClosePositionModalOpen}
          item={selectedPosition}
        />
      )}
    </>
  );
}

export default PositionsHistory;
