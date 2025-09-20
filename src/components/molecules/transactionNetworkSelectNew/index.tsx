import CustomSelect from "@/components/atoms/customSelect";
import { ArrayElement } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import { useGetGet_available_coins } from "@/core/services/hooks";
import { GetAvailableCoins } from "@/core/services/types";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface NetworkSelectNewProps {
  coin?: string;
  network?: string;
  onChange?: (value: string) => void;
  optionOuterParentClass?: string;
  labelClassName?: string;
}

function NetworkSelectNew({
  network,
  onChange,
  coin,
  optionOuterParentClass,
  labelClassName,
}: NetworkSelectNewProps) {
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
    <div className="mt-4 flex w-full flex-col gap-2">
      <label
        className={clsx(
          "mx-2 text-sm text-mainText dark:text-mainTextDark",
          labelClassName,
        )}
      >
        {t("network")}
      </label>

      <CustomSelect
        isVisible={!!coin && isSelectOpen}
        setIsVisible={(isVisible) => setIsSelectOpen(isVisible)}
        toggler={
          <div
            className={clsx(
              "flex h-14 w-full items-center self-end rounded-2xl bg-paleBackgroundBlue px-4 hover:!bg-selectionBackground dark:bg-surfaceDark hover:dark:!bg-constantDark",
              isSelectOpen && "border-mainText dark:border-accentText",
            )}
          >
            {network ? (
              <Fragment>
                <p className="z-2 w-full text-mainText dark:text-mainTextDark">
                  {network?.toUpperCase() || ""}
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
        <div className="w-full rounded-lg">
          <div className="flex flex-col divide-y">
            {/* TODO: Swagger type */}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {networks?.map((network, index) => (
              <div
                key={index}
                className={clsx(
                  "flex cursor-pointer items-center hover:bg-accentText50 hover:dark:bg-accentTextDark50",
                  optionOuterParentClass,
                )}
                onClick={() => {
                  onChange?.(network.symbol);
                  setIsSelectOpen(false);
                }}
              >
                <div className="my-3 flex items-center justify-start gap-4">
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
      {isSelectOpen && !coin && (
        <p className="text-[10px] text-negative">{t("chooseCoinFirst")}</p>
      )}
    </div>
  );
}

export default NetworkSelectNew;
