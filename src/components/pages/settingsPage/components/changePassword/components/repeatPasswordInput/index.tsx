import CustomLineInput from "@/components/atoms/customLineInput";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { usePasswordChangeContext } from "../../provider";

function RepeatPasswordInput() {
  const t = useTranslations();

  const { control, watch } = usePasswordChangeContext();

  return (
    <Controller
      control={control}
      name="passwordRepeat"
      render={({ field }) => (
        <CustomLineInput
          {...field}
          label={t("passwordNewRepeat")}
          autoComplete={"off"}
          maxLength={100}
          type="password"
          labelClassName={
            watch("passwordRepeat") ? "!text-mainText " : "!text-accentText "
          }
          inputClassName={
            watch("passwordRepeat") ? "!text-mainText " : "!text-accentText "
          }
          wrapperClassName="mb-4"
        />
      )}
      rules={{
        required: { message: t("pleaseFillInput"), value: true },
        validate: {
          matchesPassword: (value) =>
            value === watch("passwordNew") || t("passwordsDoNotMatch"),
        },
      }}
    />
  );
}

export default RepeatPasswordInput;
