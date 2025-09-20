import useUrl from "@/core/hooks/useUrl";
import { useGetGet_available_coins } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CustomSelect from "../../atoms/customSelect";

interface CurrencySelectProps {
  onChange?: (value: string) => void;
  value?: string;
}

type currencyObject = {
  value: string;
  label: string;
};

const CurrencySelect = ({ onChange, value }: CurrencySelectProps) => {
  const t = useTranslations();
  const { locale } = useUrl();

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [currencyList, setCurrencyList] = useState<currencyObject[] | null>(
    null,
  );

  const { data } = useGetGet_available_coins();
  const coinsList = data?.result || [];

  useEffect(() => {
    const currencyArray = coinsList?.reduce<{ label: string; value: string }[]>(
      (acc, coin) => {
        if (!acc.some((item) => item.value === coin.symbol)) {
          acc.push({
            label:
              locale === "en"
                ? coin.symbol.toUpperCase()
                : coin.symbol.toUpperCase() + " " + coin.name_fa,
            value: coin.symbol,
          });
        }
        return acc;
      },

      [],
    );
    setCurrencyList([{ label: t("all"), value: "all" }, ...currencyArray]);
  }, [data]);

  const handleOnClick = (selectedCurrency: string) => {
    setIsSelectOpen(false);
    onChange?.(selectedCurrency );
  };

  return (
    <CustomSelect
      toggler={
        <div className="flex w-full flex-col gap-2">
          <label className="mx-2 text-xs text-mainText dark:text-mainTextDark">
            {t("payment_currency")}
          </label>

          <div
            className={`dark:border-accentText50Dark flex h-9 w-full items-center self-end rounded-lg placeholder:text-accentText border border-accentText50 px-3 dark:placeholder:text-accentTextDark ${isSelectOpen && "border-mainText dark:border-mainTextDark"}`}
          >
            <p className="w-full text-mainText dark:text-mainTextDark">
              {currencyList?.find((currency) => currency.value === value)
                ?.label ?? (
                <span className="text-xs text-accentText dark:text-accentTextDark">
                  {t("selectTheFilterPaymentCurrency")}
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
          {currencyList?.map((currency, index) => (
            <div
              key={index}
              className="flex h-10 cursor-pointer items-center px-2 hover:bg-surface dark:hover:bg-surfaceDark"
              onClick={() => {
                handleOnClick(currency.value);
              }}
            >
              <p className="text-mainText dark:text-mainTextDark">
                {currency.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </CustomSelect>
  );
};

export default CurrencySelect;
