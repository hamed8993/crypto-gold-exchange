import clsx from "clsx";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface CustomTextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  error?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}

function CustomTextArea({
  error,
  label,
  inputClassName,
  wrapperClassName,
  ...rest
}: CustomTextAreaProps) {
  return (
    <div
      className={clsx(
        "flex w-full flex-col items-start gap-2",
        wrapperClassName,
      )}
    >
      {label && (
        <label className="text mx-2 text-xs text-accentText dark:text-accentTextDark">
          {label}
        </label>
      )}
      <textarea
        dir="ltr"
        className={clsx(
          "min-h-9 w-full rounded-lg border border-border bg-transparent px-4 text-sm text-mainText placeholder:text-sm placeholder:text-accentText focus-within:outline-0 rtl:text-end dark:border-borderDark dark:text-mainTextDark dark:placeholder:text-accentTextDark",
          inputClassName,
        )}
        {...rest}
      />
      {error && <p className="mx-2 text-xs text-negative">{error}</p>}
    </div>
  );
}

export default CustomTextArea;
