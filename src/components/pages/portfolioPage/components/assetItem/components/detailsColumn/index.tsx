import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useAuth } from "@/core/providers/authProvider";
import {
  useGetDepositHistory,
  useGetWithdrawHistory,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import AssetDetailRow from "../assetDetailRow";
import TotalBalanceRow from "../totalBalanceRow";

interface DetailsColumnProps {
  coin: string;
  total: string;
  mainBalance: string;
  marginBalance: string;
}

function DetailsColumn({
  coin,
  mainBalance,
  marginBalance,
  total,
}: DetailsColumnProps) {
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
      <TotalBalanceRow coin={coin} total={total} />

      <AssetDetailRow
        coin={coin}
        value={mainBalance}
        title={t("baseBalance")}
      />

      <AssetDetailRow
        coin={coin}
        value={marginBalance}
        title={t("marginBalance")}
      />

      <AssetDetailRow
        coin={coin}
        value={coin === "irt" ? totalIrtDeposits : totalUsdDeposits}
        title={`${t("total")} ${t("deposit")} ${getQuoteName(coin || "")}`}
      />

      <AssetDetailRow
        coin={coin}
        value={coin === "irt" ? totalIrtWithdrawals : totalUsdWithdrawals}
        title={`${t("total")} ${t("withdraw")} ${getQuoteName(coin || "")}`}
      />
    </>
  );
}

export default DetailsColumn;
