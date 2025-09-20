/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import CustomButton from "@/components/atoms/customButton";
import CustomInput from "@/components/atoms/customInput";
import PinInput from "@/components/molecules/pinInput";
import PwaPageLayout from "@/components/organisms/layout";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  usePostSecurityReset_2fa,
  usePostSecuritySend_2fa_reset_code,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FormEventHandler, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { ForgetTfaContextProvider, useForgetTfaContext } from "./provider";

interface ForgetTfaPageProps {
  className?: string;
}

function ForgetTfaPageComponent({ className }: ForgetTfaPageProps) {
  const t = useTranslations();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const [isOkToStart, setIsOkToStart] = useState<boolean>(false);
  const [isCodeSectionOpen, setIsCodeSectionOpen] = useState<boolean>(false);

  const { control, watch, setValue } = useForgetTfaContext();

  const email = watch("email");

  const { mutate } = usePostSecuritySend_2fa_reset_code({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      setIsCodeSectionOpen(true);
    },
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const sendEmailCodeHandler = () => {
    mutate({
      requestBody: {
        email: watch("email"),
      },
    });
  };

  const onPinComplete = (value: string) => {
    setValue("code", value);
  };

  const { mutate: mutateReset2fa } = usePostSecurityReset_2fa({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
    },
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
      setIsCodeSectionOpen(false);
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isCodeSectionOpen) {
      mutateReset2fa({
        requestBody: {
          email: watch("email"),
          resetCode: watch("code"),
        },
      });
    } else {
      sendEmailCodeHandler();
    }
  };

  useEffect(() => {
    setIsCodeSectionOpen(false);
  }, [email]);

  return (
    <PwaPageLayout
      wrapperClassName={className}
      hasBackChevron
      hasFooter={false}
      title={t("forgetTfa")}
    >
      <form
        className="flex h-[calc(100dvh-48px)] w-full flex-col items-center justify-between shadow-none"
        onSubmit={onSubmit}
      >
        <div className="mt-4 flex h-fit w-full flex-col items-center justify-start">
          <div className="mt-5 flex h-80 w-80 items-center justify-center">
            <Image
              alt="google authenticator"
              height={150}
              src={"/assets/images/authenticator.png"}
              width={150}
            />
          </div>
          <p className="text-mainText mb-5">{t("enterYourEmail")}</p>

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <CustomInput
                {...field}
                label={t("email")}
                maxLength={100}
                inputClassName="h-10"
              />
            )}
            rules={{ required: { message: t("pleaseFillInput"), value: true } }}
          />

          <PinInput
            isCodeSectionOpen={isCodeSectionOpen}
            isOkToStart={isOkToStart}
            className="mt-10"
            onPinComplete={onPinComplete}
            sendEmailCodeHandler={sendEmailCodeHandler}
            setIsOkToStart={setIsOkToStart}
          />
        </div>
        <CustomButton className="bg-mainBrand mb-3 flex h-12 w-full items-center justify-center text-sm">
          {t("confirm")}
        </CustomButton>
      </form>
    </PwaPageLayout>
  );
}

const ForgetTfaPage = ({ ...rest }: ForgetTfaPageProps) => {
  return (
    <ForgetTfaContextProvider>
      <ForgetTfaPageComponent {...rest} />
    </ForgetTfaContextProvider>
  );
};

export default ForgetTfaPage;
