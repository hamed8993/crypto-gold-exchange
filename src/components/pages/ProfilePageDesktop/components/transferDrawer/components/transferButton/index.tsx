import CustomButton from "@/components/atoms/customButton";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetUser_dataBalance,
  usePostUser_dataTransfer_balance,
} from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useTranslations } from "next-intl";
import { TbArrowsTransferUp } from "react-icons/tb";

interface TransferButtonProps {
  amount: string;
  asset?: string;
  walletType: string;
  onClose: () => void;
  setTransferAssetQuantity: () => void;
}

function TransferButton({
  amount,
  onClose,
  setTransferAssetQuantity,
  asset,
  walletType,
}: TransferButtonProps) {
  const { showError, showSuccess } = useNotification();
  const { isLoggedIn } = useAuth();
  const t = useTranslations();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { refetch } = useGetUser_dataBalance({ enabled: isLoggedIn });

  const { mutate, isPending } = usePostUser_dataTransfer_balance({
    onSuccess: (data) => {
      refetch();
      showSuccess(getSuccessMessages(data.result));
      onClose();
      setTransferAssetQuantity();
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      showError(getErrorMessages(error.message.error));
      onClose();
      setTransferAssetQuantity();
    },
  });

  const transferHandler = () => {
    mutate({
      requestBody: {
        amount: deleteCommas(amount),
        currency: asset,
        fromWallet: walletType,
        toWallet: walletType === "main" ? "margin" : "main",
      },
    });
  };

  return (
    <CustomButton
      isDisabled={!amount}
      isLoading={isPending}
      className="rounded- bg-positive mt-5"
      onClick={transferHandler}
    >
      <div className="flex items-center justify-center gap-2">
        <TbArrowsTransferUp className="h-4 w-4 rotate-90 text-white" />
        <p className="text-white">{t("transfer")}</p>
      </div>
    </CustomButton>
  );
}

export default TransferButton;
