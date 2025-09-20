"use client";
import { SortType } from "@/components/molecules/tableDefault";
import { ArrayElement } from "@/core/constants/constants";
import { useWindowSize } from "@/core/providers/windowSize";
import { GetHistoryOrders } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import OrderOPerations from "../orderOPerations";

function useOrdersTableData() {
  const t = useTranslations();
  const { width } = useWindowSize();

  const [selectedOrderRow, setSelectedOrderRow] =
    useState<ArrayElement<GetHistoryOrders["result"]>>();

  const [isCloseOrderModalOpen, setIsCloseOrderModalOpen] =
    useState<boolean>(false);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] =
    useState<boolean>(false);

  const cols: {
    sortable?: boolean;
    sortType?: SortType;
    key: keyof ArrayElement<GetHistoryOrders["result"]>;
    header: ReactNode;
    cell: (value: ArrayElement<GetHistoryOrders["result"]>) => ReactNode;
  }[] = [
    {
      key: "symbol",
      cell: (value) => {
        return (
          <p className="text-mainText dark:text-mainTextDark">
            {value.base.toUpperCase()}/{value.quote.toUpperCase()}
          </p>
        );
      },
      sortable: true,
      sortType: "string",
      header: t("symbol"),
    },

    {
      key: "side",
      cell: (value) => {
        return (
          <p className="text-mainText dark:text-mainTextDark">
            {t(value.side)}
          </p>
        );
      },
      header: t("side"),
    },
    {
      key: "entryPrice",
      cell: (value) => {
        return (
          <p className="text-mainText dark:text-mainTextDark">
            {addCommaSeparator(value.entryPrice)}
          </p>
        );
      },
      sortable: true,
      header: t("entryPrice"),
    },
    {
      key: "leverage",
      cell: (value) => {
        return (
          <p className="text-mainText dark:text-mainTextDark">
            {value.leverage}
          </p>
        );
      },
      header: t("leverage"),
      sortable: true,
    },

    {
      key: "slPrice",
      cell: (value) => {
        return (
          <p className="text-mainText dark:text-mainTextDark">
            {value.slPrice === "not_set" || !value.slPrice
              ? "--"
              : value.slPrice}
          </p>
        );
      },
      header: t("slPrice"),
      sortable: true,
    },

    {
      key: "tpPrice",
      cell: (value) => {
        return (
          <p className="text-mainText dark:text-mainTextDark">
            {value.tpPrice === "not_set" || !value.tpPrice
              ? "--"
              : value.tpPrice}
          </p>
        );
      },
      header: t("tpPrice"),
      sortable: true,
    },

    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      key: "orderOperations",
      cell: (value) => {
        return value?.status === "pending" ? (
          <OrderOPerations
            setIsCloseOrderModalOpen={setIsCloseOrderModalOpen}
            setIsEditOrderModalOpen={setIsEditOrderModalOpen}
            setSelectedOrder={setSelectedOrderRow}
            orderItem={value}
          />
        ) : (
          "--"
        );
      },
      header: t("actions"),
    },
  ];

  const columnVisibility: {
    [
      key: keyof ArrayElement<ArrayElement<GetHistoryOrders["result"]>>
    ]: boolean;
  } =
    width > 1024
      ? {}
      : width > 768
        ? { tpPrice: false, slPrice: false }
        : {
            tpPrice: false,
            slPrice: false,
            leverage: false,
            entryPrice: false,
          };

  return {
    cols,
    columnVisibility,
    selectedOrderRow,
    setSelectedOrderRow,
    isCloseOrderModalOpen,
    isEditOrderModalOpen,
    setIsEditOrderModalOpen,
    setIsCloseOrderModalOpen,
  };
}

export default useOrdersTableData;
