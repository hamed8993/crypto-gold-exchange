import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useAuth } from "@/core/providers/authProvider";
import {
  useGetUser_dataAccount_details,
  useGetUser_dataBalance,
} from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";

type TotalsByCoin = {
  [coin: string]: number;
};

function BalanceTopRightBox() {
  const { isLoggedIn } = useAuth();
  const { getQuoteName } = useMarketsNamesData();
  const t = useTranslations();
  const { data } = useGetUser_dataAccount_details({ enabled: isLoggedIn });
  const userName = `${data?.result?.name} ${data?.result?.family_name}`;

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

  const coinTotalsArray = Object.entries(totalsByCoin).map(([coin, total]) => ({
    coin,
    total,
  }));

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 p-3">
      <p className="text-xs text-accentText dark:text-accentTextDark">
        {userName ? userName : ""}
      </p>

      <div className="flex items-center justify-start gap-1">
        <p className="text-[10px] text-accentText dark:text-accentTextDark">
          {`${t("accountID")}`}
        </p>
        <p className="font-english text-[10px] text-accentText dark:text-accentTextDark">
          {data?.result?.user_id || ""}
        </p>
      </div>

      <div className="mt-2 flex h-px w-[60%] bg-accentText50 dark:bg-accentTextDark50" />

      {coinTotalsArray?.map((item, index) => {
        return (
          <div key={index} className="flex items-center justify-start gap-2">
            <p className="font-english text-xl text-mainText dark:text-mainTextDark">
              {addCommaSeparator(item?.total || "0")}
            </p>
            <p className="mt-1 text-[14px] text-accentText dark:text-accentTextDark">
              {getQuoteName(item?.coin)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default BalanceTopRightBox;
