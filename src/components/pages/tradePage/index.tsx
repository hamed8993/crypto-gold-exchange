"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import TradeFirstScreen from "./components/tradeFirstScreen";
import TradeFormScreen from "./components/tradeFormScreen";
import { TradeContextProvider } from "./provider";
import { SocketProvider } from "./socketProvider";

interface TradePageProps {
  className?: string;
}

export type marketsSortType = "name" | "nameReverse";

function TradePageComponent({ className }: TradePageProps) {
  const pathname = usePathname();
  const pathnameSplitted = pathname?.split("/");
  const marketArray =
    pathnameSplitted?.[pathnameSplitted.length - 1]?.split("-");

  const baseAsset = marketArray?.[0]?.toLowerCase() || "xau";
  const quoteAsset = marketArray?.[1]?.toLowerCase() || "usd";
  const symbol = baseAsset + quoteAsset;

  const [isSecondPage, setIsSecondPage] = useState<boolean>(false);
  const [longOrShort, setLongOrShort] = useState<"long" | "short">("long");

  return (
    <>
      {isSecondPage ? (
        <TradeFormScreen
          base={baseAsset}
          className={className}
          longOrShort={longOrShort}
          quote={quoteAsset}
          setIsSecondPage={(value: boolean) => setIsSecondPage(value)}
          setLongOrShort={(value: "long" | "short") => setLongOrShort(value)}
        />
      ) : (
        <TradeFirstScreen
          className={className}
          quoteAsset={quoteAsset}
          setIsSecondPage={(value: boolean) => {
            setIsSecondPage(value);
          }}
          setSide={(value: "long" | "short") => {
            setLongOrShort(value);
          }}
          symbol={symbol}
        />
      )}
    </>
  );
}

const TradePage = ({ className }: TradePageProps) => {
  return (
    <SocketProvider>
      <TradeContextProvider>
        <TradePageComponent className={className} />
      </TradeContextProvider>
    </SocketProvider>
  );
};

export default TradePage;
