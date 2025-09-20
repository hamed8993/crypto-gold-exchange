import CustomInput from "@/components/atoms/customInput";
import SlHelpDrawer from "@/components/atoms/slHelpDrawer";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePnl } from "@/core/hooks/usePnl";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { useEditOrderContext } from "../provider";

interface SlInputProps {
  PriceStep: number;
  isLongOrShort: string;
  symbol: string;
  quoteAsset: string;
}

function SlInput({
  PriceStep,
  isLongOrShort,
  symbol,
  quoteAsset,
}: SlInputProps) {
  const t = useTranslations();
  const [isSlEditable, setIsSlEditable] = useState(false);

  const { watch, setValue, errors, clearErrors, setError } =
    useEditOrderContext();
  const contractSize = watch("contractSize");
  const sl_price = watch("sl_price");
  const leverage = watch("leverage");
  const entryPrice = watch("entryPrice");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    if (
      PriceStep &&
      sl_price &&
      !validatePrice(Number(deleteCommas(sl_price)), PriceStep)
    ) {
      setError("sl_price", { message: t("priceIsNotValid") });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sl_price]);

  const { getQuoteName } = useMarketsNamesData();
  useEffect(() => {
    if (sl_price) {
      setIsSlEditable(true);
    }
  }, [sl_price]);
  useEffect(() => {
    setValue("isStopLossEditable", isSlEditable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSlEditable]);

  return (
    <div className="mt-2 flex max-h-28 w-full flex-col items-center justify-start py-2 pe-6 pb-3">
      <div className="flex w-full items-center justify-between">
        <div className="mx-1 -mb-2 flex min-w-36 items-center justify-start gap-1">
          {isSlEditable ? (
            <div
              onClick={() => {
                setIsSlEditable((prev) => !prev);
              }}
              className="bg-mainBrandAlternative mx-1 -mb-3 flex min-h-5 min-w-5 items-center justify-center rounded-md"
            >
              <BiCheck className="h-4 w-4 text-white" />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsSlEditable((prev) => !prev);
              }}
              className="border-accentText50 mx-1 -mb-3 flex min-h-5 min-w-5 items-center justify-center rounded-md border-2 bg-transparent"
            ></div>
          )}
          <p
            className={clsx(
              "self-end text-sm",
              !isSlEditable ? "text-accentText" : "text-mainText",
            )}
          >
            {t("stopLoss")}
          </p>
          <IoHelpCircleOutline
            onClick={() => {
              setIsDrawerOpen(true);
            }}
            className="text-accentText mb-3 h-5 w-5"
          />
        </div>
        <CustomInput
          inputMode="decimal"
          placeholder={!isSlEditable ? "" : t("enterSlPrice")}
          disabled={!isSlEditable}
          maxLength={15}
          onChange={(e) => {
            setValue("sl_price", addInputCommaSeparator(e.target));
            clearErrors("sl_price");
          }}
          value={sl_price ? addCommaSeparator(sl_price) : ""}
          wrapperClassName={clsx(
            "max-w-[60%] min-w-[60%] border-b text-[10px]!",
            isSlEditable ? " border-b-positive " : " border-b-accentText50 ",
          )}
          inputClassName={
            sl_price
              ? "font-english border-none text-center!"
              : "border-none text-center! text-xs! !text-accentText "
          }
        />
      </div>
      <div className="flex w-full items-center justify-between px-3"></div>
      {isSlEditable ? (
        <div className="flex w-full items-center justify-end pt-4 pb-0">
          {sl_price && errors?.sl_price?.message ? (
            <p className="text-negative text-[10px]">
              {errors?.sl_price?.message}
            </p>
          ) : probableLossError && sl_price ? (
            <p className="text-negative text-[10px]">{probableLossError}</p>
          ) : isUserLossValid && probableLoss && sl_price ? (
            <>
              <p className="text-accentText text-[10px]">
                {t("EstimatedLoss")}:
              </p>

              <p
                dir="ltr"
                className="font-english text-negative mx-1 text-[10px]"
              >
                {probableLoss && sl_price
                  ? addCommaSeparator(probableLoss)
                  : ""}
              </p>
              <p className="text-accentText text-[10px]">
                {probableLoss && sl_price ? getQuoteName(quoteAsset) : ""}
              </p>
            </>
          ) : sl_price ? (
            <p className="text-negative text-[10px]">
              {t("lossAmountIsMoreThanMargin")}
            </p>
          ) : (
            <p className="mx-2 text-[10px] text-transparent"> </p>
          )}
        </div>
      ) : null}
      <SlHelpDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

export default SlInput;
