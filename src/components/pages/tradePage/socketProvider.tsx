// @nosort-imports
import { useParams } from "next/navigation";
import { socket } from "@/core/providers/socket/socketProvider";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useGetExchange_dataMarkets } from "@/core/services/hooks";

export type NewOrderBook = {
  symbol: string;
  longs: {
    price: string;
    volumeBase: string;
    volumeQuote: string;
    totalVolumeQuote: string;
    totalVolumeBase: string;
  }[];
  shorts: {
    price: string;
    volumeBase: string;
    volumeQuote: string;
    totalVolumeQuote: string;
    totalVolumeBase: string;
  }[];
};

export type PriceUpdate = {
  symbol: string;
  price: string;
  volume: string;
  time: string;
};

interface SocketProviderProps {
  children: ReactNode;
}

interface InitialValueProps {
  isChartReady: boolean;
  setIsChartReady: Dispatch<SetStateAction<boolean>>;
  newOrderbook: NewOrderBook;
  setNewOrderbook: Dispatch<SetStateAction<NewOrderBook>>;
  priceUpdate: PriceUpdate;
  setPriceUpdate: Dispatch<SetStateAction<PriceUpdate>>;
  setPriceStep: Dispatch<SetStateAction<string>>;
  priceStep: string;
}

const initialValue: InitialValueProps = {
  isChartReady: false,
  setIsChartReady: () => {},
  newOrderbook: { longs: [], shorts: [], symbol: "" },
  setNewOrderbook: () => {},
  priceUpdate: {
    symbol: "",
    price: "",
    volume: "",
    time: "",
  },
  setPriceUpdate: () => {},
  setPriceStep: () => {},
  priceStep: "1",
};

export const SocketContext = createContext(initialValue);

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const textDecoder = new TextDecoder("utf-8");

  const { market: marketParam } = useParams();

  const [isChartReady, setIsChartReady] = useState<boolean>(true);
  const [priceStep, setPriceStep] = useState<string>("1");
  const [newOrderbook, setNewOrderbook] = useState<NewOrderBook>({
    longs: [],
    shorts: [],
    symbol: "",
  });
  const [priceUpdate, setPriceUpdate] = useState<PriceUpdate>({
    symbol: "",
    price: "",
    volume: "",
    time: "",
  });

  const market =
    typeof marketParam === "string"
      ? marketParam?.replace("-", "")
      : marketParam?.[0].replace("-", "");

  const { data } = useGetExchange_dataMarkets();
  const marketsData = data?.result;

  useEffect(() => {
    setPriceStep(
      marketsData?.find((item) => item.symbol === market)?.price_step || "1",
    );
  }, [market, marketsData]);

  useEffect(() => {
    if (market) {
      socket.emit("join", market);

      socket.on("newOrderbook", (newOrderbook: ArrayBuffer) => {
        const decodedNewOrders = JSON.parse(
          textDecoder.decode(new Uint8Array(newOrderbook)),
        );

        if (decodedNewOrders.symbol === market) {
          setNewOrderbook(decodedNewOrders);
        }
      });

      socket.on("priceUpdate", (priceUpdate: ArrayBuffer) => {
        const decodedPriceUpdate = JSON.parse(
          textDecoder.decode(new Uint8Array(priceUpdate)),
        );

        if (decodedPriceUpdate.symbol === market) {
          setPriceUpdate(decodedPriceUpdate);
        }
      });

      socket.on("userTrade", (userTrade: ArrayBuffer) => {
        const decodedUserTrade = JSON.parse(
          textDecoder.decode(new Uint8Array(userTrade)),
        );

        if (decodedUserTrade) {
          return "trade";
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market]);

  const value = useMemo(() => {
    return {
      isChartReady,
      setIsChartReady,
      newOrderbook,
      setNewOrderbook,
      priceUpdate,
      setPriceUpdate,
      priceStep,
      setPriceStep,
    };
  }, [isChartReady, newOrderbook, priceStep, priceUpdate]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const {
    isChartReady,
    setIsChartReady,
    newOrderbook,
    setNewOrderbook,
    priceUpdate,
    setPriceUpdate,
    priceStep,
    setPriceStep,
  } = useContext(SocketContext);
  return {
    isChartReady,
    setIsChartReady,
    newOrderbook,
    setNewOrderbook,
    priceUpdate,
    setPriceUpdate,
    priceStep,
    setPriceStep,
  };
};
