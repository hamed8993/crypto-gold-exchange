import CustomHalfDonutChart from "@/components/atoms/customHalfDonut";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { useTranslations } from "next-intl";

function BalanceTopLeftBox() {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();

  const { data: balanceData } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const marginWallet = balanceData?.result?.margin || [];
  const mainWallet = balanceData?.result?.main || [];

  const mainUsdtWallet =
    mainWallet?.find((item) => item.coin === "usd")?.available || 0;
  const mainIrtWallet =
    mainWallet?.find((item) => item.coin === "irt")?.available || 0;
  const marginIrtBalance =
    marginWallet?.find((item) => item.coin === "irt")?.available || 0;
  const marginUsdtWallet =
    marginWallet?.find((item) => item.coin === "usd")?.available || 0;

  const irtTotal = Number(mainIrtWallet) + Number(marginIrtBalance);
  const irtDonut =
    irtTotal === 0
      ? []
      : [
          Number(((Number(mainIrtWallet) / irtTotal) * 100).toFixed(1)),
          Number(((Number(marginIrtBalance) / irtTotal) * 100).toFixed(1)),
        ];
  const usdTotal = Number(mainUsdtWallet) + Number(marginUsdtWallet);

  const usdDonut =
    usdTotal === 0
      ? []
      : [
          Number(((Number(mainUsdtWallet || 0) / usdTotal) * 100).toFixed(1)),
          Number(((Number(marginUsdtWallet || 0) / usdTotal) * 100).toFixed(1)),
        ];

  return (
    <div className="flex w-full flex-col items-end justify-start gap-1 pe-5">
      <div className="ps-auto relative flex items-start justify-start">
        <p className="absolute bottom-0 w-[140px] self-center text-center text-[10px] text-mainText dark:text-mainTextDark">
          {t("irtAccount")}
        </p>
        {irtDonut?.length === 0 ? (
          <CustomHalfDonutChart
            colors={["#848e9c"]}
            data={[0]}
            height={80}
            width={140}
          />
        ) : (
          <CustomHalfDonutChart
            colors={["#0d77e7", "#2e7d32"]}
            data={irtDonut}
            height={80}
            width={140}
          />
        )}
      </div>
      <div className="-my-1 ms-auto flex h-px w-[140px] bg-accentText50 dark:bg-accentTextDark50" />
      <div className="ps-auto relative flex items-start justify-start">
        <p className="absolute top-0 w-[140px] self-center text-center text-[10px] text-mainText dark:text-mainTextDark">
          {t("usdAccount")}
        </p>
        {usdDonut?.length === 0 ? (
          <CustomHalfDonutChart
            data={[0]}
            height={80}
            className="rotate-180"
            width={140}
            colors={["#848e9c"]}
          />
        ) : (
          <CustomHalfDonutChart
            data={usdDonut}
            height={80}
            className="rotate-180"
            width={140}
            colors={["#0d77e7", "#2e7d32"]}
          />
        )}
      </div>

      <div className="mb-2 flex w-fit items-center justify-end gap-2">
        <p className="text-[10px] text-mainText dark:text-mainTextDark">
          {`% ${t("main")}`}
        </p>
        <div className="flex h-3 w-3 rounded-full bg-positive" />
        <p className="text-[10px] text-mainText dark:text-mainTextDark">-</p>
        <p className="text-[10px] text-mainText dark:text-mainTextDark">
          {`% ${t("margin")}`}
        </p>
        <div className="flex h-3 w-3 rounded-full bg-mainBrandAlternative" />
      </div>
    </div>
  );
}

export default BalanceTopLeftBox;
