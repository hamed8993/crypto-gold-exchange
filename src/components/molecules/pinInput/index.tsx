import CustomPinInput from "@/components/atoms/customPinInput";
import CustomResend from "@/components/atoms/customResend";
import { useTranslations } from "next-intl";
import React from "react";

interface PinInputProps {
  isCodeSectionOpen: boolean;
  isOkToStart: boolean;
  onPinComplete: (pin: string) => void;
  sendEmailCodeHandler: () => void;
  setIsOkToStart: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  className?: string;
}

function PinInput({
  isCodeSectionOpen,
  onPinComplete,
  isOkToStart,
  sendEmailCodeHandler,
  setIsOkToStart,
  className,
}: PinInputProps) {
  const t = useTranslations();
  return (
    <>
      {isCodeSectionOpen && (
        <>
          <CustomPinInput
            className={className}
            label={t("verificationCode")}
            length={6}
            onComplete={onPinComplete}
          />
          <CustomResend
            isOkToStart={isOkToStart}
            onResend={sendEmailCodeHandler}
            setIsOkToStart={setIsOkToStart}
          />
        </>
      )}
    </>
  );
}

export default PinInput;
