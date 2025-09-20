import MarketName from "./components/MarketName";
import PriceDetails from "./components/priceDetails";

interface TopInfoHeaderProps {
  symbol: string;
}

function TopInfoHeader({ symbol }: TopInfoHeaderProps) {
  return (
    <div className="bg-secondBackground flex min-h-24 w-full items-center justify-between rounded-xl px-2">
      <MarketName symbol={symbol} />
      <PriceDetails symbol={symbol} />
    </div>
  );
}

export default TopInfoHeader;
