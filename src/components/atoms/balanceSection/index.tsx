"use client";

import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface BalanceSectionProps {
  asset?: string;
  wrapperClassName?: string;
}
function BalanceSection({ asset, wrapperClassName }: BalanceSectionProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();

  const { data } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const balance = data?.result?.main;
  const { getQuoteName } = useMarketsNamesData();

  const assetBalance = balance?.find((item) => item.coin === asset)?.available;

  return (
    <div
      className={clsx(
        "mt-3 flex w-full items-center justify-start gap-1 px-2",
        wrapperClassName,
      )}
    >
      <p className="text-justify text-xs text-accentText dark:text-accentTextDark">
        {`${t("balance")} :`}
      </p>
      <p className="text-justify font-english text-xs text-mainText dark:text-mainTextDark">
        {addCommaSeparator(assetBalance || "")}
      </p>
      <p className="text-justify text-xs text-accentText dark:text-accentTextDark">
        {getQuoteName(asset || "")}
      </p>
    </div>
  );
}

export default BalanceSection;
