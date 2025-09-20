/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import CustomLineInput from "@/components/atoms/customLineInput";
import LoadingView from "@/components/atoms/loadingView";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import TypingH2 from "@/components/atoms/typingH2";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostRegisterSend_register_code } from "@/core/services/hooks";
import { CountdownTime } from "@/core/utilities/saveCountdownTime";
import { useTranslations } from "next-intl";
import { FormEventHandler, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useRegisterContext } from "../../provider";

interface RegisterStepThreeProps {
  next?: () => void;
  count: number;
  isCounting: boolean;
  isLoading?: boolean;
  setStart: (state: boolean) => void;
}

const RegisterStepThree = ({
  next,
  count,
  setStart,
  isCounting,
  isLoading,
}: RegisterStepThreeProps) => {
  const t = useTranslations();
  // TODO: check after backend resend timeout
  const countdown = new CountdownTime("Register");

  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { control, handleSubmit, watch, errors } = useRegisterContext();

  const [isStickyReady, setIsStickyReady] = useState<boolean>(false);

  const { mutate, isPending: isLoadingResend } =
    usePostRegisterSend_register_code({
      onSuccess: (data) => {
        countdown.save();
        setStart(true);
        showSuccess(getSuccessMessages(data.result));
      },
      onError: (error) => {
        // @ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setTimeout(() => {
      handleSubmit(() => next?.())();
    }, 100);
  };

  const resend = () => {
    mutate({
      requestBody: {
        email: watch("email"),
      },
    });
  };

  useEffect(() => {
    setIsStickyReady(true);
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <TypingH2
        className="text-mainText mt-10 mb-1 min-h-5 text-start font-semibold"
        text={t("verificationCode")}
      />
      <p className="text-accentText text-start text-sm">
        {t("verificationCodeDesc")}
      </p>
      <form
        className="flex h-full w-full flex-col items-center justify-between"
        onSubmit={onSubmit}
      >
        <div className="flex w-full flex-col gap-2">
          <Controller
            control={control}
            name="deviceCode"
            render={({ field }) => (
              <CustomLineInput
                {...field}
                label={t("tfa6DigitCode")}
                maxLength={6}
                inputMode="numeric"
                labelClassName={
                  watch("deviceCode")
                    ? "!text-mainText   text-xs!"
                    : "!text-accentText   text-xs!"
                }
                inputClassName={
                  watch("deviceCode")
                    ? "!text-mainText   text-[16px]! !font-english text-center!"
                    : "!text-accentText   text-xs!"
                }
                error={errors?.deviceCode?.message}
                wrapperClassName="mb-4"
              />
            )}
            rules={{ required: { message: t("pleaseFillInput"), value: true } }}
          />

          <button
            onClick={resend}
            type="button"
            disabled={isCounting || isLoading || isLoadingResend}
            className="flex items-center justify-end text-xs"
          >
            <div>
              {isLoading || isLoadingResend ? (
                <LoadingView
                  wrapperClassName="min-h-[unset]"
                  className="h-5! w-5! border-2!"
                />
              ) : isCounting ? (
                <p className="text-mainText">{count}</p>
              ) : (
                <p className="text-mainText">{t("resend")}</p>
              )}
            </div>
          </button>
        </div>
        {isStickyReady && (
          <StickyComponent className="bg-mainBackground w-full px-2">
            <div className="flex w-full justify-between gap-2 py-5">
              <CustomButton className="z-20 h-12 rounded-md" type="submit">
                {t("continue")}
              </CustomButton>
            </div>
          </StickyComponent>
        )}
      </form>
    </div>
  );
};

export default RegisterStepThree;
