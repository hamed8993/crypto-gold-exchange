/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import { useNotification } from "@/core/providers/notificationProvider";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { createExcel } from "@/core/utilities/createExcel";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { useTransactionsHistoryContext } from "../../provider";
import TransactionsFilterBox from "../filterBox";

interface FilterExcelRowProps {
  data?: Partial<{
    address: string;
    amount: string;
    asset: string;
    created_at: string;
    deposit_id: string;
    withdraw_id: string;
    equivalent: string;
    payment_currency: string;
    rate: string;
    actual_amount?: string;
    actual_equivalent?: string;
    confirmations?: string;
    network?: string;
    status?: string;
    tx?: string;
  }>[];
}

function FilterExcelRow({ data }: FilterExcelRowProps) {
  const t = useTranslations();
  const { showSuccess } = useNotification();

  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  const { setValue, watch } = useTransactionsHistoryContext();

  const isFilterBoxVisible = watch("isFilterBoxVisible");

  const generateExcel = () => {
    createExcel({
      // @ts-ignore
      excelData: data,
      excelName: `Transactions ${
        convertMillisecondToLocal(Date.now()).dateTime
      }.xlsx`,
      meta: [
        {
          header: "Time.",
          key: "created_at",
          renderValue: (sampleData) => {
            return (
              convertMillisecondToLocal(sampleData.created_at).dateTime || ""
            );
          },
        },
        {
          header: "Order ID",
          key: "deposit_id",
        },
        { header: "Asset", key: "asset" },
        { header: "Amount", key: "amount" },
        {
          header: "Fee",
          key: watch("activeTab") === "withdraw" ? "withdraw_id" : "deposit_id",
        },
        { header: "Amount", key: "amount" },
        { header: "Address", key: "address" },
        { header: "Equivalent", key: "equivalent" },
        { header: "Payment Currency", key: "payment_currency" },
        { header: "Rate", key: "rate" },
        { header: "Actual amount", key: "actual_amount" },
        { header: "Actual equivalent", key: "actual_equivalent" },
        { header: "Confirmations", key: "confirmations" },
        { header: "Network", key: "network" },
        { header: "Transaction ID", key: "tx" },
        { header: "Status", key: "status" },
      ],
    });

    showSuccess(t("excelDownloaded") as string);
  };

  return (
    <Fragment>
      <div className="border-b-border flex justify-between gap-2 border-b pb-4">
        <CustomButton
          className="max-w-28"
          onClick={() => setValue("isFilterBoxVisible", !isFilterBoxVisible)}
        >
          {t("filter")}
        </CustomButton>
        <CustomButton
          className="max-w-28"
          onClick={generateExcel}
          variant="textPositive"
        >
          {t("file")}
        </CustomButton>
      </div>

      <TransactionsFilterBox
        wrapperClassName={isFilterBoxVisible ? "flex" : "hidden"}
      />
    </Fragment>
  );
}

export default FilterExcelRow;
