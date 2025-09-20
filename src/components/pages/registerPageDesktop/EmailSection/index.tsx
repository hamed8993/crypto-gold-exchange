import InputDesktop from "@/components/molecules/inputDesktop";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, ControllerRenderProps } from "react-hook-form";
import { RegisterFormValues, useRegisterContext } from "../provider";

interface EmailSectionProps {
  hasTriedToSubmit?: boolean;
  setHasTriedToSubmit?: (arg: boolean) => void;
}

const EmailSection = ({
  setHasTriedToSubmit,
  hasTriedToSubmit,
}: EmailSectionProps) => {
  const t = useTranslations();

  const [hasCellphoneError, setHasCellphoneError] = useState<boolean>(false);

  const { control, errors, watch } = useRegisterContext();

  const cellPhoneLength = watch("cellphone").length;
  const cellPhoneError = errors?.cellphone?.message;

  setTimeout(() => {
    setHasCellphoneError(
      !!(hasTriedToSubmit || (cellPhoneError && cellPhoneLength === 11)),
    );
  }, 200);

  const handleChange = (
    e: string,
    field: ControllerRenderProps<RegisterFormValues, "cellphone">,
  ) => {
    if (/^\d*$/.test(e)) {
      field.onChange(e);
    }
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex h-full w-full items-center justify-start">
        <Controller
          control={control}
          name="cellphone"
          render={({ field }) => (
            <InputDesktop
              error={hasCellphoneError ? cellPhoneError : ""}
              inputMode="decimal"
              isAmount={false}
              label={t("cellphone")}
              labelContainerClassName="bg-surface "
              maxLength={11}
              onChange={(e) => {
                handleChange(e, field);
                if (setHasTriedToSubmit) {
                  setHasTriedToSubmit(false);
                }
              }}
              value={field?.value}
            />
          )}
          rules={{
            required: t("pleaseEnterCellphone"),
            pattern: {
              value: /^09\d{9}$/,
              message: t("invalidPhoneNumber"),
            },
          }}
        />
      </div>
      <div className="flex h-full w-full items-center justify-start">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputDesktop
              error={errors?.email?.message}
              label={t("email")}
              labelContainerClassName="bg-surface "
              onChange={onChange}
              value={value}
              isAmount={false}
            />
          )}
          rules={{
            required: t("pleaseEnterEmail"),
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: t("invalidEmail"),
            },
          }}
        />
      </div>
    </div>
  );
};

export default EmailSection;
