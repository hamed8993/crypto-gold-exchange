/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import CustomButton from "@/components/atoms/customButton";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  usePostSecurityReset_password,
  usePostSecuritySend_password_reset_code,
} from "@/core/services/hooks";
import { SHA256 } from "crypto-js";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import EmailSection from "./EmailSection";
import PasswordSection from "./PasswordSection";
import {
  ForgetPasswordContextProvider,
  useForgetPasswordContext,
} from "./provider";
import Title from "./Title";

interface ForgetPasswordPageDesktopProps {
  className?: string;
}

const ForgetPasswordComponent = ({
  className,
}: ForgetPasswordPageDesktopProps) => {
  const t = useTranslations();
  const { locale } = useUrl();
  const { replace } = useRouter();
  const { handleSavingTokens } = useAuth();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { showError, showSuccess } = useNotification();

  const [isManuallyLoading, setIsManuallyLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"email" | "code" | "password">("email");

  const { watch, setError, trigger, resetField } = useForgetPasswordContext();

  const handleClick: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (step === "password") {
      if (!watch("password")) {
        setError("password", { message: t("pleaseFillInput") });
        trigger("password");
        return;
      }
      if (!watch("passwordRepeat")) {
        setError("passwordRepeat", { message: t("pleaseFillInput") });
        trigger("passwordRepeat");
        return;
      }
      onSubmit();
    } else {
      if (step === "code") {
        const isResetCodeValid = await trigger("resetCode");
        if (!isResetCodeValid) {
          return;
        }
        setStep("password");
      } else {
        const isEmailValid = await trigger("email");
        if (!isEmailValid) {
          return;
        }
        setStep("code");
        sendCode();
      }
    }
  };

  const { mutate, isPending } = usePostSecurityReset_password({
    onSuccess: () => {
      handleSavingTokens({
        LT: "true",
      });
      showSuccess(t("yourAccountHasBeenCreatedSuccessfully"));
      setIsManuallyLoading(true);
      replace(`/${locale}${RoutesName.dashboard}`);
    },
    onError: (err) => {
      // @ts-ignore
      showError(getErrorMessages(err.message.error));
    },
  });

  const onSubmit = () => {
    mutate({
      requestBody: {
        email: watch("email"),
        newPassword: SHA256(watch("password")).toString(),
        resetCode: watch("resetCode"),
      },
    });
  };

  const { mutate: mutateSendCode, isPending: isPendingSendCode } =
    usePostSecuritySend_password_reset_code({
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
      },
      onError: (error) => {
        // @ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const sendCode = () => {
    mutateSendCode({
      requestBody: {
        email: watch("email"),
      },
    });
  };

  const checkCharacterLength = () => {
    return watch("password").length >= 8;
  };

  const checkHasNumber = () => {
    return /\d/.test(watch("password"));
  };

  const checkHasLowercase = () => {
    return /[a-z]/.test(watch("password"));
  };

  const checkHasUppercase = () => {
    return /[A-Z]/.test(watch("password"));
  };

  const isButtonDisabled =
    !checkCharacterLength() ||
    !checkHasNumber() ||
    !checkHasLowercase() ||
    !checkHasUppercase() ||
    watch("password") !== watch("passwordRepeat");

  return (
    <DesktopPageLayout className={className} hasFooter hasHeader>
      <div className="mx-auto flex h-full min-h-dvh w-full max-w-[400px] flex-col items-center justify-center gap-2">
        <form
          className="bg-surface flex h-[460px] min-h-[460px] w-full flex-col justify-between rounded-lg p-4"
          method="POST"
          onSubmit={handleClick}
        >
          <div className="flex items-center justify-between">
            <Title />
            {step === "password" && (
              <BiArrowBack
                className="text-mainText me-2 scale-125 cursor-pointer"
                onClick={() => {
                  setStep("email");
                  resetField("password");
                  resetField("resetCode");
                  resetField("passwordRepeat");
                }}
              />
            )}
          </div>

          {step === "password" ? (
            <PasswordSection />
          ) : (
            <EmailSection step={step} />
          )}

          <CustomButton
            className="mt-auto h-12 w-full rounded-md"
            isDisabled={
              !watch("email") ||
              (step === "code" && isPendingSendCode) ||
              (step === "password" && isButtonDisabled)
            }
            isLoading={isManuallyLoading || isPending}
          >
            {t("continue")}
          </CustomButton>
        </form>
      </div>
    </DesktopPageLayout>
  );
};

const ForgetPasswordPageDesktop = ({
  ...props
}: ForgetPasswordPageDesktopProps) => {
  return (
    <ForgetPasswordContextProvider>
      <ForgetPasswordComponent {...props} />
    </ForgetPasswordContextProvider>
  );
};

export default ForgetPasswordPageDesktop;
