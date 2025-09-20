import CustomButton from "@/components/atoms/customButton";
import CustomInput from "@/components/atoms/customInput";
import DatePicker, { calenderData } from "@/components/muscles/datePicker";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, UseFormSetValue } from "react-hook-form";
import { useTransactionsHistoryContext } from "../../provider";
import AssetPicker from "../assetPicker";
import CurrencyPicker from "../currencyPicker";
import FilterItem from "../filterItem";
import NetworkPicker from "../networkPicker";
import StatusPicker from "../statusPicker";

interface TransactionsFilterBoxProps {
  wrapperClassName?: string;
}

function TransactionsFilterBox({
  wrapperClassName,
}: TransactionsFilterBoxProps) {
  const t = useTranslations();

  const [isResetDate, setIsResetDate] = useState<boolean>(false);

  const { setValue, reset, control, watch } = useTransactionsHistoryContext();

  const isFilterApplied = watch("isFilterApplied");

  const resetFilters = () => {
    reset();
    setIsResetDate((prev) => !prev);
    setValue("isFilterApplied", !isFilterApplied);
  };

  const copy = async (name: "address" | "tx") => {
    const text = await navigator.clipboard.readText();
    setValue(name, text);
  };

  return (
    <div
      className={clsx(
        "border-accentText50 mt-2 w-full rounded-xl border p-4",
        wrapperClassName,
      )}
    >
      <div className="grid w-full grid-cols-2 gap-2">
        <FilterItem
          component={
            <DatePicker
              isFrom
              reset={isResetDate}
              setValue={setValue as unknown as UseFormSetValue<calenderData>}
            />
          }
          title={t("startTime")}
        />

        <FilterItem
          component={
            <DatePicker
              reset={isResetDate}
              setValue={setValue as unknown as UseFormSetValue<calenderData>}
            />
          }
          title={t("endTime")}
        />

        <FilterItem
          component={<AssetPicker />}
          title={t("transactionHistoryAsset")}
        />

        <FilterItem
          component={<CurrencyPicker />}
          title={t("payment_currency")}
        />

        <FilterItem component={<NetworkPicker />} title={t("network")} />

        <FilterItem component={<StatusPicker />} title={t("status")} />

        <FilterItem
          component={
            <Controller
              control={control}
              name="tx"
              render={({ field }) => {
                return (
                  <CustomInput
                    {...field}
                    maxLength={250}
                    placeholder={t("tx")}
                  />
                );
              }}
            />
          }
          copy={() => copy("tx")}
          deleteInput={() => setValue("tx", "")}
          isLongValue
          title={t("tx")}
        />
        <FilterItem
          component={
            <Controller
              control={control}
              name="address"
              render={({ field }) => {
                return (
                  <CustomInput
                    {...field}
                    maxLength={150}
                    placeholder={t("address")}
                  />
                );
              }}
            />
          }
          copy={() => copy("address")}
          deleteInput={() => setValue("address", "")}
          isLongValue
          title={t("address")}
        />

        <CustomButton
          className="border-border mt-3 flex min-h-10 w-full min-w-24 items-center justify-center rounded-lg border"
          onClick={() => {
            setValue("isFilterApplied", !isFilterApplied);
            setValue("isFilterBoxVisible", false);
          }}
        >
          {t("applyFilters")}
        </CustomButton>
        <CustomButton
          className="border-border mt-3 flex min-h-10 w-full min-w-24 items-center justify-center rounded-lg border"
          onClick={() => resetFilters()}
          variant="negative"
        >
          {t("removeFilters")}
        </CustomButton>
      </div>
    </div>
  );
}

export default TransactionsFilterBox;
