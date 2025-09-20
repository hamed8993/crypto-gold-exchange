import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { socket } from "../socket/socketProvider";

interface FirstBidAskContextType {
  firstBidAsk: firstBidAskType;
  setFirstBidAsk: (firstBidAsk: firstBidAskType) => void;
}

type firstBidAskType = {
  [symbol: string]: {
    flong: string;
    fshort: string;
  };
};

const FirstBidAskContext = createContext<FirstBidAskContextType | undefined>(
  undefined,
);

export const FirstBidAskProvider = ({ children }: { children: ReactNode }) => {
  const textDecoder = new TextDecoder("utf-8");

  const [firstBidAsk, setFirstBidAsk] = useState<firstBidAskType>({
    symbol: { flong: "0", fshort: "0" },
  });

  useEffect(() => {
    socket.on("firstBidAsk", (firstBidAsk: ArrayBuffer) => {
      const decodedNewOrders = JSON.parse(
        textDecoder.decode(new Uint8Array(firstBidAsk)),
      );
      setFirstBidAsk(decodedNewOrders);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FirstBidAskContext.Provider value={{ firstBidAsk, setFirstBidAsk }}>
      {children}
    </FirstBidAskContext.Provider>
  );
};

export const useFirstBidAsk = () => {
  const context = useContext(FirstBidAskContext);

  if (!context) {
    throw new Error(
      "useFirstBidAsk must be used within an FirstBidAskProvider",
    );
  }

  return context;
};
