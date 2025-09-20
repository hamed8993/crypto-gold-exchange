import { ArrayElement } from "@/core/constants/constants";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { GetHistoryOrders } from "@/core/services/types";
import { useTranslations } from "next-intl";
import TradeInput from "../../../tradeInput";
import { EditOrderFormValues, useEditOrderContext } from "../../provider";

interface TpPriceInputProps {
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

function TpPriceInput({ onUpClick, onDownClick, item }: TpPriceInputProps) {
  const t = useTranslations();
  const { watch } = useEditOrderContext();
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
