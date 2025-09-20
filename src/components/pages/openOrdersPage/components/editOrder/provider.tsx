// @nosort-imports
import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface EditOrderFormValues {
  tp_price: string;
  sl_price: string;
  entryPrice: string;
  modifiedTp: string;
  modifiedSl: string;
  contractSize: string;
  leverage: string;
  isStopLossEditable: boolean;
  isTargetPointEditable: boolean;
}

interface errors {
  contractSize?: FieldError;
  entryPrice?: FieldError;
  sl_price?: FieldError;
  tp_price?: FieldError;
  leverage?: FieldError;
  modifiedTp?: FieldError;
  modifiedSl?: FieldError;
  isStopLossEditable?: FieldError;
  isTargetPointEditable?: FieldError;
}

interface EditOrderContextProps extends UseFormReturn<EditOrderFormValues> {
  errors: errors | null;
}

export const EditOrderContext = createContext<EditOrderContextProps | null>(
  null,
);

export const EditOrderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<EditOrderFormValues>({
    defaultValues: {
      tp_price: "",
      sl_price: "",
      leverage: "",
      entryPrice: "",
      modifiedTp: "",
      modifiedSl: "",
      contractSize: "",
      isStopLossEditable: false,
      isTargetPointEditable: false,
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <EditOrderContext.Provider value={{ ...methods, errors }}>
      {children}
    </EditOrderContext.Provider>
  );
};

export const useEditOrderContext = () => {
  const context = useContext(EditOrderContext);
  if (!context) {
    throw new Error(
      "useEditOrderContext must be used within EditOrderContextProvider",
    );
  }
  return context;
};
