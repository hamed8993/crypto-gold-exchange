import CustomInput from "@/components/atoms/customInput";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface EditableNumInputProps {
  defaultValue?: number;
  error?: string;
  isEditable?: boolean;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
  step?: number;
}

const EditableNumInput = ({
  defaultValue = 0,
  error,
  isEditable = false,
  label,
  onChange,
  placeholder,
  value,
  step = 1,
}: EditableNumInputProps) => {
  const [isPlaceholderVisible, setIsPlaceholderVisible] =
    useState<boolean>(true);

  return (
    <div className="my-2 flex w-full flex-col items-center justify-start px-2">
      <div className="flex w-full items-center justify-between">
        <p className="text-mainText mx-1 -mb-2 w-1/3 text-sm">{label}</p>
        <div className="bg-secondBackground flex h-8 w-2/3 items-center justify-between rounded-lg">
          {isEditable && (
            <div
              className="flex h-8 w-10 items-center justify-center"
              onClick={() => {
                const baseValue = Number(value) || defaultValue;
                onChange(new Decimal(baseValue).add(step).toString());
              }}
            >
              <FiPlus className="text-mainText h-6 w-6" />
            </div>
          )}
          <CustomInput
            inputMode="decimal"
            maxLength={15}
            onChange={(e) => {
              onChange(addInputCommaSeparator(e.target));
            }}
            onFocus={() => setIsPlaceholderVisible(false)}
            onBlur={() => setIsPlaceholderVisible(true)}
            placeholder={isPlaceholderVisible ? placeholder : ""}
            value={addCommaSeparator(value)}
            wrapperClassName={
              "max-w-[60%] min-w-[60%] border-b border-b-positive text-[10px]!"
            }
            inputClassName={clsx(
              "border-none text-center! text-base! placeholder:text-xs!",
              value ? "font-english" : "",
            )}
          />
          {isEditable && (
            <div
              className="flex h-8 w-10 items-center justify-center"
              onClick={() => {
                const baseValue = Number(value) || defaultValue;
                if (Number(new Decimal(baseValue).minus(step)) >= 0) {
                  onChange(new Decimal(baseValue).minus(step).toString());
                }
              }}
            >
              <FiMinus className="text-mainText h-6 w-6" />
            </div>
          )}
        </div>
      </div>
      <p className="text-negative mx-2 text-[10px]">{error}</p>
    </div>
  );
};

export default EditableNumInput;
