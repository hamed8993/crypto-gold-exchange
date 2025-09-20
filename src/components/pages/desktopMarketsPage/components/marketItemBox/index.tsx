import clsx from "clsx";
import { ReactNode } from "react";

interface MarketItemBoxProps {
  extraComponent?: ReactNode;
  isEnglish?: boolean;
  value?: string;
  wrapperClassName?: string;
}

function MarketItemBox({
  extraComponent,
  isEnglish,
  value,
  wrapperClassName,
}: MarketItemBoxProps) {
  return (
    <div
      className={clsx(
        "flex w-full items-center justify-center",
        wrapperClassName,
      )}
    >
      <p
        className={clsx(
          "text-sm text-mainText dark:text-mainTextDark",
          isEnglish ? "font-english" : "",
        )}
      >
        {value}
      </p>

      {extraComponent}
    </div>
  );
}

export default MarketItemBox;
