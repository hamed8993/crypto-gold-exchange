"use client";

import clsx from "clsx";
import { FiTrash } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { MdContentPaste } from "react-icons/md";
import useClipboard from "@/core/hooks/useClipboard";

interface CustomPinInputProps {
  label?: string;
  length?: number;
  error?: boolean;
  className?: string;
  inputClassName?: string;
  onDelete?: () => void;
  onComplete?: (pin: string) => void;
  trashClassName?: string;
  copyClassName?: string;
  iconsWrapperClassName?: string;
  onChange?: (value?: string) => void;
}

function CustomPinInput({
  className,
  inputClassName,
  label,
  length = 4,
  onComplete,
  onDelete,
  error = false,
  trashClassName,
  copyClassName,
  iconsWrapperClassName,
  onChange,
}: CustomPinInputProps) {
  const { pasteFromClipboard } = useClipboard();

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  useEffect(() => {
    onChange?.(values.join(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every((value) => value !== "") && onComplete) {
      onComplete(newValues.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.ctrlKey && e.key === "v") {
      handlePasteFromClipboard();
    }
  };

  const handlePasteFromClipboard = async () => {
    const text = await pasteFromClipboard();
    if (text) {
      fillInputs(text);
    }
  };

  const fillInputs = (text: string) => {
    const newValues = Array(length).fill("");
    for (let i = 0; i < Math.min(length, text.length); i++) {
      if (/^\d$/.test(text[i])) {
        newValues[i] = text[i];
      }
    }
    setValues(newValues);
    inputsRef.current[Math.min(length - 1, text.length - 1)]?.focus();

    if (newValues.every((val) => val !== "") && onComplete) {
      onComplete(newValues.join(""));
    }
  };

  const trashHandler = () => {
    onDelete?.();
    setValues(Array(length).fill(""));
    inputsRef.current[0]?.focus();
  };

  return (
    <div className={clsx("flex w-full flex-col gap-3", className)}>
      <div className="flex w-full items-center justify-between">
        <span className="px-4 text-sm text-accentText dark:text-accentTextDark">
          {label}
        </span>
        <div
          dir="ltr"
          className={clsx(
            "flex items-center divide-x divide-accentText/50 px-4 dark:divide-accentTextDark/50",
            iconsWrapperClassName,
          )}
        >
          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center"
            onClick={handlePasteFromClipboard}
          >
            <MdContentPaste className={clsx("text-mainBrand", copyClassName)} />
          </div>
          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center"
            onClick={trashHandler}
          >
            <FiTrash className={clsx("text-negative", trashClassName)} />
          </div>
        </div>
      </div>
      <div dir="ltr" className={"flex w-full justify-around"}>
        {Array.from({ length }).map((_, index) => (
          <input
            className={clsx(
              "h-12 w-12 rounded-lg border border-accentText bg-transparent text-center text-xl text-mainText focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-accentTextDark dark:text-mainTextDark",
              inputClassName,
              error ? "border-negative dark:border-negative" : undefined,
            )}
            key={index}
            maxLength={1}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            inputMode="decimal"
            type="text"
            value={values[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default CustomPinInput;
