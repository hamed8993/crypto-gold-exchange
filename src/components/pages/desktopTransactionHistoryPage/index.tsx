"use client";
import CustomTab from "@/components/atoms/customTab";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { useTranslations } from "next-intl";
import DepositHistoryTab from "./components/depositHistoryTab";
import WithdrawHistoryTab from "./components/withdrawHistoryTab";

interface DesktopTransactionHistoryPageProps {
  className?: string;
}

function DesktopTransactionHistoryPage({
  className,
}: DesktopTransactionHistoryPageProps) {
  const t = useTranslations();
  const tabs = [
    {
      key: "depositHistory",
      label: t("depositHistory"),
      content: <DepositHistoryTab />,
    },

    {
      key: "withdrawHistory",
      label: t("withdrawHistory"),
      content: <WithdrawHistoryTab />,
    },
  ];

  return (
    <DesktopPageLayout hasFooter hasHeader hasSideMenu className={className}>
      <div className="bg-mainBackground flex min-h-dvh w-full flex-col gap-6">
        <h2 className="text-mainText text-lg font-bold">
          {t("transactionHistoryTitle")}
        </h2>
        <CustomTab tabs={tabs} defaultTab="depositHistory" />
      </div>
    </DesktopPageLayout>
  );
}

export default DesktopTransactionHistoryPage;
