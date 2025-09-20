import { useGetGet_available_coins } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CustomSelect from "../../atoms/customSelect";

interface FiltersNetworkSelectProps {
  onChange?: (value: string) => void;
  value?: string;
}

type NetworkObject = {
  value: string;
  label: string;
};

const FilterNetworkSelect = ({
  onChange,
  value,
}: FiltersNetworkSelectProps) => {
  const t = useTranslations();

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [networkList, setNetworkList] = useState<NetworkObject[] | null>(null);
  const { data } = useGetGet_available_coins();
  const coinsList = data?.result || [];

  useEffect(() => {
    const networkArray = coinsList?.reduce<{ label: string; value: string }[]>(
      (acc, coin) => {
        coin.networks.forEach((network: string) => {
          if (!acc.some((item) => item.value === network)) {
            acc.push({ label: network, value: network });
          }
        });
        return acc;
      },
      [],
    );
    setNetworkList([{ label: t("all"), value: "all" }, ...networkArray]);
  }, [data]);

  const handleOnClick = (selectedNetwork: string) => {
    setIsSelectOpen(false);

    onChange?.(selectedNetwork);
  };

  return (
    <CustomSelect
      toggler={
        <div className="flex w-full flex-col gap-2">
          <label className="mx-2 text-xs text-mainText dark:text-mainTextDark">
            {t("network")}
          </label>

          <div
            className={`dark:border-accentText50Dark flex h-9 w-full items-center self-end rounded-lg border border-accentText50 px-3 placeholder:text-accentText dark:placeholder:text-accentTextDark ${isSelectOpen && "border-mainText dark:border-mainTextDark"}`}
          >
            <p className="w-full text-mainText dark:text-mainTextDark">
              {networkList
                ?.find((network) => network.value === value)
                ?.label.toUpperCase() ?? (
                <span className="text-xs text-accentText dark:text-accentTextDark">
                  {t("selectTheFilterNetwork")}
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
      childrenClassName="!bg-mainBackground dark:!bg-mainBackgroundDark border border-accentText50 dark:border-accentText50Dark"
      togglerClassName="px-0! pt-0"
    >
      <div className="w-full rounded-lg py-3">
        <div className="flex flex-col">
          {networkList &&
            networkList.map((network, index) => (
              <div
                key={index}
                className="flex h-10 cursor-pointer items-center px-2 hover:bg-surface dark:hover:bg-surfaceDark"
                onClick={() => {
                  handleOnClick(network.value);
                }}
              >
                <p className="text-mainText dark:text-mainTextDark">
                  {network.label.toUpperCase()}
                </p>
              </div>
            ))}
        </div>
      </div>
    </CustomSelect>
  );
};

export default FilterNetworkSelect;
