"use client";

import { useTradeContext } from "@/components/pages/desktopTradePage/provider";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";

interface BestBuySellProps {
  symbol: string;
}

function BestBuySell({ symbol }: BestBuySellProps) {
  const { getHighlightedPrice } = usePriceDetail();
  const { firstBidAsk } = useFirstBidAsk();
  const { setValue } = useTradeContext();
  const longPrice = useMemo(
    () => getHighlightedPrice(symbol, true),
    [symbol, firstBidAsk],
  );
  const shortPrice = useMemo(
    () => getHighlightedPrice(symbol, false),
    [symbol, firstBidAsk],
  );

  const longControls = useAnimation();
  const shortControls = useAnimation();

  const handleClick = async (color: string, isLong: boolean) => {
    const controls = isLong ? longControls : shortControls;

    await controls.start({
      backgroundColor: color,
      opacity: 1,
      transition: { duration: 0.2 },
    });

    await new Promise((resolve) => setTimeout(resolve, 200));
    await controls.start({
      opacity: 0.5,
      transition: { duration: 0.2 },
    });

    await controls.set({
      backgroundColor: "transparent",
    });

    await controls.start({
      backgroundColor: "transparent",
      opacity: 1,
      transition: { duration: 0.2 },
    });
  };

  useEffect(() => {
    handleClick("#2e7d32", true);
    handleClick("#b71c1c", false);
  }, [firstBidAsk]);

  return (
    <div className="flex min-h-12 w-full items-center justify-between gap-1">
      <motion.div
        animate={longControls}
        onClick={() => {
          setValue("entryPrice", firstBidAsk?.[symbol]?.flong);
        }}
        className="border-b-positive bg-secondBackground flex min-h-12 w-full cursor-pointer items-center justify-center rounded-t-lg border-b-2"
      >
        <p className={"font-english text-mainText text-[20px]"}>
          <span className="font-english text-mainText text-[20px]">
            {longPrice?.mainPrice}
          </span>
          <span className="font-english text-mainText text-[20px] font-bold">
            {longPrice?.highlightPrice}
          </span>
        </p>
      </motion.div>
      <motion.div
        animate={shortControls}
        onClick={() => {
          setValue("entryPrice", firstBidAsk?.[symbol]?.fshort);
        }}
        className="border-b-negative bg-secondBackground flex min-h-12 w-full cursor-pointer items-center justify-center rounded-t-lg border-b-2"
      >
        <p className={"font-english text-mainText text-[20px]"}>
          <span className="font-english text-mainText text-[20px]">
            {shortPrice?.mainPrice}
          </span>
          <span className="font-english text-mainText text-[20px] font-bold">
            {shortPrice?.highlightPrice}
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default BestBuySell;
