/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

// @nosort-imports

import { localeType } from "@/app/[locale]/layout";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { RequestError } from "../../services/config";
import { useGetCodesError, useGetCodesSuccess } from "../../services/hooks";

interface ApiMessages {
  fa: Record<string, string>;
  en: Record<string, string>;
}

interface ApiMessagesContextProps {
  error: ApiMessages;
  success: ApiMessages;
}

const initialValues: ApiMessagesContextProps = {
  error: { en: {}, fa: {} },
  success: { en: {}, fa: {} },
};

export const ApiMessageContext =
  createContext<ApiMessagesContextProps>(initialValues);

export const ApiMessagesProvider = ({ children }: { children: ReactNode }) => {
  const { data: dataError, isSuccess: isErrorLoaded } = useGetCodesError({
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const { data: dataSuccess, isSuccess: isSuccessLoaded } = useGetCodesSuccess({
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const [message, setMessage] =
    useState<ApiMessagesContextProps>(initialValues);

  useEffect(() => {
    setMessage({
      error: isErrorLoaded ? (dataError as ApiMessages) : initialValues.error,
      success: isSuccessLoaded
        ? (dataSuccess as ApiMessages)
        : initialValues.success,
    });
  }, [dataError, dataSuccess, isErrorLoaded, isSuccessLoaded]);

  return (
    <ApiMessageContext.Provider value={message}>
      {children}
    </ApiMessageContext.Provider>
  );
};

export const useGetAPIMessages = () => {
  const t = useTranslations();
  const { locale } = useUrl();
  const { error, success } = useContext(ApiMessageContext);

  const errors = !rtlLanguages.includes(locale as localeType)
    ? error.en
    : error.fa;

  const getErrorMessages = (error: RequestError | Error | null | undefined) => {
    if (!error) return "";
    if (error.message === "noInternetConnection")
      return t("noInternetConnection");
    // @ts-ignore
    return errors?.[error] || t("anErrorOccurred");
  };

  const successes = !rtlLanguages.includes(locale as localeType)
    ? success.en
    : success.fa;

  const getSuccessMessages = (message: string) => {
    return successes?.[message];
  };

  return { getErrorMessages, getSuccessMessages };
};
