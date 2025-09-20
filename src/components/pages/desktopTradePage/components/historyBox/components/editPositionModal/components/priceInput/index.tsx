import { ArrayElement } from "@/core/constants/constants";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { GetHistoryPositions } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { EditPositionFormValues, useEditPositionContext } from "../../provider";
import TradeInput from "../tradeInput";

interface PriceInputProps {
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

function PriceInput({ onUpClick, onDownClick, item }: PriceInputProps) {
  const t = useTranslations();
  const { watch } = useEditPositionContext();
  const { getPriceStep } = usePriceDetail();
  const priceStep = getPriceStep(item?.symbol || "");
  const { firstBidAsk } = useFirstBidAsk();
  const defaultValue = Number(firstBidAsk?.[item?.symbol || ""]?.flong);
  const entryPrice = watch("entryPrice");

  return (
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
      label={t("entryPrice")}
      placeholder={t("enterPrice")}
    />
  );
}

export default PriceInput;
