import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ForgetPasswordFormValues {
  email: string;
  password: string;
  resetCode: string;
  passwordRepeat: string;
}

interface errors {
  email?: FieldError;
  password?: FieldError;
  resetCode?: FieldError;
  passwordRepeat?: FieldError;
}

interface ForgetPasswordContextProps
  extends UseFormReturn<ForgetPasswordFormValues> {
  errors: errors | null;
}

export const ForgetPasswordContext =
  createContext<ForgetPasswordContextProps | null>(null);

export const ForgetPasswordContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<ForgetPasswordFormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
      resetCode: "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <ForgetPasswordContext.Provider value={{ ...methods, errors }}>
      {children}
    </ForgetPasswordContext.Provider>
  );
};

export const useForgetPasswordContext = () => {
  const context = useContext(ForgetPasswordContext);
  if (!context) {
    throw new Error(
      "useForgetPasswordContext must be used within ForgetPasswordContextProvider",
    );
  }
  return context;
};
