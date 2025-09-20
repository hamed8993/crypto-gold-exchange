import { socket } from "@/core/providers/socket/socketProvider";
import { useGetExchange_dataOrderbook_list } from "@/core/services/hooks";
import { useEffect, useState } from "react";
import DepthItem from "./components/depthItem";
import Header from "./components/header";

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

function MarketDepth() {
  const textDecoder = new TextDecoder("utf-8");

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

  const convertToArray = (mainObject: Record<MarketKey, MarketData>) => {
    return Object.entries(mainObject).map(([symbol, data]) => ({
      symbol,
      ...data,
    }));
  };

  return orderbookList ? (
    <div className="flex w-full items-center justify-start py-4 pb-2">
      <div className="flex w-full flex-col items-center justify-start rounded-lg">
        <Header />

        {orderbookList
          ? convertToArray(orderbookList)?.map((item) => {
              if (
                item?.orderbook?.longs?.length !== 0 &&
                item?.orderbook?.shorts?.length !== 0
              ) {
                return (
                  <DepthItem
                    key={item?.symbol}
                    base={item?.base}
                    orderbookList={orderbookList}
                    quote={item?.quote}
                    symbol={item?.symbol}
                  />
                );
              } else {
                return null;
              }
            })
          : null}
      </div>
    </div>
  ) : null;
}

export default MarketDepth;
