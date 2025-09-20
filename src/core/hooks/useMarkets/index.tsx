import { useContext } from "react";
import { JoinedMarketData, MarketsContext } from "../../providers/markets";

export const useMarketsData = () => {
  const {
    fetchingMarkets,
    fetchingMarketsData,
    errorMarkets,
    errorMarketsData,
    loadingMarkets,
    loadingMarketsData,
    isRefetchingMarkets,
    isRefetchingMarketsData,
    markets,
    marketsData,
    refetchMarkets,
    refetchMarketsData,
    ...contextData
  } = useContext(MarketsContext);

  const mergedMarketsData: JoinedMarketData[] = markets.map((market) => {
    const matchingMarketData = marketsData?.find(
      (item) => market.symbol === item.symbol,
    );

    return Object.assign({}, market, matchingMarketData);
  });

  const mergedLoadingMarkets = loadingMarkets || loadingMarketsData;

  const refetchAll = () => {
    refetchMarkets();
    refetchMarketsData();
  };

  const isRefetchingEitherMarkets =
    isRefetchingMarkets || isRefetchingMarketsData;

  return {
    markets,
    loadingMarkets,
    errorMarkets,
    refetchMarkets,
    marketsData,
    loadingMarketsData,
    errorMarketsData,
    refetchMarketsData,
    mergedMarketsData,
    mergedLoadingMarkets,
    refetchAll,
    fetchingMarkets,
    fetchingMarketsData,
    isRefetchingEitherMarkets,
    isRefetchingMarkets,
    isRefetchingMarketsData,
    ...contextData,
  };
};
