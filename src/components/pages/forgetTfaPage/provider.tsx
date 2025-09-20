import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ForgetTfaFormValues {
  code: string;
  email: string;
}

interface errors {
  code?: FieldError;
  email?: FieldError;
}

interface ForgetTfaContextProps extends UseFormReturn<ForgetTfaFormValues> {
  errors: errors | null;
}

export const ForgetTfaContext = createContext<ForgetTfaContextProps | null>(
  null,
);

export const ForgetTfaContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<ForgetTfaFormValues>({
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

export const useForgetTfaContext = () => {
  const context = useContext(ForgetTfaContext);
  if (!context) {
    throw new Error(
      "useForgetTfaContext must be used within ForgetTfaContextProvider",
    );
  }
  return context;
};
