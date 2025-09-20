import { localeType } from "@/app/[locale]/layout";
import FavoriteStar from "@/components/atoms/svg/favoriteStart";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useState } from "react";
import { MarketListItemType } from "../market";

interface MarketCellItemProps {
  value: MarketListItemType;
}

function MarketCellItem({ value }: MarketCellItemProps) {
  const { locale } = useUrl();
  const { getQuoteName, getMarketName } = useMarketsNamesData();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
    <div className="flex flex-nowrap items-center gap-1">
      <button onClick={() => setIsFavorite(!isFavorite)} type="button">
        <FavoriteStar isActive={isFavorite} />
      </button>
      <p className="flex flex-nowrap items-center gap-1 text-xs font-normal">
        <span className="text-textPrimary dark:text-constantLight text-nowrap">
          {" "}
          {getMarketName(value?.symbol)[locale as localeType]}/
        </span>
        <span className="text-textPlaceholder text-nowrap">
          {getQuoteName(value?.quote)}
        </span>
      </p>
    </div>
  );
}

export default MarketCellItem;
