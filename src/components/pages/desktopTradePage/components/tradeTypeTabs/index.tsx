import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useTradeContext } from "../../provider";
import LeverageSelect from "../leverageSelect";

interface TradeTypeTabsProps {
  symbol: string;
}

function TradeTypeTabs({ symbol }: TradeTypeTabsProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("limit");
  const { setValue } = useTradeContext();

  return (
    <div className="flex w-full items-center justify-between gap-1 p-2">
      <div className="bg-secondBackground flex w-full items-center justify-between gap-1 rounded-lg p-2">
        <div
          onClick={() => {
            setActiveTab("limit");
            setValue("orderType", "pending");
          }}
          className={clsx(
            "flex h-10 w-full cursor-pointer items-center justify-center rounded-lg",
            activeTab === "limit" ? "bg-mainBrandAlternative" : "",
          )}
        >
          <p
            className={clsx(
              "text-sm",
              activeTab === "limit"
                ? "text-base font-bold text-white"
                : "text-mainText opacity-50",
            )}
          >
            {t("limit")}
          </p>
        </div>
        <div
          onClick={() => {
            setActiveTab("market");
            setValue("orderType", "market");
          }}
          className={clsx(
            "flex h-10 w-full cursor-pointer items-center justify-center rounded-lg",
            activeTab === "market" ? "bg-mainBrandAlternative" : "",
          )}
        >
          <p
            className={clsx(
              "text-sm",
              activeTab === "market"
                ? "text-base font-bold text-white"
                : "text-mainText opacity-50",
            )}
          >
            {t("market")}
          </p>
        </div>
      </div>
      <div className="flex h-[48px]! min-h-[48px]! w-[40%] items-center justify-center">
        <LeverageSelect symbol={symbol} />
      </div>
    </div>
  );
}

export default TradeTypeTabs;
