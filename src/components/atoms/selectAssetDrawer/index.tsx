import clsx from "clsx";
import { useTranslations } from "next-intl";

interface SelectAssetsTabProps {
  selectCoin: (value: string) => void;
  asset: string;
}
function SelectAssetsTab({ asset, selectCoin }: SelectAssetsTabProps) {
  const t = useTranslations();

  const searchedData = [
    {
      coin: "irt",
    },
    {
      coin: "usd",
    },
  ];

  return (
    <div className="mt-2 flex w-full items-center justify-between gap-2">
      {searchedData?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              selectCoin(item?.coin);
            }}
            className={clsx(
              "my-1 flex w-full cursor-pointer items-center justify-center rounded-lg px-2 py-3",
              asset === item.coin
                ? asset === "irt"
                  ? "bg-positive"
                  : "bg-mainBrandAlternative"
                : "border border-accentText50 dark:border-accentTextDark50",
            )}
          >
            <p
              dir="ltr"
              className={clsx(
                "text-xs",
                asset === item.coin
                  ? "text-white"
                  : "text-accentText dark:text-accentTextDark",
              )}
            >
              {`${item?.coin === "irt" ? t("irtAccount") : t("usdAccount")}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default SelectAssetsTab;
