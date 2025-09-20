import CustomButton from "@/components/atoms/customButton";
import { usePostWithdraw } from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { useDesktopWithdrawContext } from "../../provider";

interface WithdrawModalButtonsProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function WithdrawModalButtons({ setIsModalOpen }: WithdrawModalButtonsProps) {
  const t = useTranslations();

  const { watch, reset } = useDesktopWithdrawContext();
  const asset = watch("asset");
  const coin = watch("coin");
  const network = watch("network");
  const amount = watch("amount");
  const address = watch("address");

  const { mutate, isPending: isPendingWithdraw } = usePostWithdraw({
    onSuccess: (data) => {
      reset();
      setIsModalOpen(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      showSuccess(getSuccessMessages(data.result));
    },
    onError: (error) => {
      setIsModalOpen(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const withdraw = () => {
    mutate({
      requestBody: {
        asset: asset,
        payment_currency: coin,
        network: network,
        amount: deleteCommas(amount),
        address: address,
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-2 px-2">
      <CustomButton
        onClick={withdraw}
        isLoading={isPendingWithdraw}
        isDisabled={isPendingWithdraw}
        variant="primary"
        className="flex h-10 w-full items-center justify-center"
      >
        <p className="text-xs text-white">{t("confirm")}</p>
      </CustomButton>

      <CustomButton
        onClick={() => setIsModalOpen(false)}
        variant="outline"
        className="border-accentText50 flex h-10 w-full items-center justify-center"
      >
        <p className="text-xs text-white">{t("cancel")}</p>
      </CustomButton>
    </div>
  );
}

export default WithdrawModalButtons;
