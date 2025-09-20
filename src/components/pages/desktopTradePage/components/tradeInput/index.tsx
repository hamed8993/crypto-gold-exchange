/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomInput from "@/components/atoms/customInput";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useTradeContext } from "../../provider";

export type FiledNameType =
  | "tp_price"
  | "sl_price"
  | "tradeType"
  | "orderType"
  | "entryPrice"
  | "contractSize"
  | "marginBackup"
  | "side"
  | "selectedOrderIndex"
  | "transferAssetQuantity"
  | "leverage"
  | "percentageValue"
  | "selectedPositionIndex"
  | "bottomTabName";
interface TradeInputProps {
  label: string;
  placeholder?: string;
  error?: string;
  className?: string;
  fieldName: FiledNameType;
  extraComponent?: ReactNode;
  hasError?: boolean;
  onUpClick?: () => void;
  onDownClick?: () => void;
}

function TradeInput({
  label,
  placeholder,
  extraComponent,
  className,
  fieldName,
  hasError,
  error,
  onDownClick,
  onUpClick,
}: TradeInputProps) {
  const { control } = useTradeContext();
  const t = useTranslations();
  return (
    <div
      className={clsx(
        "border-accentText50 relative flex w-full items-center justify-start gap-1 rounded-xl border p-2 px-3",
        className,
      )}
    >
      <p className="text-mainText w-fit min-w-fit text-sm">{label}</p>
      {extraComponent ? (
        extraComponent
      ) : (
        <Controller
          control={control}
          //@ts-ignore
          name={fieldName}
          render={({ field: { value, onChange } }) => (
            //@ts-ignore
            <CustomInput
              onChange={onChange}
              value={addCommaSeparator(value)}
              label=""
              placeholder={placeholder}
              icon={
                <div className="absolute flex h-[54px] w-[54px] flex-col items-end justify-between px-2 py-1.5">
                  <IoIosArrowUp
                    onClick={onUpClick}
                    className="text-accentText text-lg"
                  />
                  <IoIosArrowDown
                    onClick={onDownClick}
                    className="text-accentText text-lg"
                  />
                </div>
              }
              inputClassName={clsx(
                "border-none text-start! ",
                value ? "font-english" : "",
              )}
            />
          )}
          rules={{
            required: { message: t("pleaseFillInput"), value: true },
          }}
        />
      )}
      {hasError && (
        <div className="border-accentText50 bg-negative absolute top-14 left-0 z-50 flex h-8 w-fit items-center justify-center rounded-md border px-1">
          <p className="text-xs text-white">{error}</p>
        </div>
      )}
    </div>
  );
}

export default TradeInput;
