import BalanceSection from "@/components/atoms/balanceSection";
import CustomInput from "@/components/atoms/customInput";
import { useDesktopWithdrawContext } from "@/components/pages/desktopWithdrawPage/provider";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { RxCross1 } from "react-icons/rx";

interface AmountInputProps {
  value: string;
  onChange: (...event: unknown[]) => void;
  title?: string;
  inputClassName?: string;
}

function AmountInput({
  onChange,
  value,
  title,
  inputClassName,
}: AmountInputProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { watch, setValue } = useDesktopWithdrawContext();
  const asset = watch("asset");
  const { getQuoteName } = useMarketsNamesData();

  const { data } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const balance = data?.result?.main;
  const assetBalance = balance?.find((item) => item.coin === asset)?.available;

  const onClickHandler = (value: number) =>
    setValue(
      "amount",
      Number(new Decimal(assetBalance || 0).times(value)).toString(),
    );

  const removeQuantityValue = () => {
    setValue("amount", "");
  };

  return (
    <div>
      <div className="relative">
        <CustomInput
          value={addCommaSeparator(value || "")}
          onChange={(e) => {
            onChange(addInputCommaSeparator(e.target));
          }}
          inputMode="decimal"
          placeholder={t("enterQuantity")}
          label={title || t("amount")}
          labelClassName="text-sm! mb-2 mx-[0px]!"
          inputClassName={clsx(
            "hover:!bg-selectionBackground w-full text-base rounded-2xl! leading-8! placeholder:text-sm font-english px-4 py-[10px] border-none !bg-paleBackgroundBlue ",
            inputClassName,
          )}
          errorClassName="text-xs mt-1 mx-0! leading-8!"
        />
        <div className="text-accentText absolute bottom-[26px] flex translate-y-1/2 items-center text-xs ltr:right-4 rtl:left-4">
          {getQuoteName(asset)}
          {!!value && (
            <button
              type="button"
              onClick={removeQuantityValue}
              className="flex aspect-square h-full min-h-9 min-w-7 items-center justify-center"
            >
              <RxCross1 className="text-accentText text-[16px]" />
            </button>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <BalanceSection asset={asset} wrapperClassName="m-0! p-0! w-fit!" />
        <span className="text-accentText">|</span>
        <button
          className="text-mainBrand flex items-center justify-center text-[10px] font-medium text-nowrap"
          onClick={() => onClickHandler(1)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onChange("");
            }
          }}
          type="button"
        >
          {t("selectAll")}
        </button>
      </div>
    </div>
  );
}

export default AmountInput;
