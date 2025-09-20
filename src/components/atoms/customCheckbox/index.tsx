import clsx from "clsx";
import { CSSProperties, MouseEventHandler } from "react";

interface CustomCheckboxProps {
  error?: boolean;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  name: string;
  onChange: MouseEventHandler<HTMLDivElement>;
  value: boolean;
}

function CustomCheckbox({
  error = false,
  inputClassName,
  inputStyle,
  label,
  labelClassName,
  name,
  onChange,
  value,
}: CustomCheckboxProps) {
  return (
    <div
      className="flex w-fit cursor-pointer items-start gap-2"
      onClick={onChange}
    >
      <input
        className={clsx(
          "before:red h-4 w-4 cursor-pointer accent-mainBrand",
          error ? "border-negative dark:border-negative" : undefined,
          inputClassName,
        )}
        checked={value}
        name={name}
        onChange={() => {}}
        style={inputStyle}
        type="checkbox"
      />
      <label
        className={clsx(
          "cursor-pointer text-xs text-mainText dark:text-mainTextDark",
          labelClassName,
        )}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}

export default CustomCheckbox;
