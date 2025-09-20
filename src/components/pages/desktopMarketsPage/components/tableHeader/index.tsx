import { useTranslations } from "next-intl";
import HeaderBox from "../headerBox";

function TableHeader() {
  const t = useTranslations();

  return (
    <div className="mb-1 flex w-full items-center justify-between rounded-t-xl bg-surface px-2 py-4 dark:bg-surfaceDark">
      <HeaderBox title={t("market")} />
      <HeaderBox title={t("currentPrice")} />
      <HeaderBox title={t("changePriceTitle")} />
      <HeaderBox title={t("quote")} />
      <HeaderBox title={t("changePercentage")} />
      <HeaderBox title={t("volume")} wrapperClassName="hidden lg:flex" />
      <HeaderBox title={t("chart")} />
    </div>
  );
}

export default TableHeader;
