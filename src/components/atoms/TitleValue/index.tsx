import clsx from "clsx";
import { ReactNode } from "react";
import HorizontalGradientLine from "../horizontalGradientLine";

interface TitleValueProps {
  title: string;
  value: ReactNode;
  hasBorder?: boolean;
  valueClassName?: string;
}
export default function TitleValue({
  title,
  value,
  hasBorder = true,
  valueClassName,
}: TitleValueProps) {
  return (
    <>
      <div className="flex h-10 w-full items-center justify-between">
        <p className="h-fit text-sm text-accentText dark:text-accentTextDark">
          {title}
        </p>
        {typeof value === "string" ? (
          <p
            className={clsx(
              "text-sm text-mainText dark:text-mainTextDark",
              valueClassName,
            )}
          >
            {value}
          </p>
        ) : (
          value
        )}
      </div>
      {hasBorder && <HorizontalGradientLine className="mb-2! mt-1!" />}
    </>
  );
}
