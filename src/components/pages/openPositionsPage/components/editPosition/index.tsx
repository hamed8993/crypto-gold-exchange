import { localeType } from "@/app/[locale]/layout";
import { DrawerPage } from "@/components/atoms/drawerPage";
import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { useGetExchange_dataMarkets } from "@/core/services/hooks";
import { GetHistoryPositions } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import CloseAllButton from "./closeAllButton";
import EditPositionButton from "./editPosition";
import Header from "./header";
import PositionDetailsRow from "./positionDetailsRow";
import PositionItem from "./positionItem";
import PriceInput from "./priceInput";
import {
  EditPositionContextProvider,
  useEditPositionContext,
} from "./provider";
import SlInput from "./slInput";
import Tabs from "./tabs";
import TpInput from "./tpInput";

export type SubPositionsItem = {
  base: string;
  created_at: string;
  entryPrice: string;
  exitPrice: string;
  fragmentedOrderId: string;
  leverage: string;
  orderId: string;
  positionId: string;
  quote: string;
  requiredMargin: string;
  side: string;
  slPrice: string;
  status: string;
  symbol: string;
  totalMargin: string;
  tpPrice: string;
  user_uuid: string;
  uuid: string;
  updated_at: string;
};

interface EditPositionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: ArrayElement<GetHistoryPositions["result"]>;
}

