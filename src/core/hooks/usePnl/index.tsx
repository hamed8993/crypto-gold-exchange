import { SubPositionsItem } from "@/components/pages/openPositionsPage/components/editPosition";
import { ArrayElement } from "@/core/constants/constants";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { useGetExchange_dataMarkets } from "@/core/services/hooks";
import { GetHistoryPositions } from "@/core/services/types";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import Decimal from "decimal.js";
import { useGetMarketFee } from "../useGetMarketFee";

interface calculateLossProps {
  side: boolean;
  currentPrice: string;
  slPrice: string;
  contractSize: string;
  symbol: string;
}

interface calculateProfitProps {
  side: boolean;
  currentPrice: string;
  tpPrice: string;
  contractSize: string;
  symbol: string;
}

interface getIrtPnlDataProps {
  tradeList?: Array<ArrayElement<GetHistoryPositions["result"]>>;
}

interface TradePnlProps {
  subPositions: Array<SubPositionsItem>;
  symbol: string;
  side: string;
}

export const usePnl = () => {
  const { data: dataMarkets } = useGetExchange_dataMarkets();
  const { firstBidAsk } = useFirstBidAsk();

  const getPriceStep = (symbol: string) => {
    const markets = dataMarkets?.result || [];

    const symbolData = markets.filter((item) => {
      return item?.symbol === symbol;
    });
    const priceStep = Number(symbolData?.[0]?.price_step);
    return priceStep;
  };

  const getPlMultiplier = (symbol: string) => {
    const markets = dataMarkets?.result || [];

    const symbolData = markets.filter((item) => {
      return item.symbol === symbol;
    });
    const plMultiplier = Number(symbolData?.[0]?.pl_multiplier);
    return plMultiplier;
  };

  const calculateLoss = ({
    contractSize,
    currentPrice,
    side,
    slPrice,
    symbol,
  }: calculateLossProps) => {
    const Loss = !side
      ? Number(
          new Decimal(Number(deleteCommas(currentPrice)))
            .minus(Number(deleteCommas(slPrice)))
            .div(getPriceStep(symbol))
            .times(getPlMultiplier(symbol))
            .times(Number(contractSize)),
        )
      : Number(
          new Decimal(Number(deleteCommas(slPrice)))
            .minus(Number(deleteCommas(currentPrice)))
            .div(getPriceStep(symbol))
            .times(getPlMultiplier(symbol))
            .times(Number(contractSize)),
        );

    return Loss;
  };

  const calculateProfit = ({
    contractSize,
    currentPrice,
    side,
    tpPrice,
    symbol,
  }: calculateProfitProps) => {
    const Profit = !side
      ? Number(
          new Decimal(Number(deleteCommas(currentPrice)))
            .minus(Number(deleteCommas(tpPrice)))
            .div(getPriceStep(symbol))
            .times(getPlMultiplier(symbol))
            .times(Number(contractSize)),
        )
      : Number(
          new Decimal(Number(deleteCommas(tpPrice)))
            .minus(Number(deleteCommas(currentPrice)))
            .div(getPriceStep(symbol))
            .times(getPlMultiplier(symbol))
            .times(Number(contractSize)),
        );

    return Profit;
  };

  const getLeverages = (symbol: string) => {
    const markets = dataMarkets?.result || [];

    const symbolData = markets.filter((item) => {
      return item.symbol === symbol;
    });
    const leverages = symbolData?.[0]?.leverage;
    return leverages;
  };

  const getMaxContractSize = (symbol: string) => {
    const markets = dataMarkets?.result || [];

    const symbolData = markets.filter((item) => {
      return item.symbol === symbol;
    });
    const max_contract_size = symbolData?.[0]?.max_contract_size;
    return Number(max_contract_size);
  };

  const getLiquidPrice = (
    entryPrice: string,
    leverage: number,
    symbol: string,
  ) => {
    const liqPrice =
      Number(
        new Decimal(Number(deleteCommas(entryPrice)))
          .div(leverage)
          .div(getPlMultiplier(symbol))
          .mul(getPriceStep(symbol)),
      ) || 0;

    return liqPrice;
  };

  const getMarketFee = useGetMarketFee();
  const getIrtPnlData = ({ tradeList }: getIrtPnlDataProps) => {
    const irtPnlData = tradeList?.map((parent) => {
      const itemFee = Number(getMarketFee(parent?.symbol)) || 0;
      const pnl = parent?.subPositions?.reduce(
        (sum: string, sub: SubPositionsItem) => {
          if (sub?.quote === "irt") {
            const entry = parseFloat(sub.entryPrice);
            const exit = parseFloat(sub.exitPrice);
            const priceStep = getPriceStep(sub.symbol);
            const pl_multiplier = getPlMultiplier(sub.symbol);
            const pnl_ =
              sub.side === "short"
                ? Number(
                    new Decimal(entry)
                      .minus(exit)
                      .times(pl_multiplier)
                      .div(priceStep)
                      .minus(itemFee)
                      .toFixed(0),
                  )
                : Number(
                    new Decimal(exit)
                      .minus(entry)
                      .times(pl_multiplier)
                      .div(priceStep)
                      .minus(itemFee)
                      .toFixed(0),
                  );
            return sum + pnl_;
          }
        },
        0,
      );

      return {
        ...parent,
        pnl,
      };
    });

    return irtPnlData;
  };

  const getUsdPnlData = ({ tradeList }: getIrtPnlDataProps) => {
    const usdPnlData = tradeList?.map((parent) => {
      const pnl = parent?.subPositions?.reduce(
        (sum: string, sub: SubPositionsItem) => {
          if (sub?.quote === "usd") {
            const entry = parseFloat(sub.entryPrice);
            const exit = parseFloat(sub.exitPrice);
            const priceStep = getPriceStep(sub.symbol);
            const pl_multiplier = getPlMultiplier(sub.symbol);
            const pnl_ =
              sub.side === "short"
                ? Number(
                    new Decimal(entry)
                      .minus(exit)
                      .times(pl_multiplier)
                      .div(priceStep)
                      .toFixed(0),
                  )
                : Number(
                    new Decimal(exit)
                      .minus(entry)
                      .times(pl_multiplier)
                      .div(priceStep)
                      .toFixed(0),
                  );
            return sum + pnl_;
          }
        },
        0,
      );

      return {
        ...parent,
        pnl,
      };
    });

    return usdPnlData;
  };

  const getAverageExitPrice = (data: SubPositionsItem[]) => {
    const exitPricesArray = data?.map((item) => {
      return item.exitPrice;
    });

    const sumOfExitPrices = exitPricesArray?.reduce((acc: number, item) => {
      return (acc += Number(item));
    }, 0);

    const averageExitPrice = Number(
      new Decimal(sumOfExitPrices).div(exitPricesArray.length),
    );

    return averageExitPrice;
  };

  const getTradePnl = ({ side, subPositions, symbol }: TradePnlProps) => {
    const pnlArray = subPositions?.map((trade: SubPositionsItem) => {
      const priceStep = getPriceStep(symbol);
      const pl_multiplier = getPlMultiplier(symbol);
      const pnl_ =
        side === "long"
          ? Number(
              new Decimal(trade?.exitPrice)
                .minus(trade?.entryPrice)
                .times(pl_multiplier)
                .div(priceStep)
                .toFixed(0),
            )
          : Number(
              new Decimal(trade?.entryPrice)
                .minus(trade?.exitPrice)
                .times(pl_multiplier)
                .div(priceStep)
                .toFixed(0),
            );

      return pnl_;
    });

    const totalPnl =
      pnlArray && pnlArray?.reduce((sum: number, pnl: number) => sum + pnl, 0);

    return totalPnl;
  };

  const calculatePositionPnl = (
    item: ArrayElement<GetHistoryPositions["result"]>,
  ) => {
    const symbol = item?.symbol;
    const side = item?.side;
    const entryPrice = Number(item?.entryPrice);
    const subPosCount = item?.subPositions?.length || 0;

    const symbolPriceData = firstBidAsk?.[symbol] || { flong: "", fshort: "" };
    if (!symbolPriceData || subPosCount === 0) {
      return { orderId: item?.orderId, pnl: 0 };
    }

    const symbolCurrentPrice =
      side === "long"
        ? Number(symbolPriceData?.flong)
        : Number(symbolPriceData?.fshort);

    const priceStep = getPriceStep(symbol);
    const pl_multiplier = getPlMultiplier(symbol);

    const pnl =
      side === "long"
        ? Number(
            new Decimal(symbolCurrentPrice)
              .minus(entryPrice)
              .div(priceStep)
              .times(pl_multiplier)
              .times(subPosCount),
          )
        : Number(
            new Decimal(entryPrice)
              .minus(symbolCurrentPrice)
              .div(priceStep)
              .times(pl_multiplier)
              .times(subPosCount),
          );
    return pnl;
  };

  return {
    calculateLoss,
    getPriceStep,
    getPlMultiplier,
    calculateProfit,
    getLeverages,
    getLiquidPrice,
    getMaxContractSize,
    getIrtPnlData,
    getUsdPnlData,
    getAverageExitPrice,
    getTradePnl,
    calculatePositionPnl,
  };
};
