import { RoutesName } from "@/core/constants/routes";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import useUrl from "@/core/hooks/useUrl";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import Link from "next/link";

interface MarketItemProps {
  change_percentage: string;
  symbol: string;
  base: string;
  quote: string;
  last_price: string;
}

function MarketItem({
  change_percentage,
  last_price,
  symbol,
  base,
  quote,
}: MarketItemProps) {
  const { locale } = useUrl();
  const { getMarketName } = useMarketsNamesData();
  const { getChevron, getFontColor } = usePriceDetail();

  return (
    <Link
      className="hover:bg-secondBackground flex w-full items-center justify-between rounded-lg p-3"
      href={`/${locale}${RoutesName.trade}/${base}-${quote}`}
    >
      <div className="flex w-[40%] items-center justify-start">
        <p className="text-mainText text-xs">
          {getMarketName(symbol || "").fa}
        </p>
      </div>
      <div className="flex w-[30%] items-center justify-start">
        <p className="font-english text-mainText text-xs">
          {addCommaSeparator(last_price) || ""}
        </p>
      </div>
      <div className="flex w-[30%] items-center justify-start gap-1">
        <p
          dir="ltr"
          className={clsx(
            "font-english text-xs",
            getFontColor(change_percentage),
          )}
        >
          {`${change_percentage} %`}
        </p>
        {getChevron(change_percentage)}
      </div>
    </Link>
  );
}

export default MarketItem;
