import { Side } from "@/core/services/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";

interface initialValues {
  from: string;
  to: string;
  symbol: string;
  type: "market" | "limit" | undefined;
  side: Side | undefined;
}
interface errors {
  from?: FieldError;
  to?: FieldError;
  symbol?: FieldError;
  type?: FieldError;
  side?: FieldError;
}

export interface TradeHistoryFilterContextProps
  extends UseFormReturn<initialValues> {
  errors: errors | null;
}

export const TradeHistoryFilterContext =
  createContext<TradeHistoryFilterContextProps | null>(null);

export const TradeHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<initialValues>({
    defaultValues: {
      from: "",
      to: "",
      side: undefined,
      symbol: "",
      type: undefined,
    },
  });

  useEffect(() => {
    if (methods.formState.errors) setErrors(methods.formState.errors);
  }, [methods.formState.errors]);

  return (
    <TradeHistoryFilterContext.Provider value={{ ...methods, errors }}>
      {children}
    </TradeHistoryFilterContext.Provider>
  );
};

export const useTradeHistoryFilterContext = () => {
  const context = useContext(TradeHistoryFilterContext);
  if (!context) {
    throw new Error(
      "useTradeHistoryFilterContext must be used within TradeHistoryProvider",
    );
  }
  return context;
};
