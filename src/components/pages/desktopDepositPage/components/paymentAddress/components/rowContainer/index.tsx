import clsx from "clsx";
import { ReactElement } from "react";

interface RowContainerProps {
  title: string;
  value?: string;
  valueClass?: string;
  valueComponent?: ReactElement;
}

function RowContainer({
  title,
  value,
  valueClass,
  valueComponent = undefined,
}: RowContainerProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-sm font-normal text-accentText dark:text-accentTextDark">
        {title}
      </span>
      {valueComponent ? (
        valueComponent
      ) : (
        <span
          className={clsx(
            "text-sm font-normal text-mainText dark:text-mainTextDark",
            valueClass,
          )}
        >
          {value}
        </span>
      )}
    </div>
  );
}

export default RowContainer;
