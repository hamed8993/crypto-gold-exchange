"use client";

import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";

interface TimeProcessBarProps {
  remainingTime: number;
  criticalMinRemainTime: number;
}

function TimeProcessBar({
  remainingTime,
  criticalMinRemainTime,
}: TimeProcessBarProps) {
  const [timeWidth, setTimeWidth] = useState<string>("100");
  const { locale } = useUrl();

  const maxWidth = 1800;
  const remainingTimePercent =
    remainingTime > 0
      ? Number(new Decimal(remainingTime).div(maxWidth).times(100).toFixed(0))
      : 100;

  useEffect(() => {
    setTimeWidth(`${remainingTimePercent}`);
  }, [remainingTimePercent]);

  return (
    <div className="mt-1 flex h-9 w-full items-center">
      <div className="relative flex h-2 w-full items-center justify-end rounded-2xl bg-accentText dark:bg-accentTextDark">
        <div
          className={clsx(
            `flex h-2 items-center justify-center rounded-2xl`,
            remainingTime > criticalMinRemainTime
              ? "bg-positive"
              : "bg-negative",
          )}
          style={{
            width: `${timeWidth}%`,
          }}
        >
          <span
            style={
              locale === "fa"
                ? { left: `calc(${timeWidth}% - 12px)` }
                : { right: `calc(${timeWidth}% - 12px)` }
            }
            className={clsx(
              "Z-10 absolute flex h-6 w-6 items-center justify-center rounded-full",
              remainingTime > criticalMinRemainTime
                ? "bg-positive shadow-[0_0_6px_3px_hsl(123,47%,40%)]"
                : "bg-negative shadow-[0_0_6px_3px_hsl(0,47%,40%)]",
            )}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-constantLight"></span>
          </span>
          <div className="w-[95%] overflow-hidden">
            {timeWidth === "100" ? null : (
              <div className="animate-slide flex h-2 w-full rounded-2xl bg-linear-to-r from-transparent via-accentText to-transparent dark:via-accentTextDark"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeProcessBar;
