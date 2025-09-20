import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";

interface PasswordChangeFormValues {
  passwordCurrent: string;
  passwordNew: string;
  passwordRepeat: string;
}

interface errors {
  passwordCurrent?: FieldError;
  passwordNew?: FieldError;
  passwordRepeat?: FieldError;
}

interface PasswordChangeContextProps
  extends UseFormReturn<PasswordChangeFormValues> {
  errors: errors | null;
}

export const PasswordChangeContext =
  createContext<PasswordChangeContextProps | null>(null);

export const PasswordChangeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<PasswordChangeFormValues>({
    defaultValues: {
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
    <PasswordChangeContext.Provider value={{ ...methods, errors }}>
      {children}
    </PasswordChangeContext.Provider>
  );
};

export const usePasswordChangeContext = () => {
  const context = useContext(PasswordChangeContext);
  if (!context) {
    throw new Error(
      "usePasswordChangeContext must be used within PasswordChangeContextProvider",
    );
  }
  return context;
};
