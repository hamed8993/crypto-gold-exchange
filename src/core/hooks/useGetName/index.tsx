import { MarketsNamesContext } from "@/core/providers/getCoinName";
import { useTranslations } from "next-intl";
import { useContext } from "react";

export const useMarketsNamesData = () => {
  const { markets, marketsDataList, marketsDetailsDataList } =
    useContext(MarketsNamesContext);
  const t = useTranslations();
  const getName = (symbol: string) => {
    const market = markets?.find(
      (item) => item.symbol.toLowerCase() === symbol?.toLowerCase(),
    );
    return { enName: market?.name_en, faName: market?.name_fa };
  };

  const getMarketName = (symbol: string) => {
    const market = marketsDataList?.find(
      (item) => item.symbol.toLowerCase() === symbol?.toLowerCase(),
    );
    return {
      en: market?.translations?.en?.symbol,
      fa: market?.translations?.fa?.symbol,
      ru: market?.translations?.ru?.symbol,
      tr: market?.translations?.tr?.symbol,
      ar: market?.translations?.ar?.symbol,
    };
  };

  const getMarketStatus = (symbol: string) => {
    const market = marketsDataList?.find(
      (item) => item.symbol.toLowerCase() === symbol?.toLowerCase(),
    );

    return market?.status === "on" ? "activeMarket" : "inActiveMarket";
  };

  const getMarketChangePercentage = (symbol: string) => {
    const market = marketsDetailsDataList?.find(
      (item) => item.symbol.toLowerCase() === symbol?.toLowerCase(),
    );

    return market?.change_percentage;
  };

  const getQuoteName = (quote: string) => {
    switch (quote?.toLowerCase()) {
      case "irt":
        return t("irtSymbol");
      case "usd":
        return t("tetherSymbol");
      case "usd4":
        return t("tetherSymbol");
    }
  };

  return {
    getName,
    getMarketName,
    getQuoteName,
    getMarketStatus,
    getMarketChangePercentage,
  };
};
