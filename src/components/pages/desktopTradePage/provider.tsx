// @nosort-imports
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";

export interface TradeFormValues {
  isExit: boolean;
  leverage: string;
  tp_price: string;
  sl_price: string;
  tradeType: string;
  orderType: "market" | "pending";
  entryPrice: string;
  positionID: string;
  modifiedTp: string;
  modifiedSl: string;
  contractSize: string;
  marginBackup: string;
  isSlEditable: boolean;
  isTpEditable: boolean;
  side: "long" | "short";
  isOrderValidated: boolean;
  selectedOrderIndex: number;
  isModifyDrawerOpen: boolean;
  isModifyPositionDrawerOpen: boolean;
  isLeverageDrawerOpen: boolean;
  transferAssetQuantity: string;
  percentageValue: number;
  isTradeTypeDrawerOpen: boolean;
  isTradingViewDrawerOpen: boolean;
  isOneTapTradeActive: boolean;
  isDisplayThisMarket: boolean;
  isEditable: boolean;
  selectedPositionIndex: number;
  bottomTabName: "openOrders" | "openPositions";
}

interface errors {
  contractSize?: FieldError;
  entryPrice?: FieldError;
  isExit?: FieldError;
  positionID?: FieldError;
  leverage?: FieldError;
  sl_price?: FieldError;
  side?: FieldError;
  tp_price?: FieldError;
  orderType?: FieldError;
  isOrderValidated?: FieldError;
  isTradeTypeDrawerOpen?: FieldError;
  tradeType?: FieldError;
  isLeverageDrawerOpen?: FieldError;
  marginBackup?: FieldError;
  transferAssetQuantity?: FieldError;
  modifiedTp?: FieldError;
  modifiedSl?: FieldError;
  isSlEditable?: FieldError;
  isTpEditable?: FieldError;
  isModifyDrawerOpen?: FieldError;
  selectedOrderIndex?: FieldError;
  percentageValue?: FieldError;
  isModifyPositionDrawerOpen?: FieldError;
  isTradingViewDrawerOpen?: FieldError;
  selectedPositionIndex?: FieldError;
  isOneTapTradeActive?: FieldError;
  bottomTabName?: FieldError;
  isEditable?: FieldError;
  isDisplayThisMarket?: FieldError;
}

interface TradeContextProps extends UseFormReturn<TradeFormValues> {
  errors: errors | null;
}

export const TradeContext = createContext<TradeContextProps | null>(null);

export const TradeContextProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<TradeFormValues>({
    defaultValues: {
      side: "long",
      tp_price: "",
      sl_price: "",
      leverage: "",
      orderType: "pending",
      isExit: false,
      entryPrice: "",
      positionID: "",
      modifiedTp: "",
      modifiedSl: "",
      marginBackup: "",
      contractSize: "1",
      percentageValue: 0,
      isEditable: false,
      isSlEditable: false,
      isTpEditable: false,
      selectedOrderIndex: 0,
      selectedPositionIndex: 0,
      tradeType: "limitType",
      isOrderValidated: false,
      isModifyDrawerOpen: false,
      isModifyPositionDrawerOpen: false,
      isDisplayThisMarket: false,
      transferAssetQuantity: "",
      isLeverageDrawerOpen: false,
      bottomTabName: "openOrders",
      isTradeTypeDrawerOpen: false,
      isTradingViewDrawerOpen: false,
      isOneTapTradeActive: false,
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <TradeContext.Provider value={{ ...methods, errors }}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTradeContext = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error("useTradeContext must be used within TradeContextProvider");
  }
  return context;
};
