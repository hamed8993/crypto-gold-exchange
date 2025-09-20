import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { ComponentProps } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";

type PersianDatePickerProps = ComponentProps<typeof DatePicker>;

interface DatePickerDefaultProps
  extends Omit<PersianDatePickerProps, "inputClass"> {
  inputClassName?: string;
  isModal?: boolean;
  placeholder?: string;
}

const DatePickerDefault = ({
  inputClassName,
  isModal = false,
  placeholder,
  ...rest
}: DatePickerDefaultProps) => {
  const t = useTranslations();

  const { locale } = useUrl();

  return (
    <DatePicker
      className={isModal ? "rmdp-mobile" : undefined}
      portal={isModal}
      calendar={locale === "en" ? undefined : persian}
      calendarPosition={locale === "en" ? "bottom-left" : "bottom-right"}
      locale={locale === "en" ? undefined : persian_fa}
      fixMainPosition
      inputClass={clsx(
        "w-full rounded-lg border border-accentText50 dark:placeholder:text-accentTextDark bg-transparent p-2 focus-visible:outline-none! focus-visible:border-mainText  text-mainText dark:text-mainTextDark",
        inputClassName,
      )}
      placeholder={placeholder || t("selectTheFilterDate")}
      {...rest}
    />
  );
};

export default DatePickerDefault;
