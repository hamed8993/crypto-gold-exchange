import SelectAssetsTabNew from "@/components/atoms/selectAssetNew";
import CoinSelectNew from "@/components/molecules/coinSelectNew";
import NetworkSelectNew from "@/components/molecules/transactionNetworkSelectNew";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import { useDesktopWithdrawContext } from "../../provider";
import AddressInput from "./components/addressInput";
import AmountInput from "./components/amountInput";
import ConfirmButton from "./components/confirmButton";

interface WithdrawFormProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

function WithdrawForm({ setIsModalOpen, className }: WithdrawFormProps) {
  const { watch, setValue, control } = useDesktopWithdrawContext();

  const t = useTranslations();

  const asset = watch("asset");
  const coin = watch("coin");
  const network = watch("network");

  return (
    <div
      className={clsx(
        "flex w-full max-w-full! flex-col gap-[18px] xl:max-w-[50%]!",
        className,
      )}
    >
      <SelectAssetsTabNew
        selectCoin={(value) => setValue("asset", value)}
        asset={asset}
      />
      <div className="bg-constantLight flex flex-col gap-y-4 rounded-3xl p-[30px]">
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

        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => {
            return (
              <AddressInput
                title={t("address")}
                value={value}
                setValue={onChange}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => {
            return <AmountInput onChange={onChange} value={value} />;
          }}
        />

        <ConfirmButton setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}

export default WithdrawForm;
