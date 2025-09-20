import { Side, StatusOrder } from "@/core/services/types";
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
  status: StatusOrder | undefined;
  side: Side | undefined;
}
interface errors {
  from?: FieldError;
  to?: FieldError;
  symbol?: FieldError;
  status?: FieldError;
  side?: FieldError;
}

export interface OrdersHistoryFilterContextProps
  extends UseFormReturn<initialValues> {
  errors: errors | null;
}

export const OrdersHistoryFilterContext =
  createContext<OrdersHistoryFilterContextProps | null>(null);

export const OrdersHistoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<initialValues>({
    defaultValues: {
      from: "",
      to: "",
      side: undefined,
      symbol: "",
      status: undefined,
    },
  });

  useEffect(() => {
    if (methods.formState.errors) setErrors(methods.formState.errors);
  }, [methods.formState.errors]);

  return (
    <OrdersHistoryFilterContext.Provider value={{ ...methods, errors }}>
      {children}
    </OrdersHistoryFilterContext.Provider>
  );
};

export const useOrdersHistoryFilterContext = () => {
  const context = useContext(OrdersHistoryFilterContext);
  if (!context) {
    throw new Error(
      "useOrdersHistoryFilterContext must be used within OrdersHistoryProvider",
    );
  }
  return context;
};
