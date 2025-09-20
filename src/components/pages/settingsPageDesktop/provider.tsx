import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";

interface SettingsFormValues {
  code: string;
  email: string;
  passwordCurrent: string;
  passwordNew: string;
  passwordRepeat: string;
}

interface errors {
  code?: FieldError;
  email?: FieldError;
  passwordCurrent?: FieldError;
  passwordNew?: FieldError;
  passwordRepeat?: FieldError;
}

interface SettingsContextProps extends UseFormReturn<SettingsFormValues> {
  errors: errors | null;
}

export const SettingsContext = createContext<SettingsContextProps | null>(null);

export const SettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<SettingsFormValues>({
    defaultValues: {
      code: "",
      email: "",
      passwordCurrent: "",
      passwordNew: "",
      passwordRepeat: "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <SettingsContext.Provider value={{ ...methods, errors }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContextProvider = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContextProvider must be used within SettingsContextProviderProvider",
    );
  }
  return context;
};
