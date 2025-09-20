import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { calenderData } from "@/components/muscles/datePicker";
import { transactionsHistoryTabs } from ".";

interface TransactionHistoryFiltersValues extends calenderData {
  activeTab: transactionsHistoryTabs;
  address: string;
  addressApply: string;
  asset: string;
  assetApply: string;
  fromDate: string;
  fromDateApply: string;
  fromDay: string;
  fromMonth: string;
  fromYear: string;
  isFilterBoxVisible: boolean;
  isFilterApplied: boolean;
  network: string;
  networkApply: string;
  payment_currency: string;
  payment_currencyApply: string;
  status:
    | "pending"
    | "cancelled"
    | "rejected"
    | "completed"
    | "processing"
    | undefined;
  statusApply:
    | "pending"
    | "cancelled"
    | "rejected"
    | "completed"
    | "processing"
    | undefined;
  toDate: string;
  toDateApply: string;
  toDay: string;
  toMonth: string;
  toYear: string;
  tx?: string;
  txApply?: string;
}

interface errors {
  address?: FieldError;
  asset?: FieldError;
  fromDate?: FieldError;
  fromYear?: FieldError;
  fromMonth?: FieldError;
  fromDay?: FieldError;
  network?: FieldError;
  payment_currency?: FieldError;
  status?: FieldError;
  toDate?: FieldError;
  toYear?: FieldError;
  toMonth?: FieldError;
  toDay?: FieldError;
  tx?: FieldError;
}

interface TransactionsHistoryContextProps
  extends UseFormReturn<TransactionHistoryFiltersValues> {
  errors: errors | null;
}

export const transactionsHistoryContext =
  createContext<TransactionsHistoryContextProps | null>(null);

export const TransactionsHistoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [errors, setErrors] = useState<errors | null>(null);

  const methods = useForm<TransactionHistoryFiltersValues>({
    defaultValues: {
      activeTab: "deposit",
      address: "",
      addressApply: "",
      asset: "",
      assetApply: "",
      fromDate: "",
      fromDateApply: "",
      fromYear: "",
      fromMonth: "",
      fromDay: "",
      isFilterBoxVisible: false,
      isFilterApplied: false,
      network: "",
      networkApply: "",
      payment_currency: "",
      payment_currencyApply: "",
      status: undefined,
      statusApply: undefined,
      toDate: "",
      toDateApply: "",
      toYear: "",
      toMonth: "",
      toDay: "",
      tx: "",
      txApply: "",
    },
  });

  useEffect(() => {
    if (methods.formState.errors) {
      setErrors(methods.formState.errors);
    }
  }, [methods.formState.errors]);

  return (
    <transactionsHistoryContext.Provider value={{ ...methods, errors }}>
      {children}
    </transactionsHistoryContext.Provider>
  );
};

export const useTransactionsHistoryContext = () => {
  const context = useContext(transactionsHistoryContext);
  if (!context) {
    throw new Error(
      "useTransactionsHistoryContext must be used within TransactionsHistoryContextProvider",
    );
  }
  return context;
};
