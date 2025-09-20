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
import { useEditOrderContext } from "../../provider";

interface EditOrderButtonProps {
  symbol: string;
  orderId: string;
  onClose: () => void;
  refetchOrdersList?: () => void;
}

function EditOrderButton({
  symbol,
  onClose,
  orderId,
  refetchOrdersList,
}: EditOrderButtonProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { watch, reset } = useEditOrderContext();

  const tp = watch("tp_price");
  const sl = watch("sl_price");

  const { refetch } = useGetHistoryOrders(
    { status: "pending" },
    { enabled: isLoggedIn },
  );

  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { mutate, isPending } = usePostOrderEditSl_tp({
    onSuccess: (data) => {
      if (refetchOrdersList) {
        refetchOrdersList();
      } else {
        refetch();
      }
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
        tpPrice: deleteCommas(tp),
        slPrice: deleteCommas(sl),
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
