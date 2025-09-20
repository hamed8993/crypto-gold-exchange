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
  coin: string;
  network: string;
  address: string;
  amount: string;
  asset: string;
  rate: string;
}

interface errors {
  coin?: FieldError;
  network?: FieldError;
  address?: FieldError;
  amount?: FieldError;
  asset?: FieldError;
  rate?: FieldError;
}

interface WithdrawContextProps extends UseFormReturn<WithdrawFormValues> {
  errors: errors | null;
}

export const WithdrawContext = createContext<WithdrawContextProps | null>(null);

export const DesktopWithdrawContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<WithdrawFormValues>({
    defaultValues: {
      coin: "",
      network: "",
      address: "",
      amount: "",
      rate: "",
      asset: "irt",
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

export const useDesktopWithdrawContext = () => {
  const context = useContext(WithdrawContext);
  if (!context) {
    throw new Error(
      "useDesktopWithdrawContext must be used within DesktopWithdrawContextProvider",
    );
  }
  return context;
};
