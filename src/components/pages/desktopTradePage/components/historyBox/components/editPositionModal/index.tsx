"use client";

import Modal from "@/components/atoms/customModal";
import { ArrayElement } from "@/core/constants/constants";
import { GetHistoryPositions } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect } from "react";
import OrderDetails from "./components/orderDetails";
import OrderForm from "./components/orderForm";
import PositionDetailsRow from "./components/positionDetailsRow";
import {
  EditPositionContextProvider,
  useEditPositionContext,
} from "./provider";

interface EditPositionModalProps {
  activeModal: boolean;
  item: ArrayElement<GetHistoryPositions["result"]>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  refetchPositionsList?: () => void;
}

function Component({
  activeModal,
  setActiveModal,
  item,
  refetchPositionsList,
}: EditPositionModalProps) {
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

  const onClose = () => {
    reset();
    setActiveModal(false);
  };

  return (
    <Modal
      isOpen={activeModal}
      onClose={onClose}
      hasCross
      className="min-h-96 w-[750px]! min-w-[750px]! max-w-[600px]!"
      title={t("editPosition")}
    >
      <div className="flex min-h-96 w-full flex-col items-center justify-start gap-4 p-2">
        <PositionDetailsRow item={item} />
        <div className="flex w-full items-center justify-between gap-4">
          <OrderForm
            refetchPositionsList={refetchPositionsList}
            item={item}
            setActiveModal={setActiveModal}
          />

          <OrderDetails item={item} />
        </div>
      </div>
    </Modal>
  );
}

const EditPositionModal = ({ ...props }: EditPositionModalProps) => {
  return (
    <EditPositionContextProvider>
      <Component {...props} />
    </EditPositionContextProvider>
  );
};

export default EditPositionModal;
