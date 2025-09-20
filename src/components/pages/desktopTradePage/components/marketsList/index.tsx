"use client";

import SearchBox from "@/components/pages/portfolioPage/components/searchBox";
import { useGetExchange_dataMarkets_details } from "@/core/services/hooks";
import { useMemo, useState } from "react";
import MarketItem from "./components/marketItem";
import TableHeader from "./components/tableHeader";

function MarketsList() {
  const { data } = useGetExchange_dataMarkets_details();

  const [searchText, setSearchText] = useState("");

  const dataToDisplay = useMemo(
    () =>
      data?.result
        ?.filter((item) => {
          return item.symbol.includes(searchText);
        })
        .sort((a, b) => {
          return b.symbol.localeCompare(a.symbol);
        }) || [],
    [data, searchText],
  );

  const marketsTable = useMemo(() => {
    return dataToDisplay?.map((item, index) => (
      <MarketItem
        base={item?.base}
        quote={item?.quote}
        change_percentage={item?.change_percentage}
        key={index}
        last_price={item?.last_price}
        symbol={item?.symbol}
      />
    ));
  }, [dataToDisplay]);

  return (
    <div className="bg-surface hidden h-full w-[25%] min-w-[25%] flex-col items-center justify-start rounded-xl p-2 xl:flex">
      <SearchBox
        className="!bg-secondBackground mt-0!"
        onChange={(e) => {
          setSearchText(e);
        }}
        searchText={searchText}
        clearInput={() => {
          setSearchText("");
        }}
      />
      <TableHeader />
      {marketsTable}
    </div>
  );
}

export default MarketsList;
