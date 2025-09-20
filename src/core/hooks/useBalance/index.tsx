import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";

// interface mainBalanceProps {
//   total?: string;
//   available?: string;
//   pendingWithdraw?: string;
// }

// interface marginBalanceProps {
//   total?: string;
//   available?: string;
//   in_order?: string;
// }

export const useBalance = () => {
  const { isLoggedIn } = useAuth();
  const { data: dataBalance, refetch: refetchBalance } = useGetUser_dataBalance(
    { enabled: isLoggedIn },
  );

  const getUserMainBalance = (asset: string) => {
    const mainBalance = dataBalance?.result?.main || [];

    const assetBalance = mainBalance.filter((item) => {
      return item.coin === asset;
    });

    return assetBalance;
  };

  const getUserMarginBalance = (asset: string) => {
    const mainBalance = dataBalance?.result?.margin || [];

    const assetBalance = mainBalance.filter((item) => {
      return item.coin === asset;
    });

    return assetBalance;
  };

  return {
    getUserMarginBalance,
    getUserMainBalance,
    refetchBalance,
    dataBalance,
  };
};
