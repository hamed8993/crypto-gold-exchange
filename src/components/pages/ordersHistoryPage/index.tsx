"use client";

import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import Tabs from "./components/tabs";

export type ordersHistoryTab = "open" | "canceled";

export type historyTabsName =
  | "openOrders"
  | "openPositions"
  | "closedTradesHistory"
  | "";

interface OrdersHistoryProps {
  className?: string;
}

function OrdersHistory({ className }: OrdersHistoryProps) {
  const t = useTranslations();

  return (
    <PwaPageLayout
      wrapperClassName={className}
      containerClassName="pr-0 pl-0"
      hasBackChevron={false}
      title={t("historyTitle")}
    >
      <div className="flex h-[calc(100vh-80px)]! w-full flex-col items-center justify-between">
        <div className="flex h-full w-full flex-col items-center justify-start">
          <Tabs />
        </div>
      </div>
    </PwaPageLayout>
  );
}

export default OrdersHistory;
