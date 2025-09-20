/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import CustomInput from "@/components/atoms/customInput";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import PasswordConditionSection from "@/components/pages/settingsPage/components/changePasswordDrawer/components/passwordConditionSection";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostSecurityReset_password } from "@/core/services/hooks";
import { SHA256 } from "crypto-js";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useForgetPasswordContext } from "../../provider";

function ForgetPasswordStepThree() {
  const t = useTranslations();
  const { locale } = useUrl();
  const { replace } = useRouter();
  const { getErrorMessages } = useGetAPIMessages();
  const { showError, showSuccess } = useNotification();

  const { control, watch, handleSubmit, errors } = useForgetPasswordContext();

  const [isManuallyLoading, setIsManuallyLoading] = useState<boolean>(false);

  const { handleSavingTokens } = useAuth();

  const { mutate, isPending } = usePostSecurityReset_password({
    onSuccess: () => {
      handleSavingTokens({
        LT: "true",
      });
      showSuccess(t("yourAccountHasBeenCreatedSuccessfully"));
      setIsManuallyLoading(true);
      replace(`/${locale}${RoutesName.dashboard}`);
    },
    onError: (err) => {
      // @ts-ignore
      showError(getErrorMessages(err.message.error));
    },
  });

  const onSubmit = () => {
    mutate({
      requestBody: {
        email: watch("email"),
        newPassword: SHA256(watch("password")).toString(),
        resetCode: watch("resetCode"),
      },
    });
  };

  const checkCharacterLength = () => {
    return watch("password").length >= 8;
  };

  const checkHasNumber = () => {
    return /\d/.test(watch("password"));
  };

  const checkHasLowercase = () => {
    return /[a-z]/.test(watch("password"));
  };

  const checkHasUppercase = () => {
    return /[A-Z]/.test(watch("password"));
  };

  const isButtonDisabled =
    !checkCharacterLength() ||
    !checkHasNumber() ||
    !checkHasLowercase() ||
    !checkHasUppercase() ||
    watch("password") !== watch("passwordRepeat");

  return (
    <div className="h-full w-full px-4">
      <form
        className="flex h-full w-full flex-col items-center justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-10 w-full space-y-5">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <CustomInput
                {...field}
                inputClassName="border-none"
                wrapperClassName="h-12 my-2 border-b border-b border-accentText  pb-8"
                error={errors?.password?.message}
                label={t("password")}
                maxLength={100}
                type="password"
              />
            )}
            rules={{ required: { message: t("pleaseFillInput"), value: true } }}
          />

          <PasswordConditionSection password={watch("password")} />

          <Controller
            control={control}
            name="passwordRepeat"
            render={({ field }) => (
              <CustomInput
                {...field}
                error={errors?.passwordRepeat?.message}
                label={t("passwordNewRepeat")}
                maxLength={100}
                type="password"
                inputClassName="border-none"
                wrapperClassName="h-12 my-2 border-b border-b border-accentText  pb-8"
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
        </div>
        <StickyComponent className="bg-mainBackground w-full px-2">
          <div className="w-full py-4">
            <CustomButton
              isLoading={isPending || isManuallyLoading}
              isDisabled={isButtonDisabled || isPending || isManuallyLoading}
            >
              {t("confirm")}
            </CustomButton>
          </div>
        </StickyComponent>
      </form>
    </div>
  );
}

export default ForgetPasswordStepThree;
