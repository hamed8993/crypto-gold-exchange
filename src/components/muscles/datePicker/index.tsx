import CustomButton from "@/components/atoms/customButton";
import DatePickerDrawer from "@/components/molecules/datePickerDrawer";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export type calenderData = {
  toDay: string;
  toYear: string;
  toDate: string;
  fromDay: string;
  toMonth: string;
  fromDate: string;
  fromYear: string;
  fromMonth: string;
};

interface DatePickerProps {
  reset?: boolean;
  isFrom?: boolean;
  setValue: UseFormSetValue<calenderData>;
}

function DatePicker({ setValue, isFrom, reset }: DatePickerProps) {
  const t = useTranslations();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setDate("");
  }, [reset]);

  return (
    <Fragment>
      <CustomButton
        onClick={() => setIsDrawerOpen(true)}
        variant="outline"
        className="flex min-h-10 w-full min-w-24 items-center justify-center rounded-lg border border-accentText50 dark:border-accentTextDark50"
      >
        {date ? <p dir="ltr">{date}</p> : <p>{t("chooseDate")}</p>}
      </CustomButton>

      <DatePickerDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        passDate={(year, month, day) => {
          if (year && month && day) {
            setDate(
              year.toString() +
                " / " +
                month.toString() +
                " / " +
                day.toString(),
            );
            if (isFrom) {
              setValue("fromDate", date);
              setValue("fromYear", year.toString());
              setValue("fromMonth", month.toString());
              setValue("fromDay", day.toString());
            } else {
              setValue("toDate", date.toString());
              setValue("toYear", year.toString());
              setValue("toMonth", month.toString());
              setValue("toDay", day.toString());
            }
          }
        }}
      />
    </Fragment>
  );
}

export default DatePicker;
