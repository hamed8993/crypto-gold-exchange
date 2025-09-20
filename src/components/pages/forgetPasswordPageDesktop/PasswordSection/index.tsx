import InputDesktop from "@/components/molecules/inputDesktop";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import PasswordConditionSection from "../PasswordConditionSection";
import { useForgetPasswordContext } from "../provider";

const PasswordSection = () => {
  const t = useTranslations();

  const { control, watch, errors } = useForgetPasswordContext();

  return (
    <>
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <InputDesktop
            {...field}
            error={errors?.password?.message}
            label={t("password")}
            labelContainerClassName="bg-surface "
            type="password"
          />
        )}
        rules={{
          required: { message: t("pleaseFillInput"), value: true },
        }}
      />

      <PasswordConditionSection password={watch("password")} />

      <Controller
        control={control}
        name="passwordRepeat"
        render={({ field }) => (
          <InputDesktop
            {...field}
            error={errors?.passwordRepeat?.message}
            label={t("passwordNewRepeat")}
            labelContainerClassName="bg-surface "
            maxLength={100}
            type="password"
          />
        )}
        rules={{
          required: { message: t("pleaseFillInput"), value: true },
          validate: {
            matchesPassword: (value) =>
              value === watch("password") || t("passwordsDoNotMatch"),
          },
        }}
      />
    </>
  );
};

export default PasswordSection;
