import { SortType } from "@/components/molecules/tableDefault";
import { ArrayElement } from "@/core/constants/constants";
import { useWindowSize } from "@/core/providers/windowSize";
import { GetDepositHistory } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

function useDepositsTableData() {
  const t = useTranslations();
  const { width } = useWindowSize();
  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  // to show symbol i used asset as it's key

  const cols: {
    sortable?: boolean;
    sortType?: SortType;
    key: keyof ArrayElement<GetDepositHistory["result"]>;
    header: ReactNode;
    cell: (value: ArrayElement<GetDepositHistory["result"]>) => ReactNode;
  }[] = [
    {
      key: "deposit_id",
      cell: (value) => (
        <p className="font-english text-mainText">{value.deposit_id}</p>
      ),
      header: t("deposit_id"),
    },
    {
      key: "asset",
      cell: (value) => (
        <p className="text-mainText text-sm">{value.asset.toUpperCase()}</p>
      ),
      header: t("asset"),
      sortable: true,
      sortType: "string",
    },
    {
      key: "payment_currency",
      cell: (value) => (
        <p className="text-mainText text-sm">
          {value.payment_currency.toUpperCase()}
        </p>
      ),
      header: t("payment_currency"),
      sortable: true,
      sortType: "string",
    },
    {
      key: "amount",
      cell: (value) => (
        <div className="flex items-center justify-center gap-1" dir="ltr">
          <p className="font-english text-mainText">
            {addCommaSeparator(value.amount || "")}{" "}
          </p>
          <p className="text-mainText translate-y-px text-xs">
            {value.asset.toUpperCase()}{" "}
          </p>
        </div>
      ),
      header: t("amount"),
      sortable: true,
    },
    {
      key: "status",
      cell: (value) => <p className="text-mainText">{t(value.status || "")}</p>,
      header: t("status"),
    },
    {
      key: "created_at",
      cell: (value) => (
        <p className="text-mainText">
          {convertMillisecondToLocal(value.created_at || "").date}
        </p>
      ),
      header: t("date"),
      sortable: true,
      sortType: "date",
    },
    {
      key: "network",
      cell: (value) => (
        <p className="text-mainText">{value.network?.toUpperCase()}</p>
      ),
      header: t("network"),
      sortable: true,
      sortType: "string",
    },
    {
      key: "address",
      cell: (value) => <p className="text-mainText">{value.address}</p>,
      header: t("address"),
    },
    {
      key: "equivalent",
      cell: (value) => (
        <div className="flex items-center justify-center gap-1" dir="ltr">
          <p className="font-english text-mainText">
            {addCommaSeparator(value.equivalent || "")}{" "}
          </p>
          <p className="text-mainText translate-y-px text-xs">
            {value.payment_currency.toUpperCase()}{" "}
          </p>
        </div>
      ),
      header: t("equivalent"),
      sortable: true,
    },
    {
      key: "rate",
      cell: (value) => (
        <p className="font-english text-mainText">
          {addCommaSeparator(value.rate || "") || "--"}
        </p>
      ),
      header: t("rate"),
      sortable: true,
    },
    {
      key: "actual_amount",
      cell: (value) => (
        <p className="font-english text-mainText">
          {addCommaSeparator(value.actual_amount || "") || "0"}
        </p>
      ),
      header: t("actual_amount"),
      sortable: true,
    },
    {
      key: "actual_equivalent",
      cell: (value) => (
        <p className="font-english text-mainText">
          {addCommaSeparator(value.actual_equivalent || "") || "0"}
        </p>
      ),
      header: t("actual_equivalent"),
      sortable: true,
    },
    {
      key: "confirmations",
      cell: (value) => <p className="text-mainText">{value.confirmations}</p>,
      header: t("confirmations"),
    },
    {
      key: "tx",
      cell: (value) => <p className="text-mainText">{value.tx}</p>,
      header: t("tx"),
    },
  ];

  const columnVisibility: {
    [K in keyof ArrayElement<GetDepositHistory["result"]>]?: boolean;
  } =
    width > 1280
      ? { address: false, tx: false, confirmations: false, deposit_id: false }
      : width > 1024
        ? {
            actual_amount: false,
            actual_equivalent: false,
            address: false,
            confirmations: false,
            deposit_id: false,
            equivalent: false,
            payment_currency: false,
            rate: false,
            tx: false,
          }
        : width > 768
          ? {
              actual_amount: false,
              actual_equivalent: false,
              address: false,
              confirmations: false,
              deposit_id: false,
              network: false,
              equivalent: false,
              payment_currency: false,
              rate: false,
              tx: false,
            }
          : {
              actual_amount: false,
              actual_equivalent: false,
              address: false,
              amount: false,
              confirmations: false,
              deposit_id: false,
              equivalent: false,
              network: false,
              payment_currency: false,
              rate: false,
              status: false,
              tx: false,
            };

  return { cols, columnVisibility };
}

export default useDepositsTableData;
