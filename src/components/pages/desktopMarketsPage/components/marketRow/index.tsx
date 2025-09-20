import LineChart from "@/components/atoms/customLineChart";
import { ArrayElement } from "@/core/constants/constants";
import { RoutesName } from "@/core/constants/routes";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import useUrl from "@/core/hooks/useUrl";
import { GetExchangeDataMarketsDetails } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import Link from "next/link";
import MarketItemBox from "../marketItemBox";

interface MarketRowProps {
  item: ArrayElement<GetExchangeDataMarketsDetails["result"]>;
}

function MarketRow({ item }: MarketRowProps) {
  const { locale } = useUrl();
  const { getMarketName, getQuoteName } = useMarketsNamesData();
  const { getFontColor, getChevron } = usePriceDetail();

  return (
    <Link
      className="flex w-full items-center justify-between px-2 py-6 hover:bg-surface dark:hover:bg-surfaceDark"
      href={`/${locale}${RoutesName.trade}/${item.base}-${item.quote}`}
    >
      <MarketItemBox value={getMarketName(item?.symbol).fa} />
      <MarketItemBox isEnglish value={addCommaSeparator(item?.last_price)} />

      <div className="flex w-full items-center justify-center">
        <p
          className={clsx(
            "font-english text-sm",
            getFontColor(Number(item?.change_price)),
          )}
          dir="ltr"
        >
          {addCommaSeparator(item?.change_price)}
        </p>

        {getChevron(item?.change_price)}
      </div>

      <MarketItemBox value={getQuoteName(item?.quote)} />

      <div className="flex w-full items-center justify-center">
        <p
          className={clsx(
            "font-english text-sm",
            getFontColor(Number(item?.change_percentage)),
          )}
          dir="ltr"
        >
          {item?.change_percentage}
        </p>
        {getChevron(item?.change_price)}
      </div>

      <MarketItemBox
        isEnglish
        value={item?.volume}
        wrapperClassName="hidden lg:flex"
      />

      <div className="flex w-full items-center justify-center">
        {item?.chart?.xy && (
          <LineChart lineColor="red" data={item?.chart?.xy} />
        )}
      </div>
    </Link>
  );
}

export default MarketRow;
