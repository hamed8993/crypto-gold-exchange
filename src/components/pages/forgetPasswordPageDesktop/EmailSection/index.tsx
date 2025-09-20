import InputDesktop from "@/components/molecules/inputDesktop";
import { useTranslations } from "next-intl";
import { Controller, ControllerRenderProps } from "react-hook-form";
import {
  ForgetPasswordFormValues,
  useForgetPasswordContext,
} from "../provider";

interface EmailSectionProps {
  step: "email" | "code" | "password";
}

const EmailSection = ({ step }: EmailSectionProps) => {
  const t = useTranslations();

  const { control, errors } = useForgetPasswordContext();

  const handleChange = (
    e: string,
    field: ControllerRenderProps<ForgetPasswordFormValues, "resetCode">,
  ) => {
    if (/^\d*$/.test(e)) {
      field.onChange(e);
    }
  };

  return (
    <>
      <Controller
        control={control}
        name={"email"}
        render={({ field }) => (
          <InputDesktop
            error={errors?.email?.message}
            label={t("email")}
            labelContainerClassName="bg-surface "
            {...field}
          />
        )}
        rules={{
          pattern: {
            message: t("invalidEmail"),
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          },
          required: { message: t("pleaseFillInput"), value: true },
        }}
      />
      {step === "code" && (
        <Controller
          control={control}
          name={"resetCode"}
          render={({ field }) => {
            return (
              <InputDesktop
                {...field}
                onChange={(e) => handleChange(e, field)}
                error={errors?.resetCode?.message}
                isAmount={false}
                label={t("code")}
                labelContainerClassName="bg-surface "
                maxLength={8}
              />
            );
          }}
          rules={{
            required: { message: t("pleaseFillInput"), value: true },
          }}
        />
      )}
    </>
  );
};

export default EmailSection;
