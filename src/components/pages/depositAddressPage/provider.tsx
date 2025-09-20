// @nosort-imports
import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface DepositAddressFormValues {
  coin: string;
  network: string;
  coinIndex: number;
  depositQuantity: string;
  generatedAddress: string;
  isAddressDrawerOpen: boolean;
  isSelectCoinDrawerOpen: boolean;
  isSelectNetworkDrawerOpen: boolean;
}

interface errors {
  coin?: FieldError;
  network?: FieldError;
  depositQuantity?: FieldError;
  coinIndex?: FieldError;
  isSelectCoinDrawerOpen?: FieldError;
  isSelectNetworkDrawerOpen?: FieldError;
  generatedAddress?: FieldError;
  isAddressDrawerOpen?: FieldError;
}

interface DepositAddressContextProps
  extends UseFormReturn<DepositAddressFormValues> {
  errors: errors | null;
}

export const DepositAddressContext =
  createContext<DepositAddressContextProps | null>(null);

export const DepositAddressContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<DepositAddressFormValues>({
    defaultValues: {
      coin: "",
      coinIndex: 0,
      network: "",
      generatedAddress: "",
      depositQuantity: "",
      isSelectCoinDrawerOpen: false,
      isSelectNetworkDrawerOpen: false,
      isAddressDrawerOpen: false,
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <DepositAddressContext.Provider value={{ ...methods, errors }}>
      {children}
    </DepositAddressContext.Provider>
  );
};

export const useDepositAddressContext = () => {
  const context = useContext(DepositAddressContext);
  if (!context) {
    throw new Error(
      "useDepositContext must be used within DepositContextProvider",
    );
  }
  return context;
};
