import AlertBoxNew from "@/components/atoms/alertBoxNew";
import CustomButton from "@/components/atoms/customButton";
import SelectAssetsTabNew from "@/components/atoms/selectAssetNew";
import CoinSelectNew from "@/components/molecules/coinSelectNew";
import QuantityInputNew from "@/components/molecules/quantityInputNew";
import NetworkSelectNew from "@/components/molecules/transactionNetworkSelectNew";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostDeposit } from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useDesktopDepositContext } from "../../provider";

interface DepositInputsProps {
  className?: string;
}

function DepositForm({ className }: DepositInputsProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  const { showError } = useNotification();
  const { getErrorMessages } = useGetAPIMessages();

  const { setValue, watch, control, handleSubmit } = useDesktopDepositContext();

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
    <div
      className={clsx(
        "flex w-full! flex-col gap-[18px] xl:col-span-6",
        className,
      )}
    >
      <SelectAssetsTabNew
        selectCoin={(value) => setValue("asset", value)}
        asset={asset}
      />
      <div className="flex flex-col gap-y-4 rounded-3xl bg-constantLight p-[30px] dark:bg-panelDark">
        <Controller
          control={control}
          name="depositQuantity"
          rules={{
            required: t("invalidInput"),
            validate: (value) =>
              Number(value.replaceAll(",", "")) > 0 || t("invalidInput"),
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <QuantityInputNew
                title={t("quantity")}
                quantity={value}
                setValue={(value) => onChange(value)}
                error={error?.message}
                quote={getQuoteName(asset) }
              />
            );
          }}
        />
        <CoinSelectNew
          asset={coin}
          onChange={(value) => setValue("coin", value)}
          optionOuterParentClass="rounded-xl px-2 "
        />

        <NetworkSelectNew
          coin={coin}
          network={network}
          onChange={(value) => setValue("network", value)}
          optionOuterParentClass="rounded-xl px-2"
        />
        <AlertBoxNew
          data={[
            t("depositAlertText1"),
            t("depositAlertText2"),
            t("depositAlertText3"),
          ]}
          wrapperClassName="gap-y-2"
          wrappedRowClassName="items-center"
          icon={
            <IoInformationCircleOutline className="text-[18px] text-constantDark dark:text-constantLight" />
          }
        />

        <CustomButton
          isDisabled={!network || !depositQuantity}
          onClick={handleSubmit(generateAddress)}
          isLoading={isPending}
          className="rounded-xl! py-[18px]! px-3"
        >
          <p className="text-[16px] font-semibold text-constantLight">
            {" "}
            {t("generateAddress")}
          </p>
        </CustomButton>
      </div>
    </div>
  );
}

export default DepositForm;
