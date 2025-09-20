import CustomSelect from "@/components/atoms/customSelect";
import { useGetGet_available_coins } from "@/core/services/hooks";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import CoinItem from "../coinItem";

interface CoinSelectProps {
  labelContainerClassName?: string;
  asset?: string;
  onChange?: (value: string) => void;
}

function CoinSelect({
  asset,
  onChange,
  labelContainerClassName,
}: CoinSelectProps) {
  const t = useTranslations();

  const { data } = useGetGet_available_coins();

  const coins = data?.result;

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  return (
    <div className="relative mt-4 flex w-full flex-col gap-2">
      <div
        className={clsx(
          "absolute -top-4 right-1 z-1 flex items-center justify-center bg-mainBackground px-5 py-3 dark:bg-mainBackgroundDark",
          labelContainerClassName,
        )}
      >
        <label className="mx-2 text-xs text-mainText dark:text-mainTextDark">
          {t("coin")}
        </label>
      </div>

      <CustomSelect
        isVisible={isSelectOpen}
        setIsVisible={(isVisible) => setIsSelectOpen(isVisible)}
        toggler={
          <div
            className={clsx(
              "flex h-14 w-full items-center self-end rounded-lg border border-accentText50 px-3 dark:border-x-accentTextDark50",
              isSelectOpen && "border-mainText",
            )}
          >
            {asset && (
              <Image
                alt="coin"
                height={30}
                src={`/assets/images/${asset?.toLowerCase()}.webp`}
                width={30}
                className="z-2"
              />
            )}
            <p className="z-2 w-full text-mainText dark:text-mainTextDark">
              {asset?.toUpperCase() || ""}
            </p>
            {!isSelectOpen ? (
              <FaChevronDown className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            ) : (
              <FaChevronUp className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            )}
          </div>
        }
      >
        <div className="w-full rounded-lg">
          <div className="flex flex-col">
            {coins?.map((coin, index) => (
              <CoinItem
                coin={coin}
                key={index}
                onClick={() => {
                  onChange?.(coin.symbol);
                  setIsSelectOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      </CustomSelect>
    </div>
  );
}

export default CoinSelect;
