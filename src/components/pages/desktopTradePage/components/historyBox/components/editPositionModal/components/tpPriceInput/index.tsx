import { ArrayElement } from "@/core/constants/constants";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { GetHistoryPositions } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { EditPositionFormValues, useEditPositionContext } from "../../provider";
import TradeInput from "../tradeInput";

interface TpPriceInputProps {
  item: ArrayElement<GetHistoryPositions["result"]>;
  onUpClick: (
    key: keyof EditPositionFormValues,
    step: string,
    value: string,
    defaultValue: string,
  ) => void;
  onDownClick: (
    key: keyof EditPositionFormValues,
    step: string,
    value: string,
    defaultValue: string,
  ) => void;
}

function TpPriceInput({ onUpClick, onDownClick, item }: TpPriceInputProps) {
  const t = useTranslations();
  const { watch } = useEditPositionContext();
  const { getPriceStep } = usePriceDetail();
  const priceStep = getPriceStep(item?.symbol || "");
  const defaultValue = watch("entryPrice");
  const tp_price = watch("tp_price");

  return (
    <TradeInput
      onUpClick={() =>
        onUpClick(
          "tp_price",
          priceStep.toString(),
          tp_price,
          defaultValue.toString(),
        )
      }
      onDownClick={() =>
        onDownClick(
          "tp_price",
          priceStep.toString(),
          tp_price,
          defaultValue.toString(),
        )
      }
      fieldName={"tp_price"}
      label={t("targetPoint")}
      placeholder={t("enterTpPrice")}
    />
  );
}

export default TpPriceInput;
