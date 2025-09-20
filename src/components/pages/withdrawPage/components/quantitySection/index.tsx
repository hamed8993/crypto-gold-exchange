import CustomInput from "@/components/atoms/customInput";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { useWithdrawContext } from "../../provider";

interface QuantitySectionProps {
  asset?: string;
  extraComponent?: ReactNode;
}

function QuantitySection({ asset, extraComponent }: QuantitySectionProps) {
  const t = useTranslations();

  const { isLoggedIn } = useAuth();

  const { watch, setValue } = useWithdrawContext();

  const amount = watch("amount");

  const { data } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const balance = data?.result?.main;
  const assetBalance = balance?.find((item) => item.coin === asset)?.available;

  const calculate = (value: number) => {
    setValue(
      "amount",
      Number(new Decimal(assetBalance || 0).times(value)).toString(),
    );
  };

  return (
    <>
      <div className="border-accentText50 relative mt-8 flex h-14 w-full items-center justify-between rounded-lg border">
        <div className="bg-secondBackground absolute -top-6 right-1 flex items-center justify-center px-5 py-3">
          <p className="text-mainText text-sm">{`${t("quantity")}`}</p>
        </div>

        <CustomInput
          icon={<p className="text-positive text-sm">{t("all")}</p>}
          inputClassName={
            amount
              ? "w-full text-lg! font-english border-none"
              : "w-full placeholder:text-xs! text-[10px]! border-none"
          }
          inputMode="decimal"
          onChange={(e) => {
            setValue("amount", e.target.value);
          }}
          onIconClick={() => {
            calculate(1);
          }}
          placeholder={t("enterQuantity")}
          value={addCommaSeparator(amount)}
          wrapperClassName="px-2"
        />
      </div>
      {extraComponent}
    </>
  );
}

export default QuantitySection;
