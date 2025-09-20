import CustomInput from "@/components/atoms/customInput";
import TpHelpDrawer from "@/components/atoms/tpHelpDrawer";
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

interface TpInputProps {
  PriceStep: number;
  symbol: string;
  quoteAsset: string;
  isLongOrShort: string;
}

function TpInput({
  PriceStep,
  symbol,
  quoteAsset,
  isLongOrShort,
}: TpInputProps) {
  const t = useTranslations();
  const [isTpEditable, setIsTpEditable] = useState(false);

  const { watch, setValue, errors, clearErrors, setError } =
    useEditOrderContext();
  const contractSize = watch("contractSize");
  const tp_price = watch("tp_price");
  const entryPrice = watch("entryPrice");
  const { calculateProfit } = usePnl();

  useEffect(() => {
    if (tp_price) {
      setIsTpEditable(true);
    }
  }, [tp_price]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const probableProfit = calculateProfit({
    contractSize: contractSize,
    currentPrice: entryPrice,
    side: isLongOrShort === "long",
    symbol: symbol,
    tpPrice: tp_price,
  });

  const probableProfitError =
    probableProfit < 0 ? t("probableProfitError") : "";

  const validatePrice = (price: number, step: number) => {
    if (Number(new Decimal(price).mod(step)) === 0) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (
      PriceStep &&
      tp_price &&
      !validatePrice(Number(deleteCommas(tp_price)), PriceStep)
    ) {
      setError("tp_price", { message: t("priceIsNotValid") });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tp_price]);

  const { getQuoteName } = useMarketsNamesData();

  useEffect(() => {
    setValue("isTargetPointEditable", isTpEditable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTpEditable]);

  return (
    <div className="flex max-h-28 w-full flex-col items-center justify-start py-2 pe-6 pb-3">
      <div className="flex w-full items-center justify-between">
        <div className="mx-1 flex min-w-36 items-center justify-start gap-1">
          {isTpEditable ? (
            <div
              onClick={() => {
                setIsTpEditable((prev) => !prev);
              }}
              className="bg-mainBrandAlternative mx-1 -mb-5 flex min-h-5 min-w-5 items-center justify-center rounded-md"
            >
              <BiCheck className="h-4 w-4 text-white" />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsTpEditable((prev) => !prev);
              }}
              className="border-accentText50 mx-1 -mb-5 flex min-h-5 min-w-5 items-center justify-center rounded-md border-2 bg-transparent"
            ></div>
          )}
          <p
            className={clsx(
              "-mb-1 self-end text-sm",
              !isTpEditable ? "text-accentText" : "text-mainText",
            )}
          >
            {t("targetPoint")}
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
          placeholder={!isTpEditable ? "" : t("enterTpPrice")}
          disabled={!isTpEditable}
          maxLength={15}
          onChange={(e) => {
            setValue("tp_price", addInputCommaSeparator(e.target));
            clearErrors("tp_price");
          }}
          value={tp_price ? addCommaSeparator(tp_price) : ""}
          wrapperClassName={clsx(
            "max-w-[60%] min-w-[60%] border-b text-[10px]!",
            isTpEditable ? " border-b-positive " : " border-b-accentText50 ",
          )}
          inputClassName={
            tp_price
              ? "font-english border-none text-center!"
              : "border-none text-center! text-xs! !text-accentText  "
          }
        />
      </div>
      <div className="flex w-full items-center justify-between px-3"></div>
      {isTpEditable ? (
        <div className="flex w-full items-center justify-end pt-4 pb-0">
          {tp_price && errors?.tp_price?.message ? (
            <p className="text-negative text-[10px]">
              {errors?.tp_price?.message}
            </p>
          ) : probableProfitError && tp_price ? (
            <p className="text-negative text-[10px]">{probableProfitError}</p>
          ) : probableProfit && tp_price ? (
            <>
              <p className="text-accentText text-[10px]">
                {t("EstimatedProfit")}:
              </p>

              <p
                dir="ltr"
                className="font-english text-positive mx-1 text-[10px]"
              >
                {probableProfit && tp_price
                  ? addCommaSeparator(probableProfit)
                  : ""}
              </p>
              <p className="text-accentText text-[10px]">
                {probableProfit && tp_price ? getQuoteName(quoteAsset) : ""}
              </p>
            </>
          ) : null}
        </div>
      ) : null}
      <TpHelpDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

export default TpInput;
