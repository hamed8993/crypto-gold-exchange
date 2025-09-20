import { localeType } from "@/app/[locale]/layout";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useGetExchange_dataMarkets_details } from "@/core/services/hooks";
import { useEffect, useState } from "react";
import { useHandleSort } from "../../../../../../../core/hooks/useHandleSort/useHandleSort";
import MarketList from "../marketList";
import { HeaderNameEnum } from "../marketListHeader";
import SearchInput from "../searchInput";

export type MarketListItemType = {
  id?: number;
  market?: string;
  last_price?: string;
  change_price?: string;
  symbol: string;
  quote: string;
};

function Market() {
  const { data, isLoading } = useGetExchange_dataMarkets_details();
  const { getQuoteName, getMarketName } = useMarketsNamesData();
  const { locale } = useUrl();

  const [marketList, setMarketList] = useState<MarketListItemType[]>([]);

  useEffect(() => {
    if (data && data?.result) {
      setMarketList(data?.result);
    }
  }, [data]);

  const { sortConfig, handleSort } = useHandleSort<HeaderNameEnum>();

  const handleSearch = (value: string) => {
    if (value === "") {
      setMarketList(data?.result as MarketListItemType[]);
    } else {
      const searchedResult =
        data?.result?.filter(
          (item) =>
            getQuoteName(item?.quote)
              ?.toLowerCase()
              ?.includes(value?.toLowerCase()) ||
            getMarketName(item?.symbol || "")
              [locale as localeType]?.toLowerCase()
              ?.includes(value?.toLowerCase()),
        ) || [];
      setMarketList(searchedResult);
    }
  };

  useEffect(() => {
    const sortedData = [...marketList];

    if (sortConfig) {
      sortedData.sort((a, b) => {
        if (sortConfig.key === HeaderNameEnum.market) {
          const nameA =
            getMarketName(a?.symbol || "")[locale as localeType] || "";
          const nameB =
            getMarketName(b?.symbol || "")[locale as localeType] || "";
          return sortConfig.direction === "asc"
            ? nameA.localeCompare(nameB, locale, { sensitivity: "base" })
            : nameB.localeCompare(nameA, locale, { sensitivity: "base" });
        } else if (sortConfig.key === HeaderNameEnum.price) {
          const numA = parseFloat(a["last_price"] || "0");
          const numB = parseFloat(b["last_price"] || "0");
          return sortConfig.direction === "asc" ? numA - numB : numB - numA;
        } else if (sortConfig.key === HeaderNameEnum.fluctuations) {
          const numA = parseFloat(a["change_price"] || "0");
          const numB = parseFloat(b["change_price"] || "0");
          return sortConfig.direction === "asc" ? numA - numB : numB - numA;
        }
        return 0;
      });
    }
    setMarketList(sortedData);
  }, [sortConfig]);

  return (
    <div className="flex flex-col gap-3">
      <SearchInput searchTypeHandler={(value) => handleSearch(value)} />
      <MarketList
        isLoading={isLoading}
        dataList={marketList}
        sortConfig={sortConfig}
        handleSort={handleSort}
      />
    </div>
  );
}

export default Market;
