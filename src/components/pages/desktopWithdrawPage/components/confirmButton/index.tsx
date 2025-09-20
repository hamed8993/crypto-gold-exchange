import CustomButton from "@/components/atoms/customButton";
import { usePostWithdrawRate } from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { useDesktopWithdrawContext } from "../../provider";

interface ConfirmButtonProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function ConfirmButton({ setIsModalOpen }: ConfirmButtonProps) {
  const t = useTranslations();
  const { watch, setValue } = useDesktopWithdrawContext();
  const asset = watch("asset");
  const coin = watch("coin");
  const address = watch("address");
  const network = watch("network");
  const amount = watch("amount");

  const { mutate: mutateWithdrawRate, isPending } = usePostWithdrawRate({
    onSuccess: (data) => {
      setValue("rate", data?.result?.equivalent || "");
      setTimeout(() => {
        setIsModalOpen(true);
      }, 500);
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const getWithdrawRate = () => {
    mutateWithdrawRate({
      requestBody: {
        asset: asset,
        payment_currency: coin,
        network: network,
        amount: deleteCommas(amount),
      },
    });
  };

  return (
    <CustomButton
      isLoading={isPending}
      isDisabled={!network || !amount || !address}
      onClick={getWithdrawRate}
      variant="negative"
      className="my-2"
    >
      {t("withdraw")}
    </CustomButton>
  );
}

export default ConfirmButton;
