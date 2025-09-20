import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ActivateTFAFormValues {
  tfaCode: string;
}

interface errors {
  tfaCode?: FieldError;
}

interface ActivateTFAContextProps extends UseFormReturn<ActivateTFAFormValues> {
  errors: errors | null;
}

export const ActivateTFAContext = createContext<ActivateTFAContextProps | null>(
  null,
);

export const ActivateTFAContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<ActivateTFAFormValues>({
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
    <ActivateTFAContext.Provider value={{ ...methods, errors }}>
      {children}
    </ActivateTFAContext.Provider>
  );
};

export const useActivateTFAContext = () => {
  const context = useContext(ActivateTFAContext);
  if (!context) {
    throw new Error(
      "useActivateTFAContext must be used within ActivateTFAContextProvider",
    );
  }
  return context;
};
