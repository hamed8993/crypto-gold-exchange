import { useTranslations } from "next-intl";
import HeaderItem from "../headerItem";

interface HeaderProps {
  activeTab?: string;
}

function Header({ activeTab }: HeaderProps) {
  const t = useTranslations();

  return (
    <div className="flex min-h-10 w-full items-center justify-between">
      <HeaderItem title={t("market")} />
      <HeaderItem title={t("side")} />
      <HeaderItem title={t("leverage")} />
      <HeaderItem title={t("entryPrice")} />
      <HeaderItem title={t("targetPoint")} />
      <HeaderItem title={t("stopLoss")} />
      <HeaderItem title={t("openedTime")} />
      <HeaderItem title={t("pnl")} />
      {activeTab === "tradesHistory" ? null : (
        <HeaderItem title={t("actions")} />
      )}
    </div>
  );
}

export default Header;
