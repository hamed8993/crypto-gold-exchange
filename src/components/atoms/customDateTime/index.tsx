import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import clsx from "clsx";
import { GoClock } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";

interface CustomDateTimeProps {
  iconClassName?: string;
  isDisplayClock?: boolean;
  textClassName?: string;
  timeStamp: string | number;
}

function CustomDateTime({
  iconClassName,
  isDisplayClock = true,
  textClassName,
  timeStamp,
}: CustomDateTimeProps) {
  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  return (
    <div className="flex items-center justify-start gap-1">
      {isDisplayClock ? (
        <>
          <p
            className={clsx(
              "font-english text-xs text-accentText dark:text-accentTextDark",
              textClassName,
            )}
          >
            {convertMillisecondToLocal(timeStamp)?.hoursAndMinutes}
          </p>
          <GoClock
            className={clsx(
              "h-3 w-3 text-accentText dark:text-accentTextDark",
              iconClassName,
            )}
          />
        </>
      ) : null}
      <p
        className={clsx(
          "font-english text-xs text-accentText dark:text-accentTextDark",
          textClassName,
        )}
      >
        {convertMillisecondToLocal(timeStamp)?.date}
      </p>
      <IoCalendarOutline
        className={clsx(
          "h-3 w-3 text-accentText dark:text-accentTextDark",
          iconClassName,
        )}
      />
    </div>
  );
}

export default CustomDateTime;
