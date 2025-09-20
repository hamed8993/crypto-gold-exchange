import { localeType } from "@/app/[locale]/layout";
import LoadingView from "@/components/atoms/loadingView";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useGetExchange_dataMarkets_details } from "@/core/services/hooks";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaSortAmountUp } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";

const BigMovers = () => {
  const t = useTranslations();
  const { locale } = useUrl();

  const [type, setType] = useState<"gainers" | "losers">("gainers");

  const { data: marketDetailsData, isLoading: isLoadingMarketDetails } =
    useGetExchange_dataMarkets_details();
  const marketDetails = marketDetailsData?.result;

  const gainers = [...(marketDetails || [])]
    ?.sort((a, b) => Number(b.change_percentage) - Number(a.change_percentage))
    .filter((item) => Number(item.change_percentage) >= 0)
    .slice(0, 8);

  const losers = [...(marketDetails || [])]
    ?.sort((a, b) => Number(a.change_percentage) - Number(b.change_percentage))
    .filter((item) => Number(item.change_percentage) <= 0)
    .slice(0, 8);

  const data = type === "losers" ? losers : gainers;

  const getRatioPercentage = (
    changePercentage: number | string,
    highestChangePercentage: number | string,
  ) => {
    return (Number(changePercentage) / Number(highestChangePercentage)) * 100;
  };

  const { getMarketName } = useMarketsNamesData();

  return (
    <div className="my-4 flex flex-col gap-2 px-3">
      <div className="flex items-center justify-between">
        <h2 className="text-mainText dark:text-mainTextDark">
          {t("bigMovers")}
        </h2>
        <div className="flex items-center gap-1">
          <LuRefreshCcw className="flex h-9 w-9 items-center justify-center rounded-full bg-accentText50 p-2 text-accentText dark:bg-accentTextDark50 dark:text-accentTextDark" />
          <FaSortAmountUp
            onClick={() => setType("gainers")}
            className={clsx(
              "flex h-11 w-11 scale-75 items-center justify-center rounded-full border border-mainText p-3 text-mainText dark:border-mainTextDark dark:text-mainTextDark",
              type === "losers"
                ? "bg-transparent dark:border-mainTextDark dark:text-mainTextDark"
                : "bg-mainText text-mainTextDark dark:bg-mainTextDark dark:text-constantDark",
            )}
          />
          <FaSortAmountUp
            onClick={() => setType("losers")}
            className={clsx(
              "flex h-11 w-11 rotate-180 scale-75 items-center justify-center rounded-full border border-mainText p-3 text-mainText dark:border-mainTextDark dark:text-mainTextDark",
              type === "gainers"
                ? "bg-transparent dark:border-mainTextDark dark:text-mainTextDark"
                : "bg-mainText text-mainTextDark dark:bg-mainTextDark dark:text-constantDark",
            )}
          />
        </div>
      </div>
      <div className="flex h-64 min-h-64 items-end justify-between gap-5 rounded-[4px] bg-surface p-4 dark:bg-surfaceDark">
        {isLoadingMarketDetails ? (
          <div className="flex h-full w-full items-center justify-center">
            <LoadingView />
          </div>
        ) : (
          data?.map((item) => {
            return (
              <div className="flex h-full flex-col gap-3" key={item.symbol}>
                <div className="flex h-full flex-col items-center justify-end gap-2">
                  <div
                    className="h-5 w-fit font-english text-sm text-mainText dark:text-mainTextDark"
                    dir="ltr"
                  >
                    {`${item.change_percentage} %`}
                  </div>
                  <div
                    className={clsx(
                      "w-5 rounded-[4px] bg-green-gradient",
                      type === "losers"
                        ? "bg-red-gradient"
                        : "bg-green-gradient",
                    )}
                    style={{
                      height: `${getRatioPercentage(item.change_percentage, data[0].change_percentage)}%`,
                    }}
                  />
                </div>
                <div className="flex h-14 min-h-14 flex-col items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-secondBackground text-xs text-mainText dark:bg-secondBackgroundDark dark:text-mainTextDark">
                    {`${item.symbol[0].toUpperCase()}`}
                  </div>
                  <span className="text-xs text-mainText dark:text-mainTextDark">
                    {getMarketName(item.symbol)[locale as localeType]}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BigMovers;
