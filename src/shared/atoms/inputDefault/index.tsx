import clsx from "clsx";
import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { BiErrorCircle } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export interface InputPropsDefault
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "className"
  > {
  error?: string;
  label?: string;
  icon?: ReactNode;
  iconClassName?: string;
  onIconClick?: () => void;
  className?: string;
  wrapperClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  type?: HTMLInputTypeAttribute | undefined;
  inputType?: "password" | "withX" | "default";
  inputState?: "success" | "error" | "default";
}

function InputDefault({
  error,
  icon,
  className,
  label,
  onIconClick,
  wrapperClassName,
  iconClassName,
  errorClassName,
  labelClassName,
  type,
  inputState = "default",
  inputType = "default",
  onChange,
  ...rest
}: InputPropsDefault) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleXClick = () => {
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  const handleEyeClick = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div
      className={clsx(
        "flex w-[352px] flex-col items-start gap-3",
        wrapperClassName,
      )}
    >
      {label && (
        <label
          className={clsx(
            "text-xs font-bold",
            inputState === "success"
              ? "text-textSuccess"
              : "text-textPlaceholder",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <div className={"relative w-full"}>
        <input
          className={clsx(
            "h-[52px] w-full rounded-xl border-2 bg-transparent py-3 text-sm placeholder:text-sm placeholder:text-textPlaceholder focus-within:outline-0 focus-visible:outline-none",
            inputState === "success"
              ? "border-borderSuccess text-textPrimary focus:border-borderSuccess"
              : inputState === "error" || error
                ? "border-borderError text-textError focus:border-borderError"
                : "border-borderDefault text-textPrimary focus:border-borderFocus",
            icon || inputType !== "default" || inputState === "success"
              ? "pe-8 ps-4"
              : "px-4",
            className,
          )}
          type={
            inputType == "password" ? (isVisible ? "text" : "password") : type
          }
          onChange={onChange}
          {...rest}
        />
        {inputType === "default" && icon && inputState !== "success" && (
          <button
            type="button"
            onClick={onIconClick}
            className={clsx(
              "absolute end-3 top-0 flex h-full cursor-pointer items-center",
              iconClassName,
            )}
          >
            {icon}
          </button>
        )}
        {inputType === "withX" && inputState !== "success" && (
          <button
            type="button"
            onClick={handleXClick}
            className={
              "absolute end-3 top-0 flex h-full cursor-pointer items-center"
            }
          >
            <IoClose />
          </button>
        )}
        {inputType === "password" && inputState !== "success" && (
          <button
            type="button"
            onClick={handleEyeClick}
            className={
              "absolute end-3 top-0 flex h-full cursor-pointer items-center"
            }
          >
            {isVisible ? <BsEye /> : <BsEyeSlash />}
          </button>
        )}
        {inputState === "success" && (
          <div className={"absolute end-3 top-0 flex h-full items-center"}>
            <FaCheck className="text-iconSuccess" />
          </div>
        )}
      </div>
      {error && inputState !== "success" && (
        <div className="flex items-center gap-1">
          <BiErrorCircle className="text-iconError" />
          <p className={clsx("text-[14px] text-textError", errorClassName)}>
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

export default InputDefault;
