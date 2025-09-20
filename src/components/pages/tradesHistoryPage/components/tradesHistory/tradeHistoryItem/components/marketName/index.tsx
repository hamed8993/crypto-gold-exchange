import { localeType } from "@/app/[locale]/layout";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";

interface MarketNameProps {
  base: string;
  quote: string;
  symbol: string;
}

function MarketName({ base, quote, symbol }: MarketNameProps) {
  const { locale } = useUrl();
  const { getMarketName } = useMarketsNamesData();

  return (
    <p className="text-mainText text-xs">
      {locale === "fa" ? (
        getMarketName(symbol || "")[locale as localeType]
      ) : (
        <p className="text-accentText text-xs leading-none" dir="ltr">
          {`${base.toUpperCase()}${quote.toUpperCase()}`}
        </p>
      )}
    </p>
  );
}

export default MarketName;
