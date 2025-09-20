import { useTradeContext } from "@/components/pages/tradePage/provider";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmarkOutline } from "react-icons/io5";

interface LeverageInputProps {
  leverages: Array<string>;
}

function LeverageInput({ leverages }: LeverageInputProps) {
  const t = useTranslations();

  const [isLeverageOpen, setIsLeverageOpen] = useState<boolean>(false);

  const { watch, setValue } = useTradeContext();

  const leverage = watch("leverage");

  const switchLeverage = () => {
    setIsLeverageOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!leverage) {
      setValue("leverage", leverages?.[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leverages, leverage]);

  return (
    <div className="bg-surface mt-2 flex min-h-11 w-full flex-col items-center justify-start p-1">
      <div
        className="mt-2 flex w-full items-center justify-between px-2"
        onClick={switchLeverage}
      >
        <p className="text-mainText self-end text-sm">{t("leverage")}</p>
        <div className="flex items-center justify-start gap-2">
          <p className="font-english text-mainText self-end text-sm!">
            {`${leverage}X`}
          </p>
          <IoIosArrowDown className="text-accentText h-5 w-5" />
        </div>
      </div>

      {isLeverageOpen ? (
        <div className="bg-border my-5 h-[2px] w-full"></div>
      ) : null}

      {isLeverageOpen
        ? leverages?.map((item: string, index: number) => {
            return (
              <div
                className={clsx(
                  "my-1 flex w-full items-center justify-between rounded-lg border px-2 py-3",
                  leverage === item ? "border-accentText" : "border-border",
                )}
                key={index}
                onClick={() => {
                  setValue("leverage", item);
                  setIsLeverageOpen(false);
                }}
              >
                <p className="font-english text-mainText text-xs" dir="ltr">
                  {`${item} X`}
                </p>
                {item === leverage ? (
                  <IoCheckmarkOutline className="text-mainText h-5 w-5" />
                ) : null}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default LeverageInput;
