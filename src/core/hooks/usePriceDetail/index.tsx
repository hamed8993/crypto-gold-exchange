import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { GetExchangeDataMarketsDetailsType } from "@/core/providers/getCoinName";
import {
  useGetExchange_dataMarkets,
  useGetExchange_dataMarkets_details,
} from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import Decimal from "decimal.js";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

export const usePriceDetail = () => {
  const { data: dataMarkets } = useGetExchange_dataMarkets();
  const { data: dataMarketsDetails } = useGetExchange_dataMarkets_details();

  const getPriceStep = (symbol: string) => {
    const markets = dataMarkets?.result || [];

    const symbolData = markets.filter((item) => {
      return item.symbol === symbol;
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

  const { firstBidAsk } = useFirstBidAsk();

  const getSpread = (symbol: string, quote: string) => {
    const spread =
      quote === "irt"
        ? Number(
            new Decimal(firstBidAsk?.[symbol]?.fshort || "0")
              .minus(firstBidAsk?.[symbol]?.flong || "0")
              .div(1000)
              .toFixed(0),
          )
        : Number(
            new Decimal(firstBidAsk?.[symbol]?.fshort || "0")
              .minus(firstBidAsk?.[symbol]?.flong || "0")
              .abs(),
          );

    return spread;
  };

  const getLength = (num: number) => {
    const length = num.toString().length;
    return length;
  };

  const splitFormattedNumberByDigits = (
    formatted: string,
    digitCountFromEnd: number,
  ) => {
    let digitsSeen = 0;
    let splitIndex = formatted.length;

    for (let i = formatted.length - 1; i >= 0; i--) {
      if (/\d/.test(formatted[i])) {
        digitsSeen++;
        if (digitsSeen === digitCountFromEnd) {
          splitIndex = i;
          break;
        }
      }
    }

    return {
      main: formatted.slice(0, splitIndex),
      highlight: formatted.slice(splitIndex),
    };
  };

  const splitFormattedWithDecimal = (value: string, priceStep: number) => {
    const stepStr = (priceStep * 10).toString();
    const decimalCount = stepStr.includes(".")
      ? stepStr.split(".")[1].length
      : 0;

    const [intRaw, decRaw = ""] = value.split(".");
    const formattedInt = addCommaSeparator(intRaw);

    if (decimalCount === 0 || decRaw === "") {
      let digitsSeen = 0;
      let splitIndex = formattedInt.length;
      for (let i = formattedInt.length - 1; i >= 0; i--) {
        if (/\d/.test(formattedInt[i])) {
          digitsSeen++;
          if (digitsSeen === 1) {
            splitIndex = i;
            break;
          }
        }
      }
      return {
        main: formattedInt.slice(0, splitIndex),
        highlight: formattedInt.slice(splitIndex),
      };
    } else {
      const main = `${formattedInt}.${decRaw.slice(0, decRaw.length - decimalCount)}`;
      const highlight = decRaw.slice(-decimalCount);
      return {
        main,
        highlight,
      };
    }
  };

  const getHighlightedPrice = (symbol: string, side: boolean) => {
    const sideType = side
      ? firstBidAsk?.[symbol]?.flong
      : firstBidAsk?.[symbol]?.fshort;
    const mainPrice =
      getPriceStep(symbol) < 1
        ? splitFormattedWithDecimal(
            addCommaSeparator(sideType ? sideType : ""),
            getPriceStep(symbol),
          ).main
        : splitFormattedNumberByDigits(
            addCommaSeparator(sideType ? sideType : ""),
            getLength(getPriceStep(symbol)),
          ).main;

    const highlightPrice =
      getPriceStep(symbol) < 1
        ? splitFormattedWithDecimal(
            addCommaSeparator(sideType ? sideType : ""),
            getPriceStep(symbol),
          ).highlight
        : splitFormattedNumberByDigits(
            addCommaSeparator(sideType ? sideType : ""),
            getLength(getPriceStep(symbol)),
          ).highlight;

    return { mainPrice, highlightPrice };
  };

  const getFontColor = (price: string | number) => {
    const color =
      Number(price) > 0
        ? "!text-positive "
        : Number(price) < 0
          ? "!text-negative "
          : "!text-mainText ";
    return color;
  };

  const getChevron = (value: string) => {
    if (Number(value) > 0) {
      return <TiArrowSortedUp className={"text-positive min-h-5 min-w-5"} />;
    }
    if (Number(value) < 0) {
      return <TiArrowSortedDown className={"text-negative min-h-5 min-w-5"} />;
    }
    if (Number(value) === 0) {
      return <TiArrowUnsorted className={"text-accentText min-h-5 min-w-5"} />;
    }
  };

  const getMarketItem = (symbol: string) => {
    const markets = dataMarketsDetails?.result || [];

    const symbolData = markets.filter(
      (item: GetExchangeDataMarketsDetailsType) => {
        return item.symbol === symbol;
      },
    )?.[0];

    return symbolData;
  };

  return {
    getPriceStep,
    getPlMultiplier,
    getSpread,
    getHighlightedPrice,
    getFontColor,
    getChevron,
    getMarketItem,
  };
};
