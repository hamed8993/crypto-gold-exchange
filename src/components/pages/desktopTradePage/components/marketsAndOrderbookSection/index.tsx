import { useTranslations } from "next-intl";
import { useState } from "react";
import Market from "./components/market";
import Orders from "./components/orders";

enum TabEnum {
  market = "market",
  orders = "orders",
}

function MarketsAndOrderbookSection() {
  const t = useTranslations();
  const [selectedTab, setSelectedTab] = useState<TabEnum>(TabEnum.market);

  const tabClass = (active: boolean) =>
    `px-6 py-3 text-[12px] font-semibold ${
      active
        ? "border-b border-newColor_bgPrimary50 text-newColor_bgPrimary50 dark:border-constantLight dark:text-constantLight"
        : "border-none text-textSecondary"
    }`;

  return (
    <div className="bg-bgSurface dark:bg-newColor_bgNeutralWhiteDark flex h-full flex-col gap-3 px-3 py-4">
      <div className="flex items-center gap-3">
        <button
          className={`px-6 py-3 text-[12px] font-semibold ${tabClass(selectedTab === TabEnum.market)}`}
          onClick={() => setSelectedTab(TabEnum.market)}
          type="button"
        >
          {t("market")}
        </button>
        <button
          className={`px-6 py-3 text-[12px] font-semibold ${tabClass(selectedTab === TabEnum.orders)}`}
          onClick={() => setSelectedTab(TabEnum.orders)}
          type="button"
        >
          {t("ordersList")}
        </button>
      </div>
      <div>{selectedTab === TabEnum.market ? <Market /> : <Orders />}</div>
    </div>
  );
}

export default MarketsAndOrderbookSection;
