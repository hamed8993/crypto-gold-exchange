import CustomButton from "@/components/atoms/customButton";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetHistoryOrders,
  usePostOrderEditSl_tp,
} from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useTranslations } from "next-intl";
import { useEditOrderContext } from "../provider";

interface ModifyButtonProps {
  orderId: string;
  symbol: string;
  onClose: () => void;
}

function ModifyButton({ orderId, symbol, onClose }: ModifyButtonProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { watch, reset } = useEditOrderContext();
  const tp = watch("tp_price");
  const sl = watch("sl_price");
  const isTargetPointEditable = watch("isTargetPointEditable");
  const isStopLossEditable = watch("isStopLossEditable");

  const { refetch } = useGetHistoryOrders(
    { status: "pending" },
    { enabled: isLoggedIn },
  );

  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { mutate, isPending } = usePostOrderEditSl_tp({
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

  const confirm = () => {
    mutate({
      requestBody: {
        orderId: orderId,
        symbol: symbol,
        tpPrice: isTargetPointEditable ? deleteCommas(tp) : "",
        slPrice: isStopLossEditable ? deleteCommas(sl) : "",
      },
    });
  };

  return (
    <div className="flex min-h-28 w-full flex-col items-center justify-between px-2 pb-4">
      <CustomButton
        isDisabled={isPending}
        isLoading={isPending}
        onClick={onClose}
        variant="outlineNegative"
        className={"mt-2 h-12 w-full rounded-md"}
      >
        <p className="text-sm text-negative">{t("cancel")}</p>
      </CustomButton>

      <CustomButton
        isDisabled={isPending}
        isLoading={isPending}
        onClick={confirm}
        variant="primary"
        className={"positive mt-2 h-12 w-full rounded-md"}
      >
        <p className="text-sm text-white">{t("applyChanges")}</p>
      </CustomButton>
    </div>
  );
}

export default ModifyButton;
