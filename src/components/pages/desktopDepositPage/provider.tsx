// @nosort-imports
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";

export interface DepositFormValues {
  coin: string;
  asset: string;
  network: string;
  coinIndex: number;
  deposit_id: string;
  depositQuantity: string;
  generatedAddress: string;
  isAddressDrawerOpen: boolean;
  isSelectCoinDrawerOpen: boolean;
  isSelectAssetDrawerOpen: boolean;
  isSelectNetworkDrawerOpen: boolean;
}

interface errors {
  coin?: FieldError;
  network?: FieldError;
  depositQuantity?: FieldError;
  deposit_id?: FieldError;
  coinIndex?: FieldError;
  isSelectCoinDrawerOpen?: FieldError;
  isSelectNetworkDrawerOpen?: FieldError;
  generatedAddress?: FieldError;
  asset?: FieldError;
  isSelectAssetDrawerOpen?: FieldError;
  isAddressDrawerOpen?: FieldError;
}

interface DepositContextProps extends UseFormReturn<DepositFormValues> {
  errors: errors | null;
}

export const DepositContext = createContext<DepositContextProps | null>(null);

export const DesktopDepositContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<DepositFormValues>({
    defaultValues: {
      coin: "",
      coinIndex: 0,
      network: "",
      generatedAddress: "",
      depositQuantity: "",
      deposit_id: "",
      asset: "irt",
      isSelectAssetDrawerOpen: false,
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
    <DepositContext.Provider value={{ ...methods, errors }}>
      {children}
    </DepositContext.Provider>
  );
};

export const useDesktopDepositContext = () => {
  const context = useContext(DepositContext);
  if (!context) {
    throw new Error(
      "useDesktopDepositContext must be used within DesktopDepositContextProvider",
    );
  }
  return context;
};
