"use client";

import { localeType } from "@/app/[locale]/layout";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface CustomSwitchProps {
  enabled: boolean;
  color?: string;
  onClick?: () => void;
}

function CustomSwitch({ enabled, color, onClick }: CustomSwitchProps) {
  const { locale } = useUrl();

  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    setIsEnabled(enabled);
  }, [enabled]);

  return (
    <button
      onClick={onClick}
      className={`relative h-3 w-8 rounded-full transition-colors duration-300 ${
        isEnabled
          ? color
            ? color
            : "bg-darkRed"
          : "bg-accentText dark:bg-accentTextDark"
      }`}
    >
      <span
        className={clsx(
          `absolute -top-1 left-0 h-5 w-5 rounded-full transition-transform duration-300 ${
            rtlLanguages.includes(locale as localeType)
              ? isEnabled
                ? "translate-x-0"
                : "translate-x-4"
              : isEnabled
                ? "translate-x-4"
                : "translate-x-0"
          }`,
          isEnabled
            ? "bg-negative50"
            : "bg-mainBackground dark:bg-mainBackground",
        )}
      />
    </button>
  );
}

export default CustomSwitch;
