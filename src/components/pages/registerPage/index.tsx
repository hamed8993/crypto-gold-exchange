"use client";

import { localeType } from "@/app/[locale]/layout";
import PwaPageLayout from "@/components/organisms/layout";
import LoginRegisterDrawer from "@/components/pages/loginPage/components/loginRegisterDrawer";
import { rtlLanguages } from "@/core/constants/constants";
import { persistKeys } from "@/core/constants/keys";
import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import { getCookie, setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import RegisterSteps from "./components/RegisterSteps";
import { RegisterContextProvider, useRegisterContext } from "./provider";

interface RegisterPageComponentProps {
  className?: string;
}

const steps = [0, 1, 2, 3, 4];

function RegisterPageComponent({ className }: RegisterPageComponentProps) {
  const { locale } = useUrl();
  const { back } = useRouter();
  const [step, setStep] = useState<number>(0);
  const [isWelcomeDrawerOpen, setIsWelcomeDrawerOpen] =
    useState<boolean>(false);

  const { resetField } = useRegisterContext();

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    switch (step) {
      case 0:
        break;

      case 1:
        resetField("cellphone");
        resetField("email");
        setStep((prev) => prev - 1);
        break;
      case 2:
        resetField("deviceCode");
        setStep((prev) => prev - 1);
        break;
      case 3:
        resetField("name");
        resetField("family_name");
        setStep((prev) => prev - 1);
        break;
      case 4:
        resetField("password");
        resetField("passwordRepeat");
        setStep((prev) => prev - 1);
        break;
    }
  };

  const drawerCloseHandler = () => {
    setIsWelcomeDrawerOpen(false);
  };

  return (
    <PwaPageLayout
      hasFooter={false}
      headerComponent={
        <div className="bg-mainBackground sticky top-0 z-10 flex h-12 items-center justify-center">
          {step !== 0 && (
            <button
              className={clsx(
                "absolute flex h-10 w-10 items-center justify-center",
                rtlLanguages.includes(locale as localeType)
                  ? "right-1"
                  : "left-1",
              )}
              onClick={() => prevStep()}
            >
              {!rtlLanguages.includes(locale as localeType) ? (
                <FaArrowLeft className={"text-mainText"} />
              ) : (
                <FaArrowRight className={"text-mainText"} />
              )}
            </button>
          )}
          <div className="bg-accentText h-[6px] w-[40%] rounded-[4px]">
            <div
              className="bg-positive h-full rounded-[4px]"
              style={{
                width:
                  step === 0
                    ? "20%"
                    : step === 1
                      ? "40%"
                      : step === 2
                        ? "60%"
                        : "80%",
              }}
            ></div>
          </div>
          <button
            className={clsx(
              "absolute flex h-10 w-10 items-center justify-center",
              rtlLanguages.includes(locale as localeType)
                ? "left-1"
                : "right-1",
            )}
            onClick={back}
          >
            <IoMdClose className={"text-mainText"} />
          </button>
        </div>
      }
      wrapperClassName={className}
    >
      <div className="bg-mainBackground relative mx-auto flex h-[calc(100dvh-48px)] w-full flex-col items-center justify-between px-2 shadow-none">
        <div className="flex w-full flex-1 items-center justify-center text-center">
          <RegisterSteps next={nextStep} step={step} />
        </div>
      </div>

      <LoginRegisterDrawer
        isOpen={isWelcomeDrawerOpen}
        onClose={drawerCloseHandler}
      />
    </PwaPageLayout>
  );
}

const RegisterPage = ({ ...props }: RegisterPageComponentProps) => {
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

export default RegisterPage;
