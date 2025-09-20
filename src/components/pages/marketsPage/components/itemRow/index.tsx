import { ArrayElement } from "@/core/constants/constants";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { GetExchangeDataMarketsDetails } from "@/core/services/types";
import Link from "next/link";
import ItemNames from "../itemNames";
import PricePart from "../pricePart";

interface ItemRowProps {
  item: ArrayElement<GetExchangeDataMarketsDetails["result"]>;
}

function ItemRow({ item }: ItemRowProps) {
  const { locale } = useUrl();

  return (
    <Link
      key={item.symbol}
      className={"flex min-h-14 w-full items-center justify-start"}
      href={`/${locale}${RoutesName.trade}/${item.base}-${item.quote}`}
      prefetch
    >
      <div className="flex min-h-14 w-full! flex-col items-center justify-between">
        <div className="flex h-14 w-full items-center justify-between">
          <ItemNames symbol={item?.symbol} />
          <PricePart
            side={true}
            change_percentage={item.change_percentage}
            symbol={item?.symbol}
          />
          <PricePart
            side={false}
            change_percentage={item.change_percentage}
            symbol={item?.symbol}
          />
        </div>
        <div className="bg-accentText50 flex h-px w-[94%]"></div>
      </div>
    </Link>
  );
}

export default ItemRow;
