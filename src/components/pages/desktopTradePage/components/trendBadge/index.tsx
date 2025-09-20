import { socket } from "@/core/providers/socket/socketProvider";
import { useGetExchange_dataOrderbook_list } from "@/core/services/hooks";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Order = {
  price: string;
  totalVolumeBase: string;
  totalVolumeQuote: string;
  volumeBase: string;
  volumeQuote: string;
};

type OrderBook = {
  longs: Order[];
  shorts: Order[];
};

type MarketKey = string;

type MarketData = {
  base: string;
  orderbook: {
    longs: [];
    shorts: [];
  };
  quote: string;
  quote_precision: number;
};

interface TrendBadgeProps {
  symbol: string;
}

function TrendBadge({ symbol }: TrendBadgeProps) {
  const textDecoder = new TextDecoder("utf-8");
  const t = useTranslations();
  const [orderbookList, setOrderbookList] =
    useState<Record<MarketKey, MarketData>>();

  const { data } = useGetExchange_dataOrderbook_list();

  useEffect(() => {
    if (!orderbookList && data?.result) {
      setOrderbookList(data?.result as Record<MarketKey, MarketData>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.result]);

  useEffect(() => {
    socket.on("orderbookList", (orderbookList: ArrayBuffer) => {
      const decodedNewOrders = JSON.parse(
        textDecoder.decode(new Uint8Array(orderbookList)),
      );
      setOrderbookList(decodedNewOrders);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateStrength = (orderbook: OrderBook | undefined) => {
    if (orderbook) {
      const sum = (orders: Order[]) =>
        orders?.reduce((acc, order) => acc + Number(order.totalVolumeQuote), 0);

      const longStrength = sum(orderbook?.longs);
      const shortStrength = sum(orderbook?.shorts);
      const total = longStrength + shortStrength;

      return {
        longPercent: total ? (longStrength / total) * 100 : 0,
        shortPercent: total ? (shortStrength / total) * 100 : 0,
      };
    }
  };

  const longVolume = Number(
    calculateStrength(orderbookList?.[symbol]?.orderbook)?.longPercent?.toFixed(
      0,
    ),
  );

  const shortVolume = Number(
    calculateStrength(
      orderbookList?.[symbol]?.orderbook,
    )?.shortPercent?.toFixed(0),
  );

  const range = Number(new Decimal(longVolume).minus(shortVolume).abs());

  const trend =
    longVolume > shortVolume && range > 10
      ? t("upTrend")
      : longVolume < shortVolume && range > 10
        ? t("downTrend")
        : t("range");

  const trendTextColor =
    trend === t("range")
      ? "bg-accentText "
      : trend === t("upTrend")
        ? "bg-positive"
        : "bg-negative";

  return (
    <div className="flex flex-col items-center justify-start gap-2">
      <p className="text-accentText text-xs">{t("trend")}</p>
      <div
        className={clsx(
          "flex items-center justify-center rounded-full px-4 py-1",
          trendTextColor,
        )}
      >
        <p className={"text-sm text-white"}>{trend}</p>
      </div>
    </div>
  );
}

export default TrendBadge;
