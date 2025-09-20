import DesktopOrdersHistoryPage from "@/components/pages/desktopOrdersHistoryPage";
import OrdersHistoryPage from "@/components/pages/ordersHistoryPage";

function OrdersHistory() {
  return (
    <>
      <DesktopOrdersHistoryPage className="hidden md:block" />;
      <OrdersHistoryPage className="md:hidden" />;
    </>
  );
}

export default OrdersHistory;
