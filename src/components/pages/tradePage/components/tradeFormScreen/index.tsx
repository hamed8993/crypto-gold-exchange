import BuySellPriceTabs from "@/components/atoms/buySellPriceTabs";
import PwaPageLayout from "@/components/organisms/layout";
import { usePnl } from "@/core/hooks/usePnl";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useTradeContext } from "../../provider";
import { useSocket } from "../../socketProvider";
import TradeButtons from "../tradeButtons";
import ContractSizeInput from "./components/contractSizeInput";
import EntryPriceInput from "./components/entryPriceInput";
import LastPriceComponent from "./components/lastPriceComponent";
import LeverageInput from "./components/leverageInput";
import MarginLiquidPrice from "./components/marginLiquidPrice";
import OrderTypeTabs from "./components/orderTypeTabs";
import SideInput from "./components/sideInput";
import SlInput from "./components/slInput";
import TpInput from "./components/tpInput";

interface TradeFormScreenProps {
  base: string;
  className?: string;
  longOrShort: "long" | "short";
  quote: string;
  setIsSecondPage: (value: boolean) => void;
  setLongOrShort: (value: "long" | "short") => void;
}

function TradeFormScreen({
  base,
  className,
  longOrShort,
  quote,
  setIsSecondPage,
  setLongOrShort,
}: TradeFormScreenProps) {
  const t = useTranslations();
  const symbol = base + quote;

  const { firstBidAsk } = useFirstBidAsk();

  const { setValue, watch, reset } = useTradeContext();

  const [bgColor, setBgColor] = useState<string>("");

  const contractSize = watch("contractSize");
  const entryPrice = watch("entryPrice");
  const orderTypeTab = watch("orderType");

  const isMarginLiqVisible = entryPrice && contractSize;

  useEffect(() => {
    if (orderTypeTab === "market") {
      setValue(
        "entryPrice",
        longOrShort === "short"
          ? firstBidAsk?.[symbol]?.flong || "0"
          : firstBidAsk?.[symbol]?.fshort || "0",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderTypeTab]);

  const { getPriceStep, getLeverages, getLiquidPrice } = usePnl();
  const leverages = getLeverages(symbol);
  const priceStep = getPriceStep(symbol);

  const entryPriceNumber = Number(deleteCommas(watch("entryPrice")));
  const leverage = Number(watch("leverage"));

  const liqPriceStep = getLiquidPrice(
    entryPriceNumber.toString(),
    leverage,
    symbol,
  );

  const { priceUpdate } = useSocket();

  const previousPriceRef = useRef(0);

  const handlePriceUpdate = (data: {
    price: string;
    symbol?: string;
    time?: string;
    volume?: string;
  }) => {
    const newPrice = parseFloat(data.price);
    const previousPrice = previousPriceRef.current;

    if (previousPrice !== 0) {
      if (newPrice > previousPrice) {
        setBgColor("bg-positive");
      } else if (newPrice < previousPrice) {
        setBgColor("bg-negative");
      } else {
        setBgColor("bg-positive");
      }
    }
    previousPriceRef.current = newPrice;
  };

  useEffect(() => {
    handlePriceUpdate(priceUpdate);
  }, [priceUpdate]);

  return (
    <PwaPageLayout
      containerClassName="pr-0 pl-0 pb-0 overflow-y-auto bg-secondBackground "
      hasBackChevron
      hasFooter={false}
      onBackClick={() => {
        setIsSecondPage(false);
        reset();
      }}
      title={t("setOrder")}
      wrapperClassName={className}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-start overflow-x-hidden overflow-y-auto">
        <BuySellPriceTabs
          bgColor={bgColor}
          onClick={(value: string) => setValue("entryPrice", value)}
          quoteAsset={quote}
          symbol={symbol}
        />

        <LastPriceComponent quote={quote} symbol={symbol} />

        <OrderTypeTabs
          isLongOrShort={longOrShort}
          orderTypeTab={orderTypeTab}
          setOrderTypeTab={(value: "market" | "pending") =>
            setValue("orderType", value)
          }
        />

        <div className="flex w-full flex-col items-center justify-start px-1 pb-4">
          <SideInput
            isLongOrShort={longOrShort}
            setIsLongOrShort={(value: "long" | "short") =>
              setLongOrShort(value)
            }
          />

          <LeverageInput leverages={leverages} />

          <EntryPriceInput priceStep={priceStep} symbol={symbol} />

          <ContractSizeInput />

          {isMarginLiqVisible ? (
            <MarginLiquidPrice
              liqPriceStep={liqPriceStep}
              longOrShort={longOrShort}
              quote={quote}
            />
          ) : null}

          <SlInput
            isLongOrShort={longOrShort}
            PriceStep={priceStep}
            quoteAsset={quote}
            symbol={symbol}
          />

          <TpInput
            isLongOrShort={longOrShort}
            PriceStep={priceStep}
            quoteAsset={quote}
            symbol={symbol}
          />
        </div>
      </div>

      <TradeButtons
        isLongOrShort={longOrShort}
        orderTypeTab={orderTypeTab}
        resetPage={() => {
          setIsSecondPage(false);
        }}
      />
    </PwaPageLayout>
  );
}

export default TradeFormScreen;