function Component({ isOpen, onClose, item }: EditPositionDrawerProps) {
  const { data: dataMarkets } = useGetExchange_dataMarkets();
  const { locale } = useUrl();
  const t = useTranslations();
  const { firstBidAsk } = useFirstBidAsk();
  const { getMarketName, getQuoteName } = useMarketsNamesData();
  const { setValue } = useEditPositionContext();

  useEffect(() => {
    setValue("contractSize", item?.subPositions?.length);
    setValue("entryPrice", item?.entryPrice);
    setValue("sl_price", item?.slPrice !== "not_set" ? item?.slPrice : "");
    setValue("tp_price", item?.tpPrice !== "not_set" ? item?.tpPrice : "");
    setValue("leverage", item?.leverage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const calculatePositionPnl = (
    item: ArrayElement<GetHistoryPositions["result"]>,
  ) => {
    const symbol = item.symbol;
    const side = item.side;
    const entryPrice = Number(item.entryPrice);
    const subPosCount = item.subPositions?.length || 0;

    const symbolPriceData = firstBidAsk?.[symbol] || { flong: "", fshort: "" };
    if (!symbolPriceData || subPosCount === 0) {
      return { orderId: item.orderId, pnl: 0 };
    }

    const symbolCurrentPrice =
      side === "long"
        ? Number(symbolPriceData.flong)
        : Number(symbolPriceData.fshort);

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
  const [activeTab, setActiveTab] = useState("editQuantities");
  const { showSuccess } = useNotification();

  const currentPrice =
    item?.side === "long"
      ? firstBidAsk?.[item.symbol]?.flong || "0"
      : firstBidAsk?.[item.symbol]?.fshort || "0";

  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };

  const [subPositions, setSubPositions] = useState<SubPositionsItem[]>();
  useEffect(() => {
    setSubPositions(item?.subPositions);
  }, [item]);
  return (
    <DrawerPage
      drawerClassName="h-dvh min-h-dvh w-full  flex pr-0 pl-0"
      hasCross={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex h-full w-full flex-col items-center justify-start pb-10">
        <Header onClose={onClose} />
        <div
          className={clsx(
            "overflow-y-auto",
            activeTab === "editQuantities"
              ? "h-[calc(100%-200px)]"
              : "h-[calc(100%-100px)]",
          )}
        >
          <Tabs
            activeTab={activeTab}
            setActiveTab={(tab: string) => {
              setActiveTab(tab);
            }}
          />

          <div className="mt-2 flex w-full flex-col items-center justify-start py-5 pb-5">
            <div className="flex h-7 w-full items-center justify-between px-5">
              <div className="flex h-7 w-full items-start justify-start gap-1">
                <p className="text-accentText text-xs">{t("market")}:</p>
                <p className="text-mainText text-xs">
                  {getMarketName(item?.symbol)[locale as localeType]}
                </p>
              </div>
              <div className="flex h-7 w-full items-start justify-start gap-1">
                <p className="text-accentText text-xs">{t("singleSymbol")}:</p>
                <p className="text-mainText text-xs">
                  {item?.symbol?.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex h-7 w-full items-center justify-between px-5">
              <div className="flex h-7 w-full items-start justify-start gap-1">
                <p className="text-accentText text-xs">{t("orderType")}:</p>
                <p
                  className={clsx(
                    "text-xs",
                    item?.side === "long" ? "text-positive" : "text-negative",
                  )}
                >
                  {`${t(item?.side)} - ${item?.side?.toUpperCase()}`}
                </p>
              </div>
              <div className="flex h-7 w-full items-start justify-start gap-1">
                <p className="text-accentText text-xs">{t("leverage")}:</p>
                <p className="font-english text-mainText text-xs">
                  {`${item?.leverage}X`}
                </p>
              </div>
            </div>
            <div className="flex h-7 w-full items-center justify-between px-5">
              <div className="flex h-7 w-full items-start justify-start gap-1">
                <p className="text-accentText text-xs">{t("stopLoss")}:</p>
                {item?.slPrice !== "not_set" ? (
                  <div className="flex items-center justify-start gap-1">
                    <p className="font-english text-mainText text-xs">
                      {addCommaSeparator(item?.slPrice)}
                    </p>
                    <p className="text-accentText text-xs">
                      {getQuoteName(item?.quote)}
                    </p>
                  </div>
                ) : (
                  <p className="text-accentText text-xs">{t("notProvided")}</p>
                )}
              </div>
              <div className="flex h-7 w-full items-start justify-start gap-1">
                <p className="text-accentText text-xs">{t("targetPoint")}:</p>
                {item?.tpPrice !== "not_set" ? (
                  <div className="flex items-center justify-start gap-1">
                    <p className="font-english text-mainText text-xs">
                      {addCommaSeparator(item?.tpPrice)}
                    </p>
                    <p className="text-accentText text-xs">
                      {getQuoteName(item?.quote)}
                    </p>
                  </div>
                ) : (
                  <p className="text-accentText text-xs">{t("notProvided")}</p>
                )}
              </div>
            </div>
            <div className="flex h-7 w-full items-center justify-between px-5">
              <div className="flex h-7 w-full items-start justify-start gap-1">
                <p className="text-accentText text-xs">{t("volume")}:</p>
                <div className="flex items-center justify-start gap-1">
                  <p className="font-english text-mainText text-xs">
                    {addCommaSeparator(item?.subPositions?.length)}
                  </p>
                  <p className="text-accentText text-xs">{t("unit")}</p>
                </div>
              </div>
            </div>
            <div className="flex h-fit w-full items-center justify-between px-5">
              <div className="flex h-fit w-full items-start justify-start gap-1">
                <p className="text-accentText text-xs">{t("orderId")}:</p>
                <p className="font-english text-accentText text-left text-xs break-all">
                  {item?.orderId}
                </p>
                <div
                  onClick={() => {
                    handleCopy(item?.orderId);
                  }}
                  className="flex h-4 w-4 items-center justify-center"
                >
                  <MdContentCopy className="text-mainBrandAlternative mb-1 h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="bg-accentText50 mt-5 flex h-px w-[92%]"></div>
          </div>
          <div className="mt-5 flex w-full items-center justify-center px-5">
            <PositionDetailsRow
              pnl={firstBidAsk ? calculatePositionPnl(item).toString() : "0"}
              item={item}
            />
          </div>
          {activeTab === "editQuantities" ? (
            <div className="flex w-full flex-col items-center justify-start overflow-y-auto px-3 py-2 pb-10">
              <SlInput
                PriceStep={getPriceStep(item?.symbol)}
                isLongOrShort={item?.side}
                quoteAsset={item?.quote}
                symbol={item?.symbol}
              />

              <TpInput
                PriceStep={getPriceStep(item?.symbol)}
                quoteAsset={item?.quote}
                isLongOrShort={item?.side}
                symbol={item?.symbol}
              />

              <PriceInput
                pl_multiplier={getPlMultiplier(item?.symbol)}
                priceStep={getPriceStep(item?.symbol)}
                item={item}
                quote={item?.quote}
                currentPrice={currentPrice}
              />

              <EditPositionButton
                entryPrice={item?.entryPrice}
                onClose={onClose}
                orderId={item?.orderId}
                side={item?.side}
                symbol={item?.symbol}
              />
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-start px-3 py-2">
              {subPositions &&
                subPositions?.map(
                  (
                    itm: SubPositionsItem,
                    indx: React.Key | null | undefined,
                  ) => {
                    return (
                      <PositionItem onClose={onClose} key={indx} item={itm} />
                    );
                  },
                )}

              <CloseAllButton
                onClose={onClose}
                entryPrice={item?.entryPrice}
                side={item?.side}
                symbol={item?.symbol}
                uuid={item?.orderId}
              />
            </div>
          )}
        </div>
      </div>
    </DrawerPage>
  );
}

const EditPositionDrawer = ({ ...props }: EditPositionDrawerProps) => {
  return (
    <EditPositionContextProvider>
      <Component {...props} />
    </EditPositionContextProvider>
  );
};

export default EditPositionDrawer;
