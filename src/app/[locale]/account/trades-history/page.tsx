import DesktopTradesHistoryPage from "@/components/pages/desktopTradesHistoryPage";
import TradeHistoryPage from "@/components/pages/tradesHistoryPage";

const TradeHistory = () => {
  return (
    <>
      <DesktopTradesHistoryPage className="hidden md:block" />
      <TradeHistoryPage className="md:hidden" />
    </>
  );
};

export default TradeHistory;
