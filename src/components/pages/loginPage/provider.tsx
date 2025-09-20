import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";

interface LoginFormValues {
  email: string;
  phone: string;
  tfaCode: string;
  password: string;
  deviceCode: string;
}

interface errors {
  email?: FieldError;
  phone?: FieldError;
  tfaCode?: FieldError;
  password?: FieldError;
  deviceCode?: FieldError;
}

interface LoginContextProps extends UseFormReturn<LoginFormValues> {
  errors: errors | null;
}

export const LoginContext = createContext<LoginContextProps | null>(null);

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<LoginFormValues>({
    defaultValues: {
      deviceCode: "",
      email: "",
      password: "",
      phone: "",
      tfaCode: "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <LoginContext.Provider value={{ ...methods, errors }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within LoginContextProvider");
  }
  return context;
};
