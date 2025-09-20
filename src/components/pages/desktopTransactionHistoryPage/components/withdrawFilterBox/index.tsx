/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import CustomCollapse from "@/components/atoms/customCollapse";
import CustomInput from "@/components/atoms/customInput";
import AssetSelect from "@/components/molecules/assetSelect";
import FilterNetworkSelect from "@/components/molecules/filterNetworkSelect";
import PaymentCurrencySelect from "@/components/molecules/paymentCurrencySelect";
import StatusSelect from "@/components/molecules/statusSelect";
import DatePickerDefault from "@/components/muscles/datePickerDefault";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useWithdrawHistoryFilterContext } from "../withdrawHistoryTab/provider";

function WithdrawFilterBox() {
  const { locale } = useUrl();
  const t = useTranslations();

  const [dateValue, setDateValue] = useState<string>("");

  const { setValue, control, watch } = useWithdrawHistoryFilterContext();
  const status = watch("status");

  const removeAllFilters = () => {
    setDateValue("");
    setValue("from", "");
    setValue("to", "");

    setValue("asset", "");
    setValue("payment_currency", "");
    setValue("network", "");
    setValue("address", "");
    setValue("status", undefined);
  };

  return (
    <CustomCollapse
      wrapperClassName=" my-4 py-0! w-full px-0"
      topSectionClassName="bg-surface  px-4"
      topSection={<p className="text-mainText">{t("filter")}</p>}
    >
      <div className="mt-2 mb-2 grid w-full grid-cols-[repeat(auto-fit,minmax(100px,250px))] items-end gap-3 px-2">
        <div className="flex w-full flex-col items-start gap-2">
          <label className="text font-fa text-mainText mx-2 text-xs">
            {t("date")}
          </label>
          <DatePickerDefault
            value={dateValue}
            range
            inputClassName="py-1.5! focus-visible:outline-1 focus-visible:outline-mainText placeholder:text-xs placeholder:text-accentText "
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
          name="asset"
          render={({ field: { onChange, value } }) => (
            <AssetSelect value={value} onChange={(asset) => onChange(asset)} />
          )}
        />

        <Controller
          control={control}
          name="payment_currency"
          render={({ field: { onChange, value } }) => (
            <PaymentCurrencySelect
              value={value}
              onChange={(currency) => onChange(currency)}
            />
          )}
        />

        <Controller
          control={control}
          name="network"
          render={({ field: { onChange, value } }) => (
            <FilterNetworkSelect
              value={value}
              onChange={(currency) => onChange(currency)}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder={t("insertFilterAddress")}
              inputClassName="focus-visible:border-mainText "
              maxLength={250}
              wrapperClassName="max-w-[300px] gap-2"
              label={t("address")}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { onChange } }) => (
            <StatusSelect
              status={status}
              onChange={(asset) => onChange(asset)}
            />
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

export default WithdrawFilterBox;
