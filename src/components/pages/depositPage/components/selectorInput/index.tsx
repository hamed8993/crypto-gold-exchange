import clsx from "clsx";
import { ReactNode } from "react";
import { GoChevronDown } from "react-icons/go";
import { PiCoinVerticalThin } from "react-icons/pi";

interface SelectorInputProps {
  hasChevron?: boolean;
  icon?: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
  placeholder: string;
  value?: string;
}

function SelectorInput({
  hasChevron = true,
  icon,
  isDisabled,
  onClick,
  placeholder,
  value,
}: SelectorInputProps) {
  return (
    <div
      className={clsx(
        "mt-4 flex h-12 w-full items-center justify-between rounded-lg bg-surface dark:bg-surfaceDark",
        isDisabled ? "opacity-65" : "",
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-start">
        <div className="flex h-12 w-12 items-center justify-center">
          {icon ? (
            icon
          ) : (
            <PiCoinVerticalThin className="h-6 w-6 text-accentText dark:text-accentTextDark" />
          )}
        </div>
        <p
          className={clsx(
            "text-xs",
            value
              ? "text-mainText dark:text-mainTextDark"
              : "text-accentText dark:text-accentTextDark",
          )}
        >
          {value ? value?.toUpperCase() : placeholder}
        </p>
      </div>
      {hasChevron && (
        <div className="flex h-12 w-12 items-center justify-center">
          <GoChevronDown className="h-6 w-6 text-accentText dark:text-accentTextDark" />
        </div>
      )}
    </div>
  );
}

export default SelectorInput;
