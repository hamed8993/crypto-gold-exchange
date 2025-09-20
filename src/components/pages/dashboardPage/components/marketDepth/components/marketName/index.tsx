import { localeType } from "@/app/[locale]/layout";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";

interface MarketNameProps {
  symbol: string;
}

function MarketName({ symbol }: MarketNameProps) {
  const { locale } = useUrl();
  const { getMarketName } = useMarketsNamesData();
  return (
    <div className="flex min-w-24 max-w-24 flex-col items-start justify-start gap-1">
      <p className="text-xs text-mainText dark:text-mainTextDark">
        {getMarketName(symbol)[locale as localeType]}
      </p>
      <p className="text-[10px] text-accentText dark:text-accentTextDark">
        {symbol?.toUpperCase()}
      </p>
    </div>
  );
}

export default MarketName;
