import CustomButton from "@/components/atoms/customButton";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetHistoryPositions,
  usePostPositionEditSl_tp_margin,
} from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEditPositionContext } from "../provider";

interface EditPositionButtonProps {
  side: string;
  symbol: string;
  orderId: string;
  entryPrice: string;
  onClose: () => void;
}

function EditPositionButton({
  side,
  symbol,
  orderId,
  entryPrice,
  onClose,
}: EditPositionButtonProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { watch, reset } = useEditPositionContext();
  const tpPrice = watch("tp_price");
  const slPrice = watch("sl_price");
  const isSlEditable = watch("isSlEditable");
  const isTpEditable = watch("isTpEditable");
  const isMarginEditable = watch("isMarginEditable");
  const backupMargin = watch("backupMargin");
  const { refetch } = useGetHistoryPositions({}, { enabled: isLoggedIn });
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { mutate, isPending } = usePostPositionEditSl_tp_margin({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      reset();
      refetch();
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
        tpPrice: isTpEditable ? deleteCommas(tpPrice) : "",
        slPrice: isSlEditable ? deleteCommas(slPrice) : "",
        entryPrice: deleteCommas(entryPrice),
        backupMargin: isMarginEditable ? deleteCommas(backupMargin) : "",
      },
    });
  };
  return (
    <StickyComponent className="bg-mainBackground flex w-full items-center justify-center self-center px-3 py-2">
      <div className="flex min-h-28 w-full flex-col items-center justify-between px-2 pb-4">
        <CustomButton
          isDisabled={isPending}
          isLoading={isPending}
          onClick={onClose}
          variant="outlineNegative"
          className={"mt-2 h-12 w-full rounded-md"}
        >
          <p className="text-negative text-sm">{t("cancel")}</p>
        </CustomButton>

        <CustomButton
          variant="primary"
          isDisabled={isPending}
          isLoading={isPending}
          onClick={confirm}
          className={clsx(
            "mt-4 h-12 rounded-md",
            side === "long" ? "bg-positive" : "bg-negative",
          )}
        >
          <p className="text-sm text-white">{t("applyChanges")}</p>
        </CustomButton>
      </div>
    </StickyComponent>
  );
}

export default EditPositionButton;
