import { useMarketsNamesData } from "@/core/hooks/useGetName";

interface MarketNameProps {
  symbol: string;
}

function MarketName({ symbol }: MarketNameProps) {
  const { getMarketName } = useMarketsNamesData();

  return (
    <div className="flex h-full flex-col items-start justify-around gap-2 p-2">
      <p className="font-english text-mainText text-sm">
        {symbol?.toUpperCase() || ""}
      </p>
      <p className="text-accentText text-sm">
        {getMarketName(symbol).fa || ""}
      </p>
    </div>
  );
}

export default MarketName;
