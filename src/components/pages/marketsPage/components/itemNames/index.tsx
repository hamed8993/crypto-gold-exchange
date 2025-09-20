import { localeType } from "@/app/[locale]/layout";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";

interface ItemNamesProps {
  symbol: string;
}

function ItemNames({ symbol }: ItemNamesProps) {
  const { locale } = useUrl();
  const { getMarketName } = useMarketsNamesData();

  return (
    <div className="flex h-6 w-[40%] items-center justify-start px-4">
      <div className="flex flex-col items-start justify-start">
        <p className="text-mainText text-[15px]">
          {getMarketName(symbol)[locale as localeType]}
        </p>
        <p className="text-accentText text-[10px]">{symbol?.toUpperCase()}</p>
      </div>
    </div>
  );
}

export default ItemNames;
