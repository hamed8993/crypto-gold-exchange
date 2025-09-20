import { useState } from "react";
import Header from "./components/header";
import HistoryTabs from "./components/historyTabs";
import OrdersHistory from "./components/ordersHistory";
import PositionsHistory from "./components/positionsHistory";
import TradesHistory from "./components/tradesHistory";

interface HistoryBoxProps {
  symbol: string;
}

function HistoryBox({ symbol }: HistoryBoxProps) {
  const [activeTab, setActiveTab] = useState("openOrders");

  return (
    <div className="bg-surface flex h-fit min-h-96 w-full flex-col rounded-xl p-3 px-4">
      <HistoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Header activeTab={activeTab} />

      {activeTab === "openOrders" ? (
        <OrdersHistory symbol={symbol} />
      ) : activeTab === "openPositions" ? (
        <PositionsHistory symbol={symbol} />
      ) : (
        <TradesHistory symbol={symbol} />
      )}
    </div>
  );
}

export default HistoryBox;
