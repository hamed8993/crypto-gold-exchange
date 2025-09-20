"use client";

import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import OrdersHistoryList from "./components/ordersHistory";

interface OpenOrdersPageProps {
  className?: string;
}

const OpenOrdersPage = ({ className }: OpenOrdersPageProps) => {
  const t = useTranslations();

  return (
    <PwaPageLayout
      containerClassName="pr-0 pl-0"
      hasBackChevron
      wrapperClassName={className}
      title={t("openOrders")}
    >
      <div className="flex h-[calc(100vh-80px)]! w-full flex-col items-center justify-between">
        <div className="flex h-full w-full flex-col items-center justify-start">
          <OrdersHistoryList />
        </div>
      </div>
    </PwaPageLayout>
  );
};

export default OpenOrdersPage;
