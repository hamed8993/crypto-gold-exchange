import CustomInput from "@/components/atoms/customInput";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { RxCross1 } from "react-icons/rx";

interface QuantityInputProps {
  labelContainerClassName?: string;
  maxLength?: number;
  quantity: string;
  setValue: (value: string) => void;
  title?: string;
}

function QuantityInput({
  labelContainerClassName,
  maxLength,
  quantity: depositQuantity,
  setValue,
  title,
}: QuantityInputProps) {
  const t = useTranslations();

  return (
    <div className="relative mt-8 flex h-14 w-full items-center justify-between rounded-lg border border-accentText50 dark:border-accentTextDark50">
      <div
        className={clsx(
          "absolute -top-6 right-1 flex items-center justify-center bg-mainBackground px-5 py-3 dark:bg-mainBackgroundDark",
          labelContainerClassName,
        )}
      >
        <p className="text-sm text-mainText dark:text-mainTextDark">
          {title || t("quantity")}
        </p>
      </div>
      {depositQuantity ? (
        <div
          onClick={() => {
            setValue("");
          }}
          className="flex h-14 w-14 items-center justify-center"
        >
          <RxCross1 className="h-4 w-4 text-accentText dark:text-accentTextDark" />
        </div>
      ) : null}
      <CustomInput
        value={addCommaSeparator(depositQuantity || "")}
        onChange={(e) => {
          setValue(addInputCommaSeparator(e.target));
        }}
        inputMode="decimal"
        placeholder={t("enterQuantity")}
        wrapperClassName="px-2"
        inputClassName={
          depositQuantity
            ? "w-full font-english border-none text-center rtl:text-start! ltr:text-start! "
            : "w-full placeholder:text-xs! text-base! border-none"
        }
        maxLength={maxLength}
      />
    </div>
  );
}

export default QuantityInput;
