"use client";
import CustomButton from "@/components/atoms/customButton";
import InputDesktop from "@/components/molecules/inputDesktop";
import PinInput from "@/components/molecules/pinInput";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  usePostSecurityReset_2fa,
  usePostSecuritySend_2fa_reset_code,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { FormEventHandler, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  DesktopForgetTfaContextProvider,
  useDesktopForgetTfaContext,
} from "./provider";
import Title from "./Title";

interface DesktopForgetTfaPageProps {
  className?: string;
}

function Component({ className }: DesktopForgetTfaPageProps) {
  const t = useTranslations();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const [isEmailPlaceHolderVisible, setIsEmailPlaceholderVisible] =
    useState<boolean>(false);

  const [isOkToStart, setIsOkToStart] = useState<boolean>(false);
  const [isCodeSectionOpen, setIsCodeSectionOpen] = useState<boolean>(false);

  const { control, watch, setValue, errors } = useDesktopForgetTfaContext();

  const email = watch("email");

  const { mutate } = usePostSecuritySend_2fa_reset_code({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      setIsCodeSectionOpen(true);
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    <DesktopPageLayout hasFooter={false} className={className}>
      <div className="mx-auto flex h-full min-h-dvh w-full max-w-[400px] flex-col items-center justify-center gap-2">
        <form
          className="flex h-[460px] min-h-[460px] w-full flex-col justify-start rounded-lg bg-surface p-4 dark:bg-surfaceDark"
          method="POST"
          onSubmit={onSubmit}
        >
          <Title />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <InputDesktop
                {...field}
                label={t("email")}
                labelContainerClassName="bg-surface dark:bg-surfaceDark"
                maxLength={50}
                error={errors?.email?.message}
                onFocus={() => setIsEmailPlaceholderVisible(true)}
                onBlur={() => setIsEmailPlaceholderVisible(false)}
                placeholder={
                  !isEmailPlaceHolderVisible ? t("enterYourEmail") : undefined
                }
              />
            )}
            rules={{
              required: { message: t("pleaseFillInput"), value: true },
            }}
          />

          <PinInput
            isCodeSectionOpen={isCodeSectionOpen}
            isOkToStart={isOkToStart}
            className="mt-5"
            onPinComplete={onPinComplete}
            sendEmailCodeHandler={sendEmailCodeHandler}
            setIsOkToStart={setIsOkToStart}
          />

          <CustomButton
            className="mt-auto flex h-12 w-full items-center justify-center gap-2 text-sm text-white"
            variant="primary"
          >
            {t("confirm")}
          </CustomButton>
        </form>
      </div>
    </DesktopPageLayout>
  );
}
const DesktopForgetTfaPage = ({ ...rest }: DesktopForgetTfaPageProps) => {
  return (
    <DesktopForgetTfaContextProvider>
      <Component {...rest} />
    </DesktopForgetTfaContextProvider>
  );
};
export default DesktopForgetTfaPage;
