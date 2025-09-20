import CustomButton from "@/components/atoms/customButton";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetHistoryPositions,
  usePostPositionEditSl_tp_margin,
} from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useTranslations } from "next-intl";
import { useEditPositionContext } from "../../provider";

interface EditOrderButtonProps {
  symbol: string;
  orderId: string;
  onClose: () => void;
  refetchPositionsList?: () => void;
}

function EditOrderButton({
  symbol,
  onClose,
  orderId,
  refetchPositionsList,
}: EditOrderButtonProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { watch, reset } = useEditPositionContext();
  const tpPrice = watch("tp_price");
  const slPrice = watch("sl_price");
  const entryPrice = watch("entryPrice");
  const backupMargin = watch("backupMargin");
  const { refetch } = useGetHistoryPositions({}, { enabled: isLoggedIn });
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { mutate, isPending } = usePostPositionEditSl_tp_margin({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      reset();
      if (refetchPositionsList) {
        refetchPositionsList();
      } else {
        refetch();
      }
      onClose();
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
        tpPrice: deleteCommas(tpPrice),
        slPrice: deleteCommas(slPrice),
        entryPrice: deleteCommas(entryPrice),
        backupMargin: deleteCommas(backupMargin),
      },
    });
  };
  return (
    <CustomButton
      onClick={confirm}
      isDisabled={isPending}
      isLoading={isPending}
      variant="primary"
    >
      <p className="text-xs text-white">{t("applyChanges")}</p>
    </CustomButton>
  );
}

export default EditOrderButton;
