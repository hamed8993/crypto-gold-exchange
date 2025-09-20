"use client";

/* eslint-disable @typescript-eslint/ban-ts-comment */

import CustomButton from "@/components/atoms/customButton";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import PwaPageLayout from "@/components/organisms/layout";
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  usePostLoginEmail_login,
  usePostLoginVerify2fa,
} from "@/core/services/hooks";
import { SHA256 } from "crypto-js";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import EmailInput from "./components/emailInput";
import PasswordInput from "./components/passwordInput";
import { LoginContextProvider, useLoginContext } from "./provider";

interface LoginPageComponentProps {
  className?: string;
}

function LoginPageComponent({ className }: LoginPageComponentProps) {
  const t = useTranslations();
  const { getErrorMessages } = useGetAPIMessages();
  const { showError, showSuccess } = useNotification();

  const { locale } = useUrl();
  const { handleSavingTokens } = useAuth();

  const { watch, handleSubmit } = useLoginContext();

  const [isManuallyLoading, setIsManuallyLoading] = useState<boolean>(false);

  const { mutate: mutateVerify2fa, isPending: isPendingVerify2fa } =
    usePostLoginVerify2fa({
      onSuccess: () => {
        showSuccess(t("loggedInSuccessfully"));
        handleSavingTokens({
          LT: "true",
        });
        setIsManuallyLoading(true);
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/`;
      },
      onError: (err) => {
        // @ts-ignore
        showError(getErrorMessages(err.message.error));
      },
    });

  const { mutate, isPending } = usePostLoginEmail_login({
    onSuccess: (data) => {
      // @ts-ignore
      if (data.result?.tfaStatus === "on") {
        // TODO: Update api & navigate to tfa screen
      } else {
        mutateVerify2fa({
          requestBody: {
            tfaCode: "",
          },
        });
      }
    },
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message.error));
    },
  });

  const onSubmit = () => {
    mutate({
      requestBody: {
        email: watch("email"),
        password: SHA256(watch("password")).toString(),
      },
    });
  };

  return (
    <PwaPageLayout
      containerClassName="py-0 pl-0 pr-0 pt-0 bg-mainBackgroundDark"
      hasBackChevron
      hasFooter={false}
      wrapperClassName={className}
    >
      <div className="bg-mainBackground flex h-full w-full flex-col items-center justify-center gap-5 pt-8">
        <div className="mb-5 flex h-full w-full flex-col items-center justify-start px-3">
          <div className="mb-20 flex w-full flex-col">
            <EmailInput />

            <PasswordInput />

            <Link
              className="dark text-mainBrand mt-4 self-start text-xs"
              href={`/${locale}/authentication/forget-password`}
            >
              {t("forgetPassword")}
            </Link>

            <span className="text-mainText mt-5 w-full text-xs">
              {t("haveNoAccount")}
              <Link
                className="text-mainBrand text-justify text-xs"
                href={`/${locale}/authentication/register`}
                prefetch
              >
                {t("createAccount")}
              </Link>
            </span>
          </div>
          <StickyComponent className="bg-mainBackground mb-2 w-full px-2">
            <CustomButton
              className="mb-2 flex h-12 w-full items-center justify-center gap-2 text-sm text-white"
              isDisabled={isManuallyLoading || isPending || isPendingVerify2fa}
              isLoading={isManuallyLoading || isPending || isPendingVerify2fa}
              onClick={handleSubmit(onSubmit)}
              variant="primary"
            >
              <IoIosLogIn className="scale-125 text-white" />
              {t("login")}
            </CustomButton>
          </StickyComponent>
        </div>
      </div>
    </PwaPageLayout>
  );
}

const LoginPage = ({ ...props }: LoginPageComponentProps) => {
  return (
    <LoginContextProvider>
      <LoginPageComponent {...props} />
    </LoginContextProvider>
  );
};

export default LoginPage;
