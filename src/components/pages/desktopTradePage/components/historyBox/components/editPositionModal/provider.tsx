// @nosort-imports
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";

export interface EditPositionFormValues {
  tp_price: string;
  sl_price: string;
  entryPrice: string;
  modifiedTp: string;
  modifiedSl: string;
  contractSize: string;
  leverage: string;
  backupMargin: string;
}

interface errors {
  contractSize?: FieldError;
  entryPrice?: FieldError;
  sl_price?: FieldError;
  tp_price?: FieldError;
  leverage?: FieldError;
  modifiedTp?: FieldError;
  modifiedSl?: FieldError;
  backupMargin?: FieldError;
}

interface EditPositionContextProps
  extends UseFormReturn<EditPositionFormValues> {
  errors: errors | null;
}

export const EditPositionContext =
  createContext<EditPositionContextProps | null>(null);

export const EditPositionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<EditPositionFormValues>({
    defaultValues: {
      tp_price: "",
      sl_price: "",
      leverage: "",
      entryPrice: "",
      modifiedTp: "",
      modifiedSl: "",
      contractSize: "",
      backupMargin: "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <EditPositionContext.Provider value={{ ...methods, errors }}>
      {children}
    </EditPositionContext.Provider>
  );
};

export const useEditPositionContext = () => {
  const context = useContext(EditPositionContext);
  if (!context) {
    throw new Error(
      "useEditPositionContext must be used within EditPositionContextProvider",
    );
  }
  return context;
};
