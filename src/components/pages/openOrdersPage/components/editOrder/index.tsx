import { DrawerPage } from "@/components/atoms/drawerPage";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { useSocket } from "@/components/pages/tradePage/socketProvider";
import { ArrayElement } from "@/core/constants/constants";
import { useGetExchange_dataMarkets } from "@/core/services/hooks";
import { GetHistoryOrders } from "@/core/services/types";
import { useEffect, useRef, useState } from "react";
import BuySellPriceTabs from "../../../../atoms/buySellPriceTabs";
import DetailsBox from "./detailsBox";
import Header from "./header";
import ModifyButton from "./modifyButton";
import PriceInput from "./priceInput";
import { EditOrderContextProvider, useEditOrderContext } from "./provider";
import SlInput from "./slInput";
import TpInput from "./tpInput";

interface EditOrderDrawerProps {
  isOpen: boolean;
  item: ArrayElement<GetHistoryOrders["result"]>;
  onClose: () => void;
}

function Component({ isOpen, onClose, item }: EditOrderDrawerProps) {
  const { setValue } = useEditOrderContext();
  const { data: dataMarkets } = useGetExchange_dataMarkets();
  const markets = dataMarkets?.result || [];

  const symbolData = markets.filter((itm) => {
    return itm.symbol === item?.symbol;
  });

  const priceStep = Number(symbolData?.[0]?.price_step);

  useEffect(() => {
    setValue("contractSize", item?.totalSize);
    setValue("entryPrice", item?.entryPrice);
    setValue("sl_price", item?.slPrice !== "not_set" ? item?.slPrice : "");
    setValue("tp_price", item?.tpPrice !== "not_set" ? item?.tpPrice : "");
    setValue("leverage", item?.leverage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { priceUpdate } = useSocket();

  const [bgColor, setBgColor] = useState("text-positive");
  const previousPriceRef = useRef(0);

  const handlePriceUpdate = (data: {
    symbol?: string;
    price: string;
    volume?: string;
    time?: string;
  }) => {
    const newPrice = parseFloat(data.price);
    const previousPrice = previousPriceRef.current;

    if (previousPrice !== 0) {
      if (newPrice > previousPrice) {
        setBgColor("bg-positive");
      } else if (newPrice < previousPrice) {
        setBgColor("bg-negative");
      } else {
        setBgColor("bg-accentText ");
      }
    }
    previousPriceRef.current = newPrice;
  };

  useEffect(() => {
    handlePriceUpdate(priceUpdate);
  }, [priceUpdate]);

  return (
    <DrawerPage
      drawerClassName="h-full w-full flex pr-0 pl-0"
      hasCross={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex h-full w-full flex-col items-center justify-start">
        <Header onClose={onClose} />
        <BuySellPriceTabs
          bgColor={bgColor}
          onClick={(value: string) => setValue("entryPrice", value)}
          quoteAsset={item?.quote}
          symbol={item?.symbol}
        />
        <DetailsBox item={item} />

        <div className="flex w-full flex-col items-center justify-start px-3">
          <PriceInput PriceStep={priceStep} />

          <SlInput
            PriceStep={priceStep}
            isLongOrShort={item?.side}
            quoteAsset={item?.quote}
            symbol={item?.symbol}
          />

          <TpInput
            isLongOrShort={item?.side}
            PriceStep={priceStep}
            quoteAsset={item?.quote}
            symbol={item?.symbol}
          />

          <StickyComponent className="bg-mainBackground flex w-full items-center justify-center self-center px-3 py-2">
            <ModifyButton
              onClose={onClose}
              symbol={item?.symbol}
              orderId={item?.orderId}
            />
          </StickyComponent>
        </div>
      </div>
    </DrawerPage>
  );
}

const EditOrderDrawer = ({ ...props }: EditOrderDrawerProps) => {
  return (
    <EditOrderContextProvider>
      <Component {...props} />
    </EditOrderContextProvider>
  );
};

export default EditOrderDrawer;
