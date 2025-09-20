"use client";

import CustomTab from "@/components/atoms/customTab";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { useTranslations } from "next-intl";
import OrdersHistoryTab from "./components/openOrdersTab";
import PositionsHistoryTab from "./components/openPositionsTab";

interface DesktopOrdersHistoryPageProps {
  className?: string;
}

function DesktopOrdersHistoryPage({
  className,
}: DesktopOrdersHistoryPageProps) {
  const t = useTranslations();
  const tabs = [
    {
      key: "openOrders",
      label: t("openOrders"),
      content: <OrdersHistoryTab />,
    },
    {
      key: "openPositions",
      label: t("openPositions"),
      content: <PositionsHistoryTab />,
    },
  ];

  return (
    <DesktopPageLayout hasFooter hasHeader hasSideMenu className={className}>
      <div className="flex min-h-dvh w-full bg-mainBackground p-6 dark:bg-mainBackgroundDark">
        <div className="flex min-h-dvh w-full flex-col gap-6 bg-mainBackground dark:bg-mainBackgroundDark">
          <h2 className="text-lg font-bold text-mainText dark:text-mainTextDark">
            {t("orderHistoryTitle")}
          </h2>
          <CustomTab tabs={tabs} defaultTab="openOrders" />
        </div>
      </div>
    </DesktopPageLayout>
  );
}

export default DesktopOrdersHistoryPage;
