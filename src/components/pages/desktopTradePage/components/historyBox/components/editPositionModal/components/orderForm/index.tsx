import CustomButton from "@/components/atoms/customButton";
import { ArrayElement } from "@/core/constants/constants";
import { GetHistoryPositions } from "@/core/services/types";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect } from "react";
import { EditPositionFormValues, useEditPositionContext } from "../../provider";
import BackupMarginInput from "../backupMarginInput";
import EditOrderButton from "../editOrderButton";
import SlPriceInput from "../slPriceInput";
import TpPriceInput from "../tpPriceInput";

interface PositionFormProps {
  item: ArrayElement<GetHistoryPositions["result"]>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  refetchPositionsList?: () => void;
}

function OrderForm({
  item,
  setActiveModal,
  refetchPositionsList,
}: PositionFormProps) {
  const t = useTranslations();
  const { setValue, watch, reset } = useEditPositionContext();
  const entryPrice = watch("entryPrice");

  useEffect(() => {
    if (item && !entryPrice) {
      setValue("contractSize", item?.subPositions?.length);
      setValue("entryPrice", item?.entryPrice);
      setValue("sl_price", item?.slPrice !== "not_set" ? item?.slPrice : "");
      setValue("tp_price", item?.tpPrice !== "not_set" ? item?.tpPrice : "");
      setValue("leverage", item?.leverage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onDownClick = (
    key: keyof EditPositionFormValues,
    step: string,
    value: string,
    defaultValue: string,
  ) => {
    const baseValue = Number(value) || defaultValue;
    setValue(key, new Decimal(baseValue).minus(step).toString());
  };

  const onUpClick = (
    key: keyof EditPositionFormValues,
    step: string,
    value: string,
    defaultValue: string,
  ) => {
    const baseValue = Number(value) || defaultValue;
    setValue(key, new Decimal(baseValue).add(step).toString());
  };

  const onClose = () => {
    reset();
    setActiveModal(false);
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-2">
      <TpPriceInput
        item={item}
        onDownClick={onDownClick}
        onUpClick={onUpClick}
      />

      <SlPriceInput
        item={item}
        onDownClick={onDownClick}
        onUpClick={onUpClick}
      />

      <BackupMarginInput />

      <div className="flex h-10 w-full items-center justify-between gap-2">
        <EditOrderButton
          refetchPositionsList={refetchPositionsList}
          onClose={onClose}
          orderId={item?.orderId}
          symbol={item?.symbol}
        />
        <CustomButton onClick={onClose} variant="negative">
          <p className="text-xs text-white">{t("cancel")}</p>
        </CustomButton>
      </div>
    </div>
  );
}

export default OrderForm;
