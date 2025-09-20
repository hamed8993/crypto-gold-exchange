// @nosort-imports
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";

export interface WithdrawFormValues {
  selectedCoin: string;
  selectedNetwork: string;
  address: string;
  amount: string;
  asset: string;
  rate: string;
  isCoinDrawerOpen: boolean;
  isNetworkDrawerOpen: boolean;
}

interface errors {
  selectedCoin?: FieldError;
  selectedNetwork?: FieldError;
  isNetworkDrawerOpen?: FieldError;
  isCoinDrawerOpen?: FieldError;
  address?: FieldError;
  amount?: FieldError;
  asset?: FieldError;
  rate?: FieldError;
}

interface WithdrawContextProps extends UseFormReturn<WithdrawFormValues> {
  errors: errors | null;
}

export const WithdrawContext = createContext<WithdrawContextProps | null>(null);

export const WithdrawContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<WithdrawFormValues>({
    defaultValues: {
      selectedCoin: "",
      selectedNetwork: "",
      address: "",
      amount: "",
      rate: "",
      asset: "irt",
      isCoinDrawerOpen: false,
      isNetworkDrawerOpen: false,
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <WithdrawContext.Provider value={{ ...methods, errors }}>
      {children}
    </WithdrawContext.Provider>
  );
};

export const useWithdrawContext = () => {
  const context = useContext(WithdrawContext);
  if (!context) {
    throw new Error(
      "useWithdrawContext must be used within WithdrawContextProvider",
    );
  }
  return context;
};
