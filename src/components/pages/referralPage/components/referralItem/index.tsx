import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import DetailRow from "../detailRow";
import ReferralItemTopSection from "../referralItemTopSection";

interface ReferralItemProps {
  item: {
    code: string;
    income: string;
    subsetCount: string;
    subsetShare: string;
    referrerShare: string;
  };
}

function ReferralItem({ item }: ReferralItemProps) {
  const t = useTranslations();
  const { locale } = useUrl();
  return (
    <div className="border-accentText50 mt-3 flex flex-col items-start justify-start rounded-xl border p-3">
      <ReferralItemTopSection income={item.income} referralCode={item.code} />
      <DetailRow
        title1={t("totalReferralsCount")}
        title2={t("yourShareCount")}
        valueQuote={t("men")}
        value1={`${item.subsetCount}`}
        value2={`${item.referrerShare} ${"%"}`}
      />

      <DetailRow
        title1={t("subsetShareCount")}
        title2={t("referralLink")}
        hasIcon
        value1={`${item.subsetShare} ${"%"}`}
        value2={`${"https://dev.goldfino.com/"}${locale}/authentication/register?ref=${item.code}`}
      />

      {/* <ButtonsRow /> */}
    </div>
  );
}

export default ReferralItem;
