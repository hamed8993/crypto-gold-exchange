import WalletCurrencyIcon from "@/components/atoms/svg/walletCurrency";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

function HeadTitle() {
  const t = useTranslations();
  const { theme } = useTheme();

  return (
    <div className="flex h-11 items-center gap-x-4">
      <WalletCurrencyIcon
        strokeColor={theme === "dark" ? "#f3f3f3" : "#010002"}
      />
      <div>
        <p className="text-sm font-normal text-mainText dark:text-mainTextDark">
          {t("depositPaymentAddress")}
        </p>
        <p className="text-xs font-normal text-accentText dark:text-accentTextDark">
          {t("tomanRechargePayAddress")}
        </p>
      </div>
    </div>
  );
}

export default HeadTitle;
