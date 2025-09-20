import CustomLineInput from "@/components/atoms/customLineInput";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useEmailChangeContext } from "../../provider";

interface CodeInputProps {
  isCodeSectionOpen: boolean;
}

function CodeInput({ isCodeSectionOpen }: CodeInputProps) {
  const t = useTranslations();

  const { control, watch } = useEmailChangeContext();

  return (
    <>
      {isCodeSectionOpen && (
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <CustomLineInput
              {...field}
              inputClassName={
                watch("code") ? "!text-mainText " : "!text-accentText "
              }
              label={t("sentCode")}
              labelClassName={
                watch("code") ? "!text-mainText " : "!text-accentText "
              }
              maxLength={6}
              type="text"
              wrapperClassName="mb-4"
            />
          )}
          rules={{
            required: { message: t("pleaseFillInput"), value: true },
          }}
        />
      )}
    </>
  );
}

export default CodeInput;
