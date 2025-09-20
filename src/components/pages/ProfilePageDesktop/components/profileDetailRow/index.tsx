import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useAuth } from "@/core/providers/authProvider";
import {
  useGetUser_dataAccount_details,
  useGetUser_dataBalance,
} from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import ProfileItemBox from "../profileItemBox";

type TotalsByCoin = {
  [coin: string]: number;
};

function ProfileDetailRow() {
  const { isLoggedIn } = useAuth();
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();
  const { data } = useGetUser_dataAccount_details();
  const { data: balanceData } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const marginWallet = balanceData?.result?.margin || [];
  const mainWallet = balanceData?.result?.main || [];

  const combined = [...mainWallet, ...marginWallet];

  const totalsByCoin = combined.reduce<TotalsByCoin>((acc, item) => {
    const coin = item?.coin?.toLowerCase();
    const total = parseFloat(item?.total);
    acc[coin] = (acc[coin] || 0) + total;
    return acc;
  }, {});

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <ProfileItemBox title={t("email")} value={data?.result?.email} />
      <ProfileItemBox title={t("cellphone")} value={data?.result?.cellphone} />
      <ProfileItemBox
        title={t("irtBalance")}
        hasComponent
        extraTitle={addCommaSeparator(totalsByCoin?.irt) || "0"}
        extraValue={getQuoteName("irt")}
      />

      <ProfileItemBox
        title={t("usdBalance")}
        hasComponent
        extraTitle={addCommaSeparator(totalsByCoin?.usd) || "0"}
        extraValue={getQuoteName("usd")}
      />
    </div>
  );
}

export default ProfileDetailRow;
