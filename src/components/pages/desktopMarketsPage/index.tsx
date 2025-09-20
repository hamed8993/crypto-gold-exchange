"use client";

import EmptyView from "@/components/atoms/emptyView";
import LoadingView from "@/components/atoms/loadingView";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { useGetExchange_dataMarkets_details } from "@/core/services/hooks";
import { useState } from "react";
import SearchBox from "../portfolioPage/components/searchBox";
import MarketRow from "./components/marketRow";
import TableHeader from "./components/tableHeader";

interface MarketsPageProps {
  className?: string;
}

function DesktopMarketsPage({ className }: MarketsPageProps) {
  const [searchText, setSearchText] = useState<string>("");

  const { data, isPending } = useGetExchange_dataMarkets_details();
  const markets = data?.result;

  const marketsList = markets?.filter((item) => {
    return item.symbol.includes(searchText);
  });

  return (
    <DesktopPageLayout className={className} hasFooter hasHeader>
      <div className="flex h-screen w-full flex-col items-center justify-start px-[10%]">
        <SearchBox
          className="mt-28 rounded-xl"
          clearInput={() => {
            setSearchText("");
          }}
          onChange={(e) => {
            setSearchText(e);
          }}
          searchText={searchText}
        />

        <div className="mt-5 flex w-full flex-col items-center justify-start rounded-xl border border-accentText50 dark:border-accentTextDark50">
          <TableHeader />
          {isPending ? (
            <LoadingView />
          ) : Number(marketsList?.length) > 0 ? (
            marketsList?.map((item, index) => {
              return <MarketRow key={index} item={item} />;
            })
          ) : (
            <EmptyView wrapperClassName="py-28" />
          )}
        </div>
      </div>
    </DesktopPageLayout>
  );
}

export default DesktopMarketsPage;
