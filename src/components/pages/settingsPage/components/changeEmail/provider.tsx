import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface EmailChangeFormValues {
  code: string;
  email: string;
}

interface errors {
  code?: FieldError;
  email?: FieldError;
}

interface EmailChangeContextProps extends UseFormReturn<EmailChangeFormValues> {
  errors: errors | null;
}

export const EmailChangeContext = createContext<EmailChangeContextProps | null>(
  null,
);

export const EmailChangeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<EmailChangeFormValues>({
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
    <EmailChangeContext.Provider value={{ ...methods, errors }}>
      {children}
    </EmailChangeContext.Provider>
  );
};

export const useEmailChangeContext = () => {
  const context = useContext(EmailChangeContext);
  if (!context) {
    throw new Error(
      "useEmailChangeContext must be used within EmailChangeContextProvider",
    );
  }
  return context;
};
