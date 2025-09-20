import CustomLineInput from "@/components/atoms/customLineInput";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useEmailChangeContext } from "../../provider";

function EmailInput() {
  const t = useTranslations();

  const { control, watch } = useEmailChangeContext();
  const email = watch("email");
  return (
    <Controller
      control={control}
      name="email"
      render={({ field }) => (
        <CustomLineInput
          {...field}
          inputClassName={email ? "!text-mainText" : "!text-accentText "}
          label={t("newEmailAddress")}
          labelClassName={email ? "!text-mainText" : "!text-accentText "}
          maxLength={100}
          wrapperClassName="mb-4"
        />
      )}
      rules={{ required: { message: t("pleaseFillInput"), value: true } }}
    />
  );
}

export default EmailInput;
