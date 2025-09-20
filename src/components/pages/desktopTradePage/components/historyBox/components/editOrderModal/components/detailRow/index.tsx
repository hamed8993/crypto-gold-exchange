import clsx from "clsx";
import { ReactNode } from "react";

interface DetailRowProps {
  title?: string;
  value?: string;
  isEnglish?: boolean;
  extraComponent?: ReactNode;
}

function DetailRow({
  title,
  value,
  isEnglish,
  extraComponent,
}: DetailRowProps) {
  return (
    <div className="bg-secondBackground flex min-h-[51px] w-full items-center justify-between rounded-lg">
      <div className="bg-accentText50 flex h-[51px]! w-[40%] items-center justify-start rounded-s-lg px-4">
        <p className="text-mainText text-xs">{title}</p>
      </div>
      <div className="flex w-[60%] items-center justify-end gap-2 px-4">
        <p
          className={clsx(
            "text-mainText text-xs",
            isEnglish ? "font-english" : "",
          )}
        >
          {value}
        </p>
        {extraComponent}
      </div>
    </div>
  );
}

export default DetailRow;
