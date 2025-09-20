import CustomButton from "@/components/atoms/customButton";
import Modal from "@/components/atoms/customModal";
import { ArrayElement } from "@/core/constants/constants";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostOrderSet_group_close_order } from "@/core/services/hooks";
import { GetHistoryPositions } from "@/core/services/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface ClosePositionModalProps {
  activeModal: boolean;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  item: ArrayElement<GetHistoryPositions["result"]>;
  refetchOrdersList: () => void;
}

function ClosePositionModal({
  activeModal,
  setActiveModal,
  item,
  refetchOrdersList,
}: ClosePositionModalProps) {
  const t = useTranslations();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { mutate, isPending } = usePostOrderSet_group_close_order({
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

  const closePosition = () => {
    mutate({
      requestBody: {
        symbol: item?.symbol,
        orderId: item?.orderId,
        entryPrice: item?.entryPrice,
      },
    });
  };

  return (
    <Modal
      isOpen={activeModal}
      className="p-0!"
      onClose={() => setActiveModal(false)}
      title={""}
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
            {t("areYouSureToClosePositionTitle")}
          </p>
        </div>
        <div className="mb-6 mt-5 flex h-28 w-full flex-col items-center justify-between px-5">
          <CustomButton
            onClick={closePosition}
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

export default ClosePositionModal;
