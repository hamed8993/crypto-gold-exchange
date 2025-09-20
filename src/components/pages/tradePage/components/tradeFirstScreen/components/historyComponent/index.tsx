import { useAuth } from "@/core/providers/authProvider";
import {
  useGetHistoryOrders,
  useGetHistoryPositions,
} from "@/core/services/hooks";
import { useState } from "react";
import HistoriesTab from "../../../historiesTab";
import OrdersHistoryList from "../OrdersHistoryList";
import PositionsHistoryList from "../positionsHistoryList";

interface HistoryComponentProps {
  onHistoryClick: () => void;
}

function HistoryComponent({ onHistoryClick }: HistoryComponentProps) {
  const { isLoggedIn } = useAuth();
  const [isOrdersHistoryOpen, setIsOrdersHistoryOpen] = useState<boolean>(true);

  const [isPositionsHistoryOpen, setIsPositionsHistoryOpen] =
    useState<boolean>(false);

  const { data: ordersHistory } = useGetHistoryOrders(
    {
      status: "pending",
    },
    { enabled: isLoggedIn },
  );

  const { data: positionsHistory } = useGetHistoryPositions(
    {
      status: "open",
    },
    { enabled: isLoggedIn },
  );

  const ordersListLength = ordersHistory?.result?.length;
  const positionsListLength = positionsHistory?.result?.length;

  return (
    <>
      <HistoriesTab
        isOrdersHistoryOpen={isOrdersHistoryOpen}
        isPositionsHistoryOpen={isPositionsHistoryOpen}
        onHistoryClick={onHistoryClick}
        onOrdersClick={() => {
          setIsPositionsHistoryOpen(false);
          setIsOrdersHistoryOpen(true);
        }}
        onPositionsClick={() => {
          setIsPositionsHistoryOpen(true);
          setIsOrdersHistoryOpen(false);
        }}
        ordersListLength={ordersListLength}
        positionsListLength={positionsListLength}
      />

      {isPositionsHistoryOpen && isLoggedIn && (
        <PositionsHistoryList isPositionsHistoryOpen={isPositionsHistoryOpen} />
      )}

      {isOrdersHistoryOpen && isLoggedIn && (
        <OrdersHistoryList isOrdersHistoryOpen={isOrdersHistoryOpen} />
      )}
    </>
  );
}

export default HistoryComponent;
