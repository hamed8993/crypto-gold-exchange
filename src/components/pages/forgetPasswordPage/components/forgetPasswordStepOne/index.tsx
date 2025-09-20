/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import CustomInput from "@/components/atoms/customInput";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { emailPattern } from "@/core/constants/regex";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostSecuritySend_password_reset_code } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useForgetPasswordContext } from "../../provider";

interface RegisterStepOneProps {
  next: () => void;
}

function ForgetPasswordStepOne({ next }: RegisterStepOneProps) {
  const t = useTranslations();

  const { showSuccess, showError } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { control, handleSubmit, watch, errors } = useForgetPasswordContext();

  const { mutate, isPending } = usePostSecuritySend_password_reset_code({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      setTimeout(() => {
        next();
      }, 1000);
    },
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message.error));
    },
  });

  const onSubmit = () => {
    mutate({
      requestBody: {
        email: watch("email"),
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center pt-10">
      <h2 className="text-mainText mb-5 px-2 text-sm">
        {t("forgetPasswordNotice")}
      </h2>
      <form
        className="flex h-full w-full flex-col items-center justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-8 px-2">
          <Controller
            control={control}
            name={"email"}
            render={({ field }) => (
              <CustomInput
                {...field}
                error={errors?.email?.message}
                inputClassName="border-none"
                label={t("email")}
                maxLength={100}
                type="email"
                wrapperClassName="h-12 my-2 border-b border-b border-accentText  pb-8"
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
        </div>
        <StickyComponent className="bg-mainBackground w-full px-2">
          <div className="flex w-full justify-between gap-2 py-5">
            <CustomButton
              isLoading={isPending}
              className="h-12 w-full rounded-md"
              isDisabled={!watch("email") || isPending}
            >
              {t("continue")}
            </CustomButton>
          </div>
        </StickyComponent>
      </form>
    </div>
  );
}

export default ForgetPasswordStepOne;
