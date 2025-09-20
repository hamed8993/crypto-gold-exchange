"use client";
import LineChartShadowArea from "@/components/atoms/customLineChartShadowArea";
import TableDefault, { TableCol } from "@/components/molecules/tableDefault";
import { ArrayElement } from "@/core/constants/constants";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

type TodayMarketTableItem = {
  id: number;
  symbol: string;
  price: string;
  priceChanges: string;
  chart: unknown;
  trade?: string;
  name: string;
};

function TodayMarketTable() {
  const fakeData = [
    {
      id: 1,
      symbol: "BTC",
      name: "Bitcoin",
      price: "36,201.34",
      priceChanges: "1.71",
      chart: "",
    },
    {
      id: 2,
      symbol: "BTC",
      name: "Bitcoin",
      price: "36,201.34",
      priceChanges: "0.78",
      chart: "",
    },
    {
      id: 3,
      symbol: "BTC",
      name: "Bitcoin",
      price: "36,201.34",
      priceChanges: "-1.71",
      chart: "",
    },
    {
      id: 4,
      symbol: "BTC",
      name: "Bitcoin",
      price: "36,201.34",
      priceChanges: "-1.22",
      chart: "",
    },
  ];

  const t = useTranslations();
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);

  const cols: TableCol<TodayMarketTableItem>[] = [
    {
      key: "id",
      cell: (value) => {
        return (
          <p className="font-english text-mainText py-4 text-[16px] font-normal">
            {value?.id}
          </p>
        );
      },
      header: "#",
    },

    {
      key: "symbol",
      headClassName: "justify-start! py-2",
      cell: (value) => {
        return (
          <div className="flex w-fit items-center gap-4 py-4 lg:gap-8">
            <div className="flex size-10 items-center justify-center overflow-hidden rounded-full">
              <Image
                width={40}
                height={40}
                className="size-full"
                src="/icon-158.png"
                alt={t("symbolIconAlt")}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-mainText text-[16px] font-medium">
                {value?.name}
              </span>
              <span className="text-textSecondary text-[16px] font-normal">
                {value?.symbol}
              </span>
            </div>
          </div>
        );
      },
      header: t("singleSymbol"),
    },

    {
      headClassName: "justify-start! py-2",
      key: "price",
      cell: (value) => {
        return (
          <p className="font-english text-mainText flex justify-start py-4 text-[16px] font-medium">
            ${addCommaSeparator(value?.price)}
          </p>
        );
      },
      header: t("price"),
    },

    {
      headClassName: "justify-start! py-2",
      key: "priceChanges",
      cell: (value) => {
        return (
          <p
            dir="ltr"
            className={clsx(
              "font-english py-2 text-[16px] font-normal",
              "flex ltr:justify-start rtl:justify-end",
              Number(value?.priceChanges) > 0
                ? "text-newColor_bgSuccess50"
                : "text-newColor_bgOrange20",
            )}
          >
            {Number(value?.priceChanges) > 0 ? "+" : ""}
            {Number(value?.priceChanges)}%
          </p>
        );
      },
      header: t("changesIn24Hours"),
    },

    {
      headClassName: "justify-start! py-2",
      key: "chart",
      cell: (value) => {
        return (
          <div className="py-4">
            <LineChartShadowArea
              width={128}
              height={40}
              lineColor={
                Number(value?.priceChanges) > 0 ? "#2e7d32" : "#cf202f"
              }
              showArea={true}
              areaColor={
                Number(value?.priceChanges) > 0 ? "#2e7d32" : "#cf202f"
              }
              data={[
                { x: 0, y: 100 },
                { x: 1, y: 102 },
                { x: 2, y: 130 },
                { x: 3, y: 125 },
                { x: 4, y: 130 },
                { x: 5, y: 128 },
                { x: 6, y: 135 },
                { x: 7, y: 140 },
                { x: 8, y: 145 },
                { x: 9, y: 145 },
              ]}
            />
          </div>
        );
      },
      header: t("chart"),
    },

    {
      headClassName: "justify-start! py-2",
      key: "trade",
      cell: () => {
        return (
          <div
            onMouseEnter={() => {
              setIsButtonHovered(true);
            }}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <ButtonDefault
              className="border-newColor_borderNeutral10 bg-constantLight h-10! rounded-xl border px-4 py-3"
              variant="outline"
            >
              <p className="text-textPrimary text-sm">{t("trade")}</p>
            </ButtonDefault>
          </div>
        );
      },
      header: t("trade"),
    },
  ];

  return (
    <TableDefault<ArrayElement<TodayMarketTableItem[]>>
      data={fakeData}
      cols={cols}
      hasDetails={false}
      isLoading={false}
      tableBodyRowClassName={`${isButtonHovered ? "hover:!bg-constantLight " : "hover:!bg-newColor_bgNeutral5 "} hover:rounded-2xl! `}
      tableHeadClassName="bg-mainTextDark  border-b border-newColor_borderNeutral10  py-5"
      tableContainerClassName="border-none"
    />
  );
}

export default TodayMarketTable;
