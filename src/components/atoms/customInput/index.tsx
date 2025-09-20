import clsx from "clsx";
import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { IoCloseCircle } from "react-icons/io5";

export interface CustomInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
  label?: string;
  icon?: ReactNode;
  iconClassName?: string;
  hasRemoveIcon?: boolean;
  onRemoveIcon?: () => void;
  inputClassName?: string;
  onIconClick?: () => void;
  wrapperClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  type?: HTMLInputTypeAttribute | undefined;
}

function CustomInput({
  error,
  icon,
  inputClassName,
  label,
  onIconClick,
  hasRemoveIcon,
  onRemoveIcon,
  wrapperClassName,
  iconClassName,
  errorClassName,
  labelClassName,
  type,
  ...rest
}: CustomInputProps) {
  return (
    <div
      className={clsx(
        "relative flex w-full flex-col items-start",
        wrapperClassName,
      )}
    >
      {label && (
        <label
          className={clsx(
            "mx-2 text-xs text-mainText dark:text-mainTextDark",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <input
        dir="ltr"
        className={clsx(
          "min-h-9 w-full rounded-lg border border-accentText50 bg-transparent px-2 text-base text-mainText placeholder:text-sm placeholder:text-accentText focus-within:outline-0 focus-visible:outline-none rtl:text-end dark:border-accentTextDark50 dark:text-mainTextDark dark:placeholder:text-accentTextDark",
          inputClassName,
          icon ? "pe-10 rtl:pe-2 rtl:ps-10" : "",
        )}
        type={type}
        {...rest}
      />
      {icon && (
        <button
          type="button"
          onClick={onIconClick}
          className={clsx(
            "absolute end-3 top-[50%] flex -translate-y-1/4 transform items-center justify-center px-2 text-sm",
            iconClassName,
          )}
        >
          {icon}
        </button>
      )}
      {hasRemoveIcon && (
        <button
          type="button"
          onClick={onRemoveIcon}
          className={"absolute end-3 h-full w-5 cursor-pointer"}
        >
          <IoCloseCircle className="scale-110! text-accentText dark:text-accentTextDark" />
        </button>
      )}
      {error && (
        <p className={clsx("mx-2 text-[10px] text-negative", errorClassName)}>
          {error}
        </p>
      )}
    </div>
  );
}

export default CustomInput;
