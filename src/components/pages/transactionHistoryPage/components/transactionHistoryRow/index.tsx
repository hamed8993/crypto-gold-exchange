/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomCollapse from "@/components/atoms/customCollapse";
import CustomDateTime from "@/components/atoms/customDateTime";
import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { GetDepositHistory, GetWithdrawHistory } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { useTransactionsHistoryContext } from "../../provider";
import LongValueBox from "./components/longValueBox";
import SingleValueBox from "./components/singleValueBox";
import TopSection from "./components/topSection";

interface TransactionHistoryRowProps {
  data?:
    | ArrayElement<GetDepositHistory["result"]>
    | ArrayElement<GetWithdrawHistory["result"]>;
}

function TransactionHistoryRow({ data }: TransactionHistoryRowProps) {
  const t = useTranslations();
  const { watch } = useTransactionsHistoryContext();

  const { getQuoteName } = useMarketsNamesData();

  const isDeposit: boolean = watch("activeTab") === "deposit";

  return (
    <CustomCollapse
      chevronClassName="mx-4 mb-4"
      topSection={<TopSection data={data} />}
    >
      <div className="mt-2 flex w-full flex-col gap-2 px-2 pb-2">
        <div className="grid w-full grid-cols-2 gap-2">
          <SingleValueBox
            extraComponent={
              <CustomDateTime
                iconClassName="text-mainText"
                textClassName="text-mainText"
                timeStamp={data?.created_at || 0}
              />
            }
            title={t("date")}
          />

          <SingleValueBox
            title={t("transactionHistoryAsset")}
            value={getQuoteName(data?.asset || "")}
          />
          <SingleValueBox
            title={t("payment_currency")}
            value={data?.payment_currency?.toUpperCase()}
          />

          <SingleValueBox
            title={t("network")}
            value={data?.network?.toUpperCase()}
          />

          <SingleValueBox
            title={t("amount")}
            value={addCommaSeparator(data?.amount || "0")}
          />

          <SingleValueBox
            title={t("equivalent")}
            value={addCommaSeparator(data?.equivalent || "0")}
          />

          {isDeposit && (
            <>
              <SingleValueBox
                title={t("actual_amount")}
                //@ts-ignore
                value={addCommaSeparator(data?.actual_amount || "0")}
              />
              <SingleValueBox
                title={t("actual_equivalent")}
                //@ts-ignore
                value={addCommaSeparator(data?.actual_equivalent || "0")}
              />
            </>
          )}
          <SingleValueBox
            title={t("deposit_id")}
            value={
              isDeposit
                ? //@ts-ignore
                  data?.deposit_id
                : //@ts-ignore
                  data?.withdraw_id
            }
          />

          <SingleValueBox
            extraComponent={
              <div className="flex items-center justify-start gap-1">
                <p
                  className="font-english text-mainText w-fit text-sm"
                  dir="ltr"
                >
                  {addCommaSeparator(data?.rate || "0") || "--"}
                </p>

                <p className="text-accentText w-fit text-sm" dir="ltr">
                  {getQuoteName(data?.asset || "")}
                </p>
              </div>
            }
            title={t("convertRate")}
          />

          {isDeposit && (
            <SingleValueBox
              title={t("confirmations")}
              //@ts-ignore
              value={data?.confirmations}
            />
          )}
          <SingleValueBox title={t("status")} value={data?.status} />
        </div>

        <LongValueBox title={t("address")} value={data?.address} />

        <LongValueBox title={t("tx")} value={data?.tx} />
      </div>
    </CustomCollapse>
  );
}

export default TransactionHistoryRow;
