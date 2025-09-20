import { ArrayElement } from "@/core/constants/constants";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { GetHistoryOrders } from "@/core/services/types";
import { useTranslations } from "next-intl";
import TradeInput from "../../../tradeInput";
import { EditOrderFormValues, useEditOrderContext } from "../../provider";

interface SlPriceInputProps {
  item: ArrayElement<GetHistoryOrders["result"]>;
  onUpClick: (
    key: keyof EditOrderFormValues,
    step: string,
    value: string,
    defaultValue: string,
  ) => void;
  onDownClick: (
    key: keyof EditOrderFormValues,
    step: string,
    value: string,
    defaultValue: string,
  ) => void;
}

function SlPriceInput({ onUpClick, onDownClick, item }: SlPriceInputProps) {
  const t = useTranslations();
  const { watch } = useEditOrderContext();
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
