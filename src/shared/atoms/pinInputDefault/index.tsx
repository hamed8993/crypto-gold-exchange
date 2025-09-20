"use client";

import useClipboard from "@/core/hooks/useClipboard";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface PinInputDefaultProps {
  length?: number;
  error?: boolean;
  className?: string;
  inputClassName?: string;
  onComplete?: (pin: string) => void;
  onChange?: (value?: string) => void;
}

function PinInputDefault({
  className,
  inputClassName,
  length = 6,
  onComplete,
  error = false,
  onChange,
}: PinInputDefaultProps) {
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

  return (
    <div className={clsx("mt-3 flex w-[444px] flex-col gap-3", className)}>
      <div dir="ltr" className={"flex h-24 w-full justify-around gap-4"}>
        {Array.from({ length }).map((_, index) => (
          <input
            className={clsx(
              "bg-bgMuted font-english text-mainText h-full w-full rounded-lg border text-center text-xl focus:ring-2 focus:ring-blue-500 focus:outline-none",
              inputClassName,
              error ? "border-negative" : undefined,
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

export default PinInputDefault;
