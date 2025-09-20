import CustomInput from "@/components/atoms/customInput";
import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { GetHistoryPositions } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoHelpCircleOutline } from "react-icons/io5";
import BackupMarginHelpDrawer from "../backupMarginHelpDrawer";
import { useEditPositionContext } from "../provider";

interface PriceInputProps {
  quote: string;
  currentPrice: string | number;
  pl_multiplier: string | number;
  priceStep: string | number;
  item: ArrayElement<GetHistoryPositions["result"]>;
}

function PriceInput({
  quote,
  item,
  pl_multiplier,
  priceStep,
  currentPrice,
}: PriceInputProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const [isMarginEditable, setIsMarginEditable] = useState(false);

  const { getQuoteName } = useMarketsNamesData();
  const { watch, setValue, errors, clearErrors, setError } =
    useEditPositionContext();
  const backupMargin = watch("backupMargin");
  const { data } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const marginBalance =
    data?.result?.margin?.find((itm) => itm.coin === quote)?.available || "";

  useEffect(() => {
    if (Number(deleteCommas(backupMargin)) > Number(marginBalance)) {
      setError("backupMargin", { message: t("marginBackupIsMoreThanBalance") });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backupMargin]);

  const [percentage, setPercentage] = useState(0);

  const calculate = (value: number) => {
    setValue(
      "backupMargin",
      Number(new Decimal(marginBalance || 0).times(value))
        .toFixed(0)
        .toString(),
    );
  };

  const liqPriceStep =
    Number(
      new Decimal(Number(deleteCommas(item?.entryPrice)))
        .div(Number(item?.leverage))
        .plus(Number(deleteCommas(backupMargin)))
        .div(pl_multiplier)
        .mul(priceStep),
    ) || 0;

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (backupMargin) {
      setIsMarginEditable(true);
    }
  }, [backupMargin]);
  useEffect(() => {
    setValue("isMarginEditable", isMarginEditable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMarginEditable]);

  return (
    <div className="flex w-full flex-col items-center justify-start py-2 pb-3 pl-6">
      <div className="flex w-full flex-col items-center justify-start">
        <div className="flex w-full items-center justify-between">
          <div className="mx-1 -mb-2 flex min-w-36 items-center justify-start gap-1">
            {isMarginEditable ? (
              <div
                onClick={() => {
                  setIsMarginEditable((prev) => !prev);
                }}
                className="bg-mainBrandAlternative mx-1 -mb-3 flex min-h-5 min-w-5 items-center justify-center rounded-md"
              >
                <BiCheck className="h-4 w-4 text-white" />
              </div>
            ) : (
              <div
                onClick={() => {
                  setIsMarginEditable((prev) => !prev);
                }}
                className="border-accentText50 mx-1 -mb-3 flex min-h-5 min-w-5 items-center justify-center rounded-md border-2 bg-transparent"
              ></div>
            )}
            <p
              className={clsx(
                "self-end text-sm",
                !isMarginEditable ? "text-accentText" : "text-mainText",
              )}
            >
              {t("backupMargin")}
            </p>
            <IoHelpCircleOutline
              onClick={() => {
                setIsOpen(true);
              }}
              className="text-accentText mb-3 h-5 w-5"
            />
          </div>

          <CustomInput
            inputMode="decimal"
            placeholder={!isMarginEditable ? "" : t("enterBackupMargin")}
            disabled={!isMarginEditable}
            maxLength={15}
            onChange={(e) => {
              setValue("backupMargin", addInputCommaSeparator(e.target));
              setPercentage(0);
              clearErrors("backupMargin");
            }}
            value={backupMargin ? addCommaSeparator(backupMargin) : ""}
            wrapperClassName={clsx(
              "max-w-[60%] min-w-[60%] border-b text-[10px]!",
              isMarginEditable
                ? " border-b-positive "
                : " border-b-accentText50 ",
            )}
            inputClassName={
              backupMargin
                ? "font-english border-none text-center!"
                : "border-none text-center! text-xs! !text-accentText  "
            }
          />
        </div>
      </div>
      <div className="flex w-full items-end justify-end pr-2">
        {isMarginEditable ? (
          <div
            dir="ltr"
            className="mt-3 flex w-full items-center justify-between gap-1"
          >
            <div
              onClick={() => {
                calculate(0.25);
                setPercentage(0.25);
              }}
              className={clsx(
                "flex w-full cursor-pointer flex-col items-center justify-center border-b py-2",
                percentage === 0.25 ? "border-mainBrand" : "border-accentText",
              )}
            >
              <p
                className={clsx(
                  "font-english text-xs",
                  percentage === 0.25 ? "text-mainBrand" : "text-accentText",
                )}
              >
                {"25%"}
              </p>
            </div>
            <div
              onClick={() => {
                calculate(0.5);
                setPercentage(0.5);
              }}
              className={clsx(
                "flex w-full cursor-pointer flex-col items-center justify-center border-b py-2",
                percentage === 0.5 ? "border-mainBrand" : "border-accentText",
              )}
            >
              <p
                className={clsx(
                  "font-english text-xs",
                  percentage === 0.5 ? "text-mainBrand" : "text-accentText",
                )}
              >
                {"50%"}
              </p>
            </div>
            <div
              onClick={() => {
                calculate(0.75);
                setPercentage(0.75);
              }}
              className={clsx(
                "flex w-full cursor-pointer flex-col items-center justify-center border-b py-2",
                percentage === 0.75 ? "border-mainBrand" : "border-accentText",
              )}
            >
              <p
                className={clsx(
                  "font-english text-xs",
                  percentage === 0.75 ? "text-mainBrand" : "text-accentText",
                )}
              >
                {"75%"}
              </p>
            </div>
            <div
              onClick={() => {
                calculate(1);
                setPercentage(1);
              }}
              className={clsx(
                "flex w-full cursor-pointer flex-col items-center justify-center border-b py-2",
                percentage === 1
                  ? "border-mainBrand text-xs"
                  : "border-accentText",
              )}
            >
              <p
                className={clsx(
                  "font-english text-xs",
                  percentage === 1 ? "text-mainBrand" : "text-accentText",
                )}
              >
                {"100%"}
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex w-full items-end justify-start pr-2">
        {isMarginEditable ? (
          <div className="mt-2 flex w-full items-center justify-start gap-2">
            <p className="text-accentText text-xs">{t("marginBalance")}:</p>
            <p className="font-english text-mainText text-xs">
              {addCommaSeparator(marginBalance)}
            </p>
            <p className="text-accentText text-xs">{getQuoteName(quote)}</p>
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex w-full items-end justify-start pr-2">
        {backupMargin && isMarginEditable ? (
          <div className="mt-2 flex w-full items-center justify-start gap-2">
            <p className="text-accentText text-xs">{t("liquidPrice")}:</p>
            <p className="font-english text-mainText text-xs">
              {item?.side === "long"
                ? `${addCommaSeparator(Number(new Decimal(Number(deleteCommas(item?.entryPrice))).minus(liqPriceStep).toFixed(0)) > 0 ? Number(new Decimal(Number(deleteCommas(item?.entryPrice))).minus(liqPriceStep).toFixed(0)) : "0")}`
                : `${addCommaSeparator(Number(new Decimal(Number(deleteCommas(item?.entryPrice))).plus(liqPriceStep).toFixed(0)) > 0 ? Number(new Decimal(Number(deleteCommas(item?.entryPrice))).plus(liqPriceStep).toFixed(0)) : "0")}`}
            </p>
            <p className="text-accentText text-xs">{getQuoteName(quote)}</p>
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex w-full items-end justify-start pr-2">
        {backupMargin && isMarginEditable && errors?.backupMargin?.message ? (
          <p className="text-negative mx-2 mt-2 self-start text-[10px]">
            {errors?.backupMargin?.message}
          </p>
        ) : (
          <p className="mx-2 text-[10px] text-transparent"> </p>
        )}
      </div>

      <BackupMarginHelpDrawer
        isOpen={isOpen}
        pl_multiplier={pl_multiplier}
        currentPrice={currentPrice}
        quote={quote}
        priceStep={priceStep}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export default PriceInput;
