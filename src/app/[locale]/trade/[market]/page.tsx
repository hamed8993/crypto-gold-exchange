import DesktopTradePage from "@/components/pages/desktopTradePage";
import TradePage from "@/components/pages/tradePage";

function Trade() {
  return (
    <>
      <DesktopTradePage className="hidden md:block" />
      <TradePage className="md:hidden" />
    </>
  );
}

export default Trade;
