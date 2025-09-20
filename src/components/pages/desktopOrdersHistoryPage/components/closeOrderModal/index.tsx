import CustomButton from "@/components/atoms/customButton";
import Modal from "@/components/atoms/customModal";
import { ArrayElement } from "@/core/constants/constants";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostOrderCancel } from "@/core/services/hooks";
import { GetHistoryOrders } from "@/core/services/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface CloseOrderModalProps {
  activeModal: boolean;
  item: ArrayElement<GetHistoryOrders["result"]>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  refetchOrdersList: () => void;
}

function CloseOrderModal({
  activeModal,
  setActiveModal,
  item,
  refetchOrdersList,
}: CloseOrderModalProps) {
  const t = useTranslations();

  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { showError, showSuccess } = useNotification();
  const { mutate: closePositionMutate, isPending } = usePostOrderCancel({
    onSuccess: (data) => {
      refetchOrdersList();
      setActiveModal(false);
      showSuccess(getSuccessMessages(data.result));
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const closeOrder = () => {
    closePositionMutate({
      requestBody: {
        orderId: item?.orderId,
        symbol: item?.symbol,
      },
    });
  };

  return (
    <Modal
      isOpen={activeModal}
      className="p-0!"
      onClose={() => setActiveModal(false)}
    >
      <div className="flex w-full flex-col items-center justify-start">
        <div className="flex w-full items-center justify-center rounded-t-xl bg-userChatBackground py-10">
          <Image
            alt="stopLoss"
            src={"/assets/images/stock.png"}
            width={150}
            height={150}
          />
        </div>
        <div className="-mt-5 flex w-[90%] items-center justify-center rounded-lg bg-mainBackground px-3 py-5 dark:bg-mainBackgroundDark">
          <p className="text-sm text-mainText dark:text-mainTextDark">
            {t("areYouSureToCloseOrderTitle")}
          </p>
        </div>
        <div className="mb-6 mt-5 flex h-28 w-full flex-col items-center justify-between px-5">
          <CustomButton
            onClick={closeOrder}
            isDisabled={isPending}
            isLoading={isPending}
            variant="outline"
            className="flex h-12 w-full items-center justify-center rounded-md"
          >
            <p dir="rtl" className="text-justify text-xs text-positive">
              {t("confirm")}
            </p>
          </CustomButton>
          <CustomButton
            isDisabled={isPending}
            onClick={() => setActiveModal(false)}
            variant="outlineNegative"
            className="flex h-12 w-full items-center justify-center rounded-md bg-negative"
          >
            <p dir="rtl" className="text-justify text-xs text-negative">
              {t("cancel")}
            </p>
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
}

export default CloseOrderModal;
