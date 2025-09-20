import CustomInput from "@/components/atoms/customInput";
import { emailPattern } from "@/core/constants/regex";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useLoginContext } from "../../provider";

function EmailInput() {
  const t = useTranslations();
  const { watch, control, errors } = useLoginContext();
  const [isEmailPlaceHolderVisible, setIsEmailPlaceholderVisible] =
    useState<boolean>(false);
  const email = watch("email");

  return (
    <Controller
      control={control}
      name={"email"}
      render={({ field }) => (
        <CustomInput
          maxLength={50}
          {...field}
          onFocus={() => setIsEmailPlaceholderVisible(true)}
          onBlur={() => setIsEmailPlaceholderVisible(false)}
          error={errors?.email?.message}
          label={t("email")}
          inputClassName="border-none"
          placeholder={
            !isEmailPlaceHolderVisible ? t("enterYourEmail") : undefined
          }
          value={email}
          wrapperClassName="h-12 mb-6 border-b border-b border-accentText pb-8"
        />
      )}
      rules={{
        required: { message: t("pleaseFillInput"), value: true },
        pattern: {
          message: t("invalidEmail"),
          value: emailPattern,
        },
      }}
    />
  );
}

export default EmailInput;
