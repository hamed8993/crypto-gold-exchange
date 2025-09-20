import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";

interface DesktopForgetTfaFormValues {
  code: string;
  email: string;
}

interface errors {
  code?: FieldError;
  email?: FieldError;
}

interface ForgetTfaContextProps
  extends UseFormReturn<DesktopForgetTfaFormValues> {
  errors: errors | null;
}

export const ForgetTfaContext = createContext<ForgetTfaContextProps | null>(
  null,
);

export const DesktopForgetTfaContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<DesktopForgetTfaFormValues>({
    defaultValues: {
      code: "",
      email: "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <ForgetTfaContext.Provider value={{ ...methods, errors }}>
      {children}
    </ForgetTfaContext.Provider>
  );
};

export const useDesktopForgetTfaContext = () => {
  const context = useContext(ForgetTfaContext);
  if (!context) {
    throw new Error(
      "useDesktopForgetTfaContext must be used within DesktopForgetTfaContextProvider",
    );
  }
  return context;
};
