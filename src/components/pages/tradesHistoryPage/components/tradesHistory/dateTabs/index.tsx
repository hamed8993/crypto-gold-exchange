import DatePickerDrawer from "@/components/molecules/datePickerDrawer";
import { jalaliToUTCTimeStamp } from "@/core/utilities/convertDate";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DateTabsProps {
  nowDate?: string;
  lastMonthDate?: string;
  passDateToParent: (from: string, to: string) => void;
}

function DateTabs({ lastMonthDate, nowDate, passDateToParent }: DateTabsProps) {
  const t = useTranslations();
  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFrom, setIsFrom] = useState<boolean>(true);

  return (
    <div className="flex min-h-16 w-full">
      <div className="border-b-accentText50 flex h-full w-full items-center justify-center gap-2 border-b">
        <div
          className="flex h-full w-full items-center justify-center gap-2"
          onClick={() => {
            setIsFrom(true);
            setIsOpen(true);
          }}
        >
          <p className="text-accentText text-sm">{t("from")}</p>
          <button className="bg-surface font-english text-mainText flex items-center justify-center gap-1 rounded-md p-2 px-4 text-sm">
            {
              convertMillisecondToLocal(fromDate ? fromDate : lastMonthDate)
                ?.date
            }
            <IoIosArrowDown className="text-accentText h-4 w-4" />
          </button>
        </div>
        <div
          className="flex h-full w-full items-center justify-center gap-2"
          onClick={() => {
            setIsFrom(false);
            setIsOpen(true);
          }}
        >
          <p className="text-accentText text-sm">{t("to2")}</p>
          <button className="bg-surface font-english text-mainText flex items-center justify-center gap-1 rounded-md p-2 px-4 text-sm">
            {convertMillisecondToLocal(toDate ? toDate : nowDate)?.date}
            <IoIosArrowDown className="text-accentText h-4 w-4" />
          </button>
        </div>
      </div>

      <DatePickerDrawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        passDate={(year, month, day) => {
          const date = jalaliToUTCTimeStamp(
            Number(year),
            Number(month),
            Number(day),
          ).toString();
          if (isFrom) {
            passDateToParent("from", date);
            setFromDate(date);
          } else {
            passDateToParent("to", date);
            setToDate(date);
          }
        }}
      />
    </div>
  );
}

export default DateTabs;
