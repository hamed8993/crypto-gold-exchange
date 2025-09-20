import CustomInput from "@/components/atoms/customInput";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { MdContentCopy } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

interface QuantityInputProps {
  value: string;
  setValue: (value: string) => void;
  title?: string;
  error?: string;
  inputClassName?: string;
}

function AddressInput({
  value,
  setValue,
  title,
  error,
  inputClassName,
}: QuantityInputProps) {
  const t = useTranslations();

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    const cleanedText = text.trim().replace(/\s+/g, " ");
    setValue(cleanedText);
  };

  const removeQuantityValue = () => {
    setValue("");
  };

  return (
    <div className="relative flex w-full items-center justify-between rounded-lg">
      <CustomInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={t("enterWithdrawAddress")}
        label={title || t("address")}
        labelClassName="text-sm! mb-2 mx-[0px]!"
        inputClassName={clsx(
          " hover:!bg-selectionBackground w-full text-base rounded-2xl! leading-8! placeholder:text-sm font-english px-4 py-[10px] border-none !bg-paleBackgroundBlue ",
          inputClassName,
        )}
        errorClassName="text-xs mt-1 mx-0! leading-8!"
        error={error}
      />
      <div className="text-accentText absolute bottom-[26px] flex min-h-9 translate-y-1/2 items-center gap-2 text-xs ltr:right-4 rtl:left-4">
        {!!value ? (
          <button
            type="button"
            onClick={removeQuantityValue}
            className="flex aspect-square min-h-9 min-w-7 items-center justify-center"
          >
            <RxCross1 className="text-accentText text-[16px]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePaste}
            className="flex min-h-9 min-w-7 items-center justify-center"
          >
            <MdContentCopy className="text-accentText" size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default AddressInput;
