import { SortType } from "@/components/molecules/tableDefault";
import { ArrayElement } from "@/core/constants/constants";
import { useWindowSize } from "@/core/providers/windowSize";
import { GetHistoryPositions } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

function useTradesTableData() {
  const t = useTranslations();
  const { width } = useWindowSize();

  const cols: {
    sortable?: boolean;
    sortType?: SortType;
    key: keyof ArrayElement<GetHistoryPositions["result"]>;
    header: ReactNode;
    cell: (value: ArrayElement<GetHistoryPositions["result"]>) => ReactNode;
  }[] = [
    {
      key: "symbol",
      cell: (value) => {
        return (
          <p className="text-mainText">
            {value.base.toUpperCase()}/{value.quote.toUpperCase()}
          </p>
        );
      },
      header: t("symbol"),
      sortable: true,
      sortType: "string",
    },

    {
      key: "side",
      cell: (value) => {
        return <p className="text-mainText">{t(value.side)}</p>;
      },
      header: t("side"),
    },
    {
      key: "entryPrice",
      cell: (value) => {
        return (
          <p className="text-mainText">{addCommaSeparator(value.entryPrice)}</p>
        );
      },
      header: t("entryPrice"),
      sortable: true,
    },
    {
      key: "leverage",
      cell: (value) => {
        return <p className="text-mainText">{value.leverage}</p>;
      },
      header: t("leverage"),
      sortable: true,
    },

    {
      key: "slPrice",
      cell: (value) => {
        return (
          <p className="text-mainText">
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
          <p className="text-mainText">
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
      key: "volume",
      cell: (value) => {
        return (
          <p className="text-mainText text-[12px]">
            {value?.subPositions?.length || "--"}
          </p>
        );
      },
      header: t("volume"),
    },
  ];

  const columnVisibility: {
    [
      key: keyof ArrayElement<ArrayElement<GetHistoryPositions["result"]>>
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

  return { cols, columnVisibility };
}

export default useTradesTableData;
