import DesktopTransactionHistoryPage from "@/components/pages/desktopTransactionHistoryPage";
import TransactionHistoryPage from "@/components/pages/transactionHistoryPage";

function TradeHistory() {
  return (
    <>
      <DesktopTransactionHistoryPage className="hidden md:block" />
      <TransactionHistoryPage className="md:hidden" />
    </>
  );
}

export default TradeHistory;
