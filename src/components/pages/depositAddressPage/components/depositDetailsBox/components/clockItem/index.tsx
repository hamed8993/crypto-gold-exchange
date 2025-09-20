"use client";

import clsx from "clsx";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ClockItemProps {
  remainingTime: number;
  time?: string;
}

function ClockItem({ remainingTime, time }: ClockItemProps) {
  const t = useTranslations();

  const [timeWidth, setTimeWidth] = useState<string>("100");

  const maxWidth = 1800;
  const remainingTimePercent =
    remainingTime > 0
      ? Number(new Decimal(remainingTime).div(maxWidth).times(100).toFixed(0))
      : 100;

  const isTimeValid = remainingTime > 120;

  useEffect(() => {
    setTimeWidth(`${remainingTimePercent}`);
  }, [remainingTimePercent]);

  return (
    <div className="flex h-16 w-full flex-col items-center justify-start">
      <div className="flex h-14 w-full items-center justify-between border-b border-b-border px-3 dark:border-b-borderDark">
        <p className="text-xs text-accentText dark:text-accentTextDark">
          {t("remainingTime")}
        </p>
        <p
          className={
            isTimeValid
              ? "font-english text-sm text-mainText dark:text-mainTextDark"
              : "animate-pulse font-english text-sm text-negative"
          }
        >
          {time}
        </p>
      </div>
      <div className="flex h-2 w-full items-center justify-end overflow-hidden bg-accentText dark:bg-accentTextDark">
        <div
          className={clsx(
            `flex h-2 items-center justify-center`,
            isTimeValid ? "bg-mainBrand" : "bg-negative",
          )}
          style={{
            width: `${timeWidth}%`,
          }}
        >
          {timeWidth === "100" ? null : (
            <div className="animate-slide flex h-2 w-full bg-linear-to-r from-transparent via-accentText/50 to-transparent dark:via-accentTextDark/50"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClockItem;
