import CustomInput from "@/components/atoms/customInput";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useEditOrderContext } from "../provider";

interface PriceInputProps {
  PriceStep: number;
}

function PriceInput({ PriceStep }: PriceInputProps) {
  const t = useTranslations();
  const { watch, setValue, errors, clearErrors, setError } =
    useEditOrderContext();
  const entryPrice = watch("entryPrice");

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
      entryPrice &&
      !validatePrice(Number(deleteCommas(entryPrice)), PriceStep)
    ) {
      setError("entryPrice", { message: t("priceIsNotValid") });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryPrice]);

  return (
    <div className="mt-4 flex w-full flex-col items-center justify-start pe-7 pr-1">
      <div className="mt-5 flex w-full items-center justify-between">
        <p className="text-mainText mx-1 -mb-5 min-w-36 text-sm">
          {t("entryPrice")}
        </p>
        <CustomInput
          inputMode="decimal"
          placeholder={t("enterSlPrice")}
          maxLength={15}
          onChange={(e) => {
            setValue("sl_price", addInputCommaSeparator(e.target));
            clearErrors("sl_price");
          }}
          value={addCommaSeparator(entryPrice)}
          wrapperClassName={
            "max-w-[60%] min-w-[60%] border-b border-b-positive text-[10px]!"
          }
          inputClassName={"font-english border-none text-center! text-sm!"}
        />
      </div>
      {entryPrice && errors?.entryPrice?.message ? (
        <p className="text-negative mx-2 text-[10px]">
          {errors?.entryPrice?.message}
        </p>
      ) : (
        <p className="mx-2 text-[10px] text-transparent"> </p>
      )}
    </div>
  );
}

export default PriceInput;
