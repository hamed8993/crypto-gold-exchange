import CustomLineInput from "@/components/atoms/customLineInput";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useSettingsContextProvider } from "../../provider";

function CurrentPasswordInput() {
  const t = useTranslations();

  const { control, watch } = useSettingsContextProvider();

  return (
    <Controller
      control={control}
      name="passwordCurrent"
      render={({ field }) => (
        <CustomLineInput
          {...field}
          inputClassName={
            watch("passwordCurrent") ? "!text-mainText " : "!text-accentText "
          }
          isSecured
          label={t("passwordCurrent")}
          labelClassName={
            watch("passwordCurrent") ? "!text-mainText " : "!text-accentText "
          }
          maxLength={100}
          type="password"
          wrapperClassName="mb-4"
        />
      )}
      rules={{
        required: { message: t("pleaseFillInput"), value: true },
      }}
    />
  );
}

export default CurrentPasswordInput;
