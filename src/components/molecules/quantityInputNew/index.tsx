import CustomInput from "@/components/atoms/customInput";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { RxCross1 } from "react-icons/rx";

interface QuantityInputProps {
  maxLength?: number;
  quantity: string;
  setValue: (value: string) => void;
  title?: string;
  error?: string;
  inputClassName?: string;
  quote?: string;
}

function QuantityInputNew({
  maxLength,
  quantity: depositQuantity,
  setValue,
  title,
  error,
  inputClassName,
  quote,
}: QuantityInputProps) {
  const t = useTranslations();

  const removeQuantityValue = () => {
    setValue("");
  };

  return (
    <div className="relative flex w-full items-center justify-between rounded-lg">
      <CustomInput
        value={addCommaSeparator(depositQuantity || "")}
        onChange={(e) => {
          setValue(addInputCommaSeparator(e.target));
        }}
        inputMode="decimal"
        placeholder={t("enterQuantity")}
        label={title || t("quantity")}
        labelClassName="text-sm! mb-2 mx-[0px]!"
        inputClassName={clsx(
          "hover:dark:!bg-constantDark hover:!bg-selectionBackground w-full text-base rounded-2xl! leading-8! placeholder:text-sm font-english px-4 py-[10px] border-none !bg-paleBackgroundBlue dark:!bg-surfaceDark",
          inputClassName,
        )}
        maxLength={maxLength}
        errorClassName="text-xs mt-1 mx-0! leading-8!"
        error={error}
      />

      <div className="absolute bottom-[26px] flex translate-y-1/2 items-center text-xs text-accentText ltr:right-4 rtl:left-4 dark:text-accentTextDark">
        {quote}
        {!!depositQuantity && (
          <button
            type="button"
            onClick={removeQuantityValue}
            className="flex aspect-square h-full min-h-9 min-w-7 items-center justify-center"
          >
            <RxCross1 className="text-[16px] text-accentText dark:text-accentTextDark" />
          </button>
        )}
      </div>
    </div>
  );
}

export default QuantityInputNew;
