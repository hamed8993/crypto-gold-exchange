import CustomInput from "@/components/atoms/customInput";
import TpHelpDrawer from "@/components/atoms/tpHelpDrawer";
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
import { BiCheck } from "react-icons/bi";
import { IoHelpCircleOutline } from "react-icons/io5";

interface TpInputProps {
  isLongOrShort: string;
  PriceStep: number;
  quoteAsset: string;
  symbol: string;
}

function TpInput({
  isLongOrShort,
  PriceStep,
  quoteAsset,
  symbol,
}: TpInputProps) {
  const t = useTranslations();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isTpEditable, setIsTpEditable] = useState<boolean>(false);

  const { getQuoteName } = useMarketsNamesData();

  const { watch, setValue, errors, clearErrors, setError } = useTradeContext();

  const contractSize = watch("contractSize");
  const tp_price = watch("tp_price");
  const entryPrice = watch("entryPrice");

  const { calculateProfit } = usePnl();

  useEffect(() => {
    if (tp_price) {
      setIsTpEditable(true);
    }
  }, [tp_price]);

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
    setValue("isTpEditable", isTpEditable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTpEditable]);

  return (
    <div className="flex max-h-28 w-full flex-col items-center justify-start py-2 pb-3 pl-6">
      <div className="flex w-full items-center justify-between">
        <div className="mx-1 flex min-w-36 items-center justify-start gap-1">
          {isTpEditable ? (
            <div
              className="bg-mainBrandAlternative mx-1 -mb-5 flex min-h-5 min-w-5 items-center justify-center rounded-md"
              onClick={() => {
                setIsTpEditable((prev) => !prev);
              }}
            >
              <BiCheck className="h-4 w-4 text-white" />
            </div>
          ) : (
            <div
              className="border-accentText50 mx-1 -mb-5 flex min-h-5 min-w-5 items-center justify-center rounded-md border-2 bg-transparent"
              onClick={() => {
                setIsTpEditable((prev) => !prev);
              }}
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
            className="text-accentText mb-3 h-5 w-5"
            onClick={() => {
              setIsDrawerOpen(true);
            }}
          />
        </div>
        <CustomInput
          disabled={!isTpEditable}
          inputClassName={
            tp_price
              ? "font-english border-none text-center!"
              : "border-none text-center! text-base! !text-accentText  "
          }
          inputMode="decimal"
          maxLength={15}
          onChange={(e) => {
            setValue("tp_price", addInputCommaSeparator(e.target));
            if (
              PriceStep &&
              tp_price &&
              !validatePrice(Number(deleteCommas(tp_price)), PriceStep)
            ) {
              setError("tp_price", { message: t("priceIsNotValid") });
            } else {
              clearErrors("tp_price");
            }
          }}
          placeholder={!isTpEditable ? "" : t("enterTpPrice")}
          value={tp_price ? addCommaSeparator(tp_price) : ""}
          wrapperClassName={clsx(
            "max-w-[60%] min-w-[60%] border-b text-[10px]!",
            isTpEditable ? " border-b-positive " : " border-b-accentText50 ",
          )}
        />
      </div>
      <div className="flex w-full items-center justify-between px-3"></div>
      <div className="flex h-8 min-h-8 w-full items-center justify-end pt-4 pb-0">
        {isTpEditable ? (
          tp_price && errors?.tp_price?.message ? (
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
                className="font-english text-positive mx-1 text-[10px]"
                dir="ltr"
              >
                {probableProfit && tp_price
                  ? addCommaSeparator(probableProfit)
                  : ""}
              </p>
              <p className="text-accentText text-[10px]">
                {probableProfit && tp_price ? getQuoteName(quoteAsset) : ""}
              </p>
            </>
          ) : null
        ) : null}
      </div>

      <TpHelpDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

export default TpInput;
