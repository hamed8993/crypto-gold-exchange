import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface DeactivateTFAFormValues {
  tfaCode: string;
}

interface errors {
  tfaCode?: FieldError;
}

interface DeactivateTFAContextProps
  extends UseFormReturn<DeactivateTFAFormValues> {
  errors: errors | null;
}

export const DeactivateTFAContext =
  createContext<DeactivateTFAContextProps | null>(null);

export const DeactivateTFAContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<DeactivateTFAFormValues>({
    defaultValues: {
      tfaCode: "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <DeactivateTFAContext.Provider value={{ ...methods, errors }}>
      {children}
    </DeactivateTFAContext.Provider>
  );
};

export const useDeactivateTFAContext = () => {
  const context = useContext(DeactivateTFAContext);
  if (!context) {
    throw new Error(
      "useDeactivateTFAContext must be used within DeactivateTFAContextProvider",
    );
  }
  return context;
};
