import { createContext, ReactNode } from "react";
import type { RequestError } from "../../services/config";
import {
  useGetExchange_dataMarkets,
  useGetExchange_dataMarkets_details,
} from "../../services/hooks";
import type {
  GetExchangedataMarkets,
  GetExchangeDataMarketsDetails,
} from "../../services/types";
import { ArrayElement } from "@/core/constants/constants";

export type MarketsDetailType = ArrayElement<
  GetExchangeDataMarketsDetails["result"]
>;

export type MarketsDataType = ArrayElement<GetExchangedataMarkets["result"]>;

export type JoinedMarketData = MarketsDetailType & MarketsDataType;

interface MarketsContextProps {
  markets: MarketsDetailType[];
  loadingMarkets: boolean;
  fetchingMarkets: boolean;
  errorMarkets: RequestError | Error | null;
  refetchMarkets: () => void;
  marketsData: MarketsDataType[];
  loadingMarketsData: boolean;
  fetchingMarketsData: boolean;
  errorMarketsData: RequestError | Error | null;
  refetchMarketsData: () => void;
  isRefetchingMarkets: boolean;
  isRefetchingMarketsData: boolean;
}

const initialValue: MarketsContextProps = {
  markets: [],
  loadingMarkets: false,
  fetchingMarkets: false,
  errorMarkets: null,
  refetchMarkets: () => undefined,
  marketsData: [],
  loadingMarketsData: false,
  fetchingMarketsData: false,
  errorMarketsData: null,
  refetchMarketsData: () => undefined,
  isRefetchingMarkets: false,
  isRefetchingMarketsData: false,
};

const MarketsContext = createContext<MarketsContextProps>(initialValue);

const MarketsProvider = ({ children }: { children: ReactNode }) => {
  // GET MARKETS DETAILS
  const {
    data,
    error: errorMarkets,
    refetch: refetchMarkets,
    isRefetching: isRefetchingMarkets,
    isLoading: loadingMarkets,
    isFetching: fetchingMarkets,
  } = useGetExchange_dataMarkets_details();
  const markets = data?.result || [];

  // GET MARKETS DATA
  const {
    data: dataMarkets,
    isLoading: loadingMarketsData,
    isFetching: fetchingMarketsData,
    error: errorMarketsData,
    refetch: refetchMarketsData,
    isRefetching: isRefetchingMarketsData,
  } = useGetExchange_dataMarkets();
  const marketsData = dataMarkets?.result || [];

  return (
    <MarketsContext.Provider
      value={{
        markets,
        loadingMarkets,
        fetchingMarkets,
        errorMarkets,
        refetchMarkets,
        marketsData,
        loadingMarketsData,
        fetchingMarketsData,
        errorMarketsData,
        refetchMarketsData,
        isRefetchingMarkets,
        isRefetchingMarketsData,
      }}
    >
      {children}
    </MarketsContext.Provider>
  );
};

export { MarketsContext, MarketsProvider };
