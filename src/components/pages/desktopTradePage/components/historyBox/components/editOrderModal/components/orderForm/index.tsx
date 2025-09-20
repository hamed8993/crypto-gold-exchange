import CustomButton from "@/components/atoms/customButton";
import { ArrayElement } from "@/core/constants/constants";
import { GetHistoryOrders } from "@/core/services/types";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect } from "react";
import TradeInput from "../../../tradeInput";
import { EditOrderFormValues, useEditOrderContext } from "../../provider";
import EditOrderButton from "../editOrderButton";
import PriceInput from "../priceInput";
import SlPriceInput from "../slPriceInput";
import TpPriceInput from "../tpPriceInput";

interface OrderFormProps {
  item: ArrayElement<GetHistoryOrders["result"]>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  refetchOrdersList?: () => void;
}

function OrderForm({ item, setActiveModal,refetchOrdersList }: OrderFormProps) {
  const t = useTranslations();
  const { setValue, watch, reset } = useEditOrderContext();
  const entryPrice = watch("entryPrice");

  useEffect(() => {
    if (item && !entryPrice) {
      setValue("contractSize", item?.totalSize);
      setValue("entryPrice", item?.entryPrice);
      setValue("sl_price", item?.slPrice !== "not_set" ? item?.slPrice : "");
      setValue("tp_price", item?.tpPrice !== "not_set" ? item?.tpPrice : "");
      setValue("leverage", item?.leverage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onDownClick = (
    key: keyof EditOrderFormValues,
    step: string,
    value: string,
    defaultValue: string,
  ) => {
    const baseValue = Number(value) || defaultValue;
    setValue(key, new Decimal(baseValue).minus(step).toString());
  };

  const onUpClick = (
    key: keyof EditOrderFormValues,
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
      <PriceInput item={item} onDownClick={onDownClick} onUpClick={onUpClick} />

      <TradeInput
        disabled
        fieldName={"contractSize"}
        className="opacity-60"
        label={t("contractSize")}
        placeholder={t("enterQuantity")}
      />

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

      <div className="flex h-10 w-full items-center justify-between gap-2">
        <EditOrderButton
          refetchOrdersList={refetchOrdersList}
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
