import { Status } from "@/core/services/types";
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
  address: string;
  asset: string;
  payment_currency: string;
  network: string;
  status: Status | undefined;
}
interface errors {
  from?: FieldError;
  to?: FieldError;
  address?: FieldError;
  asset?: FieldError;
  status?: FieldError;
  network?: FieldError;
  payment_currency?: FieldError;
}

export interface DepositHistoryFilterContextProps
  extends UseFormReturn<initialValues> {
  errors: errors | null;
}

export const DepositHistoryFilterContext =
  createContext<DepositHistoryFilterContextProps | null>(null);

export const DepositHistoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<initialValues>({
    defaultValues: {
      from: "",
      to: "",
      payment_currency: "",
      status: undefined,
      network: "",
      address: "",
      asset: "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) setErrors(methods.formState.errors);
  }, [methods.formState.errors]);

  return (
    <DepositHistoryFilterContext.Provider value={{ ...methods, errors }}>
      {children}
    </DepositHistoryFilterContext.Provider>
  );
};

export const useDepositHistoryFilterContext = () => {
  const context = useContext(DepositHistoryFilterContext);
  if (!context) {
    throw new Error(
      "useDepositHistoryFilterContext must be used within DepositHistoryProvider",
    );
  }
  return context;
};
