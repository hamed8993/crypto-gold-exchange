import CustomInput, { CustomInputProps } from "@/components/atoms/customInput";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import { isNumber } from "@/core/utilities/validators";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { HTMLInputTypeAttribute, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import EyesIconButton from "../eyesIconButton";

interface InputDesktopProps
  extends Omit<CustomInputProps, "onChange" | "hasRemoveIcon"> {
  containerClassName?: string;
  iconType?: "delete" | "all" | "eye";
  isAmount?: boolean;
  label: string;
  labelContainerClassName?: string;
  onAllClick?: (value: number) => void;
  onChange: (value: string) => void;
  value: string;
  type?: HTMLInputTypeAttribute | undefined;
}

function InputDesktop({
  containerClassName,
  iconType,
  inputMode,
  isAmount = true,
  label,
  labelContainerClassName,
  onAllClick,
  onChange,
  value,
  type,
  ...rest
}: InputDesktopProps) {
  const t = useTranslations();

  const [passwordType, setPasswordType] = useState<
    HTMLInputTypeAttribute | undefined
  >(type || "password");

  return (
    <div
      className={clsx(
        "relative mt-8 flex h-14 w-full items-center justify-between rounded-lg border border-accentText50 dark:border-accentTextDark50",
        containerClassName,
      )}
    >
      <div
        className={clsx(
          "absolute -top-6 right-1 flex items-center justify-center bg-secondBackground px-5 py-2 dark:bg-secondBackgroundDark",
          labelContainerClassName,
        )}
      >
        <p className="text-sm text-mainText dark:text-mainTextDark">{label}</p>
      </div>

      {iconType === "delete" ? (
        value ? (
          <button
            aria-label={t("clearInput")}
            className="flex h-14 w-14 items-center justify-center"
            onClick={() => {
              onChange("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onChange("");
              }
            }}
            type="button"
          >
            <RxCross1 className="h-4 w-4 text-accentText dark:text-accentTextDark" />
          </button>
        ) : null
      ) : null}

      {iconType === "eye" ? (
        <EyesIconButton setInputType={setPasswordType} />
      ) : null}

      <CustomInput
        type={iconType === "eye" ? passwordType : type}
        inputClassName={
          value
            ? "w-full font-english border-none text-center rtl:text-start! ltr:text-start! "
            : "w-full placeholder:text-xs! text-base! border-none"
        }
        inputMode={inputMode}
        onChange={(e) => {
          if (isNumber(e.target.value.replaceAll(",", "")) && isAmount) {
            onChange(addInputCommaSeparator(e.target));
          } else {
            onChange(e.target.value);
          }
        }}
        value={
          isNumber(value?.replaceAll(",", "")) && isAmount
            ? addCommaSeparator(value || "")
            : value
        }
        wrapperClassName="px-2"
        {...rest}
        hasRemoveIcon={false}
      />

      {iconType === "all" ? (
        <button
          aria-label={t("clearInput")}
          className="flex h-14 w-14 items-center justify-center"
          onClick={() => onAllClick?.(1)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onChange("");
            }
          }}
          type="button"
        >
          <p className="text-sm text-positive">{t("all")}</p>
        </button>
      ) : null}
    </div>
  );
}

export default InputDesktop;
