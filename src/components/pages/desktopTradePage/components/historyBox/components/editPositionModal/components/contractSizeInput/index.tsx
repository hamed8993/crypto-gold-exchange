import { ArrayElement } from "@/core/constants/constants";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { GetHistoryPositions } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { EditPositionFormValues, useEditPositionContext } from "../../provider";
import TradeInput from "../tradeInput";

interface ContractSizeInputProps {
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

function ContractSizeInput({
  onUpClick,
  onDownClick,
  item,
}: ContractSizeInputProps) {
  const t = useTranslations();
  const { watch } = useEditPositionContext();
  const { getPriceStep } = usePriceDetail();
  const priceStep = getPriceStep(item?.symbol || "");
  const { firstBidAsk } = useFirstBidAsk();
  const defaultValue = Number(firstBidAsk?.[item?.symbol || ""]?.flong);
  const contractSize = watch("contractSize");

  return (
    <TradeInput
      onUpClick={() =>
        onUpClick(
          "contractSize",
          priceStep.toString(),
          contractSize,
          defaultValue.toString(),
        )
      }
      onDownClick={() =>
        onDownClick(
          "contractSize",
          priceStep.toString(),
          contractSize,
          defaultValue.toString(),
        )
      }
      fieldName={"contractSize"}
      label={t("contractSize")}
      placeholder={t("enterQuantity")}
    />
  );
}

export default ContractSizeInput;
