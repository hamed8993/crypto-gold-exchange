import Modal from "@/components/atoms/customModal";
import { ArrayElement } from "@/core/constants/constants";
import { GetHistoryOrders } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect } from "react";
import OrderDetails from "./components/orderDetails";
import OrderForm from "./components/orderForm";
import { EditOrderContextProvider, useEditOrderContext } from "./provider";

interface EditOrderModalProps {
  activeModal: boolean;
  item: ArrayElement<GetHistoryOrders["result"]>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  refetchOrdersList?: () => void;
}

function Component({
  activeModal,
  setActiveModal,
  item,
  refetchOrdersList,
}: EditOrderModalProps) {
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
      title={t("editOrder")}
    >
      <div className="flex min-h-96 items-center justify-between gap-4 p-2">
        <OrderForm
          refetchOrdersList={refetchOrdersList}
          item={item}
          setActiveModal={setActiveModal}
        />

        <OrderDetails item={item} />
      </div>
    </Modal>
  );
}

const EditOrderModal = ({ ...props }: EditOrderModalProps) => {
  return (
    <EditOrderContextProvider>
      <Component {...props} />
    </EditOrderContextProvider>
  );
};

export default EditOrderModal;
