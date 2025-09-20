import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataGet_referral_codes } from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import DetailBox from "../detailBox";

function ReferralDetailsRow() {
  const { isLoggedIn } = useAuth();
  const { data } = useGetUser_dataGet_referral_codes({ enabled: isLoggedIn });
  const list = data?.result?.refCodes;
  const referralsCount = list?.reduce(
    (acc, curr) => Number(new Decimal(acc).add(Number(curr.subsetCount))),
    0,
  );
  const totalClaimed = data?.result?.totalClaimed || 0;
  const unclaimedBalance = data?.result?.unclaimedBalance || 0;
  const t = useTranslations();

  return (
    <div className="flex w-full items-center justify-between px-4">
      <DetailBox
        quote={t("irtSymbol")}
        title={t("totalIncome")}
        value={addCommaSeparator(totalClaimed)}
      />
      <DetailBox
        quote={t("men")}
        title={t("totalReferralsCount")}
        value={addCommaSeparator(referralsCount || 0)}
      />
      <DetailBox
        quote={t("irtSymbol")}
        title={t("recievedMoney")}
        value={addCommaSeparator(unclaimedBalance)}
      />
    </div>
  );
}

export default ReferralDetailsRow;
