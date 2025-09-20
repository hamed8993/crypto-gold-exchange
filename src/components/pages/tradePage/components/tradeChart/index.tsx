/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import { GetExchangedataMarkets } from "@/core/services/types";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import {
  ChartingLibraryFeatureset,
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from "./charting_library/charting_library";
import { widget } from "./charting_library/charting_library.esm";
import { useCustomCSS } from "./customCSS";
import { useMainFunction } from "./mainFunction";

interface TradeChartProps {
  data: GetExchangedataMarkets["result"];
  setIsChartReady?: Dispatch<SetStateAction<boolean>>;
  showToolBar: boolean;
}

function TradeChart({ data, setIsChartReady, showToolBar }: TradeChartProps) {
  const { locale } = useUrl();
  const { theme } = useTheme();
  const pathname = usePathname();

  const { accessToken, isLoggedIn } = useAuth();

  const pathnameSplitted = pathname?.split("/");

  const marketArray =
    pathnameSplitted?.[pathnameSplitted.length - 1]?.split("-");

  const baseAsset = marketArray?.[0]?.toLowerCase() || "xau";
  const quoteAsset = marketArray?.[1]?.toLowerCase() || "usd";

  const chartContainerRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLInputElement>;

  const mainFunction = useMainFunction(data);

  const customCSS = useCustomCSS();
  const cssBlob = new Blob([customCSS], { type: "text/css" });
  const cssBlobUrl = URL.createObjectURL(cssBlob);

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      // MAIN
      auto_save_delay: 5,
      charts_storage_api_version: "1.1",
      // charts_storage_url: isLoggedIn
      //   ? `${process.env.NEXT_PUBLIC_API_URL}/tradingview/chart_storage`
      //   : undefined,
      client_id: `${baseAsset.toUpperCase()}|${quoteAsset.toUpperCase()}`,
      container: chartContainerRef.current,
      datafeed: mainFunction,
      interval: window.localStorage.getItem(
        "tradingview.chart.lastUsedTimeBasedResolution",
      )
        ? (window.localStorage.getItem(
            "tradingview.chart.lastUsedTimeBasedResolution",
          ) as ResolutionString)
        : ("60" as ResolutionString),
      library_path: "/static/charting_library/",
      load_last_chart: true,
      locale: "en",
      symbol: `goldfino: ${baseAsset}/${quoteAsset}`,
      user_id: isLoggedIn ? `${accessToken}` : undefined,

      // DESIGN
      autosize: true,
      custom_css_url: cssBlobUrl,
      fullscreen: false,
      loading_screen: {
        backgroundColor: theme === "light" ? "#f7f7f7" : "#000910",
      },
      theme: theme === "light" ? "Light" : "Dark",

      // Timezone
      timezone: "Asia/Tehran",

      // Overrides
      overrides: {
        "mainSeriesProperties.priceAxisProperties.log": !0,
        "mainSeriesProperties.showCountdown": !0,
        "paneProperties.background": theme === "light" ? "#f7f7f7" : "#000910",
        "paneProperties.backgroundType": "solid",
        "paneProperties.bottomMargin": 15,
        "paneProperties.legendProperties.showBarChange": !0,
        "paneProperties.legendProperties.showSeriesOHLC": !0,
        "paneProperties.legendProperties.showSeriesTitle": !0,
        "paneProperties.legendProperties.showStudyArguments": !0,
        "paneProperties.legendProperties.showStudyTitles": !0,
        "paneProperties.legendProperties.showStudyValues": !0,
        "paneProperties.topMargin": 15,
      },

      // FEATURES
      disabled_features: [
        "adaptive_logo",
        "create_volume_indicator_by_default",
        "header_compare",
        "header_symbol_search",
        "study_templates",
        "timeframes_toolbar",
        "use_localstorage_for_settings",
        ...(showToolBar
          ? []
          : (["left_toolbar"] as ChartingLibraryFeatureset[])),
      ],

      enabled_features: [
        "header_in_fullscreen_mode",
        "side_toolbar_in_fullscreen_mode",
      ],
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          //@ts-ignore
          if (node.tagName === "IFRAME") {
            setIsChartReady?.(true);
            observer.disconnect();
          }
        }
      }
    });

    if (chartContainerRef.current) {
      observer.observe(chartContainerRef.current, { childList: true });
    }

    const tvWidget = new widget(widgetOptions);
    // @ts-ignore
    window.tvw = tvWidget;

    return () => {
      tvWidget.remove();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseAsset, locale, quoteAsset, theme, data]);

  useEffect(() => {
    // @ts-ignore
    return window.tvw.onChartReady(() => {
      // @ts-ignore
      window.tvw.subscribe("onAutoSaveNeeded", function () {
        // @ts-ignore

        window.tvw.saveChartToServer();
      });

      // @ts-ignore
      // isLoggedIn && window.tvw.subscribe("chart_loaded", function () {});
    });
  }, []);

  return <div ref={chartContainerRef} className="h-full w-full rounded-lg" />;
}

export default TradeChart;
