import { useGetUser_dataBalance } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CustomSelect from "../../atoms/customSelect";

interface FiltersAssetSelectProps {
  onChange?: (value: string) => void;
  value?: string;
}

type assetObject = {
  value: string;
  label: string;
};

const AssetSelect = ({ onChange, value }: FiltersAssetSelectProps) => {
  const t = useTranslations();

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [assetList, setAssetList] = useState<assetObject[] | null>(null);

  const { data } = useGetUser_dataBalance();
  const coinsList = data?.result?.main || [];

  useEffect(() => {
    const AssetArray = coinsList?.reduce<{ label: string; value: string }[]>(
      (acc, coin) => {
        if (!acc.some((item) => item.value === coin.coin)) {
          acc.push({
            label: coin.coin,
            value: coin.coin,
          });
        }
        return acc;
      },

      [],
    );
    setAssetList([{ label: t("all"), value: "all" }, ...AssetArray]);
  }, [data]);

  const handleOnClick = (asset: string) => {
    setIsSelectOpen(false);
    onChange?.(asset);
  };

  return (
    <CustomSelect
      toggler={
        <div className="flex w-full flex-col gap-2">
          <label className="mx-2 text-xs text-mainText dark:text-mainTextDark">
            {t("asset")}
          </label>

          <div
            className={`dark:border-accentText50Dark flex h-9 w-full items-center self-end rounded-lg border border-accentText50 px-3 placeholder:text-accentText dark:placeholder:text-accentTextDark ${isSelectOpen && "border-mainText dark:border-mainTextDark"}`}
          >
            <p className="w-full text-mainText dark:text-mainTextDark">
              {assetList
                ?.find((asset) => asset.value === value)
                ?.label.toUpperCase() ?? (
                <span className="text-xs text-accentText dark:text-accentTextDark">
                  {t("selectTheFilterAsset")}
                </span>
              )}
            </p>
            {!isSelectOpen ? (
              <FaChevronDown className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            ) : (
              <FaChevronUp className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            )}
          </div>
        </div>
      }
      setIsVisible={(isVisible) => setIsSelectOpen(isVisible)}
      isVisible={isSelectOpen}
      childrenClassName="!bg-mainBackground dark:!bg-mainBackgroundDark dark:!bg-mainBackgroundDark border border-accentText50 dark:border-accentText50Dark"
      togglerClassName="px-0! pt-0"
    >
      <div className="w-full rounded-lg py-3">
        <div className="flex flex-col">
          {assetList?.map((asset, index) => (
            <div
              key={index}
              className="flex h-10 cursor-pointer items-center px-2 hover:bg-surface dark:hover:bg-surfaceDark"
              onClick={() => {
                handleOnClick(asset.value);
              }}
            >
              <p className="text-mainText dark:text-mainTextDark">
                {asset.label.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </CustomSelect>
  );
};

export default AssetSelect;
