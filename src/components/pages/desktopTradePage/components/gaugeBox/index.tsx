import Gauge from "@/components/atoms/CustomGauge";
import { socket } from "@/core/providers/socket/socketProvider";
import { useGetExchange_dataOrderbook_list } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import BestBuySell from "../marketInfoBox/components/bestBuySell";
import TrendBadge from "../trendBadge";
import VolPercentage from "../volPercentage";

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

interface GaugeBoxProps {
  symbol: string;
}

function GaugeBox({ symbol }: GaugeBoxProps) {
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

  return (
    <div className="bg-surface hidden h-full w-[25%] min-w-[25%] flex-col items-center justify-between rounded-xl p-2 pt-8 xl:flex">
      <Gauge needleColor={"#1f73b7"} green={longVolume || 0} />
      <div className="flex w-64! items-center justify-between">
        <VolPercentage title={t("long")} value={longVolume} />
        <TrendBadge symbol={symbol} />
        <VolPercentage title={t("short")} value={shortVolume} />
      </div>
      <BestBuySell symbol={symbol} />
    </div>
  );
}

export default GaugeBox;
