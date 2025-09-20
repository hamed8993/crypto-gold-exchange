import { ArrayElement } from "@/core/constants/constants";
import { createContext, ReactNode } from "react";
import {
  useGetExchange_dataMarkets,
  useGetExchange_dataMarkets_details,
  useGetGet_available_coins,
} from "../../services/hooks";
import type {
  GetAvailableCoins,
  GetExchangeDataMarketsDetails,
} from "../../services/types";
import { MarketsDataType } from "../markets";

export type MarketsDetailType = ArrayElement<GetAvailableCoins["result"]>;
export type GetExchangeDataMarketsDetailsType = ArrayElement<
  GetExchangeDataMarketsDetails["result"]
>;

interface MarketsNamesContextProps {
  markets: MarketsDetailType[];
  marketsDataList: MarketsDataType[];
  marketsDetailsDataList: GetExchangeDataMarketsDetailsType[];
  loadingMarkets: boolean;
  refetchMarkets: () => void;
}

const initialValue: MarketsNamesContextProps = {
  markets: [],
  marketsDataList: [],
  marketsDetailsDataList: [],
  loadingMarkets: false,
  refetchMarkets: () => undefined,
};

const MarketsNamesContext =
  createContext<MarketsNamesContextProps>(initialValue);

const MarketsNamesProvider = ({ children }: { children: ReactNode }) => {
  // GET MARKETS DETAILS
  const {
    data,
    refetch: refetchMarkets,
    isLoading: loadingMarkets,
  } = useGetGet_available_coins();

  const { data: marketsData } = useGetExchange_dataMarkets();
  const { data: marketsDetailsData } = useGetExchange_dataMarkets_details();

  const markets = data?.result || [];
  const marketsDataList = marketsData?.result || [];
  const marketsDetailsDataList = marketsDetailsData?.result || [];

  return (
    <MarketsNamesContext.Provider
      value={{
        loadingMarkets,
        markets,
        marketsDataList,
        marketsDetailsDataList,
        refetchMarkets,
      }}
    >
      {children}
    </MarketsNamesContext.Provider>
  );
};

export { MarketsNamesContext, MarketsNamesProvider };
