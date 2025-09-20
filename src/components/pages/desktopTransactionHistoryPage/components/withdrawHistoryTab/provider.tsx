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

export interface WithdrawHistoryFilterContextProps
  extends UseFormReturn<initialValues> {
  errors: errors | null;
}

export const WithdrawHistoryFilterContext =
  createContext<WithdrawHistoryFilterContextProps | null>(null);

export const WithdrawHistoryProvider = ({
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
    <WithdrawHistoryFilterContext.Provider value={{ ...methods, errors }}>
      {children}
    </WithdrawHistoryFilterContext.Provider>
  );
};

export const useWithdrawHistoryFilterContext = () => {
  const context = useContext(WithdrawHistoryFilterContext);
  if (!context) {
    throw new Error(
      "useWithdrawHistoryFilterContext must be used within WithdrawHistoryProvider",
    );
  }
  return context;
};
