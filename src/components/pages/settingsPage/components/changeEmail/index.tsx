"use client";

/* eslint-disable @typescript-eslint/ban-ts-comment */

import AlertBox from "@/components/atoms/alertBox";
import CustomResend from "@/components/atoms/customResend";
import PwaPageLayout from "@/components/organisms/layout";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  usePostUser_dataSend_change_email_code,
  usePostUser_dataVerify_change_email_code,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { FormEventHandler, useState } from "react";
import CodeInput from "./components/codeInput";
import ConfirmButton from "./components/confirmButton";
import CurrentEmail from "./components/currentEmail";
import EmailInput from "./components/emailInput";
import { EmailChangeContextProvider, useEmailChangeContext } from "./provider";

interface ChangeEmailPageProps {
  className?: string;
}

function ChangeEmailPageComponent({ className }: ChangeEmailPageProps) {
  const t = useTranslations();
  const { watch } = useEmailChangeContext();

  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const [isOkToStart, setIsOkToStart] = useState<boolean>(false);
  const [isCodeSectionOpen, setIsCodeSectionOpen] = useState<boolean>(false);

  const { mutate } = usePostUser_dataSend_change_email_code({
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      setIsCodeSectionOpen(true);
      setIsOkToStart(true);
    },
  });

  const sendEmailCodeHandler = () => {
    mutate({
      requestBody: {
        email: watch("email"),
      },
    });
  };

  const { mutate: mutateChangeEmail, isPending: isPendingChangeEmail } =
    usePostUser_dataVerify_change_email_code({
      onError: (error) => {
        // @ts-ignore
        showError(getErrorMessages(error.message, error));
      },
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
      },
    });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutateChangeEmail({
      requestBody: {
        code: watch("code"),
      },
    });
  };

  return (
    <PwaPageLayout
      title={t("changeEmail")}
      hasFooter={false}
      hasBackChevron
      wrapperClassName={className}
    >
      <form
        className="flex h-full w-full flex-col items-center justify-between overflow-y-auto px-3 pb-14"
        onSubmit={onSubmit}
      >
        <div className="w-full">
          <p className="text-accentText mt-4 text-xs">
            {t("changeEmailDescription")}
          </p>
          <CurrentEmail />
          <EmailInput />
          <CustomResend
            isOkToStart={isOkToStart}
            onResend={sendEmailCodeHandler}
            setIsOkToStart={setIsOkToStart}
          />
          <CodeInput isCodeSectionOpen={isCodeSectionOpen} />

          <div className="flex h-4 min-h-4 w-2" />
          <AlertBox data={[t("email1")]} />
        </div>
        <ConfirmButton isPendingChangeEmail={isPendingChangeEmail} />
      </form>
    </PwaPageLayout>
  );
}

const ChangeEmailPage = ({ ...props }: ChangeEmailPageProps) => {
  return (
    <EmailChangeContextProvider>
      <ChangeEmailPageComponent {...props} />
    </EmailChangeContextProvider>
  );
};

export default ChangeEmailPage;
