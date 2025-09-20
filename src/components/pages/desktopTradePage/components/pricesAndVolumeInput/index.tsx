import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useTradeContext } from "../../provider";
import TradeInput, { FiledNameType } from "../tradeInput";

interface PricesAndVolumeInputProps {
  symbol: string;
}

function PricesAndVolumeInput({ symbol }: PricesAndVolumeInputProps) {
  const { watch, errors, setValue } = useTradeContext();
  const orderType = watch("orderType");
  const { getPriceStep } = usePriceDetail();
  const priceStep = getPriceStep(symbol);
  const { firstBidAsk } = useFirstBidAsk();
  const defaultValue = Number(firstBidAsk?.[symbol]?.flong);
  const entryPrice = watch("entryPrice");
  const contractSize = watch("contractSize");

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

  const t = useTranslations();
  return (
    <div
      className={
        "mt-1 flex w-full items-center justify-between gap-1 rounded-lg py-1"
      }
    >
      {orderType === "pending" && (
        <TradeInput
          onUpClick={() =>
            onUpClick(
              "entryPrice",
              priceStep.toString(),
              entryPrice,
              defaultValue.toString(),
            )
          }
          onDownClick={() =>
            onDownClick(
              "entryPrice",
              priceStep.toString(),
              entryPrice,
              defaultValue.toString(),
            )
          }
          fieldName={"entryPrice"}
          error={errors?.entryPrice?.message}
          hasError={errors?.entryPrice?.message ? true : false}
          label={t("entryPrice")}
          placeholder={t("enterPrice")}
        />
      )}

      <TradeInput
        fieldName={"contractSize"}
        label={t("volume")}
        onUpClick={() => onUpClick("contractSize", "1", contractSize, "1")}
        onDownClick={() => onDownClick("contractSize", "1", contractSize, "1")}
        placeholder={t("enterQuantity")}
      />
    </div>
  );
}

export default PricesAndVolumeInput;
