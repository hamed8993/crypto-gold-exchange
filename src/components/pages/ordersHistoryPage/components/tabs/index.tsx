import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import TabItem from "../tabItem";

function Tabs() {
  const t = useTranslations();
  const { locale } = useUrl();

  const tabsData = [
    {
      title: t("openOrders"),
      href: `/${locale}/${RoutesName.openOrders}`,
    },
    {
      title: t("openPositions"),
      href: `/${locale}/${RoutesName.openPositions}`,
    },
    {
      title: t("closedTradesHistory"),
      href: `/${locale}/${RoutesName.tradesHistory}`,
    },
    {
      title: t("withdrawAndDepositHistory"),
      href: `/${locale}/${RoutesName.transactionsHistory}`,
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-between px-4">
      {tabsData.map((item, index) => {
        return <TabItem href={item.href} title={item.title} key={index} />;
      })}
    </div>
  );
}

export default Tabs;
