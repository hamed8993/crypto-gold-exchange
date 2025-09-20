// @nosort-imports
import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface PortfolioFormValues {
  transferAssetQuantity: string;
}

interface errors {
  transferAssetQuantity?: FieldError;
}

interface PortfolioContextProps extends UseFormReturn<PortfolioFormValues> {
  errors: errors | null;
}

export const PortfolioContext = createContext<PortfolioContextProps | null>(
  null,
);

export const PortfolioContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<PortfolioFormValues>({
    defaultValues: {
      transferAssetQuantity: "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <PortfolioContext.Provider value={{ ...methods, errors }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error(
      "usePortfolioContext must be used within PortfolioContextProvider",
    );
  }
  return context;
};
