"use client";

import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ForgetPasswordSteps from "./components/forgetPasswordSteps";
import { ForgetPasswordContextProvider } from "./provider";

interface ForgetPasswordProps {
  className?: string;
}

const steps = [0, 1, 2];

function ForgetPasswordComponent({ className }: ForgetPasswordProps) {
  const t = useTranslations();
  const [step, setStep] = useState<number>(0);

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <PwaPageLayout
      hasBackChevron
      hasFooter={false}
      onBackClick={step !== 0 ? prevStep : undefined}
      title={t("forgetPassword")}
      wrapperClassName={className}
    >
      <div className="bg-mainBackground relative mx-auto flex h-[calc(100dvh-48px)] w-full flex-col items-center justify-center rounded-lg shadow-none">
        <div className="flex w-full flex-1 items-center justify-center text-center">
          <ForgetPasswordSteps step={step} next={nextStep} />
        </div>
      </div>
    </PwaPageLayout>
  );
}

const ForgetPassword = ({ ...props }: ForgetPasswordProps) => {
  return (
    <ForgetPasswordContextProvider>
      <ForgetPasswordComponent {...props} />
    </ForgetPasswordContextProvider>
  );
};

export default ForgetPassword;
