/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import CustomLineInput from "@/components/atoms/customLineInput";
import {
  isStickyReady,
  StickyComponent,
} from "@/components/atoms/stickyComponent";
import TypingH2 from "@/components/atoms/typingH2";
import usePasswordValidate from "@/core/hooks/usePasswordValidate";
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostRegisterVerify } from "@/core/services/hooks";
import { SHA256 } from "crypto-js";
import { useTranslations } from "next-intl";
import { FormEventHandler } from "react";
import { Controller } from "react-hook-form";
import { useRegisterContext } from "../../provider";
import PasswordConditionSection from "./conditionCheck";

const RegisterStepFive = () => {
  const t = useTranslations();
  const { locale } = useUrl();

  const { showError, showSuccess } = useNotification();
  const { getErrorMessages } = useGetAPIMessages();
  const { handleSavingTokens } = useAuth();
  const { handleSubmit, setValue, watch, control, errors } =
    useRegisterContext();

  const { isPasswordValid } = usePasswordValidate({
    password: watch("password"),
  });

  const { mutate } = usePostRegisterVerify({
    onSuccess: () => {
      showSuccess(t("loggedInSuccessfully"));
      handleSavingTokens({
        // accT: data.result?.user_uuid || "",
        // devT: data.result.device_uuid,
        // devT: "",
        LT: "true",
      });
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/`;
    },
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message.error));
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSubmit(() =>
      mutate({
        requestBody: {
          name: watch("name"),
          family_name: watch("family_name"),
          email: watch("email"),
          cellphone: watch("cellphone"),
          country: watch("country"),
          referralCode: watch("referralCode"),
          confirmationCode: watch("deviceCode"),
          password: SHA256(watch("password")).toString(),
        },
      }),
    )();
  };

  return (
    <div className="flex h-full min-h-[425px] w-full flex-col">
      <TypingH2
        className="text-mainText mt-10 mb-1 min-h-5 text-start font-semibold"
        text={t("addPassword")}
      />

      <form
        className="flex h-full w-full flex-col items-center justify-between"
        onSubmit={onSubmit}
      >
        <div className="flex w-full flex-col gap-8">
          <div className="mt-3 w-full space-y-5">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <CustomLineInput
                  {...field}
                  label={t("passwordNew")}
                  autoComplete={"off"}
                  maxLength={100}
                  type="password"
                  labelClassName={
                    watch("password") ? "!text-mainText " : "!text-accentText "
                  }
                  inputClassName={
                    watch("password") ? "text-mainText " : "!text-accentText "
                  }
                  wrapperClassName="mb-4"
                  error={errors?.password?.message}
                />
              )}
              rules={{
                required: { message: t("pleaseFillInput"), value: true },
              }}
            />

            <PasswordConditionSection password={watch("password")} />

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
                    watch("passwordRepeat")
                      ? "!text-mainText "
                      : "!text-accentText "
                  }
                  inputClassName={
                    watch("passwordRepeat")
                      ? "text-mainText "
                      : "!text-accentText "
                  }
                  wrapperClassName="mb-4"
                  error={errors?.passwordRepeat?.message}
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
          <div>
            {!watch("hasRefCode") && !watch("referralCode") ? (
              <div className="flex items-center gap-1">
                <p className="text-mainText text-xs">{t("partnerCode")}</p>
                <button
                  className="text-positive text-xs underline"
                  onClick={() => setValue("hasRefCode", true)}
                  type="button"
                >
                  {t("enterHere")}
                </button>
              </div>
            ) : (
              <div>
                <Controller
                  control={control}
                  name="referralCode"
                  render={({ field }) => (
                    <CustomLineInput
                      disabled={!isStickyReady}
                      label={t("partnerCode")}
                      {...field}
                    />
                  )}
                />
              </div>
            )}
          </div>
        </div>
        <StickyComponent className="mainBackground w-full px-2">
          <div className="flex w-full justify-between gap-2 py-5">
            <CustomButton
              className="z-20 h-12 rounded-md"
              isDisabled={!isPasswordValid}
            >
              {t("continue")}
            </CustomButton>
          </div>
        </StickyComponent>
      </form>
    </div>
  );
};
export default RegisterStepFive;
