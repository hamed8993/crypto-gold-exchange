import CustomButton from "@/components/atoms/customButton";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetHistoryPositions,
  usePostOrderSet_group_close_order,
} from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEditPositionContext } from "../provider";

interface CloseAllButtonProps {
  side: string;
  symbol: string;
  uuid: string;
  entryPrice: string;
  onClose: () => void;
}

function CloseAllButton({
  side,
  symbol,
  uuid,
  entryPrice,
  onClose,
}: CloseAllButtonProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { refetch } = useGetHistoryPositions(
    { status: "open" },
    { enabled: isLoggedIn },
  );
  const { reset } = useEditPositionContext();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { mutate, isPending } = usePostOrderSet_group_close_order({
    onSuccess: (data) => {
      refetch();
      reset();
      onClose();
      showSuccess(getSuccessMessages(data.result));
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const closeOrder = () => {
    mutate({
      requestBody: {
        symbol: symbol,
        entryPrice: deleteCommas(entryPrice),
        orderId: uuid,
      },
    });
  };
  return (
    <StickyComponent className="bg-mainBackground flex w-full items-center justify-center self-center px-3 py-2">
      <CustomButton
        variant="primary"
        isLoading={isPending}
        onClick={closeOrder}
        isDisabled={isPending}
        className={clsx(
          "mt-4 mb-2 h-12 rounded-md",
          side === "long" ? "bg-positive" : "bg-negative",
        )}
      >
        <p className="text-sm text-white">{t("closeAll")}</p>
      </CustomButton>
    </StickyComponent>
  );
}

export default CloseAllButton;
