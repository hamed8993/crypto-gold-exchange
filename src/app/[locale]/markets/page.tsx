import DesktopMarketsPage from "@/components/pages/desktopMarketsPage";
import MarketsPage from "@/components/pages/marketsPage";

function page() {
  return (
    <>
      <DesktopMarketsPage className="hidden md:block" />
      <MarketsPage className="md:hidden" />
    </>
  );
}

export default page;
