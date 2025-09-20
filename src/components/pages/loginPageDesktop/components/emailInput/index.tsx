import { emailPattern } from "@/core/constants/regex";
import InputDefault from "@/shared/atoms/inputDefault";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useLoginContext } from "../../provider";

function EmailInput() {
  const t = useTranslations();
  const { watch, control, errors, setValue, clearErrors } = useLoginContext();

  return (
    <Controller
      control={control}
      name={"email"}
      render={({ field }) => (
        <InputDefault
          {...field}
          placeholder={t("enterYourEmail")}
          label={t("email")}
          wrapperClassName="w-[380px]!"
          error={errors?.email?.message}
          className="h-12! py-0! placeholder:text-textPlaceholder"
          onChange={(e) => {
            clearErrors("email");
            setValue("email", e.target.value);
          }}
          value={watch("email")}
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
