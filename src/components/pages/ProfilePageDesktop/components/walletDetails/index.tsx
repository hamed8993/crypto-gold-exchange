import AssetDetailRow from "@/components/pages/portfolioPage/components/assetItem/components/assetDetailRow";
import TotalBalanceRow from "@/components/pages/portfolioPage/components/assetItem/components/totalBalanceRow";
import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useAuth } from "@/core/providers/authProvider";
import {
  useGetDepositHistory,
  useGetWithdrawHistory,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";

type pieDataProps = {
  color: string;
  label: string;
  value: number;
};

type UserWallet = {
  coin: string;
  in_order: string;
  mainBalance: string;
  marginBalance: string;
  pendingWithdraw: string;
  pieData: Array<pieDataProps>;
  total: string;
}[];

interface WalletDetailsProps {
  item: ArrayElement<UserWallet>;
}

function WalletDetails({ item }: WalletDetailsProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { getQuoteName } = useMarketsNamesData();

  const { data: irtWithdrawalData } = useGetWithdrawHistory(
    {
      asset: "irt",
      status: "completed",
    },
    { enabled: isLoggedIn },
  );

  const { data: usdWithdrawalData } = useGetWithdrawHistory(
    {
      asset: "usd",
      status: "completed",
    },
    { enabled: isLoggedIn },
  );

  const { data: irtData } = useGetDepositHistory(
    {
      asset: "irt",
      status: "completed",
    },
    { enabled: isLoggedIn },
  );

  const { data: usdData } = useGetDepositHistory(
    {
      asset: "usd",
      status: "completed",
    },
    { enabled: isLoggedIn },
  );

  const totalIrtDeposits =
    irtData?.result?.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0) || "0";

  const totalUsdDeposits =
    usdData?.result?.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0) || "0";

  const totalIrtWithdrawals =
    irtWithdrawalData?.result?.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0) || "0";

  const totalUsdWithdrawals =
    usdWithdrawalData?.result?.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0) || "0";

  return (
    <>
      <TotalBalanceRow coin={item?.coin} total={item?.total} />
      <AssetDetailRow
        coin={item?.coin}
        value={item?.mainBalance}
        title={t("baseBalance")}
      />

      <AssetDetailRow
        coin={item?.coin}
        value={item?.marginBalance}
        title={t("marginBalance")}
      />

      <AssetDetailRow
        coin={item?.coin}
        value={item?.coin === "irt" ? totalIrtDeposits : totalUsdDeposits}
        title={`${t("total")} ${t("deposit")} ${getQuoteName(item?.coin || "")}`}
      />

      <AssetDetailRow
        coin={item?.coin}
        value={item?.coin === "irt" ? totalIrtWithdrawals : totalUsdWithdrawals}
        title={`${t("total")} ${t("withdraw")} ${getQuoteName(item?.coin || "")}`}
      />
    </>
  );
}

export default WalletDetails;
