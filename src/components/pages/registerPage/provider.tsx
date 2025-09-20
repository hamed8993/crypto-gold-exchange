import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";

interface RegisterFormValues {
  cellphone: string;
  email: string;
  password: string;
  deviceCode: string;
  referralCode: string;
  passwordRepeat: string;
  country: string;
  countrySearch: string;
  hasRefCode: boolean;
  name: string;
  family_name: string;
}

interface errors {
  cellphone?: FieldError;
  email?: FieldError;
  password?: FieldError;
  deviceCode?: FieldError;
  referralCode?: FieldError;
  passwordRepeat?: FieldError;
  country?: FieldError;
  countrySearch?: FieldError;
  hasRefCode?: FieldError;
  name?: FieldError;
  family_name?: FieldError;
}

interface RegisterContextProps extends UseFormReturn<RegisterFormValues> {
  errors: errors | null;
}

export const RegisterContext = createContext<RegisterContextProps | null>(null);

export const RegisterContextProvider = ({
  children,
  defaultValue,
}: {
  children: ReactNode;
  defaultValue?: Partial<RegisterFormValues>;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<RegisterFormValues>({
    defaultValues: {
      cellphone: defaultValue?.cellphone || "",
      deviceCode: defaultValue?.deviceCode || "",
      email: defaultValue?.email || "",
      password: defaultValue?.password || "",
      passwordRepeat: defaultValue?.passwordRepeat || "",
      referralCode: defaultValue?.referralCode || "",
      country: defaultValue?.country || "",
      countrySearch: defaultValue?.countrySearch || "",
      hasRefCode: defaultValue?.hasRefCode || false,
      name: defaultValue?.name || "",
      family_name: defaultValue?.family_name || "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <RegisterContext.Provider value={{ ...methods, errors }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterContext = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error(
      "useRegisterContext must be used within RegisterContextProvider",
    );
  }
  return context;
};
