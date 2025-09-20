import { motion } from "framer-motion";

type MarketData = {
  base: string;
  orderbook: {
    longs: [];
    shorts: [];
  };
  quote: string;
  quote_precision: number;
};

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

interface AnimatedBoxProps {
  orderbookList: Record<string, MarketData>;
  symbol: string;
}

function AnimatedBox({ orderbookList, symbol }: AnimatedBoxProps) {
  const calculateStrength = (orderbook: OrderBook) => {
    const sum = (orders: Order[]) =>
      orders?.reduce((acc, order) => acc + Number(order.totalVolumeQuote), 0);

    const longStrength = sum(orderbook?.longs);
    const shortStrength = sum(orderbook?.shorts);
    const total = longStrength + shortStrength;

    return {
      longPercent: total ? (longStrength / total) * 100 : 0,
      shortPercent: total ? (shortStrength / total) * 100 : 0,
    };
  };

  return orderbookList ? (
    <div className="w-full">
      <div className="relative flex h-2 w-full overflow-hidden rounded-lg">
        <motion.div
          className="flex h-full items-center justify-start bg-positive px-2 opacity-70"
          animate={{
            width: `${calculateStrength(orderbookList?.[symbol]?.orderbook).longPercent}%`,
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <motion.div
          className="flex h-full items-center justify-end bg-negative px-2 opacity-70"
          animate={{
            width: `${calculateStrength(orderbookList?.[symbol]?.orderbook).shortPercent}%`,
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    </div>
  ) : null;
}

export default AnimatedBox;
