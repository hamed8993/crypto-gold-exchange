"use client";
import CustomButton from "@/components/atoms/customButton";
import CustomInput from "@/components/atoms/customInput";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useForgetPasswordContext } from "../../provider";

interface ForgetPasswordStepTwoProps {
  next: () => void;
}

function ForgetPasswordStepTwo({ next }: ForgetPasswordStepTwoProps) {
  const t = useTranslations();

  const { watch, control, errors } = useForgetPasswordContext();

  const onSubmit = () => {
    if (watch("resetCode").length === 8) {
      next();
    }
  };

  return (
    <div className="h-full w-full flex-col items-center justify-center pt-10">
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="flex w-full flex-col gap-8 px-2">
          <Controller
            control={control}
            name="resetCode"
            render={({ field }) => (
              <CustomInput
                {...field}
                error={errors?.resetCode?.message}
                inputClassName="border-none"
                inputMode="decimal"
                label={t("verificationCode")}
                maxLength={8}
                wrapperClassName="h-12 my-2 border-b border-b border-accentText  pb-8"
              />
            )}
            rules={{
              required: { message: t("pleaseFillInput"), value: true },
            }}
          />
        </div>
        <StickyComponent className="bg-mainBackground w-full px-2">
          <div className="flex w-full justify-between gap-2 py-5">
            <CustomButton
              onClick={onSubmit}
              isDisabled={watch("resetCode").length !== 8}
            >
              {t("continue")}
            </CustomButton>
          </div>
        </StickyComponent>
      </div>
    </div>
  );
}

export default ForgetPasswordStepTwo;
