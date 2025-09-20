// @nosort-imports
import { socket } from "@/core/providers/socket/socketProvider";
import axios from "axios";
import Decimal from "decimal.js";
import {
  Bar,
  DatafeedConfiguration,
  IDatafeedChartApi,
  IDatafeedQuotesApi,
  IExternalDatafeed,
  LibrarySymbolInfo,
  PeriodParams,
  ResolutionString,
  SubscribeBarsCallback,
} from "./charting_library/charting_library";

type BarElement = {
  close: string;
  high: string;
  id: string;
  low: string;
  open: string;
  time: string;
  volume: string;
};

type Sub = {
  lastBar: Bar;
  listener: SubscribeBarsCallback;
  resolution: ResolutionString;
  subscribeUID: string;
  symbolInfo: LibrarySymbolInfo;
};

type TData = {
  price: number;
  time: number;
  volume: number;
};

const configurationData: DatafeedConfiguration = {
  supported_resolutions: [
    "1",
    "2",
    "3",
    "5",
    "10",
    "15",
    "30",
    "45",
    "60",
    "120",
    "180",
    "240",
    "360",
    "480",
    "720",
    "1440",
    "2D",
    "3D",
    "W",
  ] as ResolutionString[],
  supports_marks: false,
  supports_time: true,
  supports_timescale_marks: false,
};

function updateBar(data: TData, sub: Sub): Bar {
  let coeff = 0;
  const lastBar = sub.lastBar;
  const resolution = sub.resolution;
  const resolutionMapping: Record<string, number> = {
    "1": 1,
    "2": 2,
    "3": 3,
    "5": 5,
    "10": 10,
    "15": 15,
    "30": 30,
    "45": 45,
    "60": 60,
    "120": 120,
    "180": 180,
    "240": 240,
    "360": 360,
    "480": 480,
    "720": 720,
    "1440": 24 * 60,
    "2D": 2 * 24 * 60,
    "3D": 3 * 24 * 60,
    W: 7 * 24 * 60,
  };

  if (resolution in resolutionMapping) {
    coeff = resolutionMapping[resolution] * 60;
  }

  let calculatedBar: Bar;
  const lastBarTime = lastBar.time;
  const nextBarTime = lastBarTime + coeff * 1000;

  if (data.time > nextBarTime / 1000) {
    calculatedBar = {
      close: data.price,
      high: Math.max(lastBar.close, data.price),
      low: Math.min(lastBar.close, data.price),
      open: lastBar.close,
      time: nextBarTime,
      volume: data.volume,
    };
  } else {
    calculatedBar = lastBar;
    lastBar.close = data.price;
    lastBar.high = Math.max(lastBar.high, data.price);
    lastBar.low = Math.min(lastBar.low, data.price);
    lastBar.volume = lastBar.volume
      ? data.volume + lastBar.volume
      : data.volume;
  }
  return calculatedBar;
}

