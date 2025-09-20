import CustomSelect from "@/components/atoms/customSelect";
import { useGetGet_available_coins } from "@/core/services/hooks";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import CoinItemNew from "../coinItemNew";

interface CoinSelectProps {
  asset?: string;
  onChange?: (value: string) => void;
  optionOuterParentClass?: string;
  labelClassName?: string;
}

function CoinSelectNew({
  asset,
  onChange,
  optionOuterParentClass,
  labelClassName,
}: CoinSelectProps) {
  const t = useTranslations();

  const { data } = useGetGet_available_coins();

  const coins = data?.result;

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  return (
    <div className="mt-4 flex w-full flex-col gap-2">
      <label
        className={clsx(
          "mx-2 text-sm text-mainText dark:text-mainTextDark",
          labelClassName,
        )}
      >
        {t("coin")}
      </label>

      <CustomSelect
        isVisible={isSelectOpen}
        setIsVisible={(isVisible) => setIsSelectOpen(isVisible)}
        toggler={
          <div
            className={clsx(
              "bg-paleBackgroundBlue hover:bg-selectionBackground flex h-14 w-full items-center self-end rounded-2xl px-4 dark:bg-surfaceDark hover:dark:bg-constantDark",
              isSelectOpen && "border-mainText dark:border-accentText",
            )}
          >
            {asset ? (
              <Fragment>
                <Image
                  alt="coin"
                  height={30}
                  src={`/assets/images/${asset?.toLowerCase()}.webp`}
                  width={30}
                />

                <p className="w-full text-sm text-mainText dark:text-mainTextDark">
                  {asset?.toUpperCase() || ""}
                </p>
              </Fragment>
            ) : (
              <p className="w-full text-sm text-accentText dark:text-accentTextDark">
                {t("enterQuantity")}
              </p>
            )}

            {!isSelectOpen ? (
              <FaChevronDown className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            ) : (
              <FaChevronUp className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            )}
          </div>
        }
        childrenClassName="!bg-constantLight dark:!bg-constantDark border border-panelLight dark:border-panelDark px-[10px]"
      >
        <div className="w-full rounded-2xl">
          <div className="flex flex-col">
            {coins?.map((coin, index) => (
              <CoinItemNew
                outerParentClass={optionOuterParentClass}
                coin={coin}
                key={index}
                onClick={() => {
                  onChange?.(coin.symbol);
                  setIsSelectOpen(false);
                }}
                isLastItem={index === coins?.length - 1}
              />
            ))}
          </div>
        </div>
      </CustomSelect>
    </div>
  );
}

export default CoinSelectNew;
