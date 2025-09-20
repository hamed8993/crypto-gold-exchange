import CustomLineInput from "@/components/atoms/customLineInput";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useSettingsContextProvider } from "../../provider";

function NewPasswordInput() {
  const t = useTranslations();

  const { control, watch } = useSettingsContextProvider();

  return (
    <Controller
      control={control}
      name="passwordNew"
      render={({ field }) => (
        <CustomLineInput
          {...field}
          label={t("passwordNew")}
          autoComplete={"off"}
          maxLength={100}
          type="password"
          labelClassName={
            watch("passwordNew") ? "!text-mainText " : "!text-accentText "
          }
          inputClassName={
            watch("passwordNew") ? "!text-mainText " : "!text-accentText "
          }
          wrapperClassName="mb-4"
        />
      )}
      rules={{
        required: { message: t("pleaseFillInput"), value: true },
      }}
    />
  );
}

export default NewPasswordInput;
