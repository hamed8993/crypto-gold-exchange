"use client";

import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import TradesHistory from "./components/tradesHistory";

interface TradeHistoryPageProps {
  className?: string;
}

const TradeHistoryPage = ({ className }: TradeHistoryPageProps) => {
  const t = useTranslations();

  return (
    <PwaPageLayout
      containerClassName="pr-0 pl-0"
      hasBackChevron
      title={t("closedTradesHistory")}
      wrapperClassName={className}
    >
      <div className="flex h-[calc(100vh-80px)]! w-full flex-col items-center justify-between">
        <div className="flex h-full w-full flex-col items-center justify-start">
          <TradesHistory />
        </div>
      </div>
    </PwaPageLayout>
  );
};

export default TradeHistoryPage;
