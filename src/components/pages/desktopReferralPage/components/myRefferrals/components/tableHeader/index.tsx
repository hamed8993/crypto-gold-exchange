import { useTranslations } from "next-intl";
import HeaderBox from "../headerBox";

function TableHeader() {
  const t = useTranslations();

  return (
    <div className="bg-accentTextDark50 mt-5 flex w-full items-center justify-between rounded-lg px-2 py-3">
      <HeaderBox title={"#"} />
      <HeaderBox title={t("referralCode")} />
      <HeaderBox title={t("income")} />
      <HeaderBox title={t("totalReferralsCount")} />
      <HeaderBox className="hidden lg:flex" title={t("yourShareCount")} />
      <HeaderBox className="hidden lg:flex" title={t("subsetShareCount")} />
      <HeaderBox title={t("referralLink")} />
    </div>
  );
}

export default TableHeader;
