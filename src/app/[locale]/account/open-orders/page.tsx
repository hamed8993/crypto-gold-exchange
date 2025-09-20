import DesktopOrdersHistoryPage from "@/components/pages/desktopOrdersHistoryPage";
import OpenOrdersPage from "@/components/pages/openOrdersPage";

const OpenOrders = () => {
  return (
    <>
      <DesktopOrdersHistoryPage className="hidden md:block" />
      <OpenOrdersPage className="md:hidden" />
    </>
  );
};

export default OpenOrders;