// TODO: API
// export function useMainFunction(market_data: GetExchangeDataMarkets["result"]) {
export function useMainFunction(market_data: any) {
  let subscriptions = [] as Sub[];
  let interval_id: NodeJS.Timeout;
  const history = {} as Record<string, { lastBar: Bar }>;
  const CDF = {} as IDatafeedChartApi & IExternalDatafeed & IDatafeedQuotesApi;

  CDF.onReady = (
    callback: (configurationData: DatafeedConfiguration) => void,
  ) => {
    setTimeout(() => callback(configurationData));
  };

  CDF.resolveSymbol = async (
    symbolName: string,
    onSymbolResolvedCallback: (symbol_stub: LibrarySymbolInfo) => void,
  ) => {
    let priceScale;
    const base_precision = 0;
    const split_data = symbolName.split(/[:/]/);
    const pair = (split_data[1].trim() + split_data[2]).toLowerCase();
    // TODO: API
    // const subIndex = market_data.findIndex((market) => market?.symbol === pair);
    const subIndex = market_data?.findIndex(
      (market: any) => market?.symbol === pair,
    );

    if (subIndex === -1) {
      priceScale = 10000;
    }

    priceScale = Math.pow(
      10,
      parseFloat(market_data[subIndex]?.quote_precision),
    );

    const symbol_stub: LibrarySymbolInfo = {
      currency_code: split_data[2],
      data_status: "streaming",
      daily_multipliers: ["1"],
      description: `${
        split_data[0]
      }:${split_data[1].toUpperCase()}/${split_data[2].toUpperCase()}`,
      exchange: "",
      expired: false,
      has_intraday: true,
      intraday_multipliers: ["1", "5", "15", "60", "240", "360"],
      listed_exchange: "",
      format: "price",
      full_name: "",
      has_daily: true,
      has_empty_bars: true,
      has_seconds: false,
      has_weekly_and_monthly: false,
      industry: "crypto",
      minmov: 1,
      name: split_data[0] + ":" + split_data[1].trim() + "/" + split_data[2],
      pricescale: priceScale,
      seconds_multipliers: [],
      session: "24x7",
      supported_resolutions: [
        "1",
        "2",
        "3",
        "5",
        "10",
        "15",
        "30",
        "45",
        "60",
        "120",
        "180",
        "240",
        "360",
        "480",
        "720",
        "1440",
        "2D",
        "3D",
        "W",
      ] as ResolutionString[],
      ticker: split_data[0] + ":" + split_data[1].trim() + "/" + split_data[2],
      timezone: "Asia/Tehran",
      type: "crypto",
      volume_precision: base_precision,
      visible_plots_set: "ohlcv",
    };
    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub);
    }, 0);
  };

  CDF.getBars = async (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onHistoryCallback: (
      bars: {
        open: number;
        close: number;
        high: number;
        low: number;
        volume: number;
        time: number;
      }[],
      { noData }: { noData: boolean },
    ) => void,
  ) => {
    const { from, to, firstDataRequest } = periodParams;
    const splitSymbol = symbolInfo.name.split(/[:/]/);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tradingview/history`,
        {
          params: {
            from,
            resolution,
            symbol: (splitSymbol[1] + splitSymbol[2]).toLowerCase(),
            to,
          },
        },
      );
      const bars = (response.data.result as BarElement[]).map((element) => ({
        close: Number(element.close),
        high: Number(element.high),
        low: Number(element.low),
        open: Number(element.open),
        time: Number(element.time),
        volume: Number(element.volume),
      }));
      if (firstDataRequest) {
        const lastBar = bars[bars.length - 1];
        history[symbolInfo.name] = { lastBar };
      }
      onHistoryCallback(bars, { noData: bars.length === 0 });
    } catch (error) {
      console.error("Error fetching data:", error);
      onHistoryCallback([], { noData: true });
    }
  };

  CDF.subscribeBars = (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onRealtimeCallback: SubscribeBarsCallback,
    subscribeUID: string,
  ) => {
    if (interval_id !== null) {
      clearInterval(interval_id);
    }
    subscriptions = [];
    const newSub = {
      lastBar: history[symbolInfo.name]?.lastBar,
      listener: onRealtimeCallback,
      resolution,
      subscribeUID,
      symbolInfo,
    };
    subscriptions.push(newSub);
    const sub = subscriptions.find((e) => e.subscribeUID === subscribeUID);
    const splitData = symbolInfo.full_name.split(/[:/]/);
    const pair = splitData[1] + splitData[2];
    // TODO: API
    socket.on("priceUpdate", (pu: ArrayBuffer) => {
      const textDecoder = new TextDecoder("utf-8");
      const priceUpdate = JSON.parse(textDecoder.decode(new Uint8Array(pu)));

      if (!(priceUpdate.p && priceUpdate.s === pair.toLowerCase())) {
        return;
      }

      const receivedTradeData = {
        price: Number(priceUpdate.p),
        time: Number(new Decimal(priceUpdate.t).div("1000")),
        volume: Number(priceUpdate.v),
      };

      if (sub) {
        const receivedTime = new Decimal(receivedTradeData.time);
        const lastBarTimeInSeconds = new Decimal(sub.lastBar.time / 1000);

        const invalidResolutions = ["1440", "2D", "3D"];
        if (
          receivedTime.lessThan(lastBarTimeInSeconds) ||
          invalidResolutions.includes(resolution)
        ) {
          return;
        }
        const newBar = updateBar(receivedTradeData, sub);
        sub.listener(newBar);
        sub.lastBar = newBar;
        onRealtimeCallback(newBar);
      }
    });

    interval_id = setInterval(function () {
      if (!sub || ["1440", "2D", "3D"].includes(resolution)) {
        return;
      }

      const intervalTradeData = {
        price: sub.lastBar.close,
        time: Number(new Decimal(new Date().getTime()).div(1000)),
        volume: 0,
      };

      const newBar = updateBar(intervalTradeData, sub);
      sub.listener(newBar);
      sub.lastBar = newBar;
      onRealtimeCallback(newBar);
    }, 2000);
  };
  CDF.unsubscribeBars = function () {};
  return CDF;
}
