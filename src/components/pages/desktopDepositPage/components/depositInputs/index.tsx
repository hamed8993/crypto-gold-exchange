import AlertBox from "@/components/atoms/alertBox";
import CustomButton from "@/components/atoms/customButton";
import SelectAssetsTab from "@/components/atoms/selectAssetDrawer";
import CoinSelect from "@/components/molecules/coinSelect";
import QuantityInput from "@/components/molecules/quantityInput";
import NetworkSelect from "@/components/molecules/transactionNetworkSelect";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostDeposit } from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useDesktopDepositContext } from "../../provider";

interface DepositInputsProps {
  className?: string;
}

function DepositInputs({ className }: DepositInputsProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  const { showError } = useNotification();
  const { getErrorMessages } = useGetAPIMessages();

  const { setValue, watch, control } = useDesktopDepositContext();

  const asset = watch("asset");
  const network = watch("network");
  const depositQuantity = watch("depositQuantity");
  const coin = watch("coin");

  const { mutate, isPending } = usePostDeposit({
    onSuccess: (data) => {
      setValue("deposit_id", data?.result?.deposit_id);
      setValue("generatedAddress", data?.result?.address);
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(error.message.error));
    },
  });

  const generateAddress = () => {
    mutate({
      requestBody: {
        asset: asset,
        payment_currency: coin,
        network: network,
        amount: deleteCommas(depositQuantity),
      },
    });
  };

  return (
    <div className={clsx("flex w-full max-w-md flex-col gap-3", className)}>
      <SelectAssetsTab
        selectCoin={(value) => setValue("asset", value)}
        asset={asset}
      />

      <Controller
        control={control}
        name="depositQuantity"
        render={({ field: { onChange, value } }) => {
          return (
            <QuantityInput
              title={`${t("quantity")} ${getQuoteName(asset)}`}
              quantity={value}
              setValue={(value) => onChange(value)}
            />
          );
        }}
      />
      <CoinSelect asset={coin} onChange={(value) => setValue("coin", value)} />

      <NetworkSelect
        coin={coin}
        network={network}
        onChange={(value) => setValue("network", value)}
      />
      <AlertBox
        data={[
          t("depositAlertText1"),
          t("depositAlertText2"),
          t("depositAlertText3"),
        ]}
      />

      <CustomButton
        isDisabled={!network || !depositQuantity}
        onClick={generateAddress}
        isLoading={isPending}
      >
        {t("generateAddress")}
      </CustomButton>
    </div>
  );
}

export default DepositInputs;
