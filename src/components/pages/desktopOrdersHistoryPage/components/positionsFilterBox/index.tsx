/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import CustomCollapse from "@/components/atoms/customCollapse";
import CustomInput from "@/components/atoms/customInput";
import SideSelect from "@/components/molecules/SideSelect";
import TypeSelect from "@/components/molecules/typeSelect";
import DatePickerDefault from "@/components/muscles/datePickerDefault";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { usePositionsHistoryFilterContext } from "../openPositionsTab/provider";

function PositionsFilterBox() {
  const { locale } = useUrl();
  const t = useTranslations();

  const [dateValue, setDateValue] = useState<string>("");

  const { setValue, control, watch } = usePositionsHistoryFilterContext();
  const side = watch("side");
  const type = watch("type");

  const removeAllFilters = () => {
    setDateValue("");
    setValue("from", "");
    setValue("to", "");

    setValue("type", undefined);
    setValue("side", undefined);
    setValue("symbol", "");
  };

  return (
    <CustomCollapse
      wrapperClassName=" my-4 py-0! w-full px-0"
      topSectionClassName="bg-surface dark:bg-surfaceDark px-4"
      topSection={
        <p className="text-mainText dark:text-mainTextDark">{t("filter")}</p>
      }
    >
      <div className="mb-2 mt-2 grid w-full grid-cols-[repeat(auto-fit,minmax(100px,250px))] items-end gap-3 px-2">
        <div className="flex w-full flex-col items-start gap-2">
          <label className="text font-fa mx-2 text-xs text-mainText dark:text-mainTextDark">
            {t("date")}
          </label>
          <DatePickerDefault
            value={dateValue}
            range
            inputClassName="py-1.5!  focus-visible:outline-1 focus-visible:outline-mainText placeholder:text-xs placeholder:text-accentText placeholder:dark:text-accentTextDark"
            containerClassName="w-full"
            onChange={(date) => {
              if (!date) {
                setDateValue("");
                setValue("from", "");
                setValue("to", "");
                return;
              }

              // @ts-ignore
              setDateValue(date);

              if (Array.isArray(date)) {
                const [fromDate, toDate] = date;

                // @ts-ignore
                const fromTimestamp = fromDate?.toDate()?.getTime() ?? "";
                // @ts-ignore
                const toTimestamp = toDate?.toDate()?.getTime() ?? "";

                setValue("from", fromTimestamp);
                setValue("to", toTimestamp);
              }
            }}
            format={locale === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
          >
            <div className="flex gap-1 p-2">
              <CustomButton
                variant="outline"
                onClick={() => {
                  setDateValue("");
                  setValue("from", "");
                  setValue("to", "");
                }}
              >
                <span className="text-mainText">{t("clearDate")}</span>
              </CustomButton>
            </div>
          </DatePickerDefault>
        </div>
        <Controller
          control={control}
          name="symbol"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              inputClassName="focus-visible:border-mainText dark:focus-visible:border-mainTextDark placeholder:text-xs placeholder:text-accentText placeholder:dark:text-accentTextDark"
              maxLength={100}
              wrapperClassName="max-w-[300px] gap-2"
              label={t("symbol")}
              value={value}
              onChange={onChange}
              placeholder={t("insertFilterCurrencyPair")}
            />
          )}
        />

        <Controller
          control={control}
          name="side"
          render={({ field: { onChange } }) => (
            <SideSelect side={side} onChange={(side) => onChange(side)} />
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange } }) => (
            <TypeSelect type={type} onChange={(asset) => onChange(asset)} />
          )}
        />

        <CustomButton
          onClick={removeAllFilters}
          className="h-9! min-h-9! w-[112px]!"
          variant="primary"
        >
          {t("removeFilters")}
        </CustomButton>
      </div>
    </CustomCollapse>
  );
}

export default PositionsFilterBox;
