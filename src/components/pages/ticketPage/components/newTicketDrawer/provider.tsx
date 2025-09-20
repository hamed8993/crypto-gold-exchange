import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface NewTicketFormValues {
  title: string;
  description: string;
}

interface errors {
  title?: FieldError;
  description?: FieldError;
}

interface NewTicketContextProps extends UseFormReturn<NewTicketFormValues> {
  errors: errors | null;
}

export const NewTicketContext = createContext<NewTicketContextProps | null>(
  null,
);

export const NewTicketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<NewTicketFormValues>({
    defaultValues: {
      description: "",
      title: "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <NewTicketContext.Provider value={{ ...methods, errors }}>
      {children}
    </NewTicketContext.Provider>
  );
};

export const useNewTicketContext = () => {
  const context = useContext(NewTicketContext);
  if (!context) {
    throw new Error(
      "useNewTicketContext must be used within NewTicketContextProvider",
    );
  }
  return context;
};
