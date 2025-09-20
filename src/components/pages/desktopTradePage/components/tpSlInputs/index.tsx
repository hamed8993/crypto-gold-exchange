import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useTradeContext } from "../../provider";
import TradeInput, { FiledNameType } from "../tradeInput";

interface TpSlInputsProps {
  symbol: string;
}

function TpSlInputs({ symbol }: TpSlInputsProps) {
  const t = useTranslations();
  const { watch, errors, setValue } = useTradeContext();
  const { getPriceStep } = usePriceDetail();
  const priceStep = getPriceStep(symbol);
  const entryPrice = watch("entryPrice");
  const tp_price = watch("tp_price");
  const sl_price = watch("sl_price");

  const onDownClick = (
    key: FiledNameType,
    step: string,
    value: string,
    defaultValue: string,
  ) => {
    const baseValue = Number(value) || defaultValue;
    setValue(key, new Decimal(baseValue).minus(step).toString());
  };

  const onUpClick = (
    key: FiledNameType,
    step: string,
    value: string,
    defaultValue: string,
  ) => {
    const baseValue = Number(value) || defaultValue;
    setValue(key, new Decimal(baseValue).add(step).toString());
  };
  return (
    <div className="flex w-full items-center justify-between gap-1 rounded-lg py-1">
      <TradeInput
        fieldName={"tp_price"}
        error={errors?.tp_price?.message}
        hasError={errors?.tp_price?.message ? true : false}
        label={t("targetPoint")}
        onUpClick={() =>
          onUpClick("tp_price", priceStep.toString(), tp_price, entryPrice)
        }
        onDownClick={() =>
          onDownClick("tp_price", priceStep.toString(), tp_price, entryPrice)
        }
        placeholder={t("enterTpPrice")}
      />

      <TradeInput
        fieldName={"sl_price"}
        error={errors?.sl_price?.message}
        hasError={errors?.sl_price?.message ? true : false}
        onUpClick={() =>
          onUpClick("sl_price", priceStep.toString(), sl_price, entryPrice)
        }
        onDownClick={() =>
          onDownClick("sl_price", priceStep.toString(), sl_price, entryPrice)
        }
        label={t("stopLoss")}
        placeholder={t("enterSlPrice")}
      />
    </div>
  );
}

export default TpSlInputs;
