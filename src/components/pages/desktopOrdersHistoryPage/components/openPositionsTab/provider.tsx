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

export interface PositionsHistoryFilterContextProps
  extends UseFormReturn<initialValues> {
  errors: errors | null;
}

export const PositionsHistoryFilterContext =
  createContext<PositionsHistoryFilterContextProps | null>(null);

export const PositionsHistoryProvider = ({
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
      type: undefined,
    },
  });

  useEffect(() => {
    if (methods.formState.errors) setErrors(methods.formState.errors);
  }, [methods.formState.errors]);

  return (
    <PositionsHistoryFilterContext.Provider value={{ ...methods, errors }}>
      {children}
    </PositionsHistoryFilterContext.Provider>
  );
};

export const usePositionsHistoryFilterContext = () => {
  const context = useContext(PositionsHistoryFilterContext);
  if (!context) {
    throw new Error(
      "usePositionsHistoryFilterContext must be used within PositionsHistoryProvider",
    );
  }
  return context;
};
