import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";

function BalancesRow() {
  const t = useTranslations();

  const { isLoggedIn } = useAuth();

  const { data: balanceData } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const marginBalance = balanceData?.result?.margin;

  const irtBalance =
    marginBalance?.find((item) => item?.coin === "irt")?.available || 0;
  const usdBalance =
    marginBalance?.find((item) => item?.coin === "usd")?.available || 0;

  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full items-center justify-start">
        <div className="flex w-full items-center justify-start gap-1 rounded-lg p-1">
          <p className="text-accentText text-xs">{t("irtBalance")}:</p>
          <p className="font-english text-mainText text-xs">
            {addCommaSeparator(irtBalance)}
          </p>
          <p className="text-accentText text-xs">{getQuoteName("irt")}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-start">
        <div className="flex w-full items-center justify-start gap-1 rounded-lg p-1">
          <p className="text-accentText text-xs">{t("usdBalance")}:</p>
          <p className="font-english text-mainText text-xs">
            {addCommaSeparator(usdBalance)}
          </p>
          <p className="text-accentText text-xs">{getQuoteName("usd")}</p>
        </div>
      </div>
    </div>
  );
}

export default BalancesRow;
