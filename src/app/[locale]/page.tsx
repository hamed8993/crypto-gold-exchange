import DashboardPage from "@/components/pages/dashboardPage";
import LandingPage from "@/components/pages/landingPage";

export default function Home() {
  return (
    <>
      <DashboardPage className="md:hidden" />
      <LandingPage className="hidden md:block" />
    </>
  );
}
