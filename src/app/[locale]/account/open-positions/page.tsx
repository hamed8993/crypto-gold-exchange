import DesktopOrdersHistoryPage from "@/components/pages/desktopOrdersHistoryPage";
import OpenPositionsPage from "@/components/pages/openPositionsPage";

const OpenPositions = () => {
  return (
    <>
      <DesktopOrdersHistoryPage className="hidden md:block" />;
      <OpenPositionsPage className="md:hidden" />;
    </>
  );
};

export default OpenPositions;
