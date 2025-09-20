import clsx from "clsx";
import { useTranslations } from "next-intl";

interface SelectAssetsTabProps {
  selectCoin: (value: string) => void;
  asset: string;
  parentClass?: string;
}
function SelectAssetsTabNew({
  asset,
  selectCoin,
  parentClass,
}: SelectAssetsTabProps) {
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
    <div
      className={clsx(
        "flex w-fit gap-3 rounded-3xl bg-constantLight p-[6px] dark:bg-panelDark",
        parentClass,
      )}
    >
      {searchedData?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              selectCoin(item?.coin);
            }}
            className={clsx(
              "flex h-12 cursor-pointer items-center justify-center rounded-[18px] px-12 py-[15px]",
              asset === item.coin
                ? asset === searchedData[index].coin
                  ? "bg-mainBrandAlternative"
                  : "bg-transparent"
                : "border-accentText50 dark:border-accentTextDark50",
            )}
          >
            <p
              className={clsx(
                "text-lg",
                asset === item.coin
                  ? "text-constantLight"
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

export default SelectAssetsTabNew;
