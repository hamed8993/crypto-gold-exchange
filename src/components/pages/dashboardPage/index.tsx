"use client";

import PwaPageLayout from "@/components/organisms/layout";
import { useAuth } from "@/core/providers/authProvider";
import clsx from "clsx";
import AdBox from "./components/AdBox";
import BalanceBox from "./components/balance";
import Header from "./components/header";
import MarketDepth from "./components/marketDepth";
import ReferralCard from "./components/referralCard";
import WarningComponent from "./components/warningComponent";

interface DashboardPageProps {
  className?: string;
}

function DashboardPage({ className }: DashboardPageProps) {
  const { isLoggedIn } = useAuth();

  return (
    <PwaPageLayout
      headerComponent={<Header />}
      wrapperClassName={clsx("overflow-hidden max-w-full", className)}
    >
      {isLoggedIn ? <BalanceBox /> : <AdBox />}

      <div className="my-4 flex h-60 min-h-60 w-[94%] self-center rounded-xl bg-surface dark:bg-surfaceDark"></div>

      <ReferralCard />

      <MarketDepth />

      {!isLoggedIn && <WarningComponent />}
    </PwaPageLayout>
  );
}

export default DashboardPage;
