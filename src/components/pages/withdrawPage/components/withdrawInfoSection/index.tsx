/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostWithdraw, usePostWithdrawRate } from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useWithdrawContext } from "../../provider";
import ConfirmationDrawer from "../confirmationDrawer";

interface WithdrawInfoSectionProps {
  asset: string;
}

function WithdrawInfoSection({ asset }: WithdrawInfoSectionProps) {
  const t = useTranslations();

  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { watch, reset, setValue } = useWithdrawContext();

  const address = watch("address");
  const amount = watch("amount");
  const rate = watch("rate");
  const selectedCoin = watch("selectedCoin");
  const selectedNetwork = watch("selectedNetwork");

  const { mutate: mutateWithdrawRate, isPending: isWithdrawRatePending } =
    usePostWithdrawRate({
      onError: (error) => {
        // @ts-ignore
        showError(getErrorMessages(error.message, error));
      },
      onSuccess: (data) => {
        setValue("rate", data?.result?.equivalent || "");
        setTimeout(() => {
          setIsOpen(true);
        }, 500);
      },
    });

  const { mutate, isPending } = usePostWithdraw({
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
    onSuccess: (data) => {
      reset();
      //@ts-ignore
      showSuccess(getSuccessMessages(data.result));
    },
  });

  const withdraw = () => {
    mutate({
      requestBody: {
        address: address,
        amount: deleteCommas(amount),
        asset: asset,
        network: selectedNetwork,
        payment_currency: selectedCoin,
      },
    });
  };

  const getWithdrawRate = () => {
    mutateWithdrawRate({
      requestBody: {
        amount: deleteCommas(amount),
        asset: asset,
        network: selectedNetwork,
        payment_currency: selectedCoin,
      },
    });
  };

  const isDisabled =
    asset && selectedCoin && selectedNetwork && amount && address;

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start p-1">
      <CustomButton
        className="flex h-10 items-center justify-center rounded-md bg-negative text-sm"
        isDisabled={isPending || !isDisabled || isWithdrawRatePending}
        isLoading={isPending}
        onClick={() => {
          getWithdrawRate();
        }}
      >
        {t("withdraw")}
      </CustomButton>

      <ConfirmationDrawer
        address={address}
        asset={asset}
        coin={selectedCoin}
        equivalent={rate}
        isLoading={isPending}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={withdraw}
        quantity={deleteCommas(amount)}
        selectedNetwork={selectedNetwork}
      />
    </div>
  );
}

export default WithdrawInfoSection;
