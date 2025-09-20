import { ArrayElement } from "@/core/constants/constants";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { GetHistoryPositions } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { EditPositionFormValues, useEditPositionContext } from "../../provider";
import TradeInput from "../tradeInput";

interface SlPriceInputProps {
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

function SlPriceInput({ onUpClick, onDownClick, item }: SlPriceInputProps) {
  const t = useTranslations();
  const { watch } = useEditPositionContext();
  const { getPriceStep } = usePriceDetail();
  const priceStep = getPriceStep(item?.symbol || "");
  const defaultValue = watch("entryPrice");
  const sl_price = watch("sl_price");

  return (
    <TradeInput
      onUpClick={() =>
        onUpClick(
          "sl_price",
          priceStep.toString(),
          sl_price,
          defaultValue.toString(),
        )
      }
      onDownClick={() =>
        onDownClick(
          "sl_price",
          priceStep.toString(),
          sl_price,
          defaultValue.toString(),
        )
      }
      fieldName={"sl_price"}
      label={t("stopLoss")}
      placeholder={t("enterSlPrice")}
    />
  );
}

export default SlPriceInput;
