import CustomLineInput from "@/components/atoms/customLineInput";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { RiNumber3 } from "react-icons/ri";
import { useActivateTFAContext } from "../../provider";

function ActivationLevelThree() {
  const t = useTranslations();

  const { watch, control } = useActivateTFAContext();
  const tfa = watch("tfaCode");

  return (
    <div className="mt-10 flex h-fit w-full items-start justify-start">
      <div className="flex w-full flex-col items-start justify-start">
        <div className="mb-6 flex h-fit w-full items-start justify-start">
          <RiNumber3 className="text-positive min-h-4 min-w-4" />

          <p className="text-mainText mx-2 text-sm">{t("tfaLevel3")}</p>
        </div>

        <Controller
          control={control}
          name="tfaCode"
          render={({ field }) => (
            <CustomLineInput
              {...field}
              label={t("tfa6DigitCode")}
              maxLength={6}
              inputMode="numeric"
              labelClassName={
                tfa
                  ? "!text-mainText mx-6! text-xs!"
                  : "!text-accentText mx-6! text-xs!"
              }
              inputClassName={
                tfa
                  ? "!text-mainText w-[85%]! mx-6! text-[16px]! !font-english text-center!"
                  : "!text-accentText  w-[85%]! mx-6! text-xs!"
              }
              wrapperClassName="mb-4"
            />
          )}
          rules={{ required: { message: t("pleaseFillInput"), value: true } }}
        />
      </div>
    </div>
  );
}

export default ActivationLevelThree;
