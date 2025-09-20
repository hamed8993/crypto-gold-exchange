import clsx from "clsx";
import { ReactNode } from "react";

interface DetailItemProps {
  title: string;
  value?: string;
  isFontEnglish?: boolean;
  isLastItem?: boolean;
  icon?: ReactNode;
}

function DetailItem({
  icon,
  title,
  value,
  isFontEnglish = false,
  isLastItem = false,
}: DetailItemProps) {
  return (
    <div
      className={clsx(
        "flex h-10 w-full items-center justify-between border-b-border px-3 dark:border-b-borderDark",
        isLastItem ? "border-b-0" : "border-b",
      )}
    >
      <p className="text-xs text-accentText dark:text-accentTextDark">
        {title}
      </p>
      {icon ? (
        <div className="flex items-center justify-start gap-2">
          <p
            dir="ltr"
            className={
              isFontEnglish
                ? "font-english text-xs text-mainText dark:text-mainTextDark"
                : "text-xs text-mainText dark:text-mainTextDark"
            }
          >
            {value}
          </p>
          {icon}
        </div>
      ) : (
        <p
          dir="ltr"
          className="font-english text-xs text-mainText dark:text-mainTextDark"
        >
          {value?.toUpperCase()}
        </p>
      )}
    </div>
  );
}

export default DetailItem;
