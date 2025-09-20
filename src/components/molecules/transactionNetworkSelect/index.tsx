import CustomSelect from "@/components/atoms/customSelect";
import { ArrayElement } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import { useGetGet_available_coins } from "@/core/services/hooks";
import { GetAvailableCoins } from "@/core/services/types";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface NetworkSelectProps {
  coin?: string;
  network?: string;
  labelContainerClassName?: string;
  onChange?: (value: string) => void;
}

function NetworkSelect({
  network,
  onChange,
  coin,
  labelContainerClassName,
}: NetworkSelectProps) {
  const { locale } = useUrl();
  const t = useTranslations();

  const { data } = useGetGet_available_coins();
  const networks: ArrayElement<
    NonNullable<GetAvailableCoins["result"]>
  >["networks_data"] = data?.result?.find(
    (item) => item.symbol === coin,
  )?.networks_data;

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
          {t("network")}
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
            <p className="z-2 w-full text-mainText dark:text-mainTextDark">
              {network?.toUpperCase() || ""}
            </p>
            {!isSelectOpen ? (
              <FaChevronDown className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            ) : (
              <FaChevronUp className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            )}
          </div>
        }
      >
        <div className="w-full rounded-lg py-3">
          <div className="flex flex-col">
            {/* TODO: Swagger type */}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {networks?.map((network, index) => (
              <div
                key={index}
                className="flex h-10 cursor-pointer items-center px-2 hover:bg-accentText"
                onClick={() => {
                  onChange?.(network.symbol);
                  setIsSelectOpen(false);
                }}
              >
                <div className="flex items-center justify-start gap-4">
                  <Image
                    alt="coin"
                    height={30}
                    src={`/assets/images/${network.symbol.toLowerCase() === "bsc" ? "bnb" : network.symbol.toLowerCase()}.webp`}
                    width={30}
                  />
                  <div className="flex h-full flex-col items-start justify-between">
                    <p className="text-xs text-mainText dark:text-mainTextDark">
                      {network.symbol.toUpperCase()}
                    </p>
                    <p className="text-xs text-accentText dark:text-accentTextDark">
                      {locale === "fa" ? network.name_fa : network.name_en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CustomSelect>
    </div>
  );
}

export default NetworkSelect;
