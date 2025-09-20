/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import CustomButton from "@/components/atoms/customButton";
import { persistKeys } from "@/core/constants/keys";
import { useCounter } from "@/core/hooks/useCounter";
import usePasswordValidate from "@/core/hooks/usePasswordValidate";
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  usePostRegisterSend_register_code,
  usePostRegisterVerify,
} from "@/core/services/hooks";
import { CountdownTime } from "@/core/utilities/saveCountdownTime";
import AuthenticationLayout from "@/shared/molecules/authLayout";
import { getCookie, setCookie } from "cookies-next";
import { SHA256 } from "crypto-js";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FormEventHandler, useEffect, useMemo, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";
import CodeSection from "./CodeSection";
import CountrySection from "./CountrySection";
import EmailSection from "./EmailSection";
import NameSection from "./NameSection";
import PasswordSection from "./PasswordSection";
import { RegisterContextProvider, useRegisterContext } from "./provider";
import Title from "./Title";

interface RegisterPageDesktopProps {
  className?: string;
}

const RegisterPageComponent = ({ className }: RegisterPageDesktopProps) => {
  const t = useTranslations();
  const { locale } = useUrl();
  const { handleSavingTokens } = useAuth();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { clearErrors, handleSubmit, setError, trigger, watch, resetField } =
    useRegisterContext();

  const country = watch("country");
  const cellphone = watch("cellphone");
  const email = watch("email");
  const name = watch("name");
  const family_name = watch("family_name");
  const password = watch("password");
  const passwordRepeat = watch("passwordRepeat");
  const { isPasswordValid } = usePasswordValidate({ password });

  const [step, setStep] = useState<
    "country" | "email" | "name" | "code" | "password"
  >("country");

  const clickHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (step === "email") {
      setHasTriedToSubmit(true);
    }

    if (step === "country") {
      if (!watch("country")) {
        trigger("country");
        return;
      }
      setStep("email");
    } else if (step === "email") {
      const isCellphoneValid = await trigger("cellphone");
      if (!isCellphoneValid) {
        return;
      }

      const isEmailValid = await trigger("email");
      if (!isEmailValid) {
        return;
      }
      setStep("code");
      sendRegisterCode();
    } else if (step === "code") {
      const isDeviceCodeValid = await trigger("deviceCode");
      if (!isDeviceCodeValid) {
        return;
      }

      setStep("name");
    } else if (step === "name") {
      if (!watch("name")) {
        setError("name", { message: t("pleaseFillInput") });
        trigger("name");
        return;
      }
      if (!watch("family_name")) {
        setError("family_name", { message: t("pleaseFillInput") });
        trigger("family_name");
        return;
      }
      setStep("password");
    } else if (step === "password") {
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
      if (isValid()) {
        onSubmit();
      } else {
        return;
      }
    } else {
      return;
    }
  };
  const handlePrevious = () => {
    if (step === "password") {
      setStep("name");
      resetField("password");
      resetField("passwordRepeat");
    } else if (step === "name") {
      setStep("code");
      resetField("name");
      resetField("family_name");
    } else if (step === "code") {
      setStep("email");
      resetField("deviceCode");
    } else {
      setStep("country");
      resetField("cellphone");
      resetField("email");
    }
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

  const isValid = () => {
    return (
      checkCharacterLength() &&
      checkHasNumber() &&
      checkHasLowercase() &&
      checkHasUppercase()
    );
  };

  const { mutate, isPending } = usePostRegisterVerify({
    onSuccess: () => {
      showSuccess(t("loggedInSuccessfully"));
      handleSavingTokens({
        LT: "true",
      });
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/`;
    },
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message.error));
    },
  });

  const onSubmit = () => {
    handleSubmit(() =>
      mutate({
        requestBody: {
          name: watch("name"),
          family_name: watch("family_name"),
          email: watch("email"),
          cellphone: watch("cellphone"),
          country: watch("country"),
          referralCode: watch("referralCode"),
          confirmationCode: watch("deviceCode"),
          password: SHA256(watch("password")).toString(),
        },
      }),
    )();
  };

  useEffect(() => {
    clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, cellphone, email, name, family_name, password, passwordRepeat]);

  const countdown = new CountdownTime("Register");
  const [start, setStart] = useState<boolean>(false);
  const [countStart, setCountStart] = useState(countdown.getRemaining());

  const [hasTriedToSubmit, setHasTriedToSubmit] = useState<boolean>(false);

  const { count, isCounting, startCounting } = useCounter({
    end: 0,
    start: countStart && countStart !== -1 ? countStart : 60,
    startOnMount: false,
  });

  useMemo(() => {
    if (start) {
      setCountStart(countdown.getRemaining());

      startCounting();

      setStart(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  const { mutate: mutateRegisterCode, isPending: isPendingRegisterCode } =
    usePostRegisterSend_register_code({
      onSuccess: (data) => {
        countdown.save();
        setStart(true);
        showSuccess(getSuccessMessages(data.result));
      },
      onError: (error) => {
        // @ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const sendRegisterCode = () => {
    mutateRegisterCode({
      requestBody: {
        email: watch("email"),
      },
    });
  };

  return (
    <AuthenticationLayout className={className}>
      <div className="mx-auto flex h-full min-h-dvh w-full max-w-[400px] flex-col items-center justify-center gap-2">
        <form
          className="bg-surface flex h-[460px] min-h-[460px] w-full flex-col justify-between rounded-lg p-4"
          method="POST"
          onSubmit={clickHandler}
        >
          <div className="flex items-center justify-between">
            <Title />
            {step !== "country" && (
              <BiArrowBack
                className="text-mainText me-2 scale-125 cursor-pointer"
                onClick={handlePrevious}
              />
            )}
          </div>
          {step === "password" ? (
            <PasswordSection />
          ) : step === "name" ? (
            <NameSection />
          ) : step === "code" ? (
            <CodeSection
              count={count}
              isCounting={isCounting}
              isLoading={isPendingRegisterCode}
              setStart={(state) => setStart(state)}
            />
          ) : step === "email" ? (
            <EmailSection
              hasTriedToSubmit={hasTriedToSubmit}
              setHasTriedToSubmit={setHasTriedToSubmit}
            />
          ) : (
            <CountrySection />
          )}
          <CustomButton
            className="mt-auto flex h-12 w-full items-center justify-center gap-2 text-sm text-white"
            variant="primary"
            isLoading={step === "password" && isPending}
            isDisabled={step === "password" && !isPasswordValid}
          >
            {t("continue")}
            <IoChevronBack className="scale-125 text-white" />
          </CustomButton>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

const RegisterPageDesktop = ({ ...props }: RegisterPageDesktopProps) => {
  const referralCode =
    useSearchParams().get("ref") ||
    String(getCookie(persistKeys.GOLDFINO_REFERRAL || ""));

  if (referralCode && referralCode !== "undefined")
    setCookie(persistKeys.GOLDFINO_REFERRAL, referralCode);

  return (
    <RegisterContextProvider
      defaultValue={{
        referralCode:
          referralCode && referralCode !== "undefined" ? referralCode : "",
      }}
    >
      <RegisterPageComponent {...props} />
    </RegisterContextProvider>
  );
};

export default RegisterPageDesktop;
