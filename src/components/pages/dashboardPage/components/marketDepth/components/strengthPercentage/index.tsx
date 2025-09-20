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

type MarketData = {
  base: string;
  orderbook: {
    longs: [];
    shorts: [];
  };
  quote: string;
  quote_precision: number;
};

interface StrengthPercentageProps {
  symbol: string;
  side: boolean;
  orderbookList: Record<string, MarketData>;
}

function StrengthPercentage({
  symbol,
  orderbookList,
  side,
}: StrengthPercentageProps) {
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

  return (
    <div className="mb-3 flex h-7 w-7 min-w-7 max-w-7 flex-col items-center justify-end">
      <p
        className="font-english text-[10px] text-mainText dark:text-mainTextDark"
        dir="ltr"
      >
        {side
          ? `${calculateStrength(orderbookList?.[symbol]?.orderbook).longPercent?.toFixed(0)} %`
          : `${calculateStrength(orderbookList?.[symbol]?.orderbook).shortPercent?.toFixed(0)} %`}
      </p>
    </div>
  );
}

export default StrengthPercentage;
