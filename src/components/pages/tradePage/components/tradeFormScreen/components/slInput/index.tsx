import CustomInput from "@/components/atoms/customInput";
import SlHelpDrawer from "@/components/atoms/slHelpDrawer";
import { useTradeContext } from "@/components/pages/tradePage/provider";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePnl } from "@/core/hooks/usePnl";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import TitleCheckBox from "./components/titleCheckBox";

interface SlInputProps {
  isLongOrShort: string;
  PriceStep: number;
  quoteAsset: string;
  symbol: string;
}

function SlInput({
  isLongOrShort,
  PriceStep,
  quoteAsset,
  symbol,
}: SlInputProps) {
  const t = useTranslations();

  const { getQuoteName } = useMarketsNamesData();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSlEditable, setIsSlEditable] = useState<boolean>(false);

  const { watch, setValue, errors, clearErrors, setError } = useTradeContext();

  const contractSize = watch("contractSize");
  const sl_price = watch("sl_price");
  const leverage = watch("leverage");
  const entryPrice = watch("entryPrice");

  const { calculateLoss } = usePnl();

  const probableLoss = calculateLoss({
    contractSize: contractSize,
    currentPrice: entryPrice,
    side: isLongOrShort === "long",
    slPrice: sl_price,
    symbol: symbol,
  });

  const probableLossError = probableLoss > 0 ? t("probableLossError") : "";

  const validMargin = Number(
    new Decimal(Number(deleteCommas(entryPrice)))
      .div(Number(leverage))
      .times(Number(contractSize)),
  );

  const isUserLossValid = !!(
    probableLoss &&
    sl_price &&
    probableLoss < validMargin
  );

  const validatePrice = (price: number, step: number) => {
    if (Number(new Decimal(price).mod(step)) === 0) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (sl_price) {
      setIsSlEditable(true);
    }
  }, [sl_price]);

  useEffect(() => {
    if (sl_price) {
      setIsSlEditable(true);
    }
  }, [sl_price]);

  useEffect(() => {
    setValue("isSlEditable", isSlEditable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSlEditable]);

  const [errorType, setErrorType] = useState<"1" | "2" | "3" | "4" | "5">("5");

  useEffect(() => {
    const error =
      sl_price && errors?.sl_price?.message
        ? "1"
        : probableLossError && sl_price
          ? "2"
          : isUserLossValid && probableLoss && sl_price
            ? "3"
            : sl_price
              ? "4"
              : "5";

    setTimeout(() => {
      setErrorType(error);
    }, 1000);
  }, [
    errors?.sl_price?.message,
    isUserLossValid,
    probableLoss,
    probableLossError,
    sl_price,
  ]);

  return (
    <div className="mt-2 flex max-h-28 w-full flex-col items-center justify-start py-2 pb-3 pl-6">
      <div className="flex w-full items-center justify-between">
        <TitleCheckBox
          isSlEditable={isSlEditable}
          onHelpClick={() => {
            setIsDrawerOpen(true);
          }}
          setIsSlEditable={() => {
            setIsSlEditable((prev) => !prev);
          }}
        />
        <CustomInput
          disabled={!isSlEditable}
          inputClassName={
            sl_price
              ? "font-english border-none text-center!"
              : "border-none text-center! text-base! !text-accentText  "
          }
          inputMode="decimal"
          maxLength={15}
          onChange={(e) => {
            setValue("sl_price", addInputCommaSeparator(e.target));
            if (
              PriceStep &&
              e.target.value &&
              !validatePrice(Number(deleteCommas(e.target.value)), PriceStep)
            ) {
              setError("sl_price", { message: t("priceIsNotValid") });
            } else {
              clearErrors("sl_price");
            }
          }}
          placeholder={!isSlEditable ? "" : t("enterSlPrice")}
          value={sl_price ? addCommaSeparator(sl_price) : ""}
          wrapperClassName={clsx(
            "max-w-[60%] min-w-[60%] border-b text-[10px]!",
            isSlEditable ? " border-b-positive " : " border-b-accentText50 ",
          )}
        />
      </div>
      <div className="flex w-full items-center justify-between px-3"></div>
      <div className="flex h-8 min-h-8 w-full items-center justify-end pt-4 pb-0">
        {isSlEditable ? (
          errorType === "1" ? (
            <p className="text-negative text-[10px]">
              {errors?.sl_price?.message}
            </p>
          ) : errorType === "2" ? (
            <p className="text-negative text-[10px]">{probableLossError}</p>
          ) : errorType === "3" ? (
            <>
              <p className="text-accentText text-[10px]">
                {t("EstimatedLoss")}:
              </p>

              <p
                className="font-english text-negative mx-1 text-[10px]"
                dir="ltr"
              >
                {probableLoss && sl_price
                  ? addCommaSeparator(probableLoss)
                  : ""}
              </p>
              <p className="text-accentText text-[10px]">
                {probableLoss && sl_price ? getQuoteName(quoteAsset) : ""}
              </p>
            </>
          ) : errorType === "4" ? (
            <p className="text-negative text-[10px]">
              {t("lossAmountIsMoreThanMargin")}
            </p>
          ) : (
            <p className="text-[10px] text-transparent"> </p>
          )
        ) : (
          <p className="mx-2 text-[10px] text-transparent"> </p>
        )}
      </div>

      <SlHelpDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

export default SlInput;
