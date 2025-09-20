import clsx from "clsx";
import { ReactNode } from "react";
import HorizontalGradientLine from "../horizontalGradientLine";

interface TitleValueModalProps {
  type?: "horizontal" | "vertical";
  title: ReactNode;
  value: ReactNode;
  hasBorder?: boolean;
  valueClassName?: string;
}

function TitleValueModal({
  title,
  type = "horizontal",
  value,
  hasBorder,
  valueClassName,
}: TitleValueModalProps) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={clsx(
          "flex min-h-fit w-full overflow-hidden rounded-md",
          type === "vertical" ? "flex-col" : "flex-row",
        )}
      >
        <div
          className={clsx(
            "flex h-10 items-center px-3",
            type === "vertical" ? "w-full" : "w-[40%]",
          )}
        >
          {typeof title === "string" ? (
            <p className="leading-4 text-accentText dark:text-accentTextDark">
              {title}
            </p>
          ) : (
            title
          )}
        </div>
        <div
          className={clsx(
            "flex h-10 items-center justify-end px-3",
            type === "vertical" ? "w-full" : "w-[60%]",
          )}
        >
          {typeof value === "string" ? (
            <p
              dir="ltr"
              className={clsx(
                "truncate text-sm leading-4 text-mainText dark:text-mainTextDark",
                valueClassName,
              )}
            >
              {value}
            </p>
          ) : (
            value
          )}
        </div>
      </div>
      {hasBorder && <HorizontalGradientLine className="mb-2! mt-1!" />}
    </div>
  );
}

export default TitleValueModal;
