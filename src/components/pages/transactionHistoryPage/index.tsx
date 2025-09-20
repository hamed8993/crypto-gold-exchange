"use client";

import EmptyView from "@/components/atoms/emptyView";
import PwaPageLayout from "@/components/organisms/layout";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import {
  useGetDepositHistory,
  useGetWithdrawHistory,
} from "@/core/services/hooks";
import { jalaliToUTCTimeStamp } from "@/core/utilities/convertDate";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import FilterExcelRow from "./components/filterExcelRow";
import TransactionHistoryRow from "./components/transactionHistoryRow";
import TransactionTabs from "./components/transactionTabs";
import {
  TransactionsHistoryContextProvider,
  useTransactionsHistoryContext,
} from "./provider";

export type transactionsHistoryTabs = "deposit" | "withdraw";

interface TransactionHistoryPageProps {
  className?: string;
}

function Component({ className }: TransactionHistoryPageProps) {
  const t = useTranslations();

  const { locale } = useUrl();

  const { isLoggedIn } = useAuth();

  const { convertToDayEnd } = useConvertMillisecondToLocal();

  const { watch, setValue } = useTransactionsHistoryContext();

  const activeTab = watch("activeTab");
  const address = watch("address");
  const addressApply = watch("addressApply");
  const assetApply = watch("assetApply");
  const asset = watch("asset");
  const fromDate = watch("fromDate");
  const fromYear = watch("fromYear");
  const fromMonth = watch("fromMonth");
  const fromDay = watch("fromDay");
  const isFilterApplied = watch("isFilterApplied");
  const network = watch("network");
  const networkApply = watch("networkApply");
  const payment_currency = watch("payment_currency");
  const payment_currencyApply = watch("payment_currencyApply");
  const status = watch("status");
  const statusApply = watch("statusApply");
  const toDate = watch("toDate");
  const toDateApply = watch("toDateApply");
  const toYear = watch("toYear");
  const toMonth = watch("toMonth");
  const toDay = watch("toDay");
  const tx = watch("tx");
  const txApply = watch("txApply");

  const { data: dataDeposits } = useGetDepositHistory(
    {
      address: addressApply,
      asset: assetApply,
      from: fromDate,
      network: networkApply,
      payment_currency: payment_currencyApply,
      status: statusApply,
      tx: txApply,
      to: toDateApply,
    },
    { enabled: isLoggedIn },
  );
  const userDeposits = dataDeposits?.result || [];

  const { data: dataWithdrawals } = useGetWithdrawHistory(
    {
      address: addressApply,
      asset: assetApply,
      from: fromDate,
      network: networkApply,
      payment_currency: payment_currencyApply,
      status: statusApply,
      tx: txApply,
      to: toDateApply,
    },
    { enabled: isLoggedIn },
  );
  const userWithdrawals = dataWithdrawals?.result || [];

  const enFromDate = new Date(fromMonth + "/" + fromDay + "/" + fromYear)
    .getTime()
    .toString();

  const enToDate = new Date(toMonth + "/" + toDay + "/" + toYear)
    .getTime()
    .toString();

  useEffect(() => {
    const from_Date = fromDate
      ? locale === "fa"
        ? jalaliToUTCTimeStamp(
            Number(fromYear),
            Number(fromMonth),
            Number(fromDay),
          ).toString()
        : enFromDate
      : "";
    setValue("fromDateApply", from_Date);

    const to_Date = toDate
      ? locale === "fa"
        ? convertToDayEnd(
            new Date(
              jalaliToUTCTimeStamp(
                Number(toYear),
                Number(toMonth),
                Number(toDay),
              ),
            ),
          )
        : convertToDayEnd(new Date(enToDate))
      : "";
    // TODO: convertToDayEnd is not working properly
    setValue("toDateApply", to_Date);
    setValue("addressApply", address);
    setValue("txApply", tx);
    setValue("assetApply", asset);
    setValue("networkApply", network);
    setValue("payment_currencyApply", payment_currency);
    setValue("statusApply", status);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterApplied]);

  return (
    <PwaPageLayout
      hasBackChevron
      title={t("withdrawAndDepositHistory")}
      wrapperClassName={className}
    >
      <div className="flex flex-col px-3">
        <TransactionTabs />
        <FilterExcelRow
          data={
            watch("activeTab") === "withdraw" ? userWithdrawals : userDeposits
          }
        />

        <div className="flex flex-col gap-2">
          {activeTab === "deposit" ? (
            Number(userDeposits?.length) === 0 ? (
              <EmptyView />
            ) : (
              userDeposits?.map((item, index) => (
                <TransactionHistoryRow data={item} key={index} />
              ))
            )
          ) : userWithdrawals?.length === 0 || !userWithdrawals ? (
            <EmptyView />
          ) : (
            userWithdrawals?.map((item, index) => (
              <TransactionHistoryRow data={item} key={index} />
            ))
          )}
        </div>
      </div>
    </PwaPageLayout>
  );
}

function TransactionHistoryPage({ ...rest }: TransactionHistoryPageProps) {
  return (
    <TransactionsHistoryContextProvider>
      <Component {...rest} />
    </TransactionsHistoryContextProvider>
  );
}

export default TransactionHistoryPage;
