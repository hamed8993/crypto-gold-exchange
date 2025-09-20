import CustomCheckbox from "@/components/atoms/customCheckbox";
import { useTradeContext } from "@/components/pages/desktopTradePage/provider";
import { useAuth } from "@/core/providers/authProvider";
import {
  useGetHistoryOrders,
  useGetHistoryPositions,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import TabItem from "../tabItem";

interface HistoryTabsProps {
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
}

function HistoryTabs({ activeTab, setActiveTab }: HistoryTabsProps) {
  const { setValue, watch } = useTradeContext();
  const isDisplayThisMarket = watch("isDisplayThisMarket");
  const t = useTranslations();

  const { isLoggedIn } = useAuth();

  const { data: ordersList } = useGetHistoryOrders(
    {
      status: "pending",
    },
    { enabled: isLoggedIn },
  );

  const { data: positionsList } = useGetHistoryPositions(
    { status: "open" },
    { enabled: isLoggedIn },
  );

  const ordersCount = ordersList?.result?.length || 0;
  const positionsCount = positionsList?.result?.length || 0;

  return (
    <div className="border-b-accentText50 flex w-full items-center justify-between border-b">
      <div className="flex min-h-14 items-center justify-start gap-2">
        <TabItem
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          count={ordersCount}
          tab="openOrders"
          isDisplayCount
        />
        <TabItem
          isDisplayCount
          count={positionsCount}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tab="openPositions"
        />
        <TabItem
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tab="tradesHistory"
        />
      </div>
      <div className="flex min-h-10 items-center justify-start px-10">
        <CustomCheckbox
          name="ischecked"
          value={isDisplayThisMarket}
          onChange={() => {
            setValue("isDisplayThisMarket", !isDisplayThisMarket);
          }}
        />
        <p className="text-mainText text-sm">{t("hideOtherPairs")}</p>
      </div>
    </div>
  );
}

export default HistoryTabs;
