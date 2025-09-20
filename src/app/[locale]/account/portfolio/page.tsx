import DesktopProfilePage from "@/components/pages/ProfilePageDesktop";
import PortfolioPage from "@/components/pages/portfolioPage";

function Portfolio() {
  return (
    <>
      <DesktopProfilePage className="hidden md:block" />
      <PortfolioPage className="md:hidden" />
    </>
  );
}

export default Portfolio;
